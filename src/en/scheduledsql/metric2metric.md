#  时序数据转时序数据介绍
## 目标
源时序库log2metric中有多个metric 指标列 , 包括http_status,request_count, request_size, response_size以及response_time,从源时序库中筛选出 bucket 的值等于 ‘bucket00788’ 的响应时间 metric 数据,并导入到 metric2metric 时序库中

### 原始日志  
[源时序库](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/metric/log2metric_metricstore)
<!-- ![image.png](/img/src/scheduledsql/metric2metric/9d85c3bd3d21c688b03d8db27a9c4b44d7fe81f7c9502d44ddb88c4a344234be.png) -->

### 目标日志 
[目标时序库](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/metric/metirc2metric)
<!-- ![image.png](/img/src/scheduledsql/metric2metric/a6625915b5b8a4b43a821b7cb190cb8dfda373143ff0c7f9130d9b9c14eb4917.png) -->

### SQL
筛选出 bucket 的值等于 ‘bucket00788’ 的响应时间 metric 数据
```sql

* | select promql_query_range('response_time{bucket="bucket00788"}') from metrics limit 1000
```
## 计算配置
[定时SQL任务链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690515709-728271)
点击修改配置进入配置页面 
<!-- ![image.png](/img/src/scheduledsql/metric2metric/89407a9066246ad04ce56845b5ea7027e22adc989f93876ea73f7c4828334b62.png) -->

![image-60.png](/img/src/scheduledsql/metric2metric/42531ce5f7844f388927c75967d0ab81d0591143e94933f625a9ca570281d0bb.png)

| 配置项 | 描述 |
| --- | --- |
| 写入模式 | 当源为日志库时，可以选择日志库导入日志库以及日志库导入时序库，这里选择时序库 |
| SQL 代码 | 筛选出 bucket 的值等于 ‘bucket00788’ 的响应时间 metric 数据 |

```sql

* | select promql_query_range('response_time{bucket="bucket00788"}') from metrics limit 1000
```
### 结果指标名
时序库导入时序库时,结果指标名建议单指标是填写,多指标会将全部重命名

### 哈希列
如果时序库中同一label的数据写入到固定的shard中,可以增强局部性,提升查询效率。因此可以选择常用的过滤标签,作为哈希列,这里哈希列选择bucket。

## 调度配置
![picture 1](/img/src/scheduledsql/metric2metric/d6d973c2dfdf672f8909a56888a55e11d13e7767de511029e0fa50a111ae436b.png)

| 配置项 | 描述 |
| --- | --- |
| 调度间隔 | 固定间隔 5 分钟执行一次 SQL |
| 调度时间范围 | 从指定时间开始的数据会被执行 SQL |
| SQL 时间窗口 | 整点 5 分钟，表示只分析这 5 分钟内的数据 ([@m-5m ](/m-5m )~ @m)  |
| SQL 超时 | 最长时间 600 秒或最大次数 20 次 |


注意：

1. 设置延迟执行参数，上游 Logstore 的数据到来可能延迟，建议设置大一些的值做等待来保证计算数据的完整性。
2. SQL 运行超过指定次数或指定时间后，这一次的 SQL 实例会失败并继续下一个实例的调度

更多关于创建定时SQL任务时计算配置和调度配置的信息, 请参考[官方文档](https://help.aliyun.com/zh/sls/user-guide/process-and-save-data-from-a-logstore-to-another-logstore?spm=a2c4g.11186623.0.0.2c263cb3fUoe0I) 

## 使用sdk 创建定时SQL任务
如果您需要使用SDK创建定时SQL任务，可以参考官方文档：
[java sdk 创建定时SQL任务](https://help.aliyun.com/zh/sls/developer-reference/use-log-service-sdk-for-java-to-create-a-scheduled-sql-task?spm=a2c4g.11186623.0.0.23883cb3qpNgsY#task-2218965)  
## 任务管理
[任务管理界面 ](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690515709-728271)
在SLS控制台可以查看之前创建的ScheduledSQL作业。
![image-51.png](/img/src/scheduledsql/metric2metric/afe3c96717b14b387b7a857f297eae08636c2e6d0ef9c9dc206b1080ea82ba8f.png)
在作业管理页面内,可以查看到每一次执行的实例列表。
![image-61.png](/img/src/scheduledsql/metric2metric/58032d3b03fdc7e77d873a27564b6ca7b616985a340ba536e6667d886dd2bb9f.png)
每个实例信息中有 SQL 查询区间,如果任务失败（权限、SQL 语法等原因）或 SQL 处理行数指标为 0（数据迟到或确实没有数据）,可以对指定实例做重试运行

## 效果
### 查询bucket的平均响应时间
```
avg(response_time) by (bucket)
```

![image-59.png](/img/src/scheduledsql/metric2metric/8d050d6df98a9828391fb14f5aeb5b69d86d175e6a1983a742d306b638f01f7c.png)

