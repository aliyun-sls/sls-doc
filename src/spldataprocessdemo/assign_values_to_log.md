# 为日志空缺字段赋值
* 子场景1：原字段不存在或者为空时，为字段赋值。
  ```python
  | extend <output>=<expression>, ...
  ```
  示例如下所示：
  * 输入数据
    ```
    name:
    ```
  * SPL语句：为name字段赋值
    ```python
    * | extend name='lily'
    ```
  * 输出结果
    ```
    name:lily
    ```
* 子场景2：使用正则表达式从文本字段中提取结构化内容。
  ```python
  | parse-regexp -flags=<flags> <field>, <pattern> as <output>, ...
  ```
  示例如下所示：
  * 输入数据
    ```
    content: '10.0.0.0 GET /index.html 15824 0.043'
    ```
  * SPL语句
    ```python
    * | parse-regexp content, '(\S+)' as ip | parse-regexp content, '\S+\s+(\w+)' as method
    ```
  * 输出结果
    ```
    content: '10.0.0.0 GET /index.html 15824 0.043'
    ip: '10.0.0.0'
    method: 'GET'
    ```
* 子场景3：为多个字段赋值。
  ```python
  | extend <output>=<expression> | extend <output1>=<expression> | <output2>=<expression>
  ```
  示例如下所示：
  * 输入数据
    ```
    __source__:  192.168.0.1
    __topic__:
    __tag__:
    __receive_time__:
    id:  7990
    test_string:  <function test1 at 0x1020401e0>
    ```
  * SPL语句：为__topic__字段、__tag__字段和__receive_time__字段赋值
    ```python
    * | extend __topic__='app' | extend __tag__='stu' | extend __receive_time__='1597214851'
    ```
  * 输出数据
    ```
    __source__:  192.168.0.1
    __topic__:  app
    __tag__:  stu
    __receive_time__:  1597214851
    id:  7990
    test_string:  <function test1 at 0x1020401e0>
    ```