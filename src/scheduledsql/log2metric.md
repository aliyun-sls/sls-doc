### log2metric

#### 需求
计算分钟级别的OSS 请求数据数,请求数据总量,响应数据总量,平均响应时间,并将结果转化为时序数据,导入到时序数据库 log2metric

```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as time, count(1) as request_count, sum(content_length_in) as request_size, sum(content_length_out) as response_size, avg(response_time) as response_time from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, time
```


#### 写入模式
![image-52.png](/img/src/scheduledsql/log2metric/7fa6aafa1f4a88146dc5c116f4ca01879aae62b4abdca732a0bae2e06dd113f9.png)
当源为日志库时，可以选择日志库导入日志库以及日志库导入时序库 , 这里选择时序库

#### 指标列
![image-54.png](/img/src/scheduledsql/log2metric/4ffafdc7aa475dae036f5b719d8a1f3c6fa416df77f98c81a68055fc6a103726.png)

指标列用于选择计算结果列，类型必须为数字，这里选择request_count, request_size, response_size以及response_time，分别表示请求次数，请求大小，响应大小以及响应延迟。这里需要注意的是，如果结果中某行数据的指标列无效（无法转为数字），ScheduledSQL任务会忽略该错误，并继续执行。

#### 哈希列
如果时序库中同一label的数据写入到固定的shard中，可以增强局部性,提升查询效率。因此可以选择常用的过滤标签，作为哈希列,这里哈希列选择bucket。

#### 时间列
时间列用于指定该条指标的具体时间，类型必须为数字，这里直接使用time列即可。

#### 调度配置
![image-49.png](/img/src/scheduledsql/log2metric/1b21fe63240f97b5a36fc07ff0ac573f86f29a871cc45fc57e0c87f346291447.png)
设置 SQL 每 5 分钟执行一次，每次执行处理最近 5 分钟窗口的数据。
注意：

1. 设置延迟执行参数,上游 Logstore 的数据到来可能延迟,建议设置大一些的值做等待来保证计算数据的完整性。
2. SQL 运行超过指定次数或指定时间后,这一次的 SQL 实例会失败并继续下一个实例的调度

#### 调度时间范围
选择某时间开始, 并设置起始时间,表示从该时间开始进行sql计算 ,也可以选定时间范围 , 表示对这段时间内的数据进行sql计算

#### 任务管理
在SLS控制台可以查看之前创建的ScheduledSQL作业。
![image-51.png](/img/src/scheduledsql/log2metric/afe3c96717b14b387b7a857f297eae08636c2e6d0ef9c9dc206b1080ea82ba8f.png)
在作业管理页面内，可以查看到每一次执行的实例列表。
![image-62.png](/img/src/scheduledsql/log2metric/2c2e6013db2138f31b2d00fa5ab02d2b572cff659410c1780c93b4aa4436e3e3.png)
每个实例信息中有 SQL 查询区间，如果任务失败（权限、SQL 语法等原因）或 SQL 处理行数指标为 0（数据迟到或确实没有数据）,可以对指定实例做重试运行（失败告警功能开发中）

#### 效果
##### 不通bucket的请求次数
```
sum(request_size) by (bucket)
```

![image-57.png](/img/src/scheduledsql/log2metric/edacc3ffc11c6aa9f1b9f6c092ebbcad2ce22db780fa7925ee48d1a09727f818.png)

##### 不通bucket的平均请求延迟
```
avg(response_time * request_count) by (bucket)
```

![image-58.png](/img/src/scheduledsql/log2metric/afe73cf52c71b2b193094845fae3e89cf82249d7a7b2191b32b7534782caba26.png)
