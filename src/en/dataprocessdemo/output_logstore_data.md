# Distribute data to multiple destination Logstores

This topic describes how to distribute data to multiple destination Logstores in various scenarios. These scenarios include dynamic distribution, cross-account distribution, dynamic cross-account distribution, and multi-source dynamic distribution.

## Scenario 1：cross-account distribution

For example, assume that all access log entries of your website are stored in a Logstore. You want to distribute the log entries to Logstores of different accounts based on the value of the http_status field in the log entries.

In this scenario, you can use the data transformation feature to distribute the log entries.

- Raw log entries

  ```
  http_host:  m1.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /pic/icon.jpg
  scheme:  https
  http_host:  m2.abcd.com
  http_status:  301
  request_method:  POST
  request_uri:  /data/data.php
  scheme:  http
  http_host:  m3.abcd.com
  http_status:  404
  request_method:  GET
  request_uri:  /category/abc/product_id
  scheme:  https
  http_host:  m4.abcd.com
  http_status:  504
  request_method:  GET
  request_uri:  /data/index.html
  scheme:  https
  ```

- Distribution requirements

  - Store the log entries whose http_status field value is 2XX as target0 in Logstore0 and set the topic of the log entries to

  - Store the log entries whose http_status field value is 3XX as target1 in Logstore1 and set the topic of the log entries to

  - Store the log entries whose http_status field value is 4XX as target2 in Logstore2 and set the topic of the log entries to

  - Store the log entries whose http_status field value is 4XX as target3 in Logstore3 and set the topic of the log entries to

  The log entries that are stored as target0 belong to Account A, and the log entries that are stored as target1, target2, and target3 belong to Account B.

- Transformation rule

  ```python
  e_switch(
    e_match("status", r"2\d+"),
    e_set("__topic__", "success_event"),
    e_match("status", r"3\d+"),
    e_compose(
      e_set("__topic__", "redirection_event"),
      e_output("target1")
    ),
    e_match("status", r"4\d+"),
    e_compose(
      e_set("__topic__", "unauthorized_event"),
      e_output("target2")
    ),
    e_match("status", r"5\d+"),
    e_compose(
      e_set("__topic__", "internal_server_error_event`"),
      e_output("target3")
    )
  )
  ```

- In the **Create Data Transformation Job** panel, configure the storage destination. For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.8.6b8b50a6egnakp#task-1181217).![](/img/dataprocessdemo/p58874.png)

  | Label | Storage target | Destination Project and Logstore | AccessKey                       |
  | ----- | -------------- | -------------------------------- | ------------------------------- |
  | 1     | target0        | Project0、Logstore0              | The AccessKey pair of Account A |
  | 2     | target1        | Project1、Logstore1              | The AccessKey pair of Account A |
  | 3     | target2        | Project2、Logstore2              | The AccessKey pair of Account B |
  | 4     | target3        | Project3、Logstore3              | The AccessKey pair of Account B |

- Transformation result

  ```
  ## Distribute the logs with an HTTP status of 2XX to logstore0 under account A.
  __topic__:  success_event
  http_host:  m1.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /pic/icon.jpg
  scheme:  https
  ## Distribute the logs with an HTTP status of 3XX to logstore1 under account A.
  __topic__:  redirection_event
  http_host:  m2.abcd.com
  http_status:  301
  request_method:  POST
  request_uri:  /data/data.php
  scheme:  http
  ## Distribute the logs with an HTTP status of 4XX to logstore2 under account A.
  __topic__: unauthorized_event
  http_host:  m3.abcd.com
  http_status:  404
  request_method:  GET
  request_uri:  /category/abc/product_id
  scheme:  https
  ## Distribute the logs with an HTTP status of 5XX to logstore under account A.
  __topic__: internal_server_error_event
  http_host:  m4.abcd.com
  http_status:  504
  request_method:  GET
  request_uri:  /data/index.html
  scheme:  https
  ```
