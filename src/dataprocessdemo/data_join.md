# 日志富化实践
## 数据加工介绍



数据加工是阿里云日志服务推出的一项功能，用于对结构化或非结构化日志进行实时ETL行处理。目前该功能包含了200+的算子，本文从富化场景出发，介绍如何在数据加工过程中使用富化函数。



PS： 我们这里讲的富化，对应的是SQL ETL场景的join

![](/img/dataprocessdemo/数据富化/数据富化整体概念.png)


数据加工的入口：

打开sls日志服务，选择相关logstore的查询页面后，可以看到有一个 “数据加工”的链接，点击这个链接就可以写数据加工的代码了。

![](/img/dataprocessdemo/begin-data-process.jpg)



数据加工函数总览：http://help.aliyun.com/document_detail/159702.html



## 场景设定

本文以Nginx日志 http code富化为例抛砖引玉，帮助大家熟悉数据加工中的日志富化方法。



http返回码在访问日志中比较常见，将返回码富化，可以让我们更直观地看到每个请求的状态，做更多统计工作。

![](/img/dataprocessdemo/数据富化/原始日志.png)

下面是常见的http code码含义的映射表

![](/img/dataprocessdemo/数据富化/httpcode对照表)



## 使用数据加工 进行日志富化



### 方式1 - 使用res_local 高级参数

假设，我们富化的数据是一个csv 保存了code的映射关系

```
code,alias,category,description
100,1xx,Informational,Continue
101,1xx,Informational,Switching Protocols
...
```

这里将code的映射关系保存为数据加工的高级参数，key为 http_code, 值为csv文件内容，加工语句如下：

```
e_table_map(tab_parse_csv("code,alias,category,description\n100,1xx,Informational,Continue\n101,1xx,Informational,Switching Protocols\n102,1xx,Informational,Processing (WebDAV)\n200,2xx,Success,OK\n201,2xx,Success,Created\n202,2xx,Success,Accepted\n203,2xx,Success,Non-Authoritative Information\n204,2xx,Success,No Content\n205,2xx,Success,Reset Content\n206,2xx,Success,Partial Content\n207,2xx,Success,Multi-Status (WebDAV)\n208,2xx,Success,Already Reported (WebDAV)\n226,2xx,Success,IM Used\n300,3xx,Redirection,Multiple Choices\n301,3xx,Redirection,Moved Permanently\n302,3xx,Redirection,Found\n303,3xx,Redirection,See Other\n304,3xx,Redirection,Not Modified\n305,3xx,Redirection,Use Proxy\n306,3xx,Redirection,(Unused)\n307,3xx,Redirection,Temporary Redirect\n308,3xx,Redirection,Permanent Redirect (experimental)\n400,4xx,Client Error,Bad Request\n401,4xx,Client Error,Unauthorized\n402,4xx,Client Error,Payment Required\n403,4xx,Client Error,Forbidden\n404,4xx,Client Error,Not Found\n405,4xx,Client Error,Method Not Allowed\n406,4xx,Client Error,Not Acceptable\n407,4xx,Client Error,Proxy Authentication Required\n408,4xx,Client Error,Request Timeout\n409,4xx,Client Error,Conflict\n410,4xx,Client Error,Gone\n411,4xx,Client Error,Length Required\n412,4xx,Client Error,Precondition Failed\n413,4xx,Client Error,Request Entity Too Large\n414,4xx,Client Error,Request-URI Too Long\n415,4xx,Client Error,Unsupported Media Type\n416,4xx,Client Error,Requested Range Not Satisfiable\n417,4xx,Client Error,Expectation Failed\n418,4xx,Client Error,I'm a teapot (RFC 2324)\n420,4xx,Client Error,Enhance Your Calm (Twitter)\n422,4xx,Client Error,Unprocessable Entity (WebDAV)\n423,4xx,Client Error,Locked (WebDAV)\n424,4xx,Client Error,Failed Dependency (WebDAV)\n425,4xx,Client Error,Reserved for WebDAV\n426,4xx,Client Error,Upgrade Required\n428,4xx,Client Error,Precondition Required\n429,4xx,Client Error,Too Many Requests\n431,4xx,Client Error,Request Header Fields Too Large\n444,4xx,Client Error,No Response (Nginx)\n449,4xx,Client Error,Retry With (Microsoft)\n450,4xx,Client Error,Blocked by Windows Parental Controls (Microsoft)\n451,4xx,Client Error,Unavailable For Legal Reasons\n499,4xx,Client Error,Client Closed Request (Nginx)\n500,5xx,Server Error,Internal Server Error\n501,5xx,Server Error,Not Implemented\n502,5xx,Server Error,Bad Gateway\n503,5xx,Server Error,Service Unavailable\n504,5xx,Server Error,Gateway Timeout\n505,5xx,Server Error,HTTP Version Not Supported\n506,5xx,Server Error,Variant Also Negotiates (Experimental)\n507,5xx,Server Error,Insufficient Storage (WebDAV)\n508,5xx,Server Error,Loop Detected (WebDAV)\n509,5xx,Server Error,Bandwidth Limit Exceeded (Apache)\n510,5xx,Server Error,Not Extended\n511,5xx,Server Error,Network Authentication Required\n598,5xx,Server Error,Network read timeout error\n599,5xx,Server Error,Network connect timeout error\n"),
              [("http_code","code")],
              [("alias","http_code_alias"), ("description","http_code_desc"), 
              ("category","http_code_category")])
```


加工结果：

![](/img/dataprocessdemo/数据富化/httpcode富化效果.png)


### 方式2 - 通过使用OSS文件实现富化

假设，我们的http code映射关系存在一个文件里。格式如下：

```
code,alias,category,description
100,1xx,Informational,Continue
101,1xx,Informational,Switching Protocols
...
```

上传 http_code.csv文件到oss

打开OSS控制台 http://oss.console.aliyun.com 

找到已有的bucket或者新建一个bucket，根据控制台指引上传文件

![](/img/dataprocessdemo/数据富化/上传oss.png)


使用数据加工进行富化，加工语句如下：

```
e_table_map(
      tab_parse_csv(
           res_oss_file(endpoint="oss-cn-shanghai-internal.aliyuncs.com",
              ak_id=res_local("AK_ID"), ak_key=res_local("AK_KEY"), 
              bucket="ali-sls-etl-test", 
              file="http_code.csv", format='text')),
              [("http_code","code")],
              [("alias","http_code_alias"),
               ("description","http_code_desc"),
               ("category","http_code_category")])
```

res_local 引用的值需要在高级参数里定义。

![](/img/dataprocessdemo/数据富化/高级参数设置.jpg)

加工结果：

![](/img/dataprocessdemo/数据富化/加工结果2.png)



### 方式3 - 通过MySQL 表实现富化

假设，我们的http_code映射关系存在一个mysql表里

![](/img/dataprocessdemo/数据富化/http2sql.png)


使用数据加工进行富化，加工语句如下：

```
e_table_map(res_rds_mysql(address="MySQL主机地址", 
                  username="用户名", password="密码",
                  database="数据库",table="表名", refresh_interval=300),
              [("http_code","code")],
              [("alias","http_code_alias"), ("description","http_code_desc"), 
              ("category","http_code_category")])
```

注意： 数据加工支持vpc方法方式rds，配置vpc打通可以参考：[https://help.aliyun.com/document_detail/162753.html](https://help.aliyun.com/document_detail/162753.html?spm=a2c4g.11186623.6.987.3e7249dbOZbV6w)


加工结果：

![](/img/dataprocessdemo/数据富化/加工结果3.png)



### 方式4 - 使用Logstore实现富化

假设，我们的映射关系在logstore里

![](/img/dataprocessdemo/数据富化/原始日志1.png)


使用数据加工进行富化，加工语句如下：

```
e_table_map( res_log_logstore_pull("cn-shanghai-intranet.log.aliyuncs.com",
        res_local("AK_ID"),res_local("AK_KEY"),"live-demo","http_code",
        ["code","alias","description","category"]),
              [("http_code","code")],
              [("alias","http_code_alias"), ("description","http_code_desc"), 
              ("category","http_code_category")])
```


res_local 引用的值需要在高级参数里定义。

![](/img/dataprocessdemo/数据富化/高级参数设置.jpg)

## 总结

### 整体流程

![](/img/dataprocessdemo/数据富化/整体流程.png)


### 方法比较

| 方法     | 数据量支持 | 增量更新 | 批量更新 | 适用场景                 |
| -------- | ---------- | -------- | -------- | ------------------------ |
| 代码内嵌 | 小         | 不支持   | 不支持   | 较简单的映射             |
| OSS      | 较大       | 不支持   | 支持     | 相对静态的，更新不频繁的 |
| MySQL    | 较大       | 不支持   | 支持     | 频繁更新的               |

限制：所有维表限制在2G


## 参考材料



1. https://help.aliyun.com/document_detail/125489.html 富化函数
2. https://help.aliyun.com/document_detail/129401.html 资源函数
3. https://www.restapitutorial.com/httpstatuscodes.html http code码