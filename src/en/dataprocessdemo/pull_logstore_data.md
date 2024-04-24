# Pull data from one Logstore to enrich log data in another Logstore

This topic describes how to use resource functions to pull data from one Logstore to enrich log data in another Logstore.

## Data processing

- Raw data

  - that is used to store personal information Logstore（user_logstore）

  ```
  topic:xxx
  city:xxx
  cid:12345
  name:maki
  topic:xxx
  city:xxx
  cid:12346
  name:vicky
  topic:xxx
  city:xxx
  cid:12347
  name:mary
  ```

  - that is used to store check-in information Logstore（check-in_logstore）

  ```
  time:1567038284
  status:check in
  cid:12345
  name:maki
  room_number:1111
  time:1567038284
  status:check in
  cid:12346
  name:vicky
  room_number:2222
  time:1567038500
  status:check in
  cid:12347
  name:mary
  room_number:3333
  time:1567038500
  status:leave
  cid:12345
  name:maki
  room_number:1111
  ```

- Transformation rule
  **Note** res_log_logstore_pull The function allows you to set a time range or a start time for data enrichment.

  - If you set a time range in the transformation rule, such as, from_time=1567038284 and to_time=1567038500, data that is received in the specified time range by Simple Log Service is pulled for data enrichment.

  - If you set a start time in the transformation rule, such as, from_time="begin", data that is received from the specified time by Simple Log Service is pulled for data enrichment.

  res_log_logstore_pull For more information about the fields of the function, see[res_log_logstore_pull](https://www.alibabacloud.com/help/en/doc-detail/129401.htm?spm=a2c4g.11186623.2.6.4ba253beQxaPuJ#section-b3c-kth-p0t)。

  - e_table_map Function. This function maps two log entries by using the cid field. If the value of the cid field in the two log entries equals each other, data mapping succeeds.The room_number field and field value are returned and concatenated with the log entry in the check-in_logstore Logstore.

  ```python
  e_table_map(
  	res_log_logstore_pull(endpoint, ak_id, ak_secret, project,
  			logstore, fields=["cid","room_number"],
  			from_time="begin",
  	), "cid","room_number")
  ```

  - e_search_table_map Function. This e_search_table_map function searches for the cid field whose value is 12346 in the check-in_logstore Logstore, returns the room_number field and its value, and concatenates the field with these fields of the log entries in the user_logstore Logstore.

  ```python
  e_search_table_map(
  	res_log_logstore_pull(endpoint, ak_id,
  			ak_secret, project, logstore,
  			fields=["cid","room_number"],
  			from_time="begin",
  	), "cid=12346","room_number")
  ```

- Transformation result

  - e_table_map Function

  ```
  topic:xxx
  city:xxx
  cid:12345
  name:maki
  room_nuber:1111
  topic:xxx
  city:xxx
  cid:12346
  name:vicky
  room_number:2222
  topic:xxx
  city:xxx
  cid:12347
  name:mary
  room_number:3333
  ```

  - e_search_table_map Function

  ```python
  topic:xxx
  city:xxx
  cid:12346
  name:vicky
  room_number:2222
  ```

## Configure a whitelist rule and a blacklist rule to filter data

- Configure a whitelist rule

  - Transformation rule. Use the fetch_include_data field to configure a whitelist rule. In this example, the fetch_include_data="room_number:1111" expression is included in the res_log_logstore_pull function. This expression indicates that only the log entries whose room_number field value is 1111 are pulled.

  ```python
  res_log_logstore_pull(endpoint, ak_id, ak_secret,
  	project, logstore,
  	["cid","name","room_number"，"status"],
  	from_time=1567038284,
  	to_time=1567038500,
  	fetch_include_data="room_number:1111")
  ```

  - Retrieved data

  ```
  status: check in
  cid:12345
  name:maki
  room_number:1111
  status:leave
  cid:12345
  name:maki
  room_number:1111
  ```

- Configure a blacklist rule

  - Transformation rule. Use the fetch_exclude_data field to configure a blacklist rule. In this example, the fetch_exclude_data="room_number:1111" expression is included in the res_log_logstore_pull function. This expression indicates that only the log entries whose room_number field value is 1111 are dropped.

  ```python
  res_log_logstore_pull(endpoint, ak_id, ak_secret, project, logstore,
  	["cid","name","room_number"，"status"],
  	from_time=1567038284,
  	to_time=1567038500,
  	fetch_exclude_data="room_number:1111")
  ```

  - Retrieved data

  ```
  status:check in
  cid:12346
  name:vicky
  room_number:2222
  status:check in
  cid:12347
  name:mary
  room_number:3333
  ```

- Configure a blacklist rule and a whitelist rule

  - Transformation rule. If you configure a blacklist rule and a whitelist rule, the blacklist rule is applied first and then the whitelist rule.In this example, the fetch_exclude_data="time:1567038285",fetch_include_data="status:check in" expression is included in the res_log_logstore_pull function. This expression indicates that the log entries whose time field value is 1567038285 dropped first and then the log entries whose status field value is check in are pulled.

  ```python
  res_log_logstore_pull(endpoint, ak_id, ak_secret, project, logstore,
  	["cid","name","room_number"，"status"],
  	from_time=1567038284,
  	to_time=1567038500,
  	fetch_exclude_data="time:1567038285",
  	fetch_include_data="status:check in")
  ```

  - Retrieved data

  ```
  status:check in
  cid:12345
  name:maki
  room_number:1111
  status:check in
  cid:12346
  name:vicky
  room_number:2222
  status:check in
  cid:12347
  name:mary
  room_number:3333
  ```

## Enable primary key maintenance to pull data from destination Logstores

You can delete pulled data before you transform other data. To do this, you can enable the primary key maintenance feature.For example, you want to pull the check-in data of customers who have checked in but not checked out from the Logstore named check-in_logstore. If a pulled log entry of a customer includes the status:leave field, the customer has checked out. In this case, you can enable the primary key maintenance feature and the log entry is not transformed.

**Note**

- primary_keys You can set a single field as the value of the parameter. The field must exist in the fields field.

- Before you enable the primary key maintenance feature, make sure that the Logstore from which you want to pull data has only one shard.

- If you enable the primary key maintenance feature, you cannot set the delete*data field to \_None*.

- Transformation rule

  ```python
  res_log_logstore_pull(
  	endpoint, ak_id, ak_secret, project, logstore,
  	["cid","name","room_number"，"status","time"],
  	from_time=1567038284,
  	to_time=None,
  	primary_keys="cid",
  	delete_data="status:leave")
  ```

- Retrieve data. The status:leave field in the preceding log entry indicates that the customer whose name is maki has checked out. Therefore, this log entry is not transformed.
  ```
  time:1567038284
  status:check in
  cid:12346
  name:vicky
  room_number:2222
  time:1567038500
  status:check in
  cid:12347
  name:mary
  room_number:3333
  ```
