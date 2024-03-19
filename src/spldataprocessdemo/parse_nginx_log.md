# 解析Nginx日志
Nginx访问日志记录了用户访问的详细信息，解析Nginx访问日志对业务运维具有重要意义。本文介绍如何使用正则表达式函数解析Nginx访问日志。
## 解析方案简介
日志服务支持通过SPL的正则表达式Nginx日志
现以一条Nginx成功访问日志为例，介绍如何使用正则表达式解析Nginx成功访问日志。
* 原始日志
    ```
    __source__:  192.168.0.1
    __tag__:__client_ip__:  192.168.254.254
    __tag__:__receive_time__:  1563443076
    content: 192.168.0.2 - - [04/Jan/2019:16:06:38 +0800] "GET http://example.aliyundoc.com/_astats?application=&inf.name=eth0 HTTP/1.1" 200 273932 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.example.com/bot.html)"
    ```
* 解析需求
    * 需求1：从Nginx日志中提取出code、ip、datetime、protocol、request、sendbytes、refere、useragent、verb信息。
    * 需求2：对request进行再提取，提取出uri_proto、uri_domain、uri_param信息。
    * 需求3：对解析出来的uri_param进行再提取，提取出uri_path、uri_query信息。
* 总编排
    ```python
    * | parse-regexp content, '(\d+\.\d+\.\d+\.\d+) - - \[([\s\S]+)\] \"([A-Z]+) ([\S]*) ([\S]+)["] (\d+) (\d+) ["]([\S]*)["] ["]([\S\s]+)["]' as ip, datetime,verb,request,protocol,code,sendbytes,refere,useragent
    * | parse-regexp request, '(\w+):\/\/([a-z0-9.]*[^\/])((.+)$)' as uri_proto, uri_domain, uri_param
    * | parse-regexp uri_param, '([^?]*)\?(.*)' as uri_path, uri_query
    ```
* 针对需求1解析Nginx日志的加工编排如下。
    ```python
    * | parse-regexp content, '(\d+\.\d+\.\d+\.\d+) - - \[([\s\S]+)\] \"([A-Z]+) ([\S]*) ([\S]+)["] (\d+) (\d+) ["]([\S]*)["] ["]([\S\s]+)["]' as ip, datetime,verb,request,protocol,code,sendbytes,refere,useragent
    ```
* 对应结果
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
* 针对需求2解析request，SPL编排如下。
    ```python
    * | parse-regexp request, '(\w+):\/\/([a-z0-9.]*[^\/])((.+)$)' as uri_proto, uri_domain, uri_param
    ```
* 对应结果：
    ```
    uri_param: /_astats?application=&inf.name=eth0
    uri_domain: example.aliyundoc.com
    uri_proto: http
    ```
* 针对需求3解析uri_param，SPL编排如下
    ```python
    * | parse-regexp uri_param, '([^?]*)\?(.*)' as uri_path, uri_query
    ```
* 对应结果：
    ```
    uri_path: /_astats
    uri_query: application=&inf.name=eth0
    ```
* SPL最终处理结果
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