# Parse NGINX logs

## NginxRaw log entries

The default NGINX log is collected in simple mode of Alibaba Cloud.The following sample code shows the format of the default NGINX log.

```
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
```

The following sample code shows an NGINX log collected in simple mode of Alibaba Cloud.


## Use regular expressions to extract basic fields

```python
e_regex("Source field", "Regular expression or regular expression with named capturing groups", "Destination field name or array (optional)")
```

```python
e_regex("content",'(?<remote_addr>[0-9:\.]*) - (?<remote_user>[a-zA-Z0-9\-_]*) \[(?<local_time>[a-zA-Z0-9\/ :\-\+]*)\] "(?<request>[^"]*)" (?<status>[0-9]*) (?<body_bytes_sent>[0-9\-]*) "(?<refer>[^"]*)" "(?<http_user_agent>[^"]*)"')
```

After a regular expression is used for field extraction, fields such as refer, remote_addr, remote_user, and request are added to the log.


## Process a time field

The extracted value of the local_time field is not easy to read. If you want to parse the value of the local_time field into a value that is easy to read, you can use the following data transformation functions:

```python
e_set("filed name", "Fixed value or expression function")

dt_strptime('A value such as v ("Field name")', "Formatted string")

dt_strftime(Datetime expression, "Formatted string")
```

If you want to parse the value of the local_time field into a value that is easy to read, convert the time string of the local_time field to a datetime object by using the dt_strptime function, and then convert the datetime object to a standard datetime string by using the dt_strftime function.

```python
e_set(
	"local_time",
	dt_strftime(
		dt_strptime(
			v("local_time"),
			"%d/%b/%Y:%H:%M:%S %z"
		),
		"%Y-%m-%d %H:%M:%S"
	)
)
```

The effect is as follows:


## Analysis request uri

The request field consists of request_method, request_uri, and http_version. If you want to extract the request field to obtain request_method, request_uri, and http_version, and want to convert the request parameters in the uniform resource identifier (URI) of the request to fields for subsequent queries,you can use the following functions:

```python

e_regex("Source field name", "Regular expression or regular expression with named capturing groups", "Destination field name or array (optional)", mode="fill-auto")


url_decoding('A value such as v ("Field name")’)


e_set("filed name", "Fixed value or expression function", ..., mode="overwrite")


e_kv("Regular expression for source fields or source field list", sep="=", prefix="")
```

The following result is returned:

```python
e_regex("request", "(?<request_method>[^\s]*) (?<request_uri>[^\s]*) (?<http_version>[^\s]*)")
e_set("request_uri", url_decoding(v("request_uri")))
e_kv("request_uri", prefix="uri_")
```

The following result is returned:


## http code status code mapping

Each HTTP status code represents a different meaning. The following table describes the mappings of HTTP status codes. You can use the e_table_map function to extend the status code information to log fields for subsequent statistical analysis.


The following data transformation functions are used:

```python

e_table_map("A table obtained by the tab_parse_csv(...) function",
            "Source field list or mapping list, such as[('f1', 'f1_new'), ('f2', 'f2_new')]",
            "Destination field list")

tab_parse_csv(CSV Text data, sep=',', quote='"')

res_oss_file(endpoint="OSS endpoint", ak_id="OSS AK_ID",
             ak_key="OSS AK_KEY", bucket="OSS bucket", file="The OSS bucket to which the object is uploaded",
             change_detect_interval="The time when data is regularly updated. Default value: 0.")
```

Execute the following domain-specific language (DSL) statement:

```python

e_table_map(
	tab_parse_csv(
		res_oss_file(
			endpoint="oss-cn-shanghai.aliyuncs.com",
			ak_id='',ak_key='',
			bucket="your_oss_bucket",
			file="http_code.csv", format='text'
		)
	),
	[("status","code")],
	[("alias","http_code_alias"),
	("description","http_code_desc"),
	("category","http_code_category")]
)
```

The following result is returned:

## Use the http_user_agent field to determine the operating system of a client

You can execute a DSL statement and determine the operating system of the customer by using regular expression match of the http_user_agent field.

```python

v("field name")

ua_parse_all("Information with the user agent")

e_json("Source field name", fmt="Mode", sep="Field delimiter")

e_drop_fields("field1", "field2")
```

Execute the following DSL statement:

```python

e_set("ua",ua_parse_all(v("http_user_agent")))
e_json("ua", fmt='full',sep='_')
e_drop_fields("ua",regex=False)
```

The following result is returned:

## Deliver logs whose HTTP status codes are not 200 to the specified

You can use the e_output function to deliver logs to the specified Logstore, and use the regex_match function to match a field value.

```python

e_if("Conditional 1:e_match(...)", "operation1: e_regex(...)", "Conditional2", "operation2", ....)

op_ne(v("field 1"), v("field 2"))

e_output(name="The name of the specified Logstore.")
```

Execute the following DSL statement:

```python
e_if(
	op_ne(v("http_code_alias"),"2xx"),
	e_output(name="img/nginx-log-bad")
)
```

The following result is returned.（When you save the data transformation job, you must set the project and the AccessKey pair of the Logstore.)


## Complete DSL statement and job launch process

After the development and debugging, the following complete DSL statement is returned:

```python

e_regex("content",'(?<remote_addr>[0-9:\.]*) - (?<remote_user>[a-zA-Z0-9\-_]*) \[(?<local_time>[a-zA-Z0-9\/ :\-]*)\] "(?<request>[^"]*)" (?<status>[0-9]*) (?<body_bytes_sent>[0-9\-]*) "(?<refer>[^"]*)" "(?<http_user_agent>[^"]*)"')

e_set(
	"local_time",
	dt_strftime(
		dt_strptime(
			v("local_time"),
			"%d/%b/%Y:%H:%M:%S"
		),
		"%Y-%m-%d %H:%M:%S"
	)
)

e_regex("request", "(?<request_method>[^\s]*) (?<request_uri>[^\s]*) (?<http_version>[^\s]*)")
e_set("request_uri", url_decoding(v("request_uri")))
e_kv("request_uri", prefix="uri_")

e_table_map(
	tab_parse_csv(
		res_oss_file(
			endpoint="oss-cn-shanghai.aliyuncs.com",
			ak_id='',ak_key='',
			bucket="ali-sls-etl-test",
			file="http_code.csv", format='text'
		)
	),
	[("status","code")],
	[("alias","http_code_alias"),
	("description","http_code_desc"),
	("category","http_code_category")]
)

e_set("ua",ua_parse_all(v("http_user_agent")))
e_json("ua", fmt='full',sep='_')
e_drop_fields("ua",regex=False)

e_if(
	op_ne(v("http_code_alias"),"2xx"),
	e_coutput(name="img/nginx-log-bad")
)
```

After the statement is submitted, click Save as Transformation Job.
Configure the destination Logstores. By default, logs are sent to the first destination Logstore after the data transformation job is complete. You have specified a destination Logstore in the e_output function. Therefore, you must configure two destination Logstores. Make sure that the name of the second destination Logstore is the same as that specified in the e_output function.

After the data transformation job is saved, the job is launched. Choose Data Processing > Data Transformation to view the data transformation job. Click the data transformation job to view the information such as the transformation latency.

<img class="img-responsive" src='http://doc-stat.cn-beijing.log.aliyuncs.com/logstores/access/track_ua.gif?APIVersion=0.6.0&doc=best_practices/nginx/parse_nginx.md'/>
