## Overview
1. SPL is short for Simple Log Service Processing Language. For more information, see [SPL overview](https://help.aliyun.com/zh/sls/user-guide/spl-overview)
2. If you use SPL in a search scenario, it works in scan mode. For more information, see [Scan-based query overview](https://help.aliyun.com/zh/sls/user-guide/scan-based-query-overview)
3. SPL is supported only in specific regions. For more information, see [Supported regions](https://help.aliyun.com/zh/sls/user-guide/spl-supported-regions)


- SPL syntax
```sql
{Index Search Query} | {SPL Expression} | {SPL Expression} | ...
```
The SPL syntax supports multi-level statements. The first-level statement specifies the index filtering condition, and the subsequent statements are SPL instructions.

- How it works

Simple Log Service reads raw data based on the specified index filtering condition, uses SPL statements to perform operations such as structured data extraction, field manipulation, and data filtering, and then returns the data that is processed by SPL. In this process, statement cascading is supported.

## **Log Sample**

- Raw fields: the fields **marked with [R]**, which are suitable for scan-based query.
- Index fields: the fields **marked with [I]**, which are suitable for index-based query.
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

## **Filter logs based on different conditions**

- Equality comparison
```sql
Status: 200 | where ClientIp = '192.168.1.1'
```

- Case-insensitive search
```sql
__topic__: nginx-access-log | where lower(Method) != 'put'
```

- Fuzzy match
```sql
Status: 200 | where UserAgent like '%Macintosh%'
```

- Numeric value comparison

If you want to compare the values of a field of the VARCHAR type with a numeric value, you must convert the values to the BIGINT type first.
```sql
Status: 200 |  where cast(RT as bigint) > 50
```

- Regular expression match
```sql
# Query logs in which the value of the Uri field contains a string in the following format: path-Digits
Status: 200 | where regexp_like(Uri, 'path-\d+')
```
## **Calculate new fields**
You can use the extend instruction to calculate a new field based on the queried field information.

- Use a regular expression to extract a field
```sql
# Extract the file ID from the Uri field
* not Status: 200 | extend fileNumber=regexp_extract(Uri, 'file-(\d+)', 1)
```

- Use a JSON expression to extract a field
```sql
Status:200 | extend Item = json_extract_scalar(Payload, '$.Item')
```

- Extract by delimiter
```sql
Status:200 | extend urlParam=split_part(Uri, '/', 3)
```

- Calculate a new field based on multiple field values
```sql
#Calculate the time difference based on the values of the BeginTime and EndTime fields
Status:200 | extend timeRange = cast(BeginTime as bigint) - cast(EndTime as bigint)
```
## Retain, remove, or rename fields

- Retain some of the fields and remove the other fields
```sql
Status:200 | project Status, Uri
```

- Remove some of the fields and retain the other fields
```sql
Status:200 | project-away UserAgent
```

- Rename a field
```sql
Status:200 | project-rename Latency=RT
```
## **Expand unstructured data**

- Expand all JSON fields
```sql
#Filter out logs in which the value of the Payload field is not null and expand all JSON fields
__topic__: nginx-access-log | where Payload is not null | parse-json Payload
```

- Use a regular expression to extract multiple fields
```sql
Status:200 | parse-regexp Uri, 'path-(\d+)/file-(\d+)' as pathIndex, fileIndex
```
## Cascade multi-level statements
All the preceding operations can be cascaded in a single search statement. The operations are performed in the specified sequence.
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

1. The constant string in an SPL statement must be **enclosed in single quotation marks (')**. Example: `* | where ClientIp = '192.168.1.1'`
2. If a field name contains special characters, **enclose the field name in double quotation marks (")**. Example: `* | project-away "user-agent"`
