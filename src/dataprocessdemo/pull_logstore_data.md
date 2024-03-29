# 从其他Logstore获取数据进行数据富化


本文档介绍如何通过资源函数从其他Logstore中获取信息来对数据进行富化。

## 背景信息

某酒店将客人个人信息存储在名为user_logstore的Logstore中，将客人入住信息存储在名为check-in_logstore的Logstore中，现在酒店希望从check-in_logstore中获取部分字段数据，与user_logstore中的数据拼接。针对该需求，日志服务提供[res_log_logstore_pull](https://help.aliyun.com/document_detail/129401.htm?spm=a2c4g.11186623.2.6.4ba253beQxaPuJ#section-b3c-kth-p0t)函数从check-in_logstore中获取数据，提供[e_table_map](https://help.aliyun.com/document_detail/125489.htm?spm=a2c4g.11186623.2.7.4ba253beQxaPuJ#section-s80-usp-myx)函数或[e_search_table_map](https://help.aliyun.com/document_detail/125489.htm?spm=a2c4g.11186623.2.8.4ba253beQxaPuJ#section-mp3-goc-rxa)函数实现数据富化。

## 数据加工

* 原始数据

  * 用于存储个人信息的Logstore（user_logstore）

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


  * 用于存储入住信息的Logstore（check-in_logstore）

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


* 加工规则
  **说明** res_log_logstore_pull函数支持设置时间范围，您可以设置一个时间区间，也可以只设置开始时间。

  * 在加工规则中，设置from_time=1567038284,to_time=1567038500，则表示只获取该时间范围内的Logstore数据。

  * 在加工规则中，设置from_time="begin"，则表示持续获取Logstore数据。


  res_log_logstore_pull函数中的各个字段详情请参见[res_log_logstore_pull](https://help.aliyun.com/document_detail/129401.htm?spm=a2c4g.11186623.2.6.4ba253beQxaPuJ#section-b3c-kth-p0t)。

  * e_table_map函数通过两个Logstore中相同的cid字段进行匹配，只有cid字段的值完全相同，才能匹配成功。匹配成功后，返回Logstore（check-in_logstore）中的room_number字段和字段值，与Logstore（check-in_logstore）中的数据拼接，生成新的数据。

	```python
	e_table_map(
		res_log_logstore_pull(endpoint, ak_id, ak_secret, project,
				logstore, fields=["cid","room_number"],
				from_time="begin",
		), "cid","room_number")
	```


  * e_search_table_map函数使用e_search_table_map函数对Logstore（check-in_logstore）和Logstore（user_logstore）做搜索匹配，搜索Logstore（check-in_logstore）中cid为12346的数据，返回该数据中的room_number字段和字段值，与Logstore（user_logstore）中的数据拼接，生成新的数据。

	```python
	e_search_table_map(
		res_log_logstore_pull(endpoint, ak_id,
				ak_secret, project, logstore,
				fields=["cid","room_number"],
				from_time="begin",
		), "cid=12346","room_number")
	```




* 加工结果

  * e_table_map函数

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


  * e_search_table_map函数

	```python
	topic:xxx
	city:xxx
	cid:12346
	name:vicky
	room_number:2222
	```

## 设置黑白名单过滤数据

* 设置白名单

  * 加工规则通过fetch_include_data设置白名单，例如fetch_include_data="room_number:1111"表示在获取数据过程中，只获取room_number值为1111的数据。

	```python
	res_log_logstore_pull(endpoint, ak_id, ak_secret,
		project, logstore,
		["cid","name","room_number"，"status"],
		from_time=1567038284,
		to_time=1567038500,
		fetch_include_data="room_number:1111")
	```


  * 获取到的数据

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




* 设置黑名单

  * 加工规则通过fetch_exclude_data设置黑名单，例如fetch_exclude_data="room_number:1111"表示在获取数据过程中，丢弃room_number值为1111的数据。

	```python
	res_log_logstore_pull(endpoint, ak_id, ak_secret, project, logstore,
		["cid","name","room_number"，"status"],
		from_time=1567038284,
		to_time=1567038500,
		fetch_exclude_data="room_number:1111")
	```

  * 获取到的数据

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


* 同时设置黑白名单

  * 加工规则 同时设置黑白名单时，优先匹配黑名单，再匹配白名单。例如fetch_exclude_data="time:1567038285",fetch_include_data="status:check in"表示在数据获取过程中，先匹配time值为1567038285的数据进行丢弃，再匹配status值为check in的数据进行获取。

	```python
	res_log_logstore_pull(endpoint, ak_id, ak_secret, project, logstore,
		["cid","name","room_number"，"status"],
		from_time=1567038284,
		to_time=1567038500,
		fetch_exclude_data="time:1567038285",
		fetch_include_data="status:check in")
	```



  * 获取到的数据

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

## 开启主键维护获取目标Logstore数据

当您获取到数据，还没加工时，您希望删除已获取到数据，不再加工，您可以开启主键维护功能。例如：您要在名为check-in_logstore的Logstore中，获取已入住还未离开的客户入住信息，如果获取到的数据中包含status:leave表示客人已经离开，则开启主键维护功能不加工该数据。

**说明**

* primary_keys参数只支持设置单个字符串，且必须存在于fields字段中。

* 开启主键维护功能时，待拉取数据的Logstore中只能存在一个Shard。

* 开启主键维护功能时，delete_data字段必须不为 *None* 。

* 加工规则

	```python
	res_log_logstore_pull(
		endpoint, ak_id, ak_secret, project, logstore,
		["cid","name","room_number"，"status","time"],
		from_time=1567038284,
		to_time=None,
		primary_keys="cid",
		delete_data="status:leave")
	```

* 获得数据name为maki的客人，最后的入住信息为status:leave表示已离开酒店，则不加工该客人的相关数据。
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