# 使用e_table_map函数对HTTP请求返回码进行富化
Nginx日志是运维网站的重要信息，日志服务通过e_table_map函数快速对HTTP请求的返回码进行富化，便于您分析日志数据。本文介绍通过日志服务数据加工富化HTTP返回码的操作方法。

## 前提条件
已采集到Nginx日志数据。更多信息，请参见[数据采集](https://help.aliyun.com/document_detail/28981.htm?spm=a2c4g.11186623.0.0.312742e6YvJrcO#concept-ikm-ql5-vdb)。
## 场景描述
某企业在应用A开发过程中，统一定义了HTTP请求的返回码信息（数据量不定期更新），便于统一维护。在应用程序维护过程中，原始Nginx日志中仅http_code用于标记HTTP请求的状态，该字段无法满足人员定位问题。

针对以上需求，需要基于HTTP返回码映射表，使用e_table_map函数对日志字段进行富化，便于直观判断HTTP请求状态。

* 原始日志样例
  ```
  body_bytes_sent:1750
  host:www.example.com
  http_referer:www.example.aliyundoc.com
  http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
  http_x_forwarded_for:203.0.103.10
  remote_addr:203.0.103.10
  remote_user:p288
  request_length:13741
  request_method:GET
  request_time:71
  request_uri:/request/path-1/file-1
  http_code:200
  time_local:11/Aug/2021:06:52:27
  upstream_response_time:0.66
  ```
  该原始日志存储在名称为nginx-demo的Logstore中，**http_code**字段即为HTTP返回码。
* HTTP返回码映射表
  例如，典型的HTTP返回码映射表如下所示。
  | code | alias | category | desc|
  | -------| --------- |--------- |--------- |
  | 100 | 1xx | Informational | Continue|
  | 200 | 2xx | Success | OK|
  | 300 | 3xx | Redirection | Multiple Choices |
  | 400 | 4xx | Client Error| Bad Request|
* 富化后日志样例
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
## 可选方案
### 加工流程
![加工流程1](/img/dataprocessdemo/数据富化/加工流程1.png)
1. 将HTTP返回码转换为Table对象。
2. 使用e_table_map函数进行数据加工富化。


### 可选方案
为实现以上需求，您可以选择如下合适方案进行数据富化。
 | 方案| 数据量支持能力 |增量更新 |批量更新 | 适用场景  |
  | -------| --------- |--------- |--------- |--------- |
  | [使用Logstore实现富化（推荐）](https://help.aliyun.com/document_detail/299996.html#section-os8-4jd-yw6) | 大量 | 支持 |支持 |大数据量且频繁更新的映射表。 |
  | [通过MySQL表实现富化](https://help.aliyun.com/document_detail/299996.html#section-p5k-79r-f93) | 较大 |不支持	| 支持 | 频繁更新的映射表。 |
  | [通过使用OSS文件实现富化](https://help.aliyun.com/document_detail/299996.html#section-tjl-x9k-bk7) | 较大 |不支持	| 支持 | 相对静态的，更新不频繁的映射表。 |
  | [代码内嵌](https://help.aliyun.com/document_detail/299996.html#section-aqj-zb3-s8i) | 小 |不支持	| 不支持 | 简单HTTP返回码映射表。 |

### 方案一：使用Logstore实现富化（推荐）
1. 通过SDK方式将HTTP返回码写入名为http_co#de的Logstore。
  Logstore中HTTP返回码日志样例如下：
    ```
    __source__:203.0.103.10
    __tag__:__receive_time__:1595424194
    __topic__:
    code:200
    alias:2xx
    description:OK
    category:Success
    ```
    更多信息，请参见[SDK参考](https://help.aliyun.com/document_detail/29063.htm?spm=a2c4g.11186623.0.0.31272f7aJIawy8#reference-n3h-2sq-zdb)。
2. 获取HTTP返回码Logstore的名称、服务入口和AccessKey，用于后续编辑数据加工语句。
  日志服务的服务入口和访问密钥AccessKey。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm?spm=a2c4g.11186623.0.0.31273007p9ITXQ#reference-wgx-pwq-zdb)和[访问密钥](https://help.aliyun.com/document_detail/29009.htm?spm=a2c4g.11186623.0.0.3127229fi02lhe#reference-rh5-tfy-zdb)。
3. 登录原始日志nginx-demo的Logstore，进入数据加工页面。
  具体操作，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
4. 在编辑框中，输入数据加工语句。
  从HTTP返回码Logstore（名称为http_code）中读取数据，并通过e_table_map函数将对应字段的值返回。
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
    **注意** 为了数据安全，建议在高级参数配置中配置AccessKey。关于如何配置高级参数，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
   * 使用res_log_logstore_pull函数从另一个Logstore中拉取数据。更多信息，请参见[res_log_logstore_pull](https://help.aliyun.com/document_detail/129401.htm?spm=a2c4g.11186623.0.0.31275b1bqoJucc#section-b3c-kth-p0t)。
   * 根据输入字段的值，在表格中查找对应的行，返回对应字段的值。更多信息，请参见[e_table_map](https://help.aliyun.com/document_detail/125489.htm?spm=a2c4g.11186623.0.0.31273c11KZ5Xvb#section-s80-usp-myx)。
5. 单击**预览数据**。
  Nginx日志富化后，已新增HTTP返回码相关字段。
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
6. 创建数据加工任务。
  更多信息，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。

### 方案二：通过MySQL表实现富化
1. 将HTTP返回码存入RDS MySQL数据库。
  RDS MySQL中HTTP返回码映射表如下所示。
  ![mysql映射表](/img/dataprocessdemo/数据富化/mysql映射表.png)
2. 获取RDS MySQL数据库的主机地址、用户名、密码和数据库表等，用于后续编辑数据加工语句。
3. 登录原始日志nginx-demo的Logstore，进入数据加工页面。
  具体操作，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
4. 在编辑框中，输入数据加工语句。
  从MySQL数据库中读取数据，并通过e_table_map函数将对应字段的值返回。
    ```python
    e_table_map(
      res_rds_mysql(
        address="MySQL主机地址",
        username="用户名",
        password="密码",
        database="数据库",
        table="表名",
        refresh_interval=300
      ),
      [("http_code","code")],
      [("alias","http_code_alias"),
      ("description","http_code_desc"),
      ("category","http_code_category")]
    )
    ```
    **注意** 为了数据安全，建议在高级参数配置中配置AccessKey。关于如何配置高级参数，请参见创建数据加工任务。
    * 使用res_rds_mysql函数从RDS MySQL数据库中拉取数据库表内容。更多信息，请参见res_rds_mysql。
    * 根据输入字段的值，在表格中查找对应的行，返回对应字段的值。更多信息，请参见e_table_map。
5. 单击**预览数据**。
  Nginx日志富化后，已新增HTTP返回码相关字段。
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
6. 创建数据加工任务。
更多信息，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。

### 方案三：通过使用OSS文件实现富化
1. 将HTTP返回码保存至名为http_code.csv的文件中，上传至OSS Bucket。
更多信息，请参见[OSS上传文件](https://help.aliyun.com/document_detail/31848.html)。
2. 获取http_code.csv文件所在OSS Bucket名称、服务入口和AccessKey，用于后续编辑数据加工语句。
  对象存储OSS的服务入口。更多信息，请参见[访问域名和数据中心](https://help.aliyun.com/document_detail/31837.htm?spm=a2c4g.11186623.0.0.312748ed4WxWyr#concept-zt4-cvy-5db)。
3. 登录原始日志nginx-demo的Logstore，进入数据加工页面。
  具体操作，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
4. 在编辑框中，输入数据加工语句。
  从OSS Bucket中读取数据，并通过e_table_map函数将对应字段的值返回。
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
    **注意** 为了数据安全，建议在高级参数配置中配置AccessKey。关于如何配置高级参数，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
    * 使用res_oss_file函数从OSS Bucket中获取文件内容，并支持定期刷新。更多信息，请参见[res_oss_file](https://help.aliyun.com/document_detail/129401.htm?spm=a2c4g.11186623.0.0.312760aenttgOU#section-mlb-osw-xzd)。
    * 使用tab_parse_csv函数从CSV格式的文本构建表格。更多信息，请参见[tab_parse_csv](https://help.aliyun.com/document_detail/129400.htm?spm=a2c4g.11186623.0.0.7fe32f7a0jls5u#section-tsx-vav-cte)。
    * 根据输入字段的值，在表格中查找对应的行，返回对应字段的值。更多信息，请参见[e_table_map](https://help.aliyun.com/document_detail/125489.htm?spm=a2c4g.11186623.0.0.7fe34732cWFsCH#section-s80-usp-myx)。
5. 单击**预览数据**。
  Nginx日志富化后，已新增HTTP返回码相关字段。
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
6. 创建数据加工任务。
  更多信息，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
### 方案四：代码内嵌
1. 准备CSV格式的HTTP返回码映射表。
2. 登录原始日志nginx-demo的Logstore，进入数据加工页面。
具体操作，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。
3. 在编辑框中，输入数据加工语句。
  通过tab_parse_csv函数对CSV格式的HTTP返回码进行转换，并通过e_table_map函数将对应字段的值返回。
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
    **注意** 为了数据安全，建议在高级参数配置中配置AccessKey。关于如何配置高级参数，请参见创建数据加工任务。
    * 使用tab_parse_csv函数从CSV格式的文本构建表格。更多信息，请参见tab_parse_csv。
    * 根据输入字段的值，在表格中查找对应的行，返回对应字段的值。更多信息，请参见e_table_map。
4. 单击预览数据。
  Nginx日志富化后，已新增HTTP返回码相关字段。
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
5. 创建数据加工任务。
    更多信息，请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.0.0.31277972G58j2K#task-1181217)。