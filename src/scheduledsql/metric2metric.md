### metric2metric 

#### 需求 
从源时序库 log2metric 中筛选出 bucket 的值等于 ‘bucket00788’ 的响应时间 metric 数据,并导入到 metric2metric 时序库中
```sql

* | select promql_query_range('response_time{bucket="bucket00788"}') from metrics limit 1000

```

#### 写入模式 
![image-60.png](..%2F..%2F..%2F..%2Fimage-60.png)
当源为时序库时,只能选择时序库导入时序库。 

#### 指标列

时序库导入时序库时,结果指标名建议单指标是填写,多指标会将全部重命名

#### 哈希列
如果时序库中同一label的数据写入到固定的shard中,可以增强局部性,提升查询效率。因此可以选择常用的过滤标签,作为哈希列,这里哈希列选择bucket。

#### 调度配置 

设置 SQL 每 5 分钟执行一次，每次执行处理最近 5 分钟窗口的数据。
注意：
1. 设置延迟执行参数，上游 Logstore 的数据到来可能延迟，建议设置大一些的值做等待来保证计算数据的完整性。
2. SQL 运行超过指定次数或指定时间后，这一次的 SQL 实例会失败并继续下一个实例的调度
![image-49.png](..%2F..%2F..%2F..%2Fimage-49.png)

#### 调度时间范围
选择某时间开始, 并设置起始时间,表示从该时间开始进行sql计算 ,也可以选定时间范围 , 表示对这段时间内的数据进行sql计算

#### 任务管理
在SLS控制台可以查看之前创建的ScheduledSQL作业。

![image-51.png](..%2F..%2F..%2F..%2Fimage-51.png)

在作业管理页面内,可以查看到每一次执行的实例列表。 
![image-61.png](..%2F..%2F..%2F..%2Fimage-61.png)

每个实例信息中有 SQL 查询区间,如果任务失败（权限、SQL 语法等原因）或 SQL 处理行数指标为 0（数据迟到或确实没有数据）,可以对指定实例做重试运行（失败告警功能开发中）

#### 效果

```promql
avg(response_time) by (bucket)
```
查询bucket的平均响应时间 
![image-59.png](..%2F..%2F..%2F..%2Fimage-59.png)

