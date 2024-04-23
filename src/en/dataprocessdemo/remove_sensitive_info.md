# 数据脱敏

数据脱敏可以有效地减少敏感数据在加工、传输、使用等环节中的暴露，降低敏感数据泄露的风险，保护用户权益。本文为您介绍日志服务数据加工过程中常见的脱敏 Scenario、对应的脱敏方法及示例。

## Scenario 1：手机号脱敏

- 脱敏方法日志中包含不希望被暴露的手机号，可采用正则表达式，运用 _regex_replace_ 函数脱敏。

- 示例

  - Raw log entries

    ```
    iphone: 13012345678
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "sec_iphone",
        regex_replace(v('iphone'),
        r"(\d{0,3})\d{4}(\d{4})",
        replace=r"\1****\2")
    )
    ```

  - Transformation result
    ```
    iphone: 13012345678
    sec_iphone: 130****5678
    ```

## Scenario 2：银行卡信息脱敏

- 脱敏方法日志中包含银行卡或者信用卡信息，可采用正则表达式，运用 _regex_replace_ 函数隐藏关键数据而脱敏。

- 示例

  - Raw log entries

    ```
    content: bank number is 491648411333978312 and credit card number is 4916484113339780
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "bank_number",
        regex_replace(
                v('content'),
                r'([1-9]{1})(\d{11}|\d{13}|\d{14})(\d{4})',
                replace=r"****\3"
        )
    )
    ```

  - Transformation result

    ```
    content: bank number is 491648411333978312 and credit card number is 4916484113339780
    bank_number: bank number is ****978312 and credit card number is ****9780
    ```

## Scenario 3：邮箱地址脱敏

- 脱敏方法日志中包含邮箱信息，可采用正则表达式，运用 _regex_replace_ 函数脱敏。

- 示例

  - Raw log entries

    ```
    content: email is twiss2345@aliyun.com
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "email_encrypt",
        regex_replace(
                v('content'),
                r'[A-Za-z\d]+([-_.][A-Za-z\d]+)*(@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4})',
                replace=r"****\2"
        )
    )
    ```

  - 处理后数据

    ```
    content: email is twiss2345@aliyun.com
    email_encrypt: email is ****@aliyun.com
    ```

## Scenario 4：AK 脱敏

- 脱敏方法日志中包含 AccessKey 信息，可采用正则表达式，应用 _regex_replace_ 函数。

- 示例

  - Raw log entries

    ```
    content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "akid_encrypt",
        regex_replace(v('content'),
        r'([a-zA-Z0-9]{4})(([a-zA-Z0-9]{26})|([a-zA-Z0-9]{12}))',
        replace=r"\1****")
    )
    ```

  - Transformation result

    ```
    content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
    akid_encrypt: ak id is rDhc**** and ak key is XQr1****
    ```

## Scenario 5：IP 脱敏

- 脱敏方法日志中包含 IP 信息，可同时运用 _regex_replace_ 函数和 _grok_ 函数，对 IP 地址进行正则捕获后而脱敏。

- 示例

  - Raw log entries

    ```
    content: ip is 192.168.1.1
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "ip_encrypt",
        regex_replace(
                v('content'),
                grok('(%{IP})'),
                replace=r"****"
        )
    )
    ```

  - Transformation result

    ```
    content: ip is 192.168.1.1
    ip_encrypt: ip is ****
    ```

## Scenario 6：身份证脱敏

- 脱敏方法日志中包含身份证信息，可同时运用 _regex_replace_ 函数和 _grok_ 函数，对身份证号进行正则捕获后而脱敏。

- 示例

  - Raw log entries

    ```
    content: Id card is 11010519491231002X
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "id_encrypt",
        regex_replace(
                v('id_card'content'),
                grok('(%{CHINAID})'),
                replace=r"\1****"
        )
    )
    ```

  - Transformation result

    ```
    content: Id card is 11010519491231002X
    id_encrypt: idcard is 110105****
    ```

## Scenario 7：网址脱敏

- 脱敏方法对日志内容中的网址做脱敏处理，并且将脱敏的数据转成明文格式，可运用 Base64 编码解码函数，对网址进行转码。

- 示例

  - Raw log entries

    ```
    url: https://www.aliyun.com/sls?logstore
    ```

  - DSL orchestration 规则

    ```python
    e_set("base64_url",base64_encoding(v("url")))
    ```

  - Transformation result

    ```
    url: https://www.aliyun.com/sls?logstore
    base64_url: aHR0cHM6Ly93d3cuYWxpeXVuLmNvbS9zbHM/bG9nc3RvcmU=
    ```

    **Note** 如果想对`base64_url`进行解码，可以使用`base64_decoding(v("base64_url"))`DSL 语法规则。

## Scenario 8：订单号脱敏

- 脱敏方法对日志内容中的订单号做脱敏处理，同时不希望其他人能够解码，可运用 MD5 编码函数，对订单号进行编码。

- 示例

  - Raw log entries

    ```
    orderId: 15121412314
    ```

  - DSL orchestration 规则

    ```python
    e_set("md5_orderId",md5_encoding(v("orderId")))
    ```

  - Transformation result

    ```
    orderId: 15121412314
    md5_orderId: 852751f9aa48303a5691b0d020e52a0a
    ```

## Scenario 9：字符串脱敏

- 脱敏方法您希望日志中的关键字符串不被暴露，可通过 _str_translate_ 函数制订映射规则，对关键字符或字符串进行映射脱敏。

- 示例

  - Raw log entries

    ```
    data: message level is info_
    ```

  - DSL orchestration 规则

    ```python
    e_set(
        "data_translate",
        str_translate(
                v("data"),
                "aeiou",
                "12345"
        )
    )
    ```

  - Transformation result

    ```
    data: message level is info
    data_translate: m2ss1g2 l2v2l 3s 3nf4
    ```
