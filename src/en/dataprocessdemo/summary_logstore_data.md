# 多源 Logstore 数据汇总

日志服务支持对每一个源 Logstore 配置一个数据加工任务，实现多源 Logstore 数据汇总。本文介绍多源 Logstore 数据汇总的典型应用 Scenario 和对应的操作方法。

## 跨账号多源 Logstore 数据汇总

- Raw log entries

  - 账号 1 中的 Raw log entries，其 Project 地域位于英国（伦敦），Project 名称为 Project_1，Logstore 名称为 Logstore_1。

  ```
  "日志1"z
  request_id: 1
  http_host:  m1.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /pic/icon.jpg
  "日志2"
  request_id: 2
  http_host:  m2.abcd.com
  http_status:  301
  request_method:  POST
  request_uri:  /data/data.php
  ```

  - 账号 2 中的日志，其 Project 地域为英国（伦敦），Project 名称为 Project_2，Logstore 名称为 Logstore_2。

  ```
  "日志1"
  request_id: 3
  host:  m3.abcd.com
  status:  404
  request_method:  GET
  request_uri:  /category/abc/product_id
  "日志2"
  request_id: 4
  host:  m4.abcd.com
  status:  200
  request_method:  GET
  request_uri:  /data/index.html
  ```

- 加工目标

  - 将账号 1 的 Logstore*1 和账号 2 的 Logstore_2 中所有`http_status`为 \_200* 的日志事件汇总到账号 3 的 Logstore_3 中。

  - 统一账号 1 的 Logstore_1 和账号 2 的 Logstore_2 中日志事件的字段名称。将`host`统一为`http_host`，`status`统一为`http_status`。

- SLS DSL 规则

  - 在账号 1 的 Logstore_1 中配置如下 Transformation rule，并且在 **创建数据 Transformation rule** 面板中，配置目标名称为 target_logstore，Destination Project 为 Project_3，目标库为 Logstore_3，以及授权方式及相关信息。详细操作请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.4.6dfb6f4a6EWuGt#task-1181217)。

  ```python
  e_if(
  	e_match("http_status", "200"),
  	e_output("target_logstore")
  )
  ```

  ![](/img/dataprocessdemo/数据富化/存储目标.png)

  - 在账号 2 的 Logstore_2 中配置如下 Transformation rule，参见账号 1 配置，并且在 **创建数据 Transformation rule** 面板中，配置目标名称为 target_logstore，Destination Project 为 Project_3，目标库为 Logstore_3，以及授权方式及相关信息。

  ```python
  e_if(
  	e_match("status", "200"),
  	e_compose(
  		e_rename("status", "http_status", "host", "http_host"),
  		e_output("target_logstore")
  	)
  )
  ```

- Transformation result 账号 3 中汇总的日志，其 Project 地域位于英国（伦敦），Project 名称为 _Project_3_ ，Logstore 名称为 _Logstore_3_ 。
  ```
  "日志1"
  request_id: 1
  http_host:  m1.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /pic/icon.jpg
  "日志2"
  request_id: 4
  http_host:  m4.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /data/index.html
  ```
