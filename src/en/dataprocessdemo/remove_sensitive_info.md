# Data masking

When you transform, transmit, or use data, you can configure data masking rules to reduce the exposure of sensitive data. This way, you can mitigate the risk of data breaches in an efficient manner.This topic describes how to use functions to mask sensitive data in various scenarios.

## Scenario 1: Mask mobile phone numbers

- Solution. To mask mobile phone numbers in log entries, you can use the _regex_replace_ function.

- example

  - Raw log entries

    ```
    iphone: 13012345678
    ```

  - DSL orchestration rule

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

## Scenario 2: Mask bank card information

- Solution. To mask bank card information or credit card information in log entries, you can use the _regex_replace_ function.

- example

  - Raw log entries

    ```
    content: bank number is 491648411333978312 and credit card number is 4916484113339780
    ```

  - DSL orchestration rule

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

## Scenario 3: Mask email addresses

- Solution. To mask email addresses in log entries, you can use the _regex_replace_ function.

- example

  - Raw log entries

    ```
    content: email is twiss2345@aliyun.com
    ```

  - DSL orchestration rule

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

  - Processed data

    ```
    content: email is twiss2345@aliyun.com
    email_encrypt: email is ****@aliyun.com
    ```

## Scenario 4: Mask AccessKey pairs

- Solution. To mask AccessKey pairs in log entries, you can use the _regex_replace_ function.

- Example

  - Raw log entries

    ```
    content: ak id is rDhc9qxjhIhlBiyphP7buo5yg5h6Eq and ak key is XQr1EPtfnlZLYlQc
    ```

  - DSL orchestration rule

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

- Example

  - Raw log entries

    ```
    content: ip is 192.168.1.1
    ```

  - DSL orchestration rule

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

## Scenario 6: Mask ID card numbers

- Solution. To capture and mask ID card numbers in log entries, you can use the _regex_replace_ function and the _Grok_ function.

- Example

  - Raw log entries

    ```
    content: Id card is 11010519491231002X
    ```

  - DSL orchestration rule

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

## Scenario 7: Mask URLs

- Solution. To mask URLs in log entries, you can convert the URLs to plaintext and then use Base64 encoding and decoding functions to transcode the URLs.

- Example

  - Raw log entries

    ```
    url: https://www.aliyun.com/sls?logstore
    ```

  - DSL orchestration rule

    ```python
    e_set("base64_url",base64_encoding(v("url")))
    ```

  - Transformation result

    ```
    url: https://www.aliyun.com/sls?logstore
    base64_url: aHR0cHM6Ly93d3cuYWxpeXVuLmNvbS9zbHM/bG9nc3RvcmU=
    ```

    **Note** To decode the value of the `base64_url` field, you can use the `base64_decoding(v("base64_url"))` function.

## Scenario 8: Mask order numbers

- Solution. To mask order numbers in log entries and prevent other users from decoding the order numbers, you can use the MD5 encoding function to encode the order numbers.

- Example

  - Raw log entries

    ```
    orderId: 15121412314
    ```

  - DSL orchestration rule

    ```python
    e_set("md5_orderId",md5_encoding(v("orderId")))
    ```

  - Transformation result

    ```
    orderId: 15121412314
    md5_orderId: 852751f9aa48303a5691b0d020e52a0a
    ```

## Scenario 9: Mask strings

- Solution. To mask key characters or strings in log entries, you can use the _str_translate_ function to configure mapping rules for the characters or strings.

- Example

  - Raw log entries

    ```
    data: message level is info_
    ```

  - DSL orchestration rule

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
