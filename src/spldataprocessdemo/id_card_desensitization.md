# 身份证脱敏
* 脱敏方法日志中包含身份证信息，可采用正则表达式，运用parse-regexp和replace函数脱敏。
* 原始日志
  ```
  content: Id card is 11010519491231002X
  ```
* DSL编排规则
  ```python
  * | parse-regexp content, '\w+\s+\w+\s+\d{6}(\S+)' as content1|extend id_encrypt=replace(content,content1,'****')| project-away content1
  ```
* 加工结果
  ```
  content: Id card is 11010519491231002X
  id_encrypt: Id card is 110105****
  ```
