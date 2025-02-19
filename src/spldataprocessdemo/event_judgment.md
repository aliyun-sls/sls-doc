# 事件判断
通过事件判断可以更好地对符合特定条件的数据进行相应操作，让加工逻辑更可靠。本文主要介绍使用函数进行事件判断的常见场景和最佳方案示例。

## 场景一：基于字段值的逻辑查询判断
* 根据日志中的http_status字段和body_bytes_sent字段的值的不同，为每条日志添加不同的type信息。
  * 为http_status为2XX且body_bytes_sent长度小于1000的日志，添加type字段，并将字段值设置为正常。
  * 为http_status为2XX且body_bytes_sent长度大于等于1000的日志，添加type字段，并将字段值设置为过长警告。
  * 为http_status为3XX的日志，添加type字段，并将字段值设置为重定向。
  * 为http_status为4XX的日志，添加type字段，并将字段值设置为错误。
  * 为其余所有日志，添加type字段，并将字段值设置为其他。
* 原始日志
  ```
  [
  {
    "http_host": "example.com",
    "http_status": "200",
    "request_method":"GET",
    "body_bytes_sent":"740"
  },
  {
    "http_host": "example.com",
    "http_status": "200",
    "request_method":"POST",
    "body_bytes_sent":"1123"
  },{
  "http_host": "example.com",
    "http_status": "300",
    "request_method":"GET",
    "body_bytes_sent":"711"
  },{
  "http_host": "aliyundoc.com",
    "http_status": "404",
    "request_method":"GET",
    "body_bytes_sent":"1822"
  },{
  "http_host": "aliyundoc.com",
    "http_status": "500",
    "request_method":"GET",
    "body_bytes_sent":"100"
  } 
  ]
  ```
* 加工语句
  ```python
  * | extend type=(CASE
      WHEN http_status like '2%' AND  cast(body_bytes_sent as BIGINT) < 1000 then '正常'
      WHEN http_status like '2%' AND  cast(body_bytes_sent as BIGINT) >= 1000 then '过长警告'
      WHEN http_status like '3%' then '重定向'
      WHEN http_status like '4%' then '错误'
      ELSE '其他'
  END)
  ```
* 对应结果
  ```
  [
  {
    "http_host": "example.com",
    "http_status": "200",
    "request_method":"GET",
    "body_bytes_sent":"740",
    "type":"正常"
  },
  {
    "http_host": "example.com",
    "http_status": "200",
    "request_method":"POST",
    "body_bytes_sent":"1123",
    "type":"过长警告"
  },{
  "http_host": "example.com",
    "http_status": "300",
    "request_method":"GET",
    "body_bytes_sent":"711",
    "type":"重定向"
  },{
  "http_host": "aliyundoc.com",
    "http_status": "404",
    "request_method":"GET",
    "body_bytes_sent":"1822",
    "type":"错误"
  },{
  "http_host": "aliyundoc.com",
    "http_status": "500",
    "request_method":"GET",
    "body_bytes_sent":"100",
    "type":"其他"
  } 
  ]
  ```
