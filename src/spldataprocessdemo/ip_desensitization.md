# IP脱敏
● 脱敏方法日志中包含IP信息，可采用正则表达式，运用parse-regexp和replace函数脱敏。
* 原始日志
  ```
  content: ip is 192.168.1.1
  ```
* DSL编排规则
  ```python
  * | parse-regexp content, '\w+\s+\w+\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' as content1|extend ip_encrypt=replace(content,content1,'****')| project-away content1
  ```
  * 加工结果
  ```
  content: ip is 192.168.1.1
  ip_encrypt: ip is ****
  ```
