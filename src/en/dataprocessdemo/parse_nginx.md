# 解析 Nginx 日志

Nginx 访问日志记录了用户访问的详细信息，解析 Nginx 访问日志对业务运维具有重要意义。本文介绍如何使用正则表达式函数或 GROK 函数解析 Nginx 访问日志。

**说明**

- GROK 模式的本质是正则表达式，在有需要的情况下，可以组合使用 GROK 与正则表达式。
- 自定义的 Nginx 日志格式，可以通过正则表达式或 GROK 方案的调整实现解析。

## 使用正则表达式解析 Nginx 成功访问日志

现以一条 Nginx 成功访问日志为例，介绍如何使用正则表达式解析 Nginx 成功访问日志。

- 原始日志
  ```
  __source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.254.254
  __tag__:__receive_time__:  1563443076
  content: 192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
  ```
- 解析需求
  - 需求 1：从 Nginx 日志中提取出 code、ip、datetime、protocol、request、sendbytes、refere、useragent、verb 信息。
  - 需求 2：对 request 进行再提取，提取出 uri_proto、uri_domain、uri_param 信息。
  - 需求 3：对解析出来的 uri_param 进行再提取，提取出 uri_path、uri_query 信息。
- SLS DSL 编排
  - 总编排
    ```python
    """第一步：初步解析Nginx日志"""
    e_regex(
      "content",
      r'(?P<ip>\d+\.\d+\.\d+\.\d+)( - - \[)(?P<datetime>[\s\S]+)\] \"(?P<verb>[A-Z]+) (?P<request>[\S]*) (?P<protocol>[\S]+)["] (?P<code>\d+) (?P<sendbytes>\d+) ["](?P<refere>[\S]*)["] ["](?P<useragent>[\S\s]+)["]'
    )
    """第二步：解析第一步得到的request"""
    e_regex(
      'request',
      r'(?P<uri_proto>(\w+)):\/\/(?P<uri_domain>[a-z0-9.]*[^\/])(?P<uri_param>(.+)$)'
    )
    """第三步：解析第二步得到的uri_param参数"""
    e_regex(
      'uri_param',
      r'(?P<uri_path>\/\_[a-z]+[^?])\?(?<uri_query>(.+)$)'
    )
    ```
  - 细分编排及对应加工结果
    - 针对需求 1 的加工编排如下。
      ```python
      e_regex(
        "content",
        r'(?P<ip>\d+\.\d+\.\d+\.\d+)( - - \[)(?P<datetime>[\s\S]+)\] \"(?P<verb>[A-Z]+) (?P<request>[\S]*) (?P<protocol>[\S]+)["] (?P<code>\d+) (?P<sendbytes>\d+) ["](?P<refere>[\S]*)["] ["](?P<useragent>[\S\s]+)["]'
      )
      ```
    - 对应加工结果
      ```
      __source__:  192.168.0.1
      __tag__:  __receive_time__:  1563443076
      code:  200
      content:  192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"httpversion:  1.1
      datetime:  04/Jan/2019:16:06:38 +0800
      ip:  192.168.0.2
      protocol:  HTTP/1.1
      refere:  -
      request:  http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0
      sendbytes:  273932
      useragent:  Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)
      verb:  GET
      ```
    - 针对需求 2 解析 request，加工编排如下。
      ```python
      e_regex(
        'request',
        r'(?P<uri_proto>(\w+)):\/\/(?P<uri_domain>[a-z0-9.]*[^\/])(?P<uri_param>(.+)$)'
      )
      ```
      对应加工结果：
      ```
      uri_param: /_astats?application=&inf.name=eth0
      uri_domain: example.aliyundoc.com
      uri_proto: http
      ```
    - 针对需求 3 解析 uri_param，加工编排如下。
      ```python
        e_regex(
          'uri_param',
          r'(?P<uri_path>\/\_[a-z]+[^?])\?(?<uri_query>(.+)$)'
        )
      ```
      对应加工结果
      ```
      uri_path: /_astats
      uri_query: application=&inf.name=eth0
      ```
- 加工结果
  ```
  __source__:  192.168.0.1
  __tag__:  __receive_time__:  1563443076
  code:  200
  content:  192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"httpversion:  1.1
  datetime:  04/Jan/2019:16:06:38 +0800
  ip:  192.168.0.2
  protocol:  HTTP/1.1
  refere:  -
  request:  http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0
  sendbytes:  273932
  uri_domain:  example.aliyundoc.com
  uri_proto:  http
  uri_param: /_astats?application=&inf.name=eth0
  uri_path: /_astats
  uri_query: application=&inf.name=eth0
  useragent:  Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)
  verb:  GET
  ```

## 使用 GROK 解析 Nginx 成功访问日志

现以一条 Nginx 成功访问日志为例，介绍如何使用 GROK 解析 Nginx 成功访问日志。

- 原始日志
  ```
  __source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.254.254
  __tag__:__receive_time__:  1563443076
  content: 192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
  ```
- 解析需求
  - 需求 1：从 Nginx 日志中提取出**clientip、bytes、agent、auth、verb、request、identtimestamp, httpversion、response、bytes、referrer**信息。
  - 需求 2：对解析出来的**request**进行再提取，提取出**uri_proto、uri_domain、uri_param**信息。
  - 需求 3：对解析出来的**uri_param**进行再提取，提取出**uri_path、uri_query**信息。
- SLS DSL 编排

  - 总编排

    ```python
    """第一步：初步解析Nginx日志"""
    e_regex(
      'content',
      grok('%{COMBINEDAPACHELOG}')
    )
    """第二步：解析第一步得到的request"""
    e_regex(
      'request',
      grok("%{URIPROTO:uri_proto}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:uri_domain})?(?:%{URIPATHPARAM:uri_param})?")
    )
    """第三步：解析第二步得到的uri_param参数"""
    e_regex(
      'uri_param',
      grok("%{GREEDYDATA:uri_path}\?%{GREEDYDATA:uri_query}")
    )
    ```

    使用 GROK 模式解析 Nginx 正确访问日志，只需要**COMBINEDAPACHELOG**模式即可。

    | 模式              | 规则                                                                                                                                                                                                                                                    | 说明                                                                                        |
    | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
    | COMMONAPACHELOG   | %{IPORHOST:clientip} %<br>{HTTPDUSER:ident} %<br>{USER:auth}\\[%<br>{HTTPDATE:timestamp}\\]"(?:%<br>{WORD:verb} %<br>{NOTSPACE:request}(?: HTTP/%<br>{NUMBER:httpversion})?\|%<br>{DATA:rawrequest})" %<br>{NUMBER:response} (?:%<br>{NUMBER:bytes}\|-) | 解析出 clientip、ident、auth、timestamp、verb、request、httpversion、response、bytes 信息。 |
    | COMBINEDAPACHELOG | %{COMMONAPACHELOG} %<br>{QS:referrer} %{QS:agent}                                                                                                                                                                                                       | 解析出上一行中所有字段，另外还解析出 referrer、agent 字段。                                 |

  - 细分编排及对应加工结果

    - 针对需求 1 解析 Nginx 日志的加工编排如下。
      ```python
      e_regex(
        'content',
        grok('%{COMBINEDAPACHELOG}')
      )
      ```
      对应加工结果
      ```
      clientip: 192.168.0.1
      __tag__:  __receive_time__:  1563443076
      agent:  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
      auth:  -
      bytes:  273932
      clientip:  192.168.0.2
      content:  192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
      httpversion:  1.1
      ident:  -
      referrer:  "-"
      request:  http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0
      response:  200
      timestamp:  04/Jan/2019:16:06:38 +0800
      verb:  GET
      ```
    - 针对需求 2 解析**request**，加工编排如下。

      ```python
      e_regex(
        'request',
        grok("%{URIPROTO:uri_proto}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:uri_domain})?(?:%{URIPATHPARAM:uri_param})?")
      )
      ```

      对应加工结果

      ```
      uri_proto: http
      uri_domain: example.aliyundoc.com
      uri_param: /_astats?application=&inf.name=eth0
      ```

      特别说明，只需要使用 GROK 的以下数种模式组合即可对**request**完成解析，如下表所示。
      | 模式| 规则 |说明 |
      | -------| --------- |--------- |
      | URIPROTO | [A-Za-z]+(\+[A-Za-z+]+)? | 匹配 uri 中的头部分。例如http://hostname.domain.tld/_astats?application=&inf.name=eth0会匹配到http。 |
      | USER | [a-zA-Z0-9._-]+ |匹配字母、数字和符号（.\_-）组合。 |
      | URIHOST | %{IPORHOST}(?::% |匹配 IPORHOST 和 POSINT。|
      | URIPATHPARAM | %{URIPATH}(?:%{URIPARAM})? |匹配 uri 参数部分。 |

    - 针对需求 3 解析 uri_param，加工编排如下。
      ```python
      e_regex(
        'uri_param',
        grok("%{GREEDYDATA:uri_path}\?%{GREEDYDATA:uri_query}")
      )
      ```
      对应加工结果：
      ```
      uri_path: /_astats
      uri_query: application=&inf.name=eth0
      ```
      使用 GROK 的以下模式即可完成对 uri_param 的解析，如下表所示。
      | 模式| 规则 |说明 |
      | -------| --------- |--------- |
      | GREEDYDATA | .\* | 匹配任意或多个除换行符。 |

- 加工结果
  ```
  __source__:  192.168.0.1
  __tag__:__receive_time__:  1563443076
  agent:  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
  auth:  -
  bytes:  273932
  clientip:  192.168.0.2
  content:  192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
  httpversion:  1.1
  ident:  -
  referrer:  "-"
  request:  http://example.aliyundoc.com/_astats?application=&amp;inf.name=eth0
  response:  200
  timestamp:  04/Jan/2019:16:06:38 +0800
  uri_domain:  example.aliyundoc.com
  uri_param:  /_astats?application=&amp;inf.name=eth0
  uri_path:  /_astats
  uri_proto:  http
  uri_query:  application=&amp;inf.name=eth0
  verb:  GET
  ```

## 使用 GROK 解析 Nginx 失败访问日志

以下以一条 Nginx 失败访问日志为例，介绍如何使用 GROK 解析 Nginx 失败访问日志。

- 原始日志
  ```
  __source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.254.254
  __tag__:__receive_time__:  1563443076
  content: 2019/08/07 16:05:17 [error] 1234#1234: *1234567 attempt to send data on a closed socket: u:111111ddd, c:0000000000000000, ft:0 eof:0, client: 1.2.3.4, server: sls.aliyun.com, request: "GET /favicon.ico HTTP/1.1", host: "sls.aliyun.com", referrer: "https://sls.aliyun.com/question/answer/123.html?from=singlemessage"
  ```
- 解析需求
  从 content 中解析出错误访问日志 host、http_version、log_level、pid、referrerrequest、request_time、server、verb 信息。

- SLS DSL 编排
  ```python
  e_regex(
    'content',
    grok('%{DATESTAMP:request_time} \[%{LOGLEVEL:log_level}\] %{POSINT:pid}#%{NUMBER}: %{GREEDYDATA:errormessage}(?:, client: (?<client>%{IP}|%{HOSTNAME}))(?:, server: %{IPORHOST:server})(?:, request: "%{WORD:verb} %{NOTSPACE:request}( HTTP/%{NUMBER:http_version})")(?:, host: "%{HOSTNAME:host}")?(?:, referrer: "%{NOTSPACE:referrer}")?')
  )
  ```
- 加工结果
  ```
  ___source__:  192.168.0.1
  __tag__:__client_ip__:  192.168.254.254
  __tag__:__receive_time__:  1563443076
  content:  2019/08/07 16:05:17 [error] 1234#1234: *1234567 attempt to send data on a closed socket: u:111111ddd, c:0000000000000000, ft:0 eof:0, client: 1.2.3.4, server: sls.aliyun.com, request: "GET /favicon.ico HTTP/1.1", host: "sls.aliyun.com", referrer: "https://sls.aliyun.com/question/answer/123.html?
  host: sls.aliyun.com
  http_version: 1.1
  log_level: error
  pid: 1234
  referrer: https://sls.aliyun.com/question/answer/123.html?from=singlemessage
  request: /favicon.ico
  request_time:  19/08/07 16:05:17
  server: sls.aliyun.com
  verb: GET
  ```
