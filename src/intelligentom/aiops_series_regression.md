# 使用机器学习服务进行指标的预测

## 函数列表
- series_forecast
- series_describe

### series_forecast
预测某个指标接下来一段时间的数据。

:::tip 时序预测
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747912152509-313834){target="_blank"}
:::

### series_describe
对于给定的一个时间序列，该函数会对该序列从多个维度进行分析，返回相关的结果。其中多个维度具体如下：
* 数据是否连续、数据的缺失情况
* 序列是否是稳定的
* 序列是否是有周期的，周期是多少
* 序列是否有显著的趋势

:::tip 时序统计描述
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747967286277-446474){target="_blank"}
:::


## 前置说明
1. 时序预测的能力范围：对于有一定的周期规律，或者趋势性比较明显的指标可以较好的进行时序预测
2. 时序预测的曲线，需要满足一定的平稳性检测，这样预测的效果会比较好
3. 对于预测来说，需要提供一定规模的历史数据，才能更好的进行预测。如果有一定的周期规律，需要提供至少2个周期以上的历史数据
4. 在无法判断是否需要给多少历史数据的情况下，需要给至少2天的数据，因为我们假设大部分的数据具有天级别的规律
5. 可以在预测时，使用series_describe函数，对数据进行描述，查看数据是否具有周期性，或者趋势性，或者连续性，或者缺失性，或者稳定性


## 我们推荐的预测流程
1. 选择你需要关注的指标，可以通过平台的（SQL、SPL）查询出来
2. 将上述的指标数据，通过平台的Schedule SQL任务（聚合成每分钟或者每10分钟一个点），整理到一个新的Logstore或者MetricStore中，并将这个新的Store的保存时长（TTL）设置的长一些，以实际的业务为准
3. 在通过平台的Schedule SQL任务，对上述的保存好的指标数据进行预测，推荐设置为每6个小时执行一次Schedule SQL（预测任务），将结果写到某个Logstore或者MetricStore中，这样便于客户进行后续进行告警通知


PS：对于配置Schedule SQL等操作不在本文档中涉及，请读者自行去阅读先关文档
* [Schedule SQL配置](https://help.aliyun.com/zh/sls/scheduled-sql/)
* [LogStore的索引配置](https://help.aliyun.com/zh/sls/query-and-analyze-logs-in-index-mode/)

## 最佳案例
### 案例一: 预测访问量
通过访问日志，聚合成每分钟访问量，通过series_forecast函数进行预测

#### 场景一：数据存储在Logstore中

访问日志的格式如下：
```json
{
    "status":"200",
    "latency": "100",
    "domain": "www.aliyun.com",
    "url": "/index.html",
    "__time__":"1751509200"
}
```
访问日志的索引配置如下：
```json
__time__: long 单位是秒
status: long  
latency: long 单位是毫秒
domain: string
url: string
```
访问日志的查询语句如下：
```spl
* 
| extend time = cast(__time__ as bigint), status = cast(status as bigint), latency = cast(latency as bigint)
| extend time = time - time % 60
| stats total_cnt = count(1), succ_cnt = count_if(status=200), avg_latency = avg(latency) by time, domain
| extend time = second_to_nano(time)
| make-series total_cnt, succ_cnt, avg_latency on time default = 'nan' from 'min' to 'max' step '1m' by domain
```
执行上面的query，我们可以得到如下的结果：
```data
domain, __ts__, total_cnt, succ_cnt, avg_latency
www.aliyun.com, [], [], [], []
```
PS: 我们建议使用者，将使用make-series操作，将序列格式成标准的格式，并完成了补点操作。经过上述的make-series操作后，可以得到每条线在['min', 'max']这个时间区间上的最大的等间隔（1m）的时间点，缺失的点默认补齐为'nan'。
关于make-series操作的更多信息，请参考[make-series操作](https://help.aliyun.com/zh/sls/spl-statement)，这里还有多种使用的方式供选择。

在我们的到了时间序列后，我们可以进行时序预测了。使用下面的spl语句，可以完成访问量的预测
```spl
* 
| extend time = cast(__time__ as bigint), status = cast(status as bigint), latency = cast(latency as bigint)
| extend time = time - time % 60
| stats total_cnt = count(1), succ_cnt = count_if(status=200), avg_latency = avg(latency) by time, domain
| extend time = second_to_nano(time)
| make-series total_cnt, succ_cnt, avg_latency on time default = 'nan' from 'min' to 'max' step '1m' by domain

| extend ret = series_forecast(total_cnt, 60)
| extend forecase_time = ret.time_series, metric_series = ret.metric_series, forecast_metric_series = ret.forecast_metric_series, forcast_uppers = ret.forecast_metric_upper_series, forcast_lowers = ret.forecast_metric_lower_series, error_msg = ret.error_msg
```

关于series_forecast函数的使用，请参考[series_forecast函数](https://help.aliyun.com/zh/sls/metric-spl-function)
当你阅读完这个函数的使用说明后，我们可以得到如下信息：
* 我们对 total_cnt 这个指标完成了时序的预测，预测了60个点，在没有指定预测点的粒度的情况下，默认会使用传入的时间序列的粒度（这里的粒度是分钟）

接下来，我将向你展示如何使用不同的算法参数来实现不同的预测效果。

基础版本参数
* 预测N个点，每个点粒度是一分钟
* auto_period：设置为 true 时，除了考虑时间序列是否是天周期、周周期或年周期，还会检测时间序列是否具有其他周期（会增加预测耗时）
* auto_period_order: 当且仅当auto_period=true时生效，auto_period_order值越大，对自动检测到的周期的拟合度越高
```json
{
  "freq": "1min",
  "auto_period": "true",
  "auto_period_order": 10
}
```

控制下预测区间
* uncertainty_config.interval_width 取值范围是 (0, 1)，取值越大预测结果中上下界之间的范围越大
* uncertainty_config.uncertainty_samples 正整数，默认是 100。配置估计置信区间时的数据采样个数，采样个数越大，上下界估计越准确越平滑，但是耗时越长
```json
{
    "freq": "1min",
    "auto_period": "true",
    "auto_period_order": 10,
    "uncertainty_config": {
        "interval_width": 0.5,
        "uncertainty_samples": 100
    }
}
```

手动设置周期这个参数
* seasonality_config.seasonality_mode 枚举值 additive 或者 multiplicative。默认是 additive 
* seasonality_config.prior_scale 周期项的强度，默认是 10。值越大对周期项的拟合程度越高
* seasonality_config.seasons 中包含自定义的时序周期
    * name 周期名称
    * period 每一个周期包含多少天
    * fourier_order 周期拟合强度
* 服务默认设置了天、周和年周期，如果需要拟合其他周期，在 seasonality_config.seasons 中配置

请注意，我们默认的最小周期是一天。
```json
{
    "freq": "1min",
    "auto_period": "true",
    "auto_period_order": 10,
    "uncertainty_config": {
        "interval_width": 0.5,
        "uncertainty_samples": 100
    },
    "seasonality_config": {
        "seasonality_mode": "additive",
        "prior_scale": 10,
        "seasons": [
            {
                "name": "day",
                "period": 10,
                "fourier_order": 10
            }
        ]
    }
}
```

后续我们还会补充一些最佳的参数配置。接下来，我们可以看下如何将这些参数传递到算法调用中去。
* 要先确定好对应的参数
* 然后使用 json 格式化和压缩的方式，传递到径传递到 series_forecast 函数中
```spl
| extend ret = series_forecast(total_cnt, 60, '{"freq":"1min","auto_period":"true","auto_period_order":10,"uncertainty_config":{"interval_width":0.5,"uncertainty_samples":100}}')
```

#### 场景二：数据存储在metricstore中
本质上讲，这个场景中只有数据底层的存储不一样，在SPL侧时统一的。这里的差异主要在数据的获取部分。接下来我们通过 PromQL 来介绍下如何使用 SPL 进行时序预测。
* 先使用 PromQL 获取数据
* 然后在使用 SPL 进行时序预测

先打开MetricStore中的配置，然后撰写PromQL的需求，对应的地址为[时序数据查询与分析](https://help.aliyun.com/zh/sls/time-series-data-query-and-analysis/)
```promql
cpu_util{hostname="hostname0"}
```

接下来，我们使用 SPL 来获取上面的PromQL的数据
```spl
.metricstore with(promql_query='cpu_util{hostname="hostname0"}', range='1m') 
```

这个结果得到的是一个表格，我们一起来看下
```data
__labels__, __name__, __ts__, __value__
```
其中，__labels__ 是一个 json 格式的字符串，表示数据点的标签，__name__ 是数据点的名称，__ts__ 是数据点的时间戳数组，__value__ 是数据点的数组

请注意，这里并没完成时间序列的补点，仅仅使用的是原始数据组织成一个数组的。
接下来就可以套用上面通用的算法参数设置来完成时序预测了。
