## Scan Overview
1. For more information about the scan-based query feature and operators, see [Scan-based query overview in Simple Log Service documentation](https://help.aliyun.com/document_detail/457238.html)
## Log Sample
* Raw fields: the fields **marked with [R]**, which are suitable for scan-based query.
* Index fields: the fields **marked with [I]**, which are suitable for index-based query and can greatly accelerate scan-based query.
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

Scan syntax：`{Index Search Query} | {Scan Query}`。

## Exact search

* Search a regular field
```sql
ProjectName: project_12345 | where ErrorCode = 'WriteQuotaExceed'
```
```sql
Status : 403 | where RequestId = '63896AED37D252561C6F9739'
```

* Search the tag field
```sql
__topic__: nginx | where "__tag__:__path__" = '/data/app/access.LOG'
```

* Perform a search in which the field name is not case-sensitive
```sql
__topic__: nginx | where lower(ErrorCode) != 'writequotaexceed'
```

* Search any fields
```sql
__topic__: nginx | where __line__ like '%WriteQuotaExceed%'
```

## Fuzzy search

* Prefix search
```sql
ProjectName: project_12345 | where Method like 'P%'
```

* Suffix search
```sql
ProjectName: project_12345 | where ErrorCode like '%Exceed'
```

* like match
```sql
ProjectName: project_12345 | where UserAgent like '%Chrome%Safari%'
```

* Regular expression match
```sql
# Start with logstore_ and end with a number
ProjectName: project_12345 | where regexp_like(LogStore, 'logstore_\d+')
```

## Comparison search

* Alphabetical comparison
```sql
Status:403 | where APIVersion < '0.6.0'
```
```sql
Status:403 | where APIVersion > '0.6.0'
```

* Numerical order comparison
```sql
Method:GetLogStoreLogs | where cast(Latency as bigint) > 5000
```
```sql
Method:GetLogStoreLogs | where cast(Latency as bigint) < 500
```
## Boolean combination query

* Query logs that contain the status code 4xx
```sql
__topic__: nginx | where Status >= '400' and Status <= '499'
```

* Query logs in which the status code 4xx is returned for the Method field
```sql
__topic__: nginx and __tag__:__path__: "/data/app/access.LOG" | where Status >= '400' and Status <= '499' and (Method = "PostLogStoreLogs" or Method = "WebTracking")
```
## Whether a field exists

* Query logs that do not contain the ErrorMsg field
```sql
__topic__: nginx | where ErrorMsg is null
```

* Query logs that contain the ErrorMsg field
```sql
__topic__: nginx | where ErrorMsg is not null
```

## Query after substring extraction

* Use a regular expression function to extract substrings
```sql
# Query logs that contain Mozilla/5.0
__topic__: nginx | where regexp_extract(UserAgent, 'Mozilla/([\d.]+)\s.+', 1) = '5.0'
```

* Use a JSON function to extract substrings
```sql
# Query logs in which the reason field of the ErrorMsg field is the string to be extracted
__topic__: nginx | where json_extract_scalar(ErrorMsg, '$.reason') = 'Project write quota exceed'
```

## FAQ
1. The string in the right operand of a where expression must be **enclosed in single quotation marks (')** instead of double quotation marks (").
