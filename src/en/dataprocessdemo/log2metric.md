# 使用数据加工将 Log 转成 Metric

## 云原生时代的可观察性

我们关注应用运行起来后的运行时数据，主要有 Log、Trace 和 Metric 这 3 大类。

Log 是离散的事件，Trace 可以认为是带请求追踪的事件，Metric 是带统计量的事件。

![](/img/dataprocessdemo/特定格式处理/img1.jpg)

本质上 Log、Trace、Metric 都是事件，存储上满足事件存储的系统都可以用来存储这 3 类数据。

阿里云 SLS 为运行时数据提供了两种存储:Logstore 和 Metricstore。

- Logstore：适合存储 Log 和 Trace
- Metricstore：适合存储 Metric

SLS Metricstore 针对时序 Scenario 做了大量优化，提供 PromQL 查询能力，支持 Prometheus 协议。

SLS Metricstore 详细介绍请参考[官方链接](https://help.aliyun.com/document_detail/171723.html), PromQL 查询语言请参考[官方链接](https://prometheus.io/docs/prometheus/latest/querying/basics/)

## Log 转 Metric

很多应用的 Log 数据往往比 Metric 全面。 经常存在这样的 Scenario: 把 Log 中的数据转换为 Metric。

前面提到，Metric 可以认为是特定格式的 Log，因此在 SLS 里可以将 Log 转换为 Metric。

常见的 Log 转 Metric 的方法可以有两种:

![](/img/dataprocessdemo/特定格式处理/img2.jpg)

- 聚合日志产生指标，类似 sql 做 group by 以后产生对应的统计值. 对应 SLS ScheduleSQL 功能
- 将日志格式做格式转换，使其符合 Metric 格式. 对应 SLS 数据加工`e_to_metric`Scenario

本文主要介绍第二种的 Scenario，即日志按行处理转化为 Metric 的格式

## 阿里云 SLS 数据加工简介

数据加工服务是 SLS 推出的面向日志行处理的服务，主要为日志的规整、过滤、富化等 Scenario 设计

![](/img/dataprocessdemo/特定格式处理/img3.jpg)

SLS 数据加工 DSL 是专门为日志实时行处理定制的一套语言（类 Python）。目前支持 200+的行处理函数，可以参考[官网文档](https://help.aliyun.com/document_detail/159702.html)

本文主要介绍 Log 转 Metric 的函数 `e_to_metric`

## Log 转 Metric 实战

### Step1 – 创建 Metricstore

首先来建一个 Metricstore 用于接受指标数据

- 创建 Metricstore，界面操作

![](/img/dataprocessdemo/特定格式处理/img4.jpg)

- Grafana 配置访问 Metricstore, 以便使用 Grafana 查询 Metricstore 数据, 进入 Grafana 首页

Configuration -> Data Sources -> Add Data Source, 选择 Prometheus -> URL 的组成格式如下

```
https://${Endpoint}/prometheus/${Project}/${Metricstore}/

# Endpoint、Project、 Metricstore分别做相应替换
```

Auth -> Basic auth 要 enable 起来，Basic Auth Details 输入阿里云 AccesskeyID 和 AccesskeySecret

![](/img/dataprocessdemo/特定格式处理/img5.jpg)

Metricstore 创建好了，那么如何向 Metricstore 写入指标数据呢？

可以看到下面的格式来写入, 见文档 [Metricstore 格式](https://help.aliyun.com/document_detail/171773.htm)

![](/img/dataprocessdemo/特定格式处理/img6.jpg)

可以看到，Metricstore 要求数据写入必须符合一定的格式，

对于 Log 格式转 Metric 格式的 Scenario，可以使用数据加工函数`e_to_metric`来实现.

接下来以 Nginx 日志中的 request_time 等指标为例，演示如何将 Log 转换成 Metricstore 的格式

### Step2 - 第一个 Log 转 Metric 任务

先来看一下用于演示的 Nginx 日志, 我们的目标是将建立 Nginx 的`request_time`指标
![](/img/dataprocessdemo/特定格式处理/img7.jpg)

- 点开 Nginx 日志的 logstore，进入查询分析页面后，可以看到“数据加工”的入口，点击进入

![](/img/dataprocessdemo/特定格式处理/img8.jpg)

- 看到数据加工 IDE 界面后，在 IDE 里编写 DSL 语句实现生成`request_time`指标

![](/img/dataprocessdemo/特定格式处理/img9.jpg)

数据加工实现日志转 Metric 主要由 `e_to_metric` 来实现, 函数参数要求如下，完整帮助参考 [链接](https://help.aliyun.com/document_detail/125484.html?#section-u7i-ymg-jzp)

```python
e_to_metric(names=None, labels=None, time=None)
# names字段用于指定指标名称字段，指定该字段后指标的值也会取Log中该字段名的值
# labels字段用于指定指标label字段
# time字段不填，自动使用logstore中的__time__时间
```

我们只需要建立一个指标叫`request_time`,并且指标取值也是 request_time 的值，因此加工语句如下

```python
e_to_metric(names="request_time")
```

点一下快速预览，看一下效果

![](/img/dataprocessdemo/特定格式处理/preview1.jpg)

可以看到生成了`request_time`指标，并且没有 Label（后面有更多样例演示如何增加 Label，我们先走通最简单的）

- 保存加工任务, 存储目标的目标库请选择刚才第一步创建的 Metricstore

![](/img/dataprocessdemo/特定格式处理/img10.jpg)

### Step3 – 查询 Metricstore

加工任务保存后，等几分钟后数据会写入 Metricstore，然后可以在 Grafana 里查询 Metric。

输入 PromQL 查询，直接输入 metricname 即可查询

```
request_time
```

![](/img/dataprocessdemo/特定格式处理/img11.jpg)

### Log 转 Metric - 更多样例

- 带上 Label

```python
e_to_metric(
    names="request_time",
    labels="slbid"
)
```

![](/img/dataprocessdemo/特定格式处理/img12.jpg)

- 将 Log 中的多个值转化为指标

```python
e_to_metric(
    names=["request_time","upstream_response_time"],
    labels="slbid"
)
```

![](/img/dataprocessdemo/特定格式处理/img13.jpg)

- 多个 Label

```python
e_to_metric(
    names=["request_time","upstream_response_time"],
    labels=["slbid","scheme"]
)
```

![](/img/dataprocessdemo/特定格式处理/img14.jpg)

- Metric 重命名

```
e_to_metric(names=[("request_time","rt"),"upstream_response_time"],labels=["slbid","scheme"])
```

![](/img/dataprocessdemo/特定格式处理/img15.jpg)

- Label 重命名

```python
e_to_metric(
    names=[("request_time","rt"),"upstream_response_time"],
    labels=["slbid",("scheme","http_type")]
)
```

![](/img/dataprocessdemo/特定格式处理/img16.jpg)

## 小结

本文通过数据加工的`e_to_metric`函数演示了如何将 Log 转化成 Metric， 希望对看官的可观察性 Scenario 有帮助。

SLS 提供了可观察性的整体 Solution，积极跟进 OpenTelemetry 标准，有任何问题欢迎和我们交流。
