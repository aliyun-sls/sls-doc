# 转换日志参数类型  
* 子场景1：调用concat函数进行字符拼接。
  * 输入数据
    ```
    x: 123
    y: 100
    ```
  * SPL语句
    ```python
    * | extend a=cast(x as bigint) + cast(y as bigint)| extend b=concat(x, y)
    ```
  * 输出结果
    ```
    x: 123
    y: 100
    a: 223
    b: 123100
    ```
* 子场景2：调用字符串或日期时间转换为标准时间。
    如下将time1表示的日期时间转化为Unix时间戳：
    * 原始日志
      ```
      time1: 2020-09-17 9:00:00
      ```
    * 加工规则将time1表示的日期时间转化为Unix时间戳。
      ```python
      * | extend time1=cast(time1 as TIMESTAMP) | extend new_time=to_unixtime(time1)
      ```
    * 加工结果
      ```
      time1:  2020-09-17 9:00:00
      time2:  1600333200.0
      ```