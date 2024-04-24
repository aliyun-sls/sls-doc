# Aggregate data from multiple source Logstores

Simple Log Service allows you to replicate data from a source Logstore to a destination Logstore. To replicate the data, you can create a data transformation job for the source Logstore.This topic describes how to replicate data from a source Logstore to a destination Logstore in a typical scenario.

## Aggregate data from multiple source Logstores

- Raw log entries

  - The raw log entries are stored in a Logstore named Logstore_1 of a project named Project_1. The project belongs to Account 1 and resides in the UK (London) region.

  ```
  "log1"z
  request_id: 1
  http_host:  m1.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /pic/icon.jpg
  "log2"
  request_id: 2
  http_host:  m2.abcd.com
  http_status:  301
  request_method:  POST
  request_uri:  /data/data.php
  ```

  - The raw log entries are stored in a Logstore named Logstore_2 of a project named Project_2. The project belongs to Account 2 and resides in the UK (London) region.

  ```
  "log1"
  request_id: 3
  host:  m3.abcd.com
  status:  404
  request_method:  GET
  request_uri:  /category/abc/product_id
  "log2"
  request_id: 4
  host:  m4.abcd.com
  status:  200
  request_method:  GET
  request_uri:  /data/index.html
  ```

- Transformation requirements

  - Aggregate the log entries whose `http_status` is 200 in the Logstore_1 Logstore of Account 1 and the Logstore_2 Logstore of Account 2 to the Logstore_3 Logstore of Account 3.

  - Set the log field names in the Logstore_1 Logstore of Account 1 and the Logstore_2 Logstore of Account 2.Set the field name `host` to `http_host` and the field name `status` to

- SLS DSL rules

  - Configure the following transformation rules for the Logstore_1 Logstore of Account 1. In the **Create Data Transformation Job** panel, set Destination Name to target_logstore, set Destination Project to Project_3, set Target Store to Logstore_3, and specify the authorization method.For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.4.6dfb6f4a6EWuGt#task-1181217).

  ```python
  e_if(
  	e_match("http_status", "200"),
  	e_output("target_logstore")
  )
  ```

  ![](/img/dataprocessdemo/数据富化/存储目标.png)

  - Configure the following transformation rules for the Logstore_2 Logstore of Account 2. In the **Create Data Transformation Job** panel, set Destination Name to target_logstore, set Destination Project to Project_3, set Target Store to Logstore_3, and specify the authorization method.

  ```python
  e_if(
  	e_match("status", "200"),
  	e_compose(
  		e_rename("status", "http_status", "host", "http_host"),
  		e_output("target_logstore")
  	)
  )
  ```

- Result. The following log entries are aggregated in the Logstore_3 Logstore of the Project_3 project that belongs to Account 3. The project resides in the UK (London) region.
  ```
  "log1"
  request_id: 1
  http_host:  m1.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /pic/icon.jpg
  "log2"
  request_id: 4
  http_host:  m4.abcd.com
  http_status:  200
  request_method:  GET
  request_uri:  /data/index.html
  ```
