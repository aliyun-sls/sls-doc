# 事件判断

通过事件判断可以更好地对符合特定条件的数据进行相应操作，让加工逻辑更可靠。本文主要介绍使用函数进行事件判断的常见场景和最佳方案示例。

## 场景1：判断字段是否存在
* 原始日志
    ```
    a: a_value
    b:       //空字符串
    ```
* SLS DSL编排
  * 方案一（推荐）：采用**e_has**或**e_not_has**。
    ```python
    e_if(e_has("a"),e_set("has_a", true))
    e_if(e_has("b"),e_set("has_b", true))
    e_if(e_has("c"),e_set("has_c", true))
    e_if(e_not_has("a"),e_set("not_has_a", true))
    e_if(e_not_has("b"),e_set("not_has_b", true))
    e_if(e_not_has("c"),e_set("not_has_c", true))
    ```
  * 方案二：采用**e_search**。
    ```python
    e_if(e_search('a: *'),e_set("has_a", true))
    e_if(e_search('b: *'), e_set("has_b", true))
    e_if(e_search('c: *'), e_set("has_c", true))
    e_if(e_search('not a: *'), e_set("not_has_a", true))
    e_if(e_search('not b: *'), e_set("not_has_b", true))
    e_if(e_search('not c: *'), e_set("not_has_c", true))
    ```
    **说明** 加工规则中的**e_if**可通过**e_if**(**条件1，操作1，条件2，操作2**)的形式合并为一项，此处和本文其他处的拆分是为了方便阅读。
* 加工结果
    ```python
    a:a_value
    b:    //空字符串
    has_a: true
    has_b: true
    has_c: false
    not_has_a: false
    not_has_b: false
    not_has_c: true
    ```
## 场景2：判断字段值是否存在且不为空
* 原始日志
    ```
    a: a_value
    b:     // 空字符串
    ```
* SLS DSL编排
  * 方案一（推荐）：采用字段取值函数**v**
    ```python
    e_if(v("a"), e_set("not_empty_a", true))
    e_if(v("b"), e_set("not_empty_b", true))
    e_if(v("c"), e_set("not_empty_c", true))
    ```
    **说明** 字段取值函数**v**，当对应字段存在且值不为空时，其自动转换的**Bool**值为**true**，否则为false。
  * 方案二：采用e_search
    ```python
    #至少一个字符
    e_if(e_search('a: "?"'), e_set("not_empty_a", true))
    e_if(e_search('b: "?"'), e_set("not_empty_b", true))
    e_if(e_search('c: "?"'), e_set("not_empty_c", true))

    #正则
    e_if(e_search('a~=".+"'), e_set("not_empty_a", true))
    e_if(e_search('b~=".+"'), e_set("not_empty_b", true))
    e_if(e_search('c~=".+"'), e_set("not_empty_c", true))

    #存在且不为空
    e_if(e_search('a: * and not a==""'), e_set("not_empty_a", true))
    e_if(e_search('b: * and not b==""'), e_set("not_empty_b", true))
    e_if(e_search('c: * and not c==""'), e_set("not_empty_b", true))
    ```
* 加工结果
    ```
    a: a_value
    b:     //空串
    not_empty_a: true
    not_empty_b: false
    not_empty_c: false
    ```
## 场景3：判断字段值是否存在且为空
* 原始日志
    ```
    a: a_value
    b:       // 空字符串
    ```
* SLS DSL编排


  * 方案一（推荐）：采用字段取值函数**v**
    ```python
    e_if(op_and(e_has("a"), op_not(v("a"))), e_set("empty_a", true))
    e_if(op_and(e_has("b"), op_not(v("b"))), e_set("empty_b", true))
    e_if(op_and(e_has("c"), op_not(v("c"))), e_set("empty_c", true))
    # 错误方案
    e_if(op_not(v("a")), e_set("empty_a", true))
    e_if(op_not(v("b")), e_set("empty_b", true))
    e_if(op_not(v("c")), e_set("empty_c", true))
    ```

    **说明** 字段取值函数**v**，当对应字段存在且值不为空时，其自动转换的**Bool**值为**true**，否则为**false**。当值不存在时，其返回true，op_not(None)时也是返回true。
  * 方案二：采用**e_search**
    ```python
    e_if(e_search('a==""'), e_set("empty_a", true))
    e_if(e_search('b==""'), e_set("empty_b", true))
    e_if(e_search('c==""'), e_set("empty_c", true))
    # 错误调用
    e_if(e_search('a:""'), e_set("empty_a", true))
    e_if(e_search('b:""'), e_set("empty_b", true))
    ```

    **说明** 以上错误调用中，因函数**e_search**为部分查询，字段存在时，无论其值是否空串，空串**a**: ""一直为true。
* 加工结果
    ```
    a: a_value
    b:       //空字符串
    empty_a: false
    empty_b: true
    empty_b: false
    ```
## 场景4：基于字段值的逻辑查询判断
* 原始日志
    ```
    "日志1"
    http_host: example.com
    status: 200
    request_method: GET
    scheme: https
    header_length: 700
    body_length: 1200

    "日志2"
    http_host: example.org
    status: 200
    request_method: POST
    scheme: https
    header_length: 100
    body_length: 800

    "日志3"
    http_host: example.net
    status: 200
    request_method: GET
    scheme:  http
    header_length: 700
    body_length: 800

    "日志4"
    http_host: aliyundoc.com
    status: 404
    request_method: GET
    scheme: https
    header_length: 100
    body_length: 300
    ```
* 加工需求1
  为所有**status**字段值为200的日志事件，添加一个新字段**type**，其值为normal。
    * SLS DSL编排
      ```python
      e_if(e_match("status", "200"), e_set("type", "normal"))
      或
      e_if(e_search('status==200'), e_set("type", "normal"))
      ```
        **说明**
        * 简单场景下，以上两种编排均可。
        * 本文情况下可采用**status:200**，表示status是否包含200，但推荐使用**status==200**更精确。
    * 加工结果
      ```
      "日志1"
      type: normal
      http_host: example.com
      status: 200
      request_method: GET
      scheme: https
      header_length: 700
      body_length: 1200

      "日志2"
      type: normal
      http_host: example.org
      status: 200
      request_method: POST
      scheme: https
      header_length: 100
      body_length: 800

      "日志3"
      type: normal
      http_host: example.net
      status: 200
      request_method: GET
      scheme: http
      header_length: 700
      body_length: 800

      "日志4"
      http_host: aliyundoc.com
      status: 404
      request_method: GET
      scheme: https
      header_length: 100
      body_length: 300
      ```
* 加工需求2
  为所有**status**字段值为200，且**request_method**字段值为GET，且**scheme**字段值为https的日志事件添加一个新字段**type**，其值为normal。
    * SLS DSL编排
      ```python
      e_if(e_search('status==200 and request_method==GET and scheme==https'), e_set("type", "normal"))
      或
      e_if(e_match_all("status", "200", "request_method"，"GET", "scheme", "https"), e_set("type", "normal"))
      ```
      **说明**
      * 需要同时满足多个字段的匹配条件的应用场景中，您可采用**e_search**或**e_match_all**，**e_search**用法相对简洁。
      * 本文情况可以采用**status: 200**，表示status是否包含200，但推荐使用**status==200** 更精确。
  * 加工结果
    ```
    "日志1"
    type: normal
    http_host: example.com
    status: 200
    request_method: GET
    scheme: https
    header_length: 700
    body_length: 1200

    "日志2"
    http_host: example.org
    status: 200
    request_method: POST
    scheme: https
    header_length: 100
    body_length: 800

    "日志3"
    http_host: example.net
    status: 200
    request_method: GET
    scheme: http
    header_length: 700
    body_length: 800

    "日志4"
    http_host: aliyundoc.com
    status: 404
    request_method: GET
    scheme: https
    header_length: 100
    body_length: 300
    ```
* 加工需求3
  为所有**status**字段值为200，或**request_method**字段值为GET，或**scheme**字段值为https的日志事件添加一个字段**type**，其值为normal。
  * SLS DSL编排
    ```python
    e_if(e_search('status==200 or request_method==GET or scheme==https'), e_set("type", "normal"))
    或者
    e_if(e_match_any("status", "200", "request_method"，"GET", "scheme", "https"), e_set("type", "normal"))
    ```
  * 加工结果
      ```
      "日志1"
      type: normal
      http_host: example.com
      status: 200
      request_method: GET
      scheme: https
      header_length: 700
      body_length: 100

      "日志2"
      type: normal
      http_host: example.org
      status: 200
      request_method: POST
      scheme: https
      header_length: 100
      body_length: 800

      "日志3"
      type: normal
      http_host: example.net
      status: 200
      request_method: GET
      scheme: http
      header_length: 700
      body_length: 800

      "日志4"
      type: normal
      http_host: aliyundoc.com
      status: 404
      request_method: GET
      scheme: https
      header_length: 100
      body_length: 1300
      ```
* 加工需求4
  为所有**status**字段值为200，且**request_method**字段值为GET，且**header_length**，且**body_length**的字段值之和小于等于1000的日志事件，添加一个新字段**type**，其值为normal。
  * SLS DSL编排
      ```python
      e_if(
        op_and(
          e_search('stat  us: 200 and request_method: GET'),
          op_le(op_sum(v("header_length"), v("body_length")), 1000)
        ),
        e_set("type", "normal")
      )
      ```
      **说明** 在复杂的逻辑场景下，您可采用**e_search**和其他表达式函数的组合完成SLS DSL编排。
  * 加工结果
      ```
      "日志1"
      type: normal
      http_host: example.com
      status: 200
      request_method: GET
      scheme: https
      header_length: 700
      body_length: 100

      "日志2"
      http_host: example.org
      status: 200
      request_method: POST
      scheme: https
      header_length: 100
      body_length: 800

      "日志3"
      http_host: example.net
      status: 200
      request_method: GET
      scheme: http
      header_length: 700
      body_length: 800

      "日志4"
      http_host: aliyundoc.com
      status: 404
      request_method: GET
      scheme: https
      header_length: 100
      body_length: 1300
      ```