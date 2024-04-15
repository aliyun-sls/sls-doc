# 日期时间对象和Unix时间戳的相互转换

* 处理函数

  * date_format函数用于将timestamp类型的日期和时间对象转换为指定格式的日期和时间字符串。

  * date_parse函数用于将日期和时间字符串转换为指定格式的timestamp类型的日期和时间对象。


* 场景一：使用date_format将timestamp类型的日期和时间对象转换为指定格式的日期时间字符串。

  * 原始日志

      ```
      time: 2023-09-21 10:59:37.055
      ```


  * SPL语句

      ```python
      * | extend time=cast(time as TIMESTAMP) | extend new_time=date_format(time, '%H:%i:%s')
      ```


  * 查询和分析结果

      ```
      time: 2023-09-21 10:59:37.055
      new_time: 10:59:37
      ```
* 场景二：使用date_parse将日期时间字符串转换为指定格式的timestamp类型的日期和时间对象。

  * 原始日志

      ```
      time: 2022-10-19 15:46:05
      ```


  * SPL语句

      ```python
      * | extend time=cast(time as varchar) | extend new_time=date_parse(time, '%Y-%m-%d %H:%i:%s')
      ```


  * 查询和分析结果

      ```
      time: 2022-10-19 15:46:05
      new_time: 2022-10-19 T15:46:05.000
      ```

