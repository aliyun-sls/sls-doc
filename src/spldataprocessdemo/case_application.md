# 客户案例
例如某网站日志中有一个URL数据，针对这条数据有提取需求，按照需求设计加工规则处理日志内容。

* 需求
  * 需求1：对日志解析出proto、domain、param等内容。
  * 需求2：对param中的键值对做展开操作。
  * 原始日志
    ```
    __source__:  10.43.xx.xx
    __tag__:__client_ip__:  12.120.xx.xx
    __tag__:__receive_time__:  1563517113
    __topic__:
    request:  https://yz.m.sm.cn/video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
    ```
  * SPL方案
    ```python
    * | parse-regexp request, '([^:]+)://([^/]+)(.+)' as uri_proto, uri_domain, uri_param | parse-regexp uri_param, '([^?]*)\?(.*)' as uri_path,uri_query | parse-kv -delims='&?' uri_query
    ```
* 细分规则及对应的SPL处理结果
  1. 使用parse-regexp对字段request进行解析
     * 使用非命名正则捕获
         ```python
         * | parse-regexp request, '([^:]+)://([^/]+)(.+)' as uri_proto, uri_domain, uri_param
         ```
     * 对应加工结果：
       ```
       uri_proto:  https
       uri_domain:  yz.m.sm.cn
       uri_param:  /video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
       ```
  2. 使用parse-regexp对字段uri_param进行解析。
      * 使用非命名正则捕获
        ```python
        * | parse-regexp uri_param, '([^?]*)\?(.*)' as uri_path,uri_query
        ```
      * 对应加工结果：
        ```
        uri_path:  /video/getlist/s
        uri_query:  ver=3.2.3&app_type=supplier&os=Android8.1.0
        ```
  3. 对uri_param进行字段提取，具体操作如下：
      ```python
      * | parse-kv -delims='&?' uri_query
      ```
    * 对应加工结果：
      ```
      ver:  3.2.3
      app_type:  supplier
      os:  Android8.1.0
      ```
* SPL结果预览处理后日志：
    ```
    __source__:  10.43.xx.xx
    __tag__:__client_ip__:  12.120.xx.xx
    __tag__:__receive_time__:  1563517113
    __topic__:
    request:  https://yz.m.sm.cn/video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
    uri_domain:  yz.m.sm.cn
    uri_path:  /video/getlist/s
    uri_proto:  https
    uri_query:  ver=3.2.3&app_type=supplier&os=Android8.1.0
    app_type:  supplier
    os:  Android8.1.0
    ver:  3.2.3
    ```
假如只有解析request需求，可以直接对字段request使用parse-kv函数。例如：
  ```python
  * | parse-kv -delims='&?' request
  ```
预览处理后日志：
  ```
  __source__:  10.43.xx.xx
  __tag__:__client_ip__:  12.120.xx.xx
  __tag__:__receive_time__:  1563517113
  __topic__:
  request:  https://yz.m.sm.cn/video/getlist/s?ver=3.2.3&app_type=supplier&os=Android8.1.0
  app_type:  supplier
  os:  Android8.1.0
  ver:  3.2.3
  ```

