## SPL简介
1. SPL是SLS Processing Language的简称，具体参考 [SPL概述](https://help.aliyun.com/zh/sls/user-guide/spl-overview)
2. 在搜索场景中使用SPL，是工作在扫描/Scan模式下，具体参考 [扫描查询概述](https://help.aliyun.com/zh/sls/user-guide/scan-based-query-overview)
3. 目前仅部分地域支持使用SPL查询日志，具体参考 [支持地域](https://help.aliyun.com/zh/sls/user-guide/spl-supported-regions)


- 语法
```sql
{Index Search Query} | {SPL Expression} | {SPL Expression} | ...
```
支持多级管道，第一级管道是索引过滤条件，后面的多级管道是SPL指令。

- 执行流程

首先按照索引条件读取出原始数据，然后通过SPL语句做结构化信息提取、字段操作、数据过滤等操作，并支持多级管道级联，最终输出经过SPL处理后的结果数据。

## **日志样例**

- 原始字段：**标识 [R]**，适用于扫描搜索。
- 索引字段：**标识 [I]**，适用于索引搜索。
```
[I] __topic__: nginx-access-log
[I] Status: 200
[I] Host: api.abc.com
[R] Method: PUT
[R] ClientIp: 192.168.1.1
[R] Payload: {"Item": "1122", "UserId": "112233", "Operation": "AddCart"}
[R] BeginTime: 1705029260
[R] EndTime: 1705028561
[R] RT: 87
[R] Uri: /request/path-3/file-1
[R] UserAgent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; ar) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4
```

## **按照不同条件进行过滤**

- 等值比较
```sql
Status: 200 | where ClientIp = '192.168.1.1'
```

- 大小写不敏感搜索
```sql
__topic__: nginx-access-log | where lower(Method) != 'put'
```

- 模糊匹配
```sql
Status: 200 | where UserAgent like '%Macintosh%'
```

- 数值比较

注意字段类型默认是varchar，进行数值比较时要先将类型转成bigint
```sql
Status: 200 |  where cast(RT as bigint) > 50
```

- 正则匹配
```sql
# 找出包含"path-数字"的Uri
Status: 200 | where regexp_like(Uri, 'path-\d+')
```
## **计算出新的字段**
通过extend指令，可以从已有的字段信息中，计算出新的字段

- 从正则提取字段
```sql
# 提取出Uri字段里的文件名编号
* not Status: 200 | extend fileNumber=regexp_extract(Uri, 'file-(\d+)', 1)
```

- 从json提取字段
```sql
Status:200 | extend Item = json_extract_scalar(Payload, '$.Item')
```

- 按照分隔符提取
```sql
Status:200 | extend urlParam=split_part(Uri, '/', 3)
```

- 根据多个字段值计算出新的字段
```sql
#根据BeginTime和EndTime计算出时间差
Status:200 | extend timeRange = cast(BeginTime as bigint) - cast(EndTime as bigint)
```
## 保留、移除、重命名字段

- 仅保留某些字段（移除所有其他字段）
```sql
Status:200 | project Status, Uri
```

- 移除某些字段（其他字段保留）
```sql
Status:200 | project-away UserAgent
```

- 重命名字段
```sql
Status:200 | project-rename Latency=RT
```
## **展开非结构化数据**

- 展开json中的所有字段
```sql
#过滤Payload非空的，并且将所有的json字段展开
__topic__: nginx-access-log | where Payload is not null | parse-json Payload
```

- 正则提取出多个字段
```sql
Status:200 | parse-regexp Uri, 'path-(\d+)/file-(\d+)' as pathIndex, fileIndex
```
## 多级管道级联
前述的所有操作，都可以在同一个查询语句中，通过多级管道级联，执行顺序是从前往后依次执行
```sql
Status:200 
| where Payload is not null 
| parse-json Payload 
| project-away Payload 
| where Host='api.qzzw.com' and cast(RT as bigint) > 80 
| extend timeRange=cast(BeginTime as bigint) - cast(EndTime as bigint)
| where timeRange > 500
| project UserId, Uri
```

## **FAQ**

1. 请注意，SPL语句中的**常量字符串使用单引号**（'）包裹，比如 `* | where ClientIp = '192.168.1.1'`
2. 如果字段名称中有特殊符号，对**字段名称使用双引号**（"）包裹。比如 `* | project-away "user-agent"`
