# Cleanse data by using functions

The data transformation feature of Simple Log Service allows you to cleanse raw data. You can use one or more functions to cleanse a large amount of data. This way, the log data collected to Simple Log Service can be converted to data in a standard format.

## Scenario 1: Filter logs by using the e_keep function and e_drop function

You can use the [e_drop](https://www.alibabacloud.com/help/en/doc-detail/125484.htm?spm=a2c4g.11186623.2.8.41561d1f0tYusv#section-sn7-4pm-kly) or [e_keep](https://www.alibabacloud.com/help/en/doc-detail/125484.htm?spm=a2c4g.11186623.2.9.41561d1f0tYusv#section-yq7-h7k-wgh) function to filter logs. You can also specify the DROP parameter and use the [e_if](https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.2.10.41561d1f0tYusv#section-dhk-ius-2q8) or [e_if_else](https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.2.11.41561d1f0tYusv#section-6dy-m0v-hig) function to filter logs.

The following common transformation rules can be used:

- `e_keep(e_search(...) )`：The log entries that meet the conditions are retained. Otherwise, the log entries are dropped.

- `e_drop(e_search(...) )`：The log entries that meet the conditions are dropped. Otherwise, the log entries are retained.

- `e_if_else(e_search("..."), KEEP, DROP)`：The log entries that meet the conditions are retained. Otherwise, the log entries are dropped.

- `e_if(e_search("not ..."), DROP)`：The log entries that meet the conditions are dropped. Otherwise, the log entries are retained.

- `e_if(e_search("..."), KEEP)`：This transformation rule is invalid.

Example:

- Raw log entries

  ```
  __source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.0.2
  __tag__:__receive_time__:  1597214851
  __topic__: app
  class:  test_case
  id:  7992
  test_string:  <function test1 at 0x1027401e0>
  #日志2
  __source__:  192.168.0.1
  class:  produce_case
  id:  7990
  test_string:  <function test1 at 0x1020401e0>
  ```

- Transformation rule. Drop the log entries whose **topic** and **tag**:**receive_time** fields are empty.

  ```python
  e_if(e_not_has("__topic__"),e_drop())
  e_if(e_not_has("__tag__:__receive_time__"),e_drop())
  ```

- Transformation result

  ```
  __source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.0.2
  __tag__:__receive_time__:  1597214851
  __topic__: app
  class:  test_case
  id:  7992
  test_string:  <function test1 at 0x1027401e0>
  ```

## Scenario 2: Assign values to empty fields in a log entry by using the e_set function

You can use the [e_set](https://www.alibabacloud.com/help/en/doc-detail/125487.htm?spm=a2c4g.11186623.2.12.41561d1f0tYusv#section-7cr-8gz-by2) function to assign values to empty fields in a log entry.

- Sub-scenario 1: Assign a value to a field if the field does not exist or is empty.

  ```python
  e_set("result", "......value......", mode="fill")
  ```

  For information about the mode parameter, see [Field extraction check and overwrite modes](https://www.alibabacloud.com/help/en/doc-detail/129385.htm?spm=a2c4g.11186623.2.13.41561d1f0tYusv#section-3o9-je6-ypx).

Example:

- Raw log entries

```
name:
```

- Transformation rule

```python
e_set("name", "aspara2.0", mode="fill")
```

- Transformation result

```
name:  aspara2.0
```

- Sub-scenario 2: Use the [Grok function](https://www.alibabacloud.com/help/en/doc-detail/125480.htm?spm=a2c4g.11186623.2.14.41561d1f0tYusv#concept-1180778)

Example:

- Raw log entries

```
content："ip address: 192.168.1.1"
```

- Transformation rule. Use the Grok function to extract the IP address in the content field.

```python
e_regex("content", grok(r"(%{IP})"),"addr")
```

- Transformation result

```
addr:  192.168.1.1
content："ip address: 192.168.1.1"
```

- Sub-scenario 3: Assign values to multiple fields.
  `python
e_set("k1", "v1", "k2", "v2", "k3", "v3", ......)
`

  Example:

  - Raw log entries

  ```
  __source__:  192.168.0.1
  __topic__:
  __tag__:
  __receive_time__:
  id:  7990
  test_string:  <function test1 at 0x1020401e0>
  ```

  - Transformation rule. Assign values to the **topic**, **tag**, and **receive_time** fields.

  ```python
  e_set(
  	"__topic__","app",
  	"__tag__","stu",
  	"__receive_time__","1597214851"
  )
  ```

  - Transformation result

  ```
  __source__:  192.168.0.1
  __topic__:  app
  __tag__:  stu
  __receive_time__:  1597214851
  id:  7990
  test_string:  <function test1 at 0x1020401e0>
  ```

## Scenario 3: Delete a field and rename a field by using the e_search, e_rename, and e_compose functions

We recommend that you use the [e_compose](https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.2.15.41561d1f0tYusv#section-zr0-ghx-vie) function to check whether the data meets the conditions and then perform operations based on the check result.

Example:

- Raw log entries

  ```
  content：123
  age：23
  name：twiss
  ```

- Transformation rule. If the value of the content field is _123_, delete the age field and the name field. Then, rename the content field to ctx.

  ```python
  e_if(
  	e_search("content==123"),
  	e_compose(
  		e_drop_fields("age|name"),
  		e_rename("content", "ctx")
  	)
  )
  ```

- Transformation result

  ```
  ctx: 123
  ```

## Scenario 4: Convert the type of fields in a log entry by using the v, cn_int, and dt_totimestamp functions

The fields and values in log entries are processed as strings during the data transformation process. Data of a non-string type is automatically converted to data of the string type.Therefore, you must be familiar with the types of fields that a function can receive when you invoke the function.For more information, see [Syntax overview](https://www.alibabacloud.com/help/en/doc-detail/125430.htm?spm=a2c4g.11186623.2.16.41561d1f0tYusv#concept-1130558).

- Sub-scenario 1: Use the [op_add](https://www.alibabacloud.com/help/en/doc-detail/125400.htm?spm=a2c4g.11186623.2.17.41561d1f0tYusv#section-9wc-fea-59b) function to concatenate strings or add numbers.

  op_add The function can receive data of both the string and numeric types. Therefore, no field type needs to be converted.

  Example:

  - Raw log entries

  ```
  a : 1
  b : 2
  ```

  - Transformation rule

  ```python
  e_set("d",op_add(v("a"), v("b")))
  e_set("e",op_add(ct_int(v("a")), ct_int(v("b"))))
  ```

  - Transformation result

  ```
  a : 12
  b : 13
  ```

- Sub-scenario 2: Use the [v](https://www.alibabacloud.com/help/en/doc-detail/125398.htm?spm=a2c4g.11186623.2.18.41561d1f0tYusv#section-u2u-et7-tvj) function and the [ct_int](https://www.alibabacloud.com/help/en/doc-detail/125403.htm?spm=a2c4g.11186623.2.19.41561d1f0tYusv#section-wkt-n3o-jde) function to convert data types and use the [op_mul](https://www.alibabacloud.com/help/en/doc-detail/125405.htm?spm=a2c4g.11186623.2.20.41561d1f0tYusv#section-6ac-bnj-f0p) function to multiply data.

  Example:

  - Raw log entries

  ```
  a:2
  b:5
  ```

  - Transformation rule. The values of both v("a") and v("b") are of the string type. However, the second field of the op_mul function can receive only numeric values. Therefore, you must use the ct_int function to convert a string to an integer, and then pass the value to the op_mul function.

  ```python
  e_set("c",
  	op_mul(ct_int(v("a")),
  		ct_int(v("b"))
  	)
  )
  e_set("d",
  	op_mul(v("a"),
  		ct_int(v("b"))
  	)
  )
  ```

  - Transformation result

  ```
  a: 2
  b: 5
  c: 10
  d: 22222
  ```

- Sub-scenario 3: Use the [dt_parse](https://www.alibabacloud.com/help/en/doc-detail/125409.htm?spm=a2c4g.11186623.2.21.41561d1f0tYusv#section-yug-wml-n2u) function or [dt_parsetimestamp] (https://www.alibabacloud.com/help/en/doc-detail/125409.htm?spm=a2c4g.11186623.2.22.41561d1f0tYusv#section-5n7-n49-3n8)function to convert a string or datetime object to standard time.

  dt_totimestamp The dt_totimestamp function receives only datetime objects.Therefore, you must use the dt_parse function to convert the string value of time1 to a datetime object.You can also use the dt_parsetimestamp function because it can receive both datetime objects and strings.For more information, see [Date and time functions](https://www.alibabacloud.com/help/en/doc-detail/125409.htm?spm=a2c4g.11186623.2.23.41561d1f0tYusv#concept-1130519).

  Example:

  - Raw log entries

  ```
  time1: 2020-09-17 9:00:00
  ```

  - Transformation rule. Convert the time indicated by time1 to a UNIX timestamp.

  ```python
  e_set("time1", "2019-06-03 2:41:26")
  e_set("time2",
  	dt_totimestamp(
  		dt_parse(v("time1"))
  	)
  )
  ```

  或

  ```python
  e_set(
  	"time2",
  	dt_parsetimestamp(v("time1"))
  )
  ```

  - Transformation result

  ```
  time1:  2019-06-03 2:41:26
  time2:  1559529686
  ```

## Scenario 5: Fill the default values in log fields that do not exist by specifying the default parameter

Some expression functions that are used to transform data in Simple Log Service have specific requirements for input parameters. If the input parameters do not meet the requirements, the data transformation rule returns the default values or an error.If a necessary log field is incomplete, you can fill the default value in the log field by using the [op_len](https://www.alibabacloud.com/help/en/doc-detail/125400.htm?spm=a2c4g.11186623.2.24.41561d1f0tYusv#section-51y-aby-i6k) function.

**Note** If default values are passed to subsequent functions, errors may occur. We recommend that you resolve the exceptions returned by the data transformation rules at the earliest opportunity.

- Raw log entries

  ```
  data_len: 1024
  ```

- Transformation rule

  ```python
  e_set("data_len", op_len(v("data", default="")))
  ```

- Transformation result

  ```
  data: 0
  data_len: 0
  ```

## Scenario 6: Add one or more fields based on conditions by using the e_if and e_switch functions

We recommend that you use the [e_if](https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.2.25.41561d1f0tYusv#section-dhk-ius-2q8) or [e_switch(https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.2.26.41561d1f0tYusv#section-f1t-ukb-ilk)] function to add one or more fields to log entries based on specified conditions.
For more information, see [Flow control functions](https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.2.27.41561d1f0tYusv#concept-1597668).

- e_if function

  ```python
  e_if(ondition1,operation1, condition2, operation2, condition3, operation3, ....)
  ```

- e_switch e_switch function syntax. When you use the e_switch function, you must specify condition-operation pairs.The conditions are checked in sequence. An operation is performed only after its paired condition is met. After a condition is met, the corresponding operation result is returned and no more conditions are checked.If a condition is not met, its paired operation is not performed and the next condition is checked.If no conditions are met and the default field is specified, the operation that is specified by default is performed and the corresponding result is returned.Result. The e_switch function checks the conditions in sequence. After a condition is met, the corresponding operation result is returned and no more conditions are checked.

  ```python
  e_switch(condition1,operation1, condition2, operation2, condition3, operation3, ...., default=None)
  ```

Example:

- Raw log entries

  ```
  status1: 200
  status2: 404
  ```

- e_if function

  - Transformation rule

  ```python
  e_if(
  	e_match("status1", "200"),
  	e_set("status1_info", "normal"),
  	e_match("status2", "404"),
  	e_set("status2_info", "error")
  )
  ```

  - Transformation result

  ```
  status1: 200
  status2: 404
  status1_info: normal
  status2_info: error
  ```

- e_switch 函数

  - Transformation rule

  ```python
  e_switch(
  	e_match("status1", "200"),
  	e_set("status1_info", "normal"),
  	e_match("status2", "404"),
  	e_set("status2_info", "error")
  )
  ```

  - Result. The e_switch function checks the conditions in sequence. After a condition is met, the corresponding operation result is returned and no more conditions are checked.

  ```
  status1: 200
  status2: 404
  status1_info: normal
  ```
