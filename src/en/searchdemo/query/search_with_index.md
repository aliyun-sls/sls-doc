## Overview

Simple Log Service allows you to search billions to hundreds of billions of logs in seconds. You can use SQL statements to perform statistical analysis on search results. You can also scan specific fields in search results.
|Statement|Description|Characteristic|Example|
|----|----|----|----|
|Search statement|A search statement specifies one or more filter conditions to query logs and returns the logs that meet the specified conditions.|A search statement can be separately executed and requires indexes.| Status: 400|
|Analytic statement|An analytic statement is used to calculate or collect statistics on search results. An analytic statement is written in SQL syntax. A search statement and an analytic statement are separated with a vertical bar (\|) in the following format: Search statement \| Analytic statement.|An analytic statement must be executed together with a search statement and requires indexes.|_|_ \| SELECT status, count(_) AS PV GROUP BY status|
|Scan statement|A scan statement is used to scan search results. A scan statement is written in SCAN syntax of Simple Log Service. A search statement and a scan statement are separated with a vertical bar (\|) in the following format: Search statement \| WHERE bool_expression.|A scan statement must be executed together with a search statement and does not require indexes.| _ \| status:200 \| WHERE userId = '123'|

> For more information about **search statements**, see [Log search overview in Simple Log Service documentation](https://www.alibabacloud.com/help/en/doc-detail/43772.html)

> For more information about **indexes**, see [Create indexes in Simple Log Service documentation](https://www.alibabacloud.com/help/en/doc-detail/90732.html)

> This topic describes how to use **search statements**. For more information about how to use **analytic and scan statements**, see the related cases.

## Log example

In this example, mocking NGINX access logs are used. The following table describes the key fields in the logs.
|Field Name|Type|Sample|
|--|--|--|
|body_bytes_sent|long|3000|
|host| text(not segmented)|www.mg.mock.com|
|http_referer|text(not segmented)|www.hpw.mock.com|
|http_user_agent|text|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11|
|http_x_forwarded_for|text(not segmented)|127.0.0.1|
|remote_addr|text(not segmented)|127.0.0.1|
|remote_user|text|50i0(random string)|
|request_length|long|2000|
|request_method|text|POST|
|request_time|long|30|
|request_url|text|/request/path-1/file-4|
|status|long|200|
|time_local|text|22/Dec/2022:09:26:43|
|upstream_response_time|double|0.5|

Note: The fields except those marked with "not segmented" use the following default delimiters: **, '";=()[]{}?@&<>/:\n\t\r**

## Regular search

- Query logs that contain the status code 404 [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=c3RhdHVzOiA0MDQ=&queryTimeType=6windo&extendsParams=true){target="_blank"}

```sql
status: 404
```

- Query logs in which the value of the upstream_response_time field is greater than 0.5 milliseconds [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=dXBzdHJlYW1fcmVzcG9uc2VfdGltZSA+IDAuNQ==&queryTimeType=6windo&extendsParams=true){target="_blank"}

```sql
upstream_response_time > 0.5
```

- Query logs in which the value of the request_time field is greater than 50 milliseconds and less than 100 milliseconds [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=cmVxdWVzdF90aW1lIGluIFs1MCAxMDBd&queryTimeType=6windo&extendsParams=true){target="_blank"}

```sql
request_time in [50 100]
```

- Query logs with a specific value of host [Try in the Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=aG9zdDogd3d3Lm9sLm1vY2suY29t&queryTimeType=6windo&extendsParams=true){target="_blank"}

```sql
host: www.ol.mock.com
```

## Fuzzy search

- Query logs in which the value of the remote_user field is a string that starts with a [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=cmVtb3RlX3VzZXI6IGEq&queryTimeType=6windo&extendsParams=true){target="_blank"}{target="_blank"}

```sql
remote_user: a*
```

- Query logs in which the value of the http_user_agent field contains a string that starts with mo and ends with la [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=aHR0cF91c2VyX2FnZW50OiBtbypsYQ==&queryTimeType=6windo&extendsParams=true){target="_blank"}

```sql
http_user_agent: mo*la
```

- Query logs in which the value of the http_user_agent field contains a string that starts with mozi, ends with la, and includes one character between mozi and la [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=aHR0cF91c2VyX2FnZW50OiBtb3ppP2xh&queryTimeType=6windo&extendsParams=true){target="_blank"}

```sql
http_user_agent: mozi?la
```

> You can also use **mozilla**, **mo\*la**, or **mozi?la** to directly query logs without specifying a field.

## Phrase search

If you search for logs that were generated on December 22 by using the following search statement, irrelevant logs such as a log in which the value of the time_local field is **17/Dec/2022:06:22:23** are returned. This is because Simple Log Service segments the original query into **22** and **Dec**. Any logs in which the value of the time_local field contains both 22 and Dec, regardless whether they are separated with a forward slash (/), are returned. Moreover, if you directly query data without specifying a field, more irrelevant logs are returned.To prevent this issue, you can prefix the keyword in a search statement with a number sign (**#**).

```
time_local: 22/Dec
```

Original search statement:

- Query all logs with a local time of December 22nd [Try in Playground](../../playground/logsearch.md?url=https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/&redirect=true&type=11&encode=base64&queryString=dGltZV9sb2NhbDogIyIyMi9EZWMi&queryTimeType=6windo&extendsParams=true){target="_blank"}

```
time_local: #"22/Dec"
```

> For more information about **phrase search statements**, see [Phrase search in Simple Log Service documentation](https://www.alibabacloud.com/help/en/doc-detail/416724.html)

## FAQ

1. Fuzzy search does not support suffix matching. If search statements cannot meet your requirements, you can use analytic and scan statements.
2. Simple Log Service implements phrase search by performing a word segmentation-based query and then filtering the logs that match the phrase search condition from the query results. Therefore, the **NOT** operator is not supported in phrase search statements, and phrase search statements cannot be used together with **analytic statements**.
