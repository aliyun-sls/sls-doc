# 日志数据转日志数据

## 背景

对象存储 OSS 是阿里云提供的云存储服务，能够以低成本为用户提供高可靠性的海量数据存储服务。作为基础服务，用户需要时刻关注 OSS 的使用状况，检测异常状态，从而及时作出响应。
阿里云日志服务（SLS）是云原生观测分析平台，为 Log/Metric/Trace 等数据提供大规模、低成本、实时平台化服务。一站式提供数据采集、加工、分析、告警可视化与投递功能，全面提升研发、运维、运营和安全等场景数字化能力。

<!-- ![image.png](/img/src/scheduledsql/log2log/f1b70ca0011ce708a66ade857b4c1d3d5635f935996d2cf7cd0f96bfe1c0599d.png) -->

用户在访问对象存储 OSS 的过程中，会产生大量的访问日志。SLS 允许一键接入 OSS 访问日志，方便用户完成操作审计、访问统计、异常事件回溯和问题定位等工作。

以 bucket、method 分组计算小时级流量特征为例：

```
* | select (__time__ - __time__ % 3600) as dt, bucket, http_method, sum(request_length)/1024.0/1024.0 as request_MB, sum(response_body_length)/1024.0/1024.0 as response_MB, avg(response_time) as avg_latency group by dt, bucket, http_method order by dt asc limit 10000
```

随着查询时间范围增加，计算引擎需要扫描更多的数据量做计算，增加了资源开销与分析延时。

| 数据查询范围 | 扫描日志条数   | 计算耗时 |
| ------------ | -------------- | -------- |
| 24 hours     | 5,153,426      | 1,767ms  |
| 30 days      | 35,754,384     | 4,636ms  |

## 问题与解决方法

问题一 : 随着 oss 访问日志存储在 sls 中时间越来越长,访问日志逐渐从温数据编程冷数据,这带来一笔不小的存储开销 . 以 1000 QPS 的请求量计算，每条日志 1500 Bytes，一个月累计后达到 3.8 TB .
问题二 : 随着时间推移,如果每次对全量数据进行及时分析,计算成本是巨大的 ,计算延时对增加也影响体验 .
为了达到降低存储成本, 加快数据分析的体验可以通过将数据聚合后存储到新的日志库,减少日志总量 . 因为对于历史数据而言, 聚合分析后的数据量更少,而且有更高的分析价值 .

## 目标

现在以 **计算每分钟(时间按分钟做取整处理) OSS 响应数据量(response_size)** 为例 演示定时 sql 功能 ,完成数据从日志数据转化为日志数据.
通过聚合 sql 运算,将原来的日志数据转化为新的日志数据, 新日志数据占用存储更少 , 更加突出关心的信息

### 原始日志

[源日志库 oss_source](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/logsearch/oss_source)

<!-- ![image.png](/img/src/scheduledsql/log2log/b8845881b27e8d7e37088c0ee2332482fa8b19917a60275905398017bbc68624.png) -->

聚合操作前的日志字段较多 , 时间更加分散 , 日志总量也更多

### 目标日志

聚合 sql 操作后的 [目标日志库 log2log](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/logsearch/log2log)

<!-- ![image.png](/img/src/scheduledsql/log2log/150032d15bb53c7eb22f2293850fe2551d7a7fd1d3b0c13b4ec61e3263ceeee9.png) -->

聚合处理后的数据更好地展示了 response_size 并且按分钟取整 , 减少了数据量

### SQL

计算每分钟(时间按分钟做取整处理) OSS 响应数据量(response_size)

```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as __time__ , sum(content_length_out) as response_size from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, __time__
```

## 计算配置

[定时 SQL 任务链接](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690513925-248017)
点击修改配置进入配置页面

<!-- ![image.png](/img/src/scheduledsql/log2log/e9a6533d91862de264157b9550f60857feef2ac81b8b115f5f40f179b0e9aa41.png) -->

![image-47.png](/img/src/scheduledsql/log2log/84ab887c63b788bcbd1ea91a3bd9c1c0b5befa546892fce4d5c75c40c7876bdb.png)

<!-- ![image.png](/img/src/scheduledsql/log2log/89ad62a7d547be4b591a4537ef189b59adbdecaf42efdb6ca15e48f603594fcc.png) -->

写入模式 : 当源为日志库时，可以选择日志库导入日志库以及日志库导入时序库 , 这里选择日志库 .
SQL 代码 : 计算每分钟(时间按分钟做取整处理) OSS 响应数据量(response_size)

```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as __time__ , sum(content_length_out) as response_size from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, __time__
```

| 配置项              | 描述                                 |
| ------------------- | ------------------------------------ |
| 源 Project/Logstore | 日志数据源头，也是 SQL 代码的数据源  |
| 目标 Region         | 目标所在的区域                       |
| 目标 Project        | 目标所在的项目名称                   |
| 目标库 Logstore     | 目标库的名称                         |
| 写目标授权          | 具备写目标 Logstore 权限的角色的 ARN |
| 执行 SQL 授权       | 具备执行 SQL 权限的角色的 ARN        |

详情请参考 [授权文档](https://help.aliyun.com/zh/sls/user-guide/access-data-by-using-a-custom-role#title-a8m-xdm-yrw)

点击下一步进入调度配置

## 调度配置

![image.png](/img/src/scheduledsql/metric2metric/d6d973c2dfdf672f8909a56888a55e11d13e7767de511029e0fa50a111ae436b.png)

| 配置项       | 描述                                                    |
| ------------ | ------------------------------------------------------- |
| 调度间隔     | 固定间隔 1 分钟执行一次 SQL                             |
| 调度时间范围 | 从指定时间开始的数据会被执行 SQL                        |
| SQL 时间窗口 | 整点一分钟，表示只分析这一分钟内的数据 ([@m-1m ](/m-1m) |
| ~ @m)        |
| SQL 超时     | 最长时间 600 秒或最大次数 20 次                         |

注意：

1. 设置延迟执行参数，上游 Logstore 的数据到来可能延迟，建议设置大一些的值做等待来保证计算数据的完整性。
2. SQL 运行超过指定次数或指定时间后，这一次的 SQL 实例会失败并继续下一个实例的调度

更多关于创建定时 SQL 任务时计算配置和调度配置的信息, 请参考[官方文档](https://help.aliyun.com/zh/sls/user-guide/process-and-save-data-from-a-logstore-to-another-logstore?spm=a2c4g.11186623.0.0.2c263cb3fUoe0I)

## 使用 sdk 创建定时 SQL 任务

如果您需要使用 SDK 创建定时 SQL 任务，可以参考官方文档：
[java sdk 创建定时 SQL 任务](https://help.aliyun.com/zh/sls/developer-reference/use-log-service-sdk-for-java-to-create-a-scheduled-sql-task?spm=a2c4g.11186623.0.0.23883cb3qpNgsY#task-2218965)

## 任务管理

[任务管理界面 ](https://sls.aliyun.com/doc/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/overview)
在 SLS 控制台可以查看之前创建的定时 SQL 作业
![image-51.png](/img/src/scheduledsql/log2log/afe3c96717b14b387b7a857f297eae08636c2e6d0ef9c9dc206b1080ea82ba8f.png)
在作业管理页面内，可以查看到每一次执行的实例列表。
![image.png](/img/src/scheduledsql/log2metric/45e8772850df4f41c832afbd9f5d919380fd1862cf89758fe44bc7164aa11249.png)
每个实例信息中有 SQL 查询区间，如果任务失败（权限、SQL 语法等原因）或 SQL 处理行数指标为 0（数据迟到或确实没有数据），可以对指定实例做重试运行。

## 效果

### 日志量比较

<!-- ![image.png](/img/src/scheduledsql/log2log/d03f7f36c287c4cec6bea0ed943d6f19fe4f2c3daa9ead57bfde46023246ad53.png)
![image.png](/img/src/scheduledsql/log2log/0d76e78dabfb7c1511642261456eb29a3c468c724cc5633145b5ac4114a1a88c.png) -->

源日志库一小时日志量为 18241 条, 17.27MB

<!-- ![image.png](/img/src/scheduledsql/log2log/1487168ab72bf4bb31934cc2316bb3b66111c4c2342291a03e7db70a68a1cb88.png)
![image.png](/img/src/scheduledsql/log2log/d3c80b92bf29c5c983aca0b20cde3c6494535de13d46c6a374838dd07c415183.png) -->

目标日志库一小时日志量为 5752 条 , 1.62MB

### 查询某个 bucket 下的 response_size 随时间的变化情况

```sql

* | select bucket,bucket_location ,bucket_storage_type ,http_method ,response_size,DATE_FORMAT(FROM_UNIXTIME(__time__), '%Y-%m-%d %H:%i:%s') AS datetime where bucket ='bucket6877'and bucket_storage_type = 'archive' order by datetime
```

定时 sql 任务的目标库 log2log 中查询最近 15 分钟内 , bucket 为 bucket6877 , bucket_storage_type 为 archive 的数据 , 并按照时间排序 , 并用统计图表展示 response_size 随时间的变化情况

![image-56.png](/img/src/scheduledsql/log2log/057a6ec94e89b85504381a670c1c8d16b4af16a4c0a04c5ecc32b5dac7284018.png)
