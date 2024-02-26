# 使用e_dict_map、e_search_dict_map函数进行数据富化
本文介绍使用映射富化函数e_dict_map、e_search_dict_map进行数据富化的实践案例。

## 使用e_dict_map函数进行数据富化
本案例介绍使用e_dict_map函数完成数据富化的方法。
* 原始日志
  ```
  http_host:  example.com
  http_status:  300
  request_method:  GET

  http_host:  example.org
  http_status:  200
  request_method:  POST

  http_host:  example.net
  http_status:  400
  request_method:  GET

  http_host:  aliyundoc.com
  http_status:  500
  request_method:  GET
  ```
* 加工需求
  将http_status字段中的请求状态码转化为文本格式，并添加到status_desc字段中。

* 加工规则
  ```python
  e_dict_map(
    {"400": "请求错误", "500": "服务器错误", "300": "跳转", "200": "成功"},
    "http_status",
    "status_desc"
  )
  ```
**说明** 在实际情况中，HTTP请求状态码不止以上4种，详情请参见[HTTP请求状态码](https://www.restapitutorial.com/httpstatuscodes.html?spm=a2c4g.11186623.0.0.7f753c11xuX1KY)。当http_status字段的值为401、404时，需要更新字典覆盖，否则无法匹配。
* 加工结果
  ```
  http_host:  example.com
  http_status:  300
  request_method:  GET
  status_desc: 跳转

  http_host:  example.org
  http_status:  200
  request_method:  POST
  status_desc: 成功

  http_host:  example.net
  http_status:  400
  request_method:  GET
  status_desc: 请求错误

  http_host:  aliyundoc.com
  http_status:  500
  request_method:  GET
  status_desc: 服务器错误
  ```
## 使用e_search_dict_map函数进行数据富化
本案例介绍使用e_search_dict_map函数完成数据富化的方法。
* 原始日志
  ```
  http_host:  example.com
  http_status:  200
  request_method:  GET
  body_bytes_sent: 740

  http_host:  example.org
  http_status:  200
  request_method:  POST
  body_bytes_sent: 1123

  http_host:  example.net
  http_status:  404
  request_method:  GET
  body_bytes_sent: 711

  http_host:  aliyundoc.com
  http_status:  504
  request_method:  GET
  body_bytes_sent: 1822
  ```
* 加工需求
根据日志中的http_status字段和body_bytes_sent字段的值的不同，为每条日志添加不同的type信息。
  * 为http_status为2XX且body_bytes_sent长度小于1000的日志，添加type字段，并将字段值设置为正常。
  * 为http_status为2XX且body_bytes_sent长度大于等于1000的日志，添加type字段，并将字段值设置为过长警告。
  * 为http_status为3XX的日志，添加type字段，并将字段值设置为重定向。
  * 为http_status为4XX的日志，添加type字段，并将字段值设置为错误。
  * 为其余所有日志，添加type字段，并将字段值设置为其他。
* 加工规则
  ```python
  e_search_dict_map({
      'http_status~="2\d+" and body_bytes_sent < 1000': "正常",
      'http_status~="2\d+" and body_bytes_sent >= 1000': "过长警告",
      'http_status~="3\d+"': "重定向", 'http_status~="4\d+"': "错误",  "*": "其他"
    },
    "http_status",
    "type"
  )
  ```
  基于字典的富化，除了可以使用大括号（{}）直接构建字典外，还可以基于任务配置资源、外部OSS资源、表格资源等来构建字典，详情请参见[字典构建](https://help.aliyun.com/document_detail/135224.htm?spm=a2c4g.11186623.0.0.7f753c11xuX1KY#section-6pi-yyp-s8b)。

* 加工结果
  ```
  type: 正常
  http_host:  example.com
  http_status:  200
  request_method:  GET
  body_bytes_sent: 740

  type: 过长警告
  http_host:  example.org
  http_status:  200
  request_method:  POST
  body_bytes_sent: 1123

  type: 错误
  http_host:  example.net
  http_status:  404
  request_method:  GET
  body_bytes_sent: 711

  type: 其他
  http_host:  aliyundoc.com
  http_status:  504
  request_method:  GET
  body_bytes_sent: 1822
  ```