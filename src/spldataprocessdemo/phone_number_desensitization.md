# 数据脱敏
数据脱敏可以有效地减少敏感数据在加工、传输、使用等环节中的暴露，降低敏感数据泄露的风险，保护用户权益。本文为您介绍日志服务数据加工过程中常见的脱敏场景、对应的脱敏方法及示例。
## 背景信息
常见脱敏场景有为手机号、银行卡号、邮箱、IP、AK、身份证号、网址、字符串等敏感信息脱敏。在SLS数据加工服务中，常见的脱敏方法是正则表达式函数[regexp_replace](https://help.aliyun.com/document_detail/63453.htm?spm=a2c4g.11186623.0.0.22597b01DMDUTb#section-un6-0un-8l7)。

## 场景一：手机号脱敏  
* 脱敏方法日志中包含不希望被暴露的手机号，可采用正则表达式regexp_replace函数脱敏。
* 子场景1：展示手机号的前三位和后四位，中间隐藏。
  * 原始日志
    ```
    message:{"data":{"receivePhoneNo":"13812345678"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'receivePhoneNo":\s*"([\+86]*1[3-9]{1}\d{1})\d{4}(\d{4,11})','receivePhoneNo":"\1****\2')
    ```
  * 加工结果
    ```
    message:{"data":{"receivePhoneNo":"13812345678"}}
    message1:{"data":{"receivePhoneNo":"138****5678"}}
    ```
* 子场景2：港澳地区展示手机号的前二位和后二位，中间隐藏。
  * 原始日志
    ```
    message:{"data":{"receivePhoneNo":"59092819"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'receivePhoneNo":\s*"(5|6|7|8|9)(\d{1})(\d{4})(\d{2})\"','receivePhoneNo":"\1\2****\4"')
    ```
  * 加工结果
    ```
    message:{"data":{"receivePhoneNo":"59092819"}}
    message1:{"data":{"receivePhoneNo":"59****19"}}
    ```
* 子场景3：台湾地区展示手机号的前二位和后二位，中间隐藏。
  * 原始日志
    ```
    message:{"data":{"receivePhoneNo":"020928198"}}
    ```
  * DSL编排规则
    ```python
    * | extend message = regexp_replace(message, 'receivePhoneNo":\s*"(0[2-9])(\d{5,6})(\d{2})\"','receivePhoneNo":"\1******\3"')
    ```
  * 加工结果
    ```
    message:{"data":{"receivePhoneNo":"020928198"}}
    message1:{"data":{"receivePhoneNo":"02******98"}}
    ```
## 场景二：银行卡信息脱敏
* 脱敏方法日志中包含银行卡或者信用卡信息，可采用正则表达式regexp_replace函数脱敏。
* 原始日志
  ```
  content: bank number is 491648411333978312 and credit card number is 4916484113339780
  ```
* DSL编排规则
  ```python
  * | extend bank_number=regexp_replace(content, '([1-9]{1})(\d{11}|\d{13}|\d{14})(\d{4})', '****\3')
  ```
* 加工结果
  ```
  content: bank number is 491648411333978312 and credit card number is 4916484113339780
  bank_number: bank number is ****978312 and credit card number is ***9780
  ```
## 场景三：邮箱地址脱敏
* 脱敏方法日志中包含邮箱信息，可采用正则表达式regexp_replace函数脱敏。
* 子场景1：隐藏邮箱前缀。
  * 原始日志
    ```
    content: email is twiss2345@aliyun.com
    ```
  * SPL规则编排
    ```python
    * | extend email_encrypt=regexp_replace(content, '[A-Za-z\d]+([-_.][A-Za-z\d]+)*(@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4})', '****\2')
    ```
  * 处理后数据
    ```
    content: email is twiss2345@aliyun.com
    email_encrypt: email is ****@aliyun.com
    ```
* 子场景2：@前小于三个字符,后缀固定的邮箱脱敏。
  * 原始日志
      ```
      message:{"data":{"email":"tt@1111.com","icon":"ee@2.png"}}
      ```
  * SPL规则编排
    ```python
    * | extend message1 = regexp_replace(message,'":\s*"([A-Za-z0-9._%+-]{1,2})(@\w+\.)(com|net|org)\"','":"\1**\2\3"')
    ```
  * 处理后数据
    ```
    message:{"data":{"email":"tt@1111.com","icon":"ee@2.png"}}
    message1:{"data":{"email":"tt**@1111.com","icon":"ee@2.png"}}
    ```
* 子场景3：@前大于三个字符的邮箱脱敏。
  * 原始日志
      ```
      message:{"data":{"email":"ttewew@1111.com","icon":"esdse@2.png"}}
      ```
  * SPL规则编排
    ```python
    * | extend message1 = regexp_replace(message, 'email":\s*"([A-Za-z0-9._%+-]{3})([A-Za-z0-9._%+-]*)(@)(\w+\.\w+)"','email":"\1**\3\4"')
    ```
  * 处理后数据
    ```
    message:{"data":{"email":"ttewew@1111.com","icon":"esdse@2.png"}}
    message1:{"data":{"email":"tte**@1111.com","icon":"esdse@2.png"}}
    ```
## 场景四：AK脱敏
* 脱敏方法日志中包含AccessKey信息，可采用正则表达式regexp_replace函数脱敏。
* 原始日志
  ```
  content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
  ```
* DSL编排规则
  ```python
  * | extend akid_encrypt=regexp_replace(content, '([a-zA-Z0-9]{4})(([a-zA-Z0-9]{26})|([a-zA-Z0-9]{12}))', '\1****')
  ```
* 加工结果
  ```
  content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
  akid_encrypt: ak id is rDhc**** and ak key is XQr1****
  ```
## 场景五：IP脱敏
* 脱敏方法日志中包含IP信息，可采用正则表达式regexp_replace函数脱敏。
* 原始日志
  ```
  content: ip is 192.168.1.1
  ```
* DSL编排规则
  ```python
  * | extend ip_encrypt=regexp_replace(content, '(\w+\s+\w+\s+)\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}', '\1****')
  ```
  * 加工结果
  ```
  content: ip is 192.168.1.1
  ip_encrypt: ip is ****
  ```
## 场景六：身份证脱敏
* 脱敏方法日志中包含身份证信息，可采用正则表达式regexp_replace函数脱敏。
* 子场景1：展示身份证前六位，后面隐藏。
  * 原始日志
    ```
    content: Id card is 11010519491231002X
    ```
  * DSL编排规则
    ```python
    * | extend id_encrypt=regexp_replace(content, '([\d]{4})[\d]{11}([\d]{2}[\d|Xx])', '\1****')
    ```
  * 加工结果
    ```
    content: Id card is 11010519491231002X
    id_encrypt: Id card is 110105****
    ```
* 子场景2：展示身份证前四位和后三位，中间隐藏。
  * 原始日志
    ```
    message:{"data":{"cardNumber":"410106171821090234","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'cardNumber":\s*"([\d]{4})[\d]{11}([\d]{2}[\d|Xx])\"','cardNumber":"\1****\2"')
    ```
  * 加工结果
    ```
    message:{"data":{"cardNumber":"410106171821090234","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    message1:{"data":{"cardNumber":"4101****234","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    ```
* 子场景3：展示护照首字母和最后三位数字，中间隐藏。
  * 原始日志
    ```
    message:{"data":{"cardNumber":"410106171821090234","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'cardNumber":\s*"([G|E|H|M|P|B|D])\d{6}(\d{3})\"','cardNumber":"\1****\2"')
    ```
  * 加工结果
    ```
    message:{"data":{"cardNumber":"410106171821090234","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    message1:{"data":{"cardNumber":"410106171821090234","cardNumber":"E****451","receivePhoneNo":"13812345678"}}
    ```
* 子场景4：展示港澳通行证第五位至第八位，前面隐藏。
  * 原始日志
    ```
    message:{"data":{"cardNumber":"18210902","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'cardNumber":\s*"([\d]{4})([\d]{4})\"','cardNumber":"****\2"')
    ```
  * 加工结果
    ```
    message:{"data":{"cardNumber":"18210902","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    message1:{"data":{"cardNumber":"****0902","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    ```
* 子场景5：仅展示前二位和后二位，中间隐藏。
  * 原始日志
    ```
    message:{"data":{"cardNumber":"18210902","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'cardNumber":\s*"([A-Z])(\d{1})([\d]{6})([\d]{2})\"','cardNumber":"\1\2******\4"')
    ```
  * 加工结果
    ```
    message:{"data":{"cardNumber":"18210902","cardNumber":"E138123451","receivePhoneNo":"13812345678"}}
    message1:{"data":{"cardNumber":"18210902","cardNumber":"E1******51","receivePhoneNo":"13812345678"}}
    ```
## 场景七：网址脱敏 
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
## 场景八：订单号脱敏
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
## 场景九：家庭地址脱敏
* 脱敏方法日志中包含地址信息，可采用正则表达式regexp_replace函数脱敏。
* 原始日志
  ```
  message:{"data":{"address":"上海市徐汇区漕河泾开发区文景路90号"}}
  ```
* DSL编排规则
  ```python
  * | extend message1 = regexp_replace(message, 'address":\s*"(.*(省|市|自治区|特别行政区|地区|县|区|市辖区))?(.*(区))(.*)\"','address":"\1\3**"')
  ```
* 加工结果
  ```
  message:{"data":{"address":"上海市徐汇区漕河泾开发区文景路90号"}}
  message1:{"data":{"address":"上海市徐汇区**"}}
  ```
## 场景十：姓名脱敏
* 脱敏方法日志中包含姓名，可采用正则表达式regexp_replace函数脱敏。
* 子场景1：三字姓名隐藏中间。
  * 原始日志
    ```
    message:{"data":{"name":"卫小明"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'name":\s*"([\x{4e00}-\x{9fa5}])([\x{4e00}-\x{9fa5}])([\x{4e00}-\x{9fa5}])\"','name":"\1*\3"')
    ```
  * 加工结果
    ```
    message:{"data":{"name":"卫小明"}}
    message1:{"data":{"name":"卫*明"}}
    ```
* 子场景2：二字姓名仅展示末位。
  * 原始日志
    ```
    message:{"data":{"name":"卫明"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'name":\s*"[\x{4e00}-\x{9fa5}]([\x{4e00}-\x{9fa5}])\"','name":"*\1"')
    ```
  * 加工结果
    ```
    message:{"data":{"name":"卫明"}}
    message1:{"data":{"name":"*明"}}
    ```
* 子场景3：英文名字仅展示首字母。
  * 原始日志
    ```
    message:{"data":{"name":"Sam Alice"}}
    ```
  * DSL编排规则
    ```python
    * | extend message1 = regexp_replace(message, 'name":\s*"([a-zA-Z])[a-zA-Z]+\s+([a-zA-Z])[a-zA-Z]+','name":"\1**** \2****"')
    ```
  * 加工结果
    ```
    message:{"data":{"name":"Sam Alice"}}
    message1:{"data":{"name":"S**** A****""}}
    ```