# 关键字加工
parse-kv函数可以通过prefix=""对关键字和值进行加工。
* 原始日志
  ```
  k1: q=asd&a=1&b=2
  ```
* SPL
  ```python
  * | parse-kv -delims='&' -prefix='start_' k1
  ```
* SPL加工后的数据都是关键字加工形式，如下：
  ```
  k1: q=asd&a=1&b=2
  start_a: 1
  start_b: 2
  start_q: asd
  ```