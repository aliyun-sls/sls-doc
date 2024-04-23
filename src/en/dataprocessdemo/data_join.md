# Log enrichment practices

## Data transformation overview

Data transformation is a feature of Simple Log Service provided by Alibaba Cloud. The data transformation feature is used to perform extract-transform-load (ETL) processing on structured or unstructured logs in real time.The feature supports more than 200 operators. This topic describes how to use enrichment functions to enrich log data during data transformation.

PS： The enrichment in this topic refers to join operations in SQL ETL scenarios.

![](/img/dataprocessdemo/数据富化/数据富化整体概念.png)

Data transformation portal:

Log on to the Simple Log Service console. Select the desired Logstore. On the page that appears, click Data Transformation. On the data transformation page, enter a data transformation statement.

![](/img/dataprocessdemo/begin-data-process.jpg)

Overview of data transformation functions: http://help.aliyun.com/document_detail/159702.html

## Scenario

This topic describes how to enrich HTTP status codes in NGINX logs. This helps you learn about methods of log enrichment during data transformation.

HTTP response status codes are common in access logs. After HTTP response status codes are enriched, you can explicitly view the status of each request for more statistical operations.

![](/img/dataprocessdemo/数据富化/Raw log entries.png)

The following table is a mapping table of common HTTP status codes.

![](/img/dataprocessdemo/数据富化/httpcode对照表.png)

## Use the data transformation feature to enrich log data

### Method 1 - Use the res_local advanced parameter to enrich log data

Assume that the data that you want to enrich is saved to a CSV file with mappings of HTTP status codes included.

```
code,alias,category,description
100,1xx,Informational,Continue
101,1xx,Informational,Switching Protocols
...
```

Save the mappings of HTTP status codes as an advanced parameter for data transformation. The key parameter is set to http_code, and the corresponding parameter value is included in the CSV file. The following sample code provides a data transformation statement:

```python
e_table_map(
	tab_parse_csv(
		"code,alias,category,description\n100,1xx,Informational,Continue\n101,1xx,Informational,Switching Protocols\n102,1xx,Informational,Processing (WebDAV)\n200,2xx,Success,OK\n201,2xx,Success,Created\n202,2xx,Success,Accepted\n203,2xx,Success,Non-Authoritative Information\n204,2xx,Success,No Content\n205,2xx,Success,Reset Content\n206,2xx,Success,Partial Content\n207,2xx,Success,Multi-Status (WebDAV)\n208,2xx,Success,Already Reported (WebDAV)\n226,2xx,Success,IM Used\n300,3xx,Redirection,Multiple Choices\n301,3xx,Redirection,Moved Permanently\n302,3xx,Redirection,Found\n303,3xx,Redirection,See Other\n304,3xx,Redirection,Not Modified\n305,3xx,Redirection,Use Proxy\n306,3xx,Redirection,(Unused)\n307,3xx,Redirection,Temporary Redirect\n308,3xx,Redirection,Permanent Redirect (experimental)\n400,4xx,Client Error,Bad Request\n401,4xx,Client Error,Unauthorized\n402,4xx,Client Error,Payment Required\n403,4xx,Client Error,Forbidden\n404,4xx,Client Error,Not Found\n405,4xx,Client Error,Method Not Allowed\n406,4xx,Client Error,Not Acceptable\n407,4xx,Client Error,Proxy Authentication Required\n408,4xx,Client Error,Request Timeout\n409,4xx,Client Error,Conflict\n410,4xx,Client Error,Gone\n411,4xx,Client Error,Length Required\n412,4xx,Client Error,Precondition Failed\n413,4xx,Client Error,Request Entity Too Large\n414,4xx,Client Error,Request-URI Too Long\n415,4xx,Client Error,Unsupported Media Type\n416,4xx,Client Error,Requested Range Not Satisfiable\n417,4xx,Client Error,Expectation Failed\n418,4xx,Client Error,I'm a teapot (RFC 2324)\n420,4xx,Client Error,Enhance Your Calm (Twitter)\n422,4xx,Client Error,Unprocessable Entity (WebDAV)\n423,4xx,Client Error,Locked (WebDAV)\n424,4xx,Client Error,Failed Dependency (WebDAV)\n425,4xx,Client Error,Reserved for WebDAV\n426,4xx,Client Error,Upgrade Required\n428,4xx,Client Error,Precondition Required\n429,4xx,Client Error,Too Many Requests\n431,4xx,Client Error,Request Header Fields Too Large\n444,4xx,Client Error,No Response (Nginx)\n449,4xx,Client Error,Retry With (Microsoft)\n450,4xx,Client Error,Blocked by Windows Parental Controls (Microsoft)\n451,4xx,Client Error,Unavailable For Legal Reasons\n499,4xx,Client Error,Client Closed Request (Nginx)\n500,5xx,Server Error,Internal Server Error\n501,5xx,Server Error,Not Implemented\n502,5xx,Server Error,Bad Gateway\n503,5xx,Server Error,Service Unavailable\n504,5xx,Server Error,Gateway Timeout\n505,5xx,Server Error,HTTP Version Not Supported\n506,5xx,Server Error,Variant Also Negotiates (Experimental)\n507,5xx,Server Error,Insufficient Storage (WebDAV)\n508,5xx,Server Error,Loop Detected (WebDAV)\n509,5xx,Server Error,Bandwidth Limit Exceeded (Apache)\n510,5xx,Server Error,Not Extended\n511,5xx,Server Error,Network Authentication Required\n598,5xx,Server Error,Network read timeout error\n599,5xx,Server Error,Network connect timeout error\n"
	),
	[("http_code","code")],
	[("alias","http_code_alias"),
	("description","http_code_desc"),
	("category","http_code_category")]
)
```

Transformation result:

![](/img/dataprocessdemo/数据富化/httpcode富化效果.png)

### Method 2 - Enrich data based on an Object Storage Service (OSS) object

Assume that the mappings of HTTP status codes are saved to an object.The following code provides an example on the valid format:

```
code,alias,category,description
100,1xx,Informational,Continue
101,1xx,Informational,Switching Protocols
...
```

Upload the object named http_code.csv to an OSS bucket.

Log on to the OSS console. http://oss.console.aliyun.com

Find the desired OSS bucket or create an OSS bucket, and upload the object to the OSS bucket as prompted.

![](/img/dataprocessdemo/数据富化/上传oss.png)

Use the data transformation feature to enrich log data. The following sample code provides a data transformation statement:

```python
e_table_map(
    tab_parse_csv(
		res_oss_file(
			endpoint="oss-cn-shanghai-internal.aliyuncs.com",
			ak_id=res_local("AK_ID"),
			ak_key=res_local("AK_KEY"),
			bucket="ali-sls-etl-test",
			file="http_code.csv",
			format='text')
		),
		[("http_code","code")],
		[
			("alias","http_code_alias"),
			("description","http_code_desc"),
			("category","http_code_category")
		]
	)
```

res_local The referenced value needs to be defined in the advanced parameters.

![](/img/dataprocessdemo/数据富化/高级参数设置.jpg)

Transformation result:

![](/img/dataprocessdemo/数据富化/Transformation result2.png)

### Method 3 - Enrich data based on a MySQL table

Assume that the mappings of HTTP status codes are saved to an object.

![](/img/dataprocessdemo/数据富化/http2sql.png)

Use the data transformation feature to enrich log data. The following sample code provides a data transformation statement:

```python
e_table_map(
	res_rds_mysql(
		address="MySQL host address",
		username="Username",
		password="password ",
        database="database",
		table="table name",
		refresh_interval=300
	),
	[("http_code","code")],
	[("alias","http_code_alias"),
	("description","http_code_desc"),
	("category","http_code_category")]
)
```

You can obtain data from an ApsaraDB RDS for MySQL database over the internal network. For more information about VPC configurations, see the documentation at[https://help.aliyun.com/document_detail/162753.html](https://help.aliyun.com/document_detail/162753.html?spm=a2c4g.11186623.6.987.3e7249dbOZbV6w)

Transformation result:

![](/img/dataprocessdemo/数据富化/Transformation result3.png)

### Method 4 - Enrich data based on a Logstore

Assume that the mappings of HTTP status codes are saved to a Logstore.

![](/img/dataprocessdemo/数据富化/Raw log entries1.png)
Use the data transformation feature to enrich log data. The following sample code provides a data transformation statement:

```python
e_table_map(
	res_log_logstore_pull(
		"cn-shanghai-intranet.log.aliyuncs.com",
        res_local("AK_ID"),
		res_local("AK_KEY"),
		"live-demo",
		"http_code",
        ["code","alias","description","category"]
	),
	[("http_code","code")],
	[("alias","http_code_alias"),
	("description","http_code_desc"),
	("category","http_code_category")]
)
```

res_local The referenced value needs to be defined in the advanced parameters.

![](/img/dataprocessdemo/数据富化/高级参数设置.jpg)

## Summary

### Overall process

![](/img/dataprocessdemo/数据富化/整体流程.png)

### Comparison of the methods

| methods       | Supported data volume | Incremental update | Batch update  | Scenario                                    |
| ------------- | --------------------- | ------------------ | ------------- | ------------------------------------------- |
| Embedded code | small                 | Not supported      | Not supported | The mapping table contains simple mappings. |
| OSS           | more                  | Not supported      | supported     | The mapping table is infrequently updated.  |
| MySQL         | more                  | Not supported      | supported     | The mapping table is frequently updated.    |

Limit: The maximum size of each dimension table is 2 GB.
