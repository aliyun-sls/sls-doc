# 背景信息
常见脱敏场景有为手机号、银行卡号、邮箱、IP、AK、身份证号网址、订单号、字符串等敏感信息脱敏。在SLS数据加工服务中，常见的脱敏方法是正则表达式parse-regexp和替换函数replace。
## 手机号脱敏  
* 脱敏方法日志中包含不希望被暴露的手机号，可采用正则表达式，运用 parse-regexp和concat函数脱敏。
* 原始日志
  ```
  iphone: 13012345678
  ```
* DSL编排规则
  ```python
  * | parse-regexp iphone, '(\d{0,3})\d{4}(\d{4})' as iphone1,iphone2 | extend sec_iphone = concat(iphone1, '***', iphone2) | project-away iphone1,iphone2
  ```
* 加工结果
  ```
  iphone: 13012345678
  sec_iphone: 130****5678
  ```