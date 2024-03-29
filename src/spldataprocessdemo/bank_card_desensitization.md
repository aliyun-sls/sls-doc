# 银行卡信息脱敏
* 脱敏方法日志中包含银行卡或者信用卡信息，可采用正则表达式，运用parse-regexp和replace 函数隐藏关键数据而脱敏。
* 原始日志
  ```
  content: bank number is 491648411333978312 and credit card number is 4916484113339780
  ```
* DSL编排规则
  ```python
  * | parse-regexp content, '[\w\s]+([1-9]{12})(\d{6})[\s\w]+([1-9]{12})(\d{4})' as content1,content2,content3,content4 | extend bank_number=replace(content,content1,'****')| project-away content1,content2,content3,content4
  ```
* 加工结果
  ```
  content: bank number is 491648411333978312 and credit card number is 4916484113339780
  bank_number: bank number is ****978312 and credit card number is ***9780
  ```