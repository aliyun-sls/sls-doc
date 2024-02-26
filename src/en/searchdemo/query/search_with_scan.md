## Scan 介绍
1. 功能说明、算子文档请参考[官方文档](https://help.aliyun.com/document_detail/457238.html)。
## 日志样例
* 原始字段：**标识 `[R]`**，适用于 Scan 搜索。
* 索引字段：**标识 `[I]`**，适用于索引搜索，可大大加速 Scan 搜索。
```
[I] __source__: 100.128.79.234
[I] __topic__: nginx
[I] __tag__:__hostname__: izl78aa539zgl03xxge184
[R] __tag__:__path__: /data/app/access.LOG
[R] APIVersion: 0.6.0
[R] ErrorCode: WriteQuotaExceed
[R] ErrorMsg: {"reason":"Project write quota exceed", "message":"qps: 474"}
[R] InFlow: 8835
[R] Latency: 73
[R] LogStore: logstore_12345
[R] Method: PostLogStoreLogs
[R] NetFlow: 1533
[R] OutFlow: 86
[I] ProjectName: project_12345
[R] RequestId: 63896AED37D252561C6F9739
[R] Shard: 0
[I] Status: 403
[R] UserAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
[R] microtime: 2022-12-02 11:03:09.074454
```

Scan 语法：`{Index Search Query} | {Scan Query}`。

## 精确查询

* 搜索普通字段
```sql
ProjectName: project_12345 | where ErrorCode = 'WriteQuotaExceed'
```
```sql
Status : 403 | where RequestId = '63896AED37D252561C6F9739'
```

* 搜索 Tag 字段
```sql
__topic__: nginx | where "__tag__:__path__" = '/data/app/access.LOG'
```

* 大小写不敏感搜索
```sql
__topic__: nginx | where lower(ErrorCode) != 'writequotaexceed'
```

* 全文（任意字段）搜索
```sql
__topic__: nginx | where __line__ like '%WriteQuotaExceed%'
```

## 模糊查询

* 前缀查询
```sql
ProjectName: project_12345 | where Method like 'P%'
```

* 后缀查询
```sql
ProjectName: project_12345 | where ErrorCode like '%Exceed'
```

* like 匹配
```sql
ProjectName: project_12345 | where UserAgent like '%Chrome%Safari%'
```

* 正则匹配
```sql
# logstore_开头，以数字结尾
ProjectName: project_12345 | where regexp_like(LogStore, 'logstore_\d+')
```

## 比较查询

* 字母序比较
```sql
Status:403 | where APIVersion < '0.6.0'
```
```sql
Status:403 | where APIVersion > '0.6.0'
```

* 数值序比较
```sql
Method:GetLogStoreLogs | where cast(Latency as bigint) > 5000
```
```sql
Method:GetLogStoreLogs | where cast(Latency as bigint) < 500
```
## 布尔组合查询

* 查找 4xx 状态码日志
```sql
__topic__: nginx | where Status >= '400' and Status <= '499'
```

* 查找写入方法返回 4xx 状态码的日志
```sql
__topic__: nginx and __tag__:__path__: "/data/app/access.LOG" | where Status >= '400' and Status <= '499' and (Method = "PostLogStoreLogs" or Method = "WebTracking")
```
## 字段是否存在

* 查找不包含 ErrorMsg 字段的日志
```sql
__topic__: nginx | where ErrorMsg is null
```

* 查找包含 ErrorMsg 字段的日志
```sql
__topic__: nginx | where ErrorMsg is not null
```

## 提取子串后查询

* 正则提取子串
```sql
# 查找 Mozilla 版本号是 5.0 的日志
__topic__: nginx | where regexp_extract(UserAgent, 'Mozilla/([\d.]+)\s.+', 1) = '5.0'
```

* json 提取子串
```sql
# 查找 ErrorMsg 内第一层 json 字段 reason 为指定字符串
__topic__: nginx | where json_extract_scalar(ErrorMsg, '$.reason') = 'Project write quota exceed'
```

## FAQ
1. 请注意，where 表达式中右值的**字符串使用单引号（'）包裹**，而不是双引号（"）。
