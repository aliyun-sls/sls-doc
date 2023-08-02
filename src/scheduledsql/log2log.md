### log2log

#### 需求
计算每分钟 OSS 响应数据量, 并将结果导入到目标日志库 log2log

```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as __time__ , sum(content_length_out) as response_size from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, __time__
```


#### 写入模式
![image-47.png](/img/src/scheduledsql/log2log/84ab887c63b788bcbd1ea91a3bd9c1c0b5befa546892fce4d5c75c40c7876bdb.png)
当源为日志库时，可以选择日志库导入日志库以及日志库导入时序库 , 这里选择日志库

#### 调度配置
![image-55.png](/img/src/scheduledsql/log2log/8234c0c6a0b3904fb8d7b01ae097382742150b6a2cefb93571733251dab5f77d.png)

设置 SQL 每 1 分钟执行一次，每次执行处理最近 1 分钟窗口的数据。
注意：

1. 设置延迟执行参数，上游 Logstore 的数据到来可能延迟，建议设置大一些的值做等待来保证计算数据的完整性。
2. SQL 运行超过指定次数或指定时间后，这一次的 SQL 实例会失败并继续下一个实例的调度

#### 调度时间范围
选择某时间开始, 并设置起始时间,表示从该时间开始进行sql计算 ,也可以选定时间范围 , 表示对这段时间内的数据进行sql计算

#### 任务管理
在SLS控制台可以查看之前创建的ScheduledSQL作业。
![image-51.png](/img/src/scheduledsql/log2log/afe3c96717b14b387b7a857f297eae08636c2e6d0ef9c9dc206b1080ea82ba8f.png)
在作业管理页面内，可以查看到每一次执行的实例列表。
![image-50.png](/img/src/scheduledsql/log2log/c1be7d2562c42b8389d7717295ee9dadf6990b1a42dcbbc2c49f10a2ef75cb07.png)
每个实例信息中有 SQL 查询区间，如果任务失败（权限、SQL 语法等原因）或 SQL 处理行数指标为 0（数据迟到或确实没有数据），可以对指定实例做重试运行（失败告警功能开发中）。
。
#### 效果

```sql

* | select bucket,bucket_location ,bucket_storage_type ,http_method ,response_size,DATE_FORMAT(FROM_UNIXTIME(__time__), '%Y-%m-%d %H:%i:%s') AS datetime where bucket ='bucket6877'and bucket_storage_type = 'archive' order by datetime
```

定时sql任务的目标库 log2log 中查询最近15分钟内 , bucket 为 bucket6877 , bucket_storage_type 为 archive 的数据 , 并按照时间排序 , 并用统计图表展示 response_size 随时间 的变化情况

![image-56.png](/img/src/scheduledsql/log2log/057a6ec94e89b85504381a670c1c8d16b4af16a4c0a04c5ecc32b5dac7284018.png)
