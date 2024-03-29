# AK脱敏
* 脱敏方法日志中包含AccessKey信息，可采用正则表达式，运用parse-regexp和replace函数脱敏。
* 原始日志
  ```
  content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
  ```
* DSL编排规则
  ```python
  * | parse-regexp content, '[\S+\s+]{3}[a-zA-Z0-9]{4}([a-zA-Z0-9]{26})\s+\S+\s+\S+\s+\S+\s+\S+\s+\S+([a-zA-Z0-9]{12})' as content1,content2|extend content3=replace(content,content1,'****')|extend akid_encrypt=replace(content3,content2,'****')| project-away content1,content2,content3
  ```
* 加工结果
  ```
  content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
  akid_encrypt: ak id is rDhc**** and ak key is XQr1****
  ```
