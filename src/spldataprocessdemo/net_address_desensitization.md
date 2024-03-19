# 网址脱敏 
* 脱敏方法对日志内容中的网址做脱敏处理，可运用url_encode编码函数，对网址进行转码。
* 原始日志
  ```
  url: https://www.aliyun.com/sls?logstore
  ```
* DSL编排规则
  ```python
  * | extend encode_url=url_encode(url)
  ```
* 加工结果
  ```
  url: https://www.aliyun.com/sls?logstore
  encode_url: https%3A%2F%2Fwww.aliyun.com%2Fsls%3Flogstore
  ```