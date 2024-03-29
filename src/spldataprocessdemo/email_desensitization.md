# 邮箱地址脱敏
* 脱敏方法日志中包含邮箱信息，可采用正则表达式，运用parse-regexp和replace函数脱敏。
* 原始日志
  ```
  content: email is twiss2345@aliyun.com
  ```
* SPL规则编排
  ```python
  * | parse-regexp content, '\w+\s+\w+\s+(\S+)@\S+' as content1 | extend email_encrypt=replace(content,content1,'****')| project-away content1
  ```
* 处理后数据
  ```
  content: email is twiss2345@aliyun.com
  email_encrypt: email is ****@aliyun.com
  ```