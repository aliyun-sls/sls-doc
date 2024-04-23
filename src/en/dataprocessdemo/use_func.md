# Cleanse data by using functions

The data transformation feature of Simple Log Service allows you to cleanse raw data. You can use one or more functions to cleanse a large amount of data. This way, the log data collected to Simple Log Service can be converted to data in a standard format.

## Scenario 1: Filter logs by using the e_keep function and e_drop function

You can use the [e_drop](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.2.8.41561d1f0tYusv#section-sn7-4pm-kly) or [e_keep](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.2.9.41561d1f0tYusv#section-yq7-h7k-wgh) function to filter logs. You can also specify the DROP parameter and use the [e_if](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.2.10.41561d1f0tYusv#section-dhk-ius-2q8) or [e_if_else](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.2.11.41561d1f0tYusv#section-6dy-m0v-hig) function to filter logs.

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

You can use the [e_set](https://help.aliyun.com/document_detail/125487.htm?spm=a2c4g.11186623.2.12.41561d1f0tYusv#section-7cr-8gz-by2) function to assign values to empty fields in a log entry.

- Sub-scenario 1: Assign a value to a field if the field does not exist or is empty.

  ```python
  e_set("result", "......value......", mode="fill")
  ```

  For information about the mode parameter, see [Field extraction check and overwrite modes](https://help.aliyun.com/document_detail/129385.htm?spm=a2c4g.11186623.2.13.41561d1f0tYusv#section-3o9-je6-ypx).

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

- Sub-scenario 2: Use the [Grok function](https://help.aliyun.com/document_detail/125480.htm?spm=a2c4g.11186623.2.14.41561d1f0tYusv#concept-1180778)

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

  - Transformation rule 为**topic**字段、**tag**字段和**receive_time**字段赋值。

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

## Scenario 3：通过判断，删除和重命名字段（e_search 函数、e_rename 函数和 e_compose 函数）

一般情况下，推荐您使用[e_compose](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.2.15.41561d1f0tYusv#section-zr0-ghx-vie)函数进行重复判断和操作。

Example:

- Raw log entries

  ```
  content：123
  age：23
  name：twiss
  ```

- Transformation rule 首先判断 content 字段值是否为 _123_ ，如果是，则删除 age 和 name 字段，再将 content 字段重命名为 ctx。

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

## Scenario 4：转换日志参数类型（v 函数、cn_int 函数和 dt_totimestamp 函数）

日志的字段和字段值在加工过程中，始终都是字符串形式，非字符串类型的数据会被自动转化为字符串类型。因此在调用函数时，要注意各个函数能接收的参数类型。更多信息，请参见[语法简介](https://help.aliyun.com/document_detail/125430.htm?spm=a2c4g.11186623.2.16.41561d1f0tYusv#concept-1130558)。

- 子 Scenario 1：调用[op_add](https://help.aliyun.com/document_detail/125400.htm?spm=a2c4g.11186623.2.17.41561d1f0tYusv#section-9wc-fea-59b)函数进行字符拼接和数据相加。

  op_add 函数既可以接收字符串类型，也可以接受数值类型，因此不需要做参数类型转换。

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

- 子 Scenario 2：运用[v](https://help.aliyun.com/document_detail/125398.htm?spm=a2c4g.11186623.2.18.41561d1f0tYusv#section-u2u-et7-tvj)函数和[ct_int](https://help.aliyun.com/document_detail/125403.htm?spm=a2c4g.11186623.2.19.41561d1f0tYusv#section-wkt-n3o-jde)函数进行类型转换并调用[op_mul](https://help.aliyun.com/document_detail/125405.htm?spm=a2c4g.11186623.2.20.41561d1f0tYusv#section-6ac-bnj-f0p)函数进行数据相乘。

  Example:

  - Raw log entries

  ```
  a:2
  b:5
  ```

  - Transformation rule 因为 v("a")和 v("b")都是字符串类型，而 op_mul 函数的第二个参数只能接收数值类型，所以您需要通过 ct_int 函数将字符串转化为整型，再传递给 op_mul 函数。

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

- 子 Scenario 3：调用[dt_parse](https://help.aliyun.com/document_detail/125409.htm?spm=a2c4g.11186623.2.21.41561d1f0tYusv#section-yug-wml-n2u)函数和[dt_parsetimestamp](https://help.aliyun.com/document_detail/125409.htm?spm=a2c4g.11186623.2.22.41561d1f0tYusv#section-5n7-n49-3n8)函数将字符串或日期时间转换为标准时间。

  dt_totimestamp 函数接收的参数类型为日期时间对象，不是字符串。因此需要调用 dt_parse 函数将 time1 的字符串值类型转化为日期时间对象类型。您也可以直接使用 dt_parsetimestamp 函数，它既能接收日期时间对象，也能接收字符串。更多信息，请参见[日期时间函数](https://help.aliyun.com/document_detail/125409.htm?spm=a2c4g.11186623.2.23.41561d1f0tYusv#concept-1130519)。

  Example:

  - Raw log entries

  ```
  time1: 2020-09-17 9:00:00
  ```

  - Transformation rule 将 time1 表示的日期时间转化为 Unix 时间戳。

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

## Scenario 5：为日志不存在的字段填充默认值（default 传参）

部分 SLS DSL 表达式函数对输入的参数有一定要求，如果不满足，数据加工窗口会报错或返回默认值。当日志中存在必要而残缺字段时，您可以在[op_len](https://help.aliyun.com/document_detail/125400.htm?spm=a2c4g.11186623.2.24.41561d1f0tYusv#section-51y-aby-i6k)函数中填充默认值。
**注意** 传递默认值给后续的函数时可能会进一步报错，因而需要及时处理函数返回的异常。

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

## Scenario 6：判断日志并增加字段（e_if 函数与 e_switch 函数）

推荐使用[e_if](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.2.25.41561d1f0tYusv#section-dhk-ius-2q8)函数或[e_switch](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.2.26.41561d1f0tYusv#section-f1t-ukb-ilk)函数进行日志判断。更多信息，请参见[流程控制函数](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.2.27.41561d1f0tYusv#concept-1597668)。

- e_if 函数

  ```python
  e_if(条件1, 操作1, 条件2, 操作2, 条件3, 操作3, ....)
  ```

- e_switch 函数 e_switch 函数是条件与操作的配对组合。依次根据条件进行判断，满足条件的进行对应操作，然后直接返回操作结果。不满足条件的不进行对应操作，直接进行下一个条件判断。如果没有满足任一条件并且配置了 default 参数，则执行 default 配置的操作并返回。

  ```python
  e_switch(条件1, 操作1, 条件2, 操作2, 条件3, 操作3, ...., default=None)
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
