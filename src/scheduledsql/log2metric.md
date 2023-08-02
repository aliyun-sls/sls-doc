### log2metric 

#### 需求 
计算分钟级别的OSS请求数据数,请求数据总量,响应数据总量,平均响应时间,并将结果转化为时序数据,导入到时序数据库 log2metric  

```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as time, count(1) as request_count, sum(content_length_in) as request_size, sum(content_length_out) as response_size, avg(response_time) as response_time from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, time

``` 

#### 写入模式
![image-52.png](..%2F..%2F..%2F..%2Fimage-52.png)

当源为日志库时，可以选择日志库导入日志库以及日志库导入时序库 , 这里选择时序库 

#### 指标列 
![image-54.png](..%2F..%2F..%2F..%2Fimage-54.png)

指标列用于选择计算结果列,类型必须为数字,这里选择request_count, request_size, response_size以及response_time，分别表示请求次数，请求大小，响应大小以及响应延迟.这里需要注意的是,如果结果中某行数据的指标列无效（无法转为数字）,ScheduledSQL任务会忽略该错误,并继续执行.

#### 哈希列
如果时序库中同一label的数据写入到固定的shard中,可以增强局部性,提升查询效率。因此可以选择常用的过滤标签，作为哈希列,这里哈希列选择bucket。

#### 时间列
时间列用于指定该条指标的具体时间,类型必须为数字,这里直接使用time列即可.

#### 调度配置 

设置 SQL 每 5 分钟执行一次,每次执行处理最近 5 分钟窗口的数据.
注意：
1. 设置延迟执行参数,上游 Logstore 的数据到来可能延迟,建议设置大一些的值做等待来保证计算数据的完整性.
2. SQL 运行超过指定次数或指定时间后,这一次的 SQL 实例会失败并继续下一个实例的调度.
![image-49.png](..%2F..%2F..%2F..%2Fimage-49.png)

#### 调度时间范围
选择某时间开始, 并设置起始时间,表示从该时间开始进行sql计算 ,也可以选定时间范围 , 表示对这段时间内的数据进行sql计算

#### 任务管理
在SLS控制台可以查看之前创建的ScheduledSQL作业.

![image-51.png](..%2F..%2F..%2F..%2Fimage-51.png)
在作业管理页面内，可以查看到每一次执行的实例列表. 

![image-62.png](..%2F..%2F..%2F..%2Fimage-62.png)
每个实例信息中有 SQL 查询区间,如果任务失败（权限、SQL 语法等原因）或 SQL 处理行数指标为 0（数据迟到或确实没有数据）,可以对指定实例做重试运行

#### 效果

##### 不同bucket的请求次数
```promql 
sum(request_size) by (bucket)
``` 
![image-57.png](..%2F..%2F..%2F..%2Fimage-57.png)


##### 不同bucket的平均请求延迟
```promql 
avg(response_time * request_count) by (bucket)
``` 
![image-58.png](..%2F..%2F..%2F..%2Fimage-58.png)


