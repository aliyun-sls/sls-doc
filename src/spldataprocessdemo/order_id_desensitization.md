# 订单号脱敏
* 脱敏方法对日志内容中的订单号做脱敏处理，同时不希望其他人能够解码，可运用md5编码函数，对订单号进行编码。
* 原始日志
  ```
  orderId: 15121412314
  ```
* DSL编排规则
  ```python
  * | extend md5_orderId=to_hex(md5(to_utf8(orderId)))
  ```
* 加工结果
  ```
  orderId: 15121412314
  md5_orderId: 852751F9AA48303A5691B0D020E52A0A
  ```