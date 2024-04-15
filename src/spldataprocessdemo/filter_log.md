# 过滤日志
可使用where指令进行过滤。
常用规则如下所示：

  ```python
  where <bool-expression>
  ```
  示例如下所示：
  * 子场景一：根据字段内容过滤数据条目
    * 原始日志
      ```
      #日志1
      __source__:  192.168.0.1
      __tag__:__client_ip__:  192.168.0.2
      __tag__:__receive_time__:  1597214851
      __topic__: app
      class:  test_case
      id:  7992
      test_string:  <function test1 at 0x1027401e0>
      #日志2
      __source__:  192.168.0.1
      __tag__:__client_ip__:  192.168.0.2
      __tag__:__receive_time__:  1597214861
      __topic__: web
      class:  test_case
      id:  7992
      test_string:  <function test1 at 0x1027401e0>
      ```
    * SPL语句：丢弃__topic__字段为的app日志。
      ```python
      * | where __topic__!='app'
      ```
    * 结果
      ```
      __source__:  192.168.0.1
      __tag__:__client_ip__:  192.168.0.2
      __tag__:__receive_time__:  1597214861
      __topic__: web
      class:  test_case
      id:  7992
      test_string:  <function test1 at 0x1027401e0>
      ```
  * 子场景2：使用匹配字段名的正则表达式过滤数据条目。
    * 原始日志
      ```
      #日志1
      __source__:  192.168.0.1
      __tag__:__client_ip__:  192.168.0.2
      __tag__:__receive_time__:  1597214851
      __topic__: app
      class:  test_case
      id:  7992
      test_string:  <function test1 at 0x1027401e0>
      server_protocol：test
      #日志2
      __source__:  192.168.0.1
      __tag__:__client_ip__:  192.168.0.2
      __tag__:__receive_time__:  1597214861
      __topic__: web
      class:  test_case
      id:  7992
      test_string:  <function test1 at 0x1027401e0>
      server_protocol: 14861
      ```
    * SPL语句：保留server_protocol为数字的字段。。
      ```python
      * | where regexp_like(server_protocol, '\d+')
      ```
    * 结果
      ```
      __source__:  192.168.0.1
      __tag__:__client_ip__:  192.168.0.2
      __tag__:__receive_time__:  1597214861
      __topic__: web
      class:  test_case
      id:  7992
      test_string:  <function test1 at 0x1027401e0>
      server_protocol: 14861
      ```