# Use the e_table_map function to enrich HTTP response status codes

NGINX logs record important information that can be used for website O&M. Simple Log Service provides the e_table_map function that you can use to enrich HTTP response status codes for NGINX log analysis.

### Transformation process

![Transformation process1](/img/dataprocessdemo/数据富化/加工流程1.png)

1. Convert HTTP response status codes to table objects.
2. Use the e_table_map function to transform and enrich data.

### Recommended solutions

The following table describes the solutions that you can use to enrich data.
| solutions| Supported data volume |Incremental update |Batch update | Scenario |
| -------| --------- |--------- |--------- |--------- |
| [(Recommended) Enrich data based on a Logstore](https://www.alibabacloud.com/help/en/doc-detail/299996.html#section-os8-4jd-yw6) | large number | Support |Support |A mapping table with large amounts of data and frequent update |
| [Enrich data based on a MySQL table](https://www.alibabacloud.com/help/en/doc-detail/299996.html#section-p5k-79r-f93) |large number |not Support| Support | The mapping table is frequently updated. |
| [Enrich data based on an Object Storage Service (OSS) object](https://www.alibabacloud.com/help/en/doc-detail/299996.html#section-tjl-x9k-bk7) | large number |not Supports |Supports | The mapping table is infrequently updated. |
| [Enrich data based on embedded code](https://www.alibabacloud.com/help/en/doc-detail/299996.html#section-aqj-zb3-s8i) | small | not Support | not Support | The mapping table contains typical HTTP response status codes. |

### Solution 1：(Recommended) Enrich data based on a Logstore

1. Use an SDK to write HTTP response status codes to a Logstore named http_code.
   The following example shows a log that contains an HTTP response status code in the http_code Logstore:
   ```
   __source__:203.0.103.10
   __tag__:__receive_time__:1595424194
   __topic__:
   code:200
   alias:2xx
   description:OK
   category:Success
   ```
   For more information, see[SDK](https://www.alibabacloud.com/help/en/doc-detail/29063.htm?spm=a2c4g.11186623.0.0.31272f7aJIawy8#reference-n3h-2sq-zdb)。
2. Obtain the name and endpoint of the http_code Logstore and the required AccessKey pair. The obtained information is used to write a data transformation statement.
   For more information about Simple Log Service endpoints and AccessKey pairs, see [Endpoints](https://www.alibabacloud.com/help/en/doc-detail/29008.htm?spm=a2c4g.11186623.0.0.31273007p9ITXQ#reference-wgx-pwq-zdb) and [AccessKey pair](https://www.alibabacloud.com/help/en/doc-detail/29009.htm?spm=a2c4g.11186623.0.0.3127229fi02lhe#reference-rh5-tfy-zdb).
3. Go to the data transformation page of the nginx-demo Logstore that stores raw logs.
   For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217).
4. In the code editor, enter the following data transformation statement.
   Read data from the http_code Logstore and use the e_table_map function to return the values of the matched fields.
   ```python
   e_table_map(
     res_log_logstore_pull(
       "cn-hangzhou-intranet.log.aliyuncs.com",
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
   **import** To ensure data security, we recommend that you specify an AccessKey pair in the Advanced Parameter Settings field.For more information about how to configure the Advanced Parameter Settings field, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217).
   - The res_log_logstore_pull function pulls data from another Logstore when you transform data in a Logstore.For more information, see[res_log_logstore_pull](https://www.alibabacloud.com/help/en/doc-detail/129401.htm?spm=a2c4g.11186623.0.0.31275b1bqoJucc#section-b3c-kth-p0t)。
   - The e_table_map function maps the value of an input field to a row in the specified table and returns a new field.For more information, see[e_table_map](https://www.alibabacloud.com/help/en/doc-detail/125489.htm?spm=a2c4g.11186623.0.0.31273c11KZ5Xvb#section-s80-usp-myx)。
5. Click **Preview Data**.
   Nginx After the raw log is enriched, new fields that are related to the HTTP response status code are included in the log.
   ```
   body_bytes_sent:1750
   host:www.example.com
   http_code:200
   http_code_alias:2xx
   http_code_category:Success
   http_code_desc:OK
   http_referer:www.example.aliyundoc.com
   http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
   http_x_forwarded_for:203.0.103.10
   remote_addr:203.0.103.10
   remote_user:p288
   request_length:13741
   request_method:GET
   request_time:71
   request_uri:/request/path-1/file-1
   time_local:11/Aug/2021:06:52:27
   upstream_response_time:0.66
   ```
6. Create a data transformation job
   For more information, see[Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。

### Solution 2：Enrich data based on a MySQL table

1. Save HTTP response status codes to an ApsaraDB RDS for MySQL database.
   RDS MySQL The following figure shows the mapping table of HTTP response status codes that are stored in the ApsaraDB RDS for MySQL database.
   ![ApsaraDB RDS for MySQL mapping table](/img/dataprocessdemo/数据富化/mysql映射表.png)
2. Obtain the host address, username, password, database name, and table name of the ApsaraDB RDS for MySQL database. The obtained information is used to write a data transformation statement.
3. Go to the data transformation page of the nginx-demo Logstore that stores raw logs.
   For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217).
4. In the code editor, enter the following data transformation statement.
   Read data from the MySQL database and use the e_table_map function to return the values of the matched fields.
   ```python
   e_table_map(
     res_rds_mysql(
       address="MySQL host address",
       username="Username",
       password="password",
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
   **import** To ensure data security, we recommend that you specify an AccessKey pair in the Advanced Parameter Settings field.For more information about how to configure the Advanced Parameter Settings field, see Create a data transformation job.
   - The res_rds_mysql function pulls data from the specified table in an ApsaraDB RDS for MySQL database.
   - The e_table_map function maps the value of an input field to a row in the specified table and returns a new field.For more information, see e_table_map。
5. Click **Preview Data**.
   Nginx After the raw log is enriched, new fields that are related to the HTTP response status code are included in the log.
   ```
   body_bytes_sent:1750
   host:www.example.com
   http_code:200
   http_code_alias:2xx
   http_code_category:Success
   http_code_desc:OK
   http_referer:www.example.aliyundoc.com
   http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
   http_x_forwarded_for:203.0.103.10
   remote_addr:203.0.103.10
   remote_user:p288
   request_length:13741
   request_method:GET
   request_time:71
   request_uri:/request/path-1/file-1
   time_local:11/Aug/2021:06:52:27
   upstream_response_time:0.66
   ```
6. Create a data transformation job
   For more information, see[Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。

### Solution 3：Enrich data based on an Object Storage Service (OSS) object

1. Save HTTP response status codes to an object named http_code.csv and upload the object to
   For more information, see[Upload objects](https://www.alibabacloud.com/help/en/doc-detail/31848.html)。
2. Obtain the name and endpoint of the OSS bucket to which the http_code.csv object is uploaded and the required AccessKey pair. The obtained information is used to write a data transformation statement.
   For more information, see [Regions and endpoints](https://www.alibabacloud.com/help/en/doc-detail/31837.htm?spm=a2c4g.11186623.0.0.312748ed4WxWyr#concept-zt4-cvy-5db).
3. Go to the data transformation page of the nginx-demo Logstore that stores raw logs.
   For more information, see [Create a data transformation job].(https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
4. In the code editor, enter the following data transformation statement.
   Read data from the OSS bucket and use the e_table_map function to return the values of the matched fields.
   ```python
   e_table_map(
     tab_parse_csv(
       res_oss_file(
         endpoint="oss-cn-shanghai-internal.aliyuncs.com",
         ak_id=res_local("AK_ID"),
         ak_key=res_local("AK_KEY"),
         bucket="ali-sls-etl-test",
         file="http_code.csv",
         format='text'
       )
     ),
     [("http_code","code")],
     [("alias","http_code_alias"),
     ("description","http_code_desc"),
     ("category","http_code_category")]
   )
   ```
   **import** To ensure data security, we recommend that you specify an AccessKey pair in the Advanced Parameter Settings field.For more information about how to configure the Advanced Parameter Settings field, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217).
   - The res_oss_file function pulls data from an object in the specified OSS bucket. The data can be updated at regular intervals.For more information, see[res_oss_file](https://www.alibabacloud.com/help/en/doc-detail/129401.htm?spm=a2c4g.11186623.0.0.312760aenttgOU#section-mlb-osw-xzd).
   - The tab_parse_csv function creates a table from a CSV file.For more information, see[tab_parse_csv](https://www.alibabacloud.com/help/en/doc-detail/129400.htm?spm=a2c4g.11186623.0.0.7fe32f7a0jls5u#section-tsx-vav-cte)。
   - The e_table_map function maps the value of an input field to a row in the specified table and returns a new field.For more information, see[e_table_map](https://www.alibabacloud.com/help/en/doc-detail/125489.htm?spm=a2c4g.11186623.0.0.7fe34732cWFsCH#section-s80-usp-myx)。
5. Click **Preview Data**.
   Nginx After the raw log is enriched, new fields that are related to the HTTP response status code are included in the log.
   ```
   body_bytes_sent:1750
   host:www.example.com
   http_code:200
   http_code_alias:2xx
   http_code_category:Success
   http_code_desc:OK
   http_referer:www.example.aliyundoc.com
   http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
   http_x_forwarded_for:203.0.103.10
   remote_addr:203.0.103.10
   remote_user:p288
   request_length:13741
   request_method:GET
   request_time:71
   request_uri:/request/path-1/file-1
   time_local:11/Aug/2021:06:52:27
   upstream_response_time:0.66
   ```
6. Create a data transformation job
   For more information, see[Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。

### Solution 4：Enrich data based on embedded code

1. Prepare a mapping table of HTTP response status codes in the CSV format.
2. Go to raw log entries nginx-demo 的 Logstore，Go to the data transformation page.
   For more information, see[Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
3. In the code editor, enter the following data transformation statement.
   Use the tab_parse_csv function to create a table from the CSV file and use the e_table_map function to return the values of the matched fields.
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
   **import** To ensure data security, we recommend that you specify an AccessKey pair in the Advanced Parameter Settings field.For more information about how to configure the Advanced Parameter Settings field, see Create a data transformation job.
   - The tab_parse_csv function creates a table from a CSV file.For more information, see tab_parse_csv。
   - The e_table_map function maps the value of an input field to a row in the specified table and returns a new field.For more information, see e_table_map。
4. Click Preview data in advanced mode.
   Nginx After the raw log is enriched, new fields that are related to the HTTP response status code are included in the log.
   ```
   body_bytes_sent:1750
   host:www.example.com
   http_code:200
   http_code_alias:2xx
   http_code_category:Success
   http_code_desc:OK
   http_referer:www.example.aliyundoc.com
   http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
   http_x_forwarded_for:203.0.103.10
   remote_addr:203.0.103.10
   remote_user:p288
   request_length:13741
   request_method:GET
   request_time:71
   request_uri:/request/path-1/file-1
   time_local:11/Aug/2021:06:52:27
   upstream_response_time:0.66
   ```
5. Create a data transformation job
   For more information, see[Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
