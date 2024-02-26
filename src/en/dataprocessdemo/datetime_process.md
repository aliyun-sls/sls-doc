# 处理日期时间

处理日期时间，将方便您对日志后续查询与可视化展示。本文档主要介绍使用函数进行日期时间数据类型转换和日期时间偏移。

## 概念解释

SLS DSL语法中的日期时间处理主要涉及三种数据类型：日期时间字符串、日期时间对象和Unix时间戳。

* 日期时间字符串日期时间字符串的主要用途是为了便于展示以及提升用户可读性。SLS DSL语法中的日期时间字符串主要分为两种形式：

  * 带有时区信息的日期时间字符串，如`2019-06-02 18:41:26+08:00`。

  * 不带时区信息的日期时间字符串，如`2019-06-02 10:41:26`。

  带有时区信息的日期时间字符串通过在日期时间后添加额外的时差信息来表达时区：

  * `2019-06-02 18:41:26+08:00`表示该时间是`东8区`时区下的`2019-06-02 18:41:26`。

  * `2019-06-02 18:41:26-07:00`表示该时间是`西7区`时区下的`2019-06-02 18:41:26`。


* 日期时间对象实例化的日期时间，专指Datetime类型的数据。日期时间对象的主要用途为了便于展示以及提升用户可读性。



* Unix时间戳从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数。Unix时间戳的主要应用场景有：

  * 表示系统时间。日志事件中表示日志产生时间的元字段`__time__`，表示日志接收时间的字段`__receieve_time__`等，这些字段的值都使用Unix时间戳来表示对应的系统时间，如下例所示。

      ```
      __source__:  1.2.3.4
      __tag__:__receive_time__:  1562741899
      __topic__:
      __time__: 1562731122
      ```




  * 时间相关的计算。Unix时间戳是从1970年1月1日开始所经过的秒数，因此在很多场景下便于直接进行日期时间相关的计算，如下例如示。

    * 原始日志

      ```
      time1: 1562741899
      time2: 1562731122
      ```


    * SLS DSL编排

      ```python
      e_set("time_diff", op_sub(v("time1"), v("time2")))
      ```


    * 加工结果

      ```
      time1: 1562741899
      time2: 1562731122
      time_diff: 10777
      ```


## 数据类型转换和转换函数

日期时间字符串、日期时间对象和Unix时间戳的相互转换方式和对应转换函数如下图所示。
![](/img/dataprocessdemo/特定格式处理/date-parse-loop.png)
上图所示的转换场景和对应的转换函数具体描述如下表所示。


| 转换场景                                 |                                  | 转换函数                                                     |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| 日期时间对象和Unix时间戳的相互转换       | 日期时间对象转为Unix时间戳       | * `dt_parsetimestamp`智能转换函数，可以将日期时间对象或日期时间字符串转换为Unix时间戳。  * `dt_totimestamp`专用函数，只支持将日期时间对象转换为Unix时间戳。 |
| 日期时间对象和Unix时间戳的相互转换       | Unix时间戳转为日期时间对象       | * `dt_parse`智能转换函数，可以将Unix时间戳或日期时间字符串转换为日期时间对象。  * `dt_fromtimestamp`专用函数，只支持将Unix时间戳转换为日期时间对象。 |
| 日期时间对象和日期时间字符串的相互转换。 | 日期时间对象转为日期时间字符串。 | * `dt_str`智能转换函数，可以将日期时间对象、Unix时间戳和日期时间字符串转换为指定格式的日期时间字符串。  * `dt_strftime`专用函数，只支持将日期时间对象转换为日期时间字符串。 |
| 日期时间对象和日期时间字符串的相互转换。 | 日期时间字符串转为日期时间对象。 | * `dt_parse`智能转换函数，可以将日期时间字符串或Unix时间戳转换为日期时间对象。  * `dt_strptime`专用函数，只支持将日期时间字符串转化为日期时间对象。 |
| 日期时间字符串和Unix时间戳的相互转换。   | 日期时间字符串转为Unix时间戳。   | `dt_parsetimestamp`智能转换函数，可以将日期时间字符串或日期时间对象转换为Unix时间戳。 |
| 日期时间字符串和Unix时间戳的相互转换。   | Unix时间戳转为日期时间字符串。   | * `dt_str`智能转换函数，可以将Unix时间戳、日期时间对象和日期时间字符串转换为指定格式的日期时间字符串。  * `dt_strftimestamp`专用函数，只支持将Unix时间戳转换为日期时间字符串。 |

上图和上表揭示了三种数据类型之间的六种转换，转换过程涉及两种方式，一种使用智能转换函数，另一种使用该转换的专用函数。

* 智能转换函数以`dt_parse`函数为代表的智能转换函数可以接收Unix时间戳、日期时间对象以及日期时间字符串等不同类型的参数，实现智能转换。



* 专用函数智能转换函数无法满足用户的全部需求。如对于用户自定义的特殊日期格式，`dt_parse`等智能转换函数无法自动解析日志，需要使用`dt_strptime`函数来进行解析指定格式。


**说明** 了解更多日期时间处理和转换函数，请参见[日期时间函数](https://help.aliyun.com/document_detail/125409.htm?spm=a2c4g.11186623.2.9.169c3cb8rqBjjU#concept-1130519)和[转换函数](https://help.aliyun.com/document_detail/125403.htm?spm=a2c4g.11186623.2.10.169c3cb8rqBjjU#concept-1130510)。

## 日期时间对象和Unix时间戳的相互转换

* 处理函数

  * 推荐`dt_parsetimestamp`智能转换函数，将日期时间对象或日期时间字符串转换为Unix时间戳。

  * `e_set`函数中的tz参数设置会将不带时区的日期时间对象处理为带时区的，或将原时区的转换为目标时区。



* Unix时间戳转换成带时区的时间字符串对象。

  * 原始日志

      ```
      time: 1562741899
      ```


  * SLS DSL编排

      ```python
      e_set("new_time", dt_parse(v("time"), tz="Asia/Shanghai"))
      ```


  * 加工结果

      ```
      time: 1562741899
      new_time: 2019-07-10 06:58:19+08:00
      ```

## 日期时间字符串和Unix时间戳的相互转换

* 处理函数

  * `dt_str`智能转换函数，可以将Unix时间戳、日期时间对象和日期时间字符串转化为指定格式的日期时间字符串。

  * `dt_strftimestamp`函数只支持将Unix时间戳转化为日期时间字符串。

  * `dt_parsetimestamp`智能转换函数，可以将日期时间字符串或日期时间对象转换为Unix时间戳。



* 场景1：不带时区信息的日期时间字符串类型转换为Unix时间戳。对于不带时区信息的日期时间字符串如`2019-06-02 18:41:26`，将日期时间转化为Unix时间戳，需要指定该日期时间的时区，不同的时区转化得到的Unix时间戳的值不一样。


  * 原始日志

      ```
      time: 2019-06-02 18:41:26
      ```


  * SLS DSL编排

      ```python
      e_set(
            "Shanghai_timestamp",
            dt_parsetimestamp(
                  v("time"),
                  tz="Asia/Shanghai"
            )
      )
      e_set(
            "Los_Angeles_timestamp",
            dt_parsetimestamp(
                  v("time"),
                  tz="America/Los_Angeles"
            )
      )
      e_set(
            "UTC_timestamp",
            dt_parsetimestamp(v("time"))
      )
      ```


  * 加工结果

      ```
      Shanghai_timestamp: 1559472086
      Los_Angeles_timestamp: 1559526086
      UTC_timestamp: 1559500886
      ```

  **说明**

  * `tz="Asia/Shanghai"`表示`time`字段表示的时间是上海所在时区对应的时间。

  * 如果不指定时区，默认将给定日期时间当做UTC时区下的日期时间。

  * 时区参数`tz=时区字符串`中所有可选时区字符串请参见[时区列表](https://help.aliyun.com/document_detail/129390.htm?spm=a2c4g.11186623.2.11.169c3cb8rqBjjU#concept-1597620)


* 场景2：带有时区信息的日期时间字符串转换为Unix时间戳。对带时区信息的日期时间字符串如`2019-06-02 18:41:26+08:00`，则无须指定时区参数。

  * 原始日志

      ```
      China_time : 2019-06-02 18:41:26+08:00
      America_time: 2019-06-02 3:41:26-07:00
      UTC_time : 2019-06-02 10:41:26+00:00
      ```


  * SLS DSL编排

      ```python
      e_set("timestamp1", dt_parsetimestamp(v("China_time")))
      e_set("timestamp2", dt_parsetimestamp(v("America_time")))
      e_set("timestamp3", dt_parsetimestamp(v("UTC_time")))
      ```

  * 加工结果

      ```
      America_time:  2019-06-02 3:41:26-07:00
      China_time:  2019-06-02 18:41:26+08:00
      UTC_time:  2019-06-02 10:41:26+00:00
      timestamp1: 1559472086
      timestamp2: 1559472086
      timestamp3: 1559472086
      ```

* 子场景3：自定义的不带时区的特殊日期格式转换成Unix时间戳。

  * 原始日志

      ```
      time1: 2019-07-10 06:58:19
      time2: 2019/07/10 06-58-19
      ```


  * SLS DSL编排

      ```python
      e_set(
            "time3",
            dt_parsetimestamp(v("time1"))
      )
      e_set(
            "time4",
            dt_parsetimestamp(
                  dt_strptime(
                        v("time2"),
                        "%Y/%m/%d %H-%M-%S"
                  )
            )
      )
      ```


  * 加工结果

      ```
      time1: 2019-07-10 06:58:19
      time2: 2019/07/10 06-58-19
      time3: 1562741899
      time4: 1562741899
      ```

## 日期时间对象和日期时间字符串的相互转换

* 处理函数

  * `dt_parse`智能转换函数可以将日期时间字符串或Unix时间戳转换为日期时间对象。

  * `dt_astimezone`函数返回一个带新时区信息的日期时间对象。



* 场景1：不带时区信息的日期时间字符串转换成指定时区的日期时间对象。对于不带时区信息的日期时间字符串`2019-06-02 18:41:26`，可以通过Unix时间戳，实现不同时区下的日期时间的相互转换。将洛杉矶时区的日期时间转换为上海时区的日期时间，如下例所示。

  * 原始日志

      ```
      #已知time字段的值的时间是洛杉矶时间
      time : 2019-06-04 2:41:26
      ```



  * SLS DSL编排

      ```python
      e_set(
            "timestamp",
            dt_parsetimestamp(
                  v("time"),
                  tz="America/Los_Angeles")
            )
      e_set(
            "Shanghai_time",
            dt_parse(v("timestamp"),
            tz="Asia/Shanghai")
      )
      ```



  * 加工结果

      ```
      Shanghai_time : 2019-06-04 17:41:26+08:00
      time : 2019-06-04 2:41:26
      timestamp:  1559641286
      ```


* 场景2：不带时区的日期时间字符串转换成带时区的日期时间对象。

  * 原始日志

      ```
      time : 2019-07-10 06:58:19
      ```



  * SLS DSL编排

      ```python
      e_set("new_time", dt_parse(v("time"), tz="Asia/Shanghai"))
      ```



  * 加工结果

      ```
      time: 2019-07-10 06:58:19
      new_time: 2019-07-10 06:58:19+08:00
      ```





* 场景3：带时区的日期时间字符串转换为目标时区的日期时间对象。

  * 原始日志

      ```
      time : 2019-06-04 2:41:26+08:00
      ```



  * SLS DSL编排

      ```python
      e_set(
            "new_time",
            dt_astimezone(v("time"),
                  tz="America/Los_Angeles"
            )
      )
      ```



  * 加工结果

      ```
      new_time : 2019-06-03 11:41:26-07:00
      time : 2019-06-04 2:41:26+08:00
      ```


## 日期时间偏移

* 处理函数

  * `dt_add`函数的参数如下：

      ```python
      dt_add(
            字段名, dt1=None, dt2=None,
            year(s)=None, month(s)=None,
            day(s)=None, hour(s)=None,
            minute(s)=None, second(s)=None,
            microsecond(s)=None,
            weeks(s)=None,
            weekday=None
      )
      ```

    `year(s)`、`month(s)`、`day(s)`等参数的后面都带有s，表示这些参数可以有两种形式，即`year`和`years`，`month`和`months`等。以`year`和`years`为例，如果参数传递的是`year`，表示在年份粒度上覆盖为`year`参数的值；如果传递的是`years`，表示在年份粒度上增加`years`参数的值。同时要一起组合使用的`dt_add`函数支持在特定时间粒度上修改（增加、减少、覆盖）日期时间的值。

  * `dt_add`中`weekday`参数通常和`dt_MO`，`dt_TU`等参数一起使用，表示特定星期几的偏移，如下例所示。具体请参见[dt_MO](https://help.aliyun.com/document_detail/125409.htm?spm=a2c4g.11186623.2.12.169c3cb8rqBjjU#section-bm9-1dd-jnv)。



* 场景1：按年和月进行日期偏移。按年和月进行日期偏移如下例所示。

  * 原始日志

      ```
      time1 : 2019-06-04 2:41:26
      ```



  * SLS DSL编排1

      ```python
      e_set("time2", dt_add(v("time1"), year=2018))
      ```



  * 加工结果1

      ```
      time1 : 2019-06-04 2:41:26
      time2 : 2018-06-04 02:41:26
      ```



  * SLS DSL编排2

      ```python
      e_set("time2", dt_add(v("time1"), years=2018))
      ```



  * 加工结果2

      ```
      time1 : 2019-06-04 2:41:26
      time2 : 4037-06-04 02:41:26
      ```


* 场景2：按周进行日期偏移。按周进行日期偏移如下例所示：

  * 原始日志

      ```
      #2019-06-04是周二
      time1 : 2019-06-04 2:41:26
      ```



  * SLS DSL编排

      ```python
      #time1的下一个星期一对应的日期
      e_set(
            "nex_Monday",
            dt_add(v("time1"),
            weekday=dt_MO(1))
      )
      #time1的上一个星期二对应的日期
      e_set(
            "previous_Tuesday",
            dt_add(v("time1"),
            weekday=dt_TU(op_neg(1)))
      )
      #time1的下下一个星期六对应的日期
      e_set(
            "nex_next_Saturday",
            dt_add(v("time1"),
            weekday=dt_SA(2))
      )
      #time1的上上一个星期日对应的日期
      e_set(
            "previous_previous_Sunday",
            dt_add(v("time1"),
            weekday=dt_SU(op_neg(2)))
      )
      ```


  * 加工结果

      ```
      next_Monday : 2019-06-10 02:41:26
      next_next_Saturday : 2019-06-15 02:41:26
      previous_Tuesday : 2019-06-04 2:41:26
      previous_previous_Sunday : 2019-05-26 02:41:26
      time1 : 2019-06-04 2:41:26
      ```

  **说明** 如果`time1`对应周二，那么它的上一个周二和下一个周二都会是`time1`本身，整体上向前或向后偏离一周。





