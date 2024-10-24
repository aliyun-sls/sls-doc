
# 阿里云日志服务的多指标综合异常检测

## 多指标综合异常检测

线上服务运作的指标数据很大一部分的作用在于自动地诊断服务系统是否有异常、如果有问题，问题出在哪里。这些指标的历史数据会呈现出一定的模式，比如大概率在那个范围内波动，如果超出了某个范围将是很罕见的现象等。指标之间可能还会有关联关系，比如系统的请求压力会影响系统请求的平均延迟。

阿里云日志服务提供的AI异常检测服务通过自动分析一组指标的潜在模式，然后判断指标是否遵循这些潜在的模式。如果指标的数值和潜在的模式不匹配，则判断为异常。判断的异常分等级，一级异常表示概率为0.1左右的小概率事件才会出现的指标值，二级异常表示概率为0.01左右的小概率事件才会出现的指标值，三级异常表示概率为0.001左右的小概率事件才会出现的指标值，以此类推。

例如，参考下面的例子，假设我们把收集到的两个指标数据的数据投射到一个二维平面上。可以使用阿里云日志服务提供的模式分析函数帮助分析指标数据内在的模式。模式分析函数发现这两个指标的数据以99%的概率落在红色内圈里，即如果落在内圈外外圈内，为二级异常。两个指标的数据以99.9%的概率落在红色外圈里，即如果落在外圈外，为三级异常。当然还有四级、五级异常等等，为了简化，没有把对应的圈画出来。用户可以自主地选择过滤保留哪一个级别以上的异常。

![指标数据分布模式的识别](/img/src/sqldemo/multi_metric_anomaly_detection/08-multi-metric-pattern.png)
<p>图1. 指标数据分布模式的识别</p>

我们用一些范例数据和SQL语句来描述如何用阿里云日志存储的AI服务来进行异常检测。这个过程分两步：第一步，在历史数据中分析指标模式；第二步，结合最新收集的数据和前一步分析出来的模式进行异常检测。

_高维指标数据例子: metric_data_table_

|cluster|server|time_period|request_count|network_traffic|latency_us|
|--|--|--|--|--|--|
|Cluster-A01|Server-01|2024-01-01 00:00:00|180|2000000000|100|
|Cluster-A01|Server-01|2024-01-01 00:01:00|200|2500000000|120|
|Cluster-A01|Server-01|2024-01-01 00:06:00|150|1200000000|110|
|Cluster-A01|Server-01|2024-01-01 00:08:00|175|1800000000|115|
|...|...|...|...|...|...|

上面的表格展示了对每个cluster的每个server的每个数据采集周期的三个数量指标：request_count、network_traffic和latency_us。我们可以用下面的SQL语句对每个cluster的每个server的最近一段时间的三个指标的数据进行联合模式分析，每个cluster的每个server都有属于自己的统计的联合指标模式分析。这是给每个cluster的每个server一个私人定制的模式分析。我们可以使用下面的SQL语句进行模式分析，然后把指标联合模式分析的结果保存到metric_pattern_table中，也可以放在带with语句的通用表表达式(Common Table Expression)中。

```sql
select cluster,
    server,
    '2024-01-01 00:00:00' as time_window_begin,
    '2024-01-08 00:00:00' as time_window_end,
    summarize(
        array_agg(array[request_count, network_traffic, latency_us])
    ) as metric_ pattern
from metric_data_table
where time_period >= '2024-01-01 00:00:00'  -- 指定历史数据开始的时间点
  and time_period < '2024-01-08 00:00:00'      -- 指定历史数据结束的时间点
group by cluster, server

```

_模式分析结果表: metric_pattern_table_
|cluster|server|time_window_begin|time_window_end|metric_pattern|
|--|--|--|--|--|
|Cluster-A01|Server-01|2024-01-01 00:00:00|2024-01-08 00:00:00|{...}|
|...|...|...|...|...|

上述分析中使用了多指标的数据模式分析函数summarize(...)。这个函数主要是对多指标的数据样本综合分析，抽象出统计特征，如果仅仅是要把这些统计特征应用于异常检测的话，这些抽象的统计特征不需要深了解，只需要知道如何把模式分析函数summarize函数返回的结果交给anomaly_level函数就可以了。

然后我们可以用下面的SQL语句，结合之前从历史数据中识别出来的指标模式，对最新收集到数据进行异常检测，过滤保留4级以上的异常(万分之一的小概率的异常)。结果类似于metric_anomaly_table结果表中的数据。

```sql
select md.cluster,
    md.server,
    anomaly_level(
        mp.metric_pattern,
        array[md.request_count, md.network_traffic, md.latency_us]
    ) as anomaly_level,  -- 结合统计出来的数据模式和最新收集到的数据，计算异常等级
    md.request_count,
    md.network_traffic,
    md.latency_us
from metric_data_table as md
    join metric_pattern_table as mp
        on md.cluster = mp.cluster
        and md.server = mp.server
where md.time_period >= '2024-01-08 00:00:00'  -- 指定异常检测数据开始的时间点
    and md.time_period < '2024-01-08 00:01:00'      -- 指定异常检测数据结束的时间点
    and anomaly_level(
        mp.metric_pattern,
        array[md.request_count, md.network_traffic, md.latency_us]
    ) >=4

```

_异常检测结果表: metric_anomaly_table_

|cluster|server|time_period|anomaly_level|request_count|network_traffic|latency_us|
|--|--|--|--|--|--|--|
|Cluster-A01|Server-01|2024-01-0800:00:00|5|180|2000000000|100000|
|...|...|...|...|...|...|...|

anomaly_level函数是根据summarize函数学习出来的多变量模式(summary)对给定的一组新样本计算Mahalanobis距离，然后再向下取整，然后得到0，1，2，3，4，...，等之类的表示异常级别数字，来大致近似0.1、0.01、0.001、0.0001等等表示的小概率的位数，即对应一级异常、二级异常、三级异常、四级异常等等。异常级别为0表示在一个平均振幅以内；异常级别为1表示检测的数据样本在整体数据的一个平均振幅和两个平均振幅之间，大致表示0.1 (=10 ^ 1)的小概率事件；异常级别为2表示在两个平均振幅和三个平均振幅之间，大致表示0.01 (=10 ^2)的小概率事件；以此类推。异常等级越大，表示概率越小，该样本点越值得怀疑。一般来说，至少要3级及以上的才被认为是异常。所以我们通常会对异常检测结果进行过滤，如只保留3级以上的异常。

## 阿里云日志服务中的ScheduledSQL——让AI模型计算成为自动计算服务

之前介绍的阿里云日志服务的AI计算，是以SQL的形式介绍的。这仅仅是ad hoc的分析。我们可以结合阿里云日志服务中的ScheduledSQL的功能把AI计算形成定期计算的服务。要在阿里云日志服务生成持续执行的预测计算任务，在查询分析的界面上提供了一个 “定时保存分析结果”的按钮，点击这个按钮，参考下图，之后会弹出窗口，然后在这个窗口上配置这个定时执行的AI计算就可以了。

![日志服务中的定时SQL服务](/img/src/sqldemo/multi_metric_anomaly_detection/14-sls-scheduled-sql.png)
<p>图2. 日志服务中的定时SQL服务</p>

ScheduledSQL任务的配置很直观。ScheduledSQL计算任务会定时把预测计算的SQL所产生的计算结果写入到另外一个日志库，如果这个目标日志库还不存在，需要先创建。另外要配置的是调度时间间隔和SQL读取的数据窗口等。
