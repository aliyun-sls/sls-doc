# 非正常形式的CSV格式日志
如下日志格式存在一条异常日志信息。
* 原始日志
  ```
  __source__:  1.2.3.4
  __tag__:__client_ip__:  2.3.4.5
  __tag__:__receive_time__:  1562840879
  __topic__:
  content: 101.132.xx.xx|07/Aug/2019:11:10:37 +0800|www.123.com|GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1|200|6.729|14559|1.2.3.4:8001|200|6.716|-|-|Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D))||
  ```
* 需求 对content进行解析。
* 解决方案 将content中的GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1替换"GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1", 使用parse-csv设置quote为"解析出正确的字段，并删除原始字段content。
  ```python
  * | extend content=replace(content,'GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1','"GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1"') | parse-csv -delim='|' 
  -quote='"' content as remote_addr,time_local,host,request,status,request_time,body_bytes_sent,upstream_addr,upstream_status, upstream_response_time,http_referer,http_x_forwarded_for,http_user_agent,session_id,guid | project-away content
  ```
* 输出日志
  ```
  __source__:  1.2.3.4
  __tag__:__client_ip__:  2.3.4.5
  __tag__:__receive_time__:  1562840879
  __topic__:
  body_bytes_sent:  14559
  host:  www.123.com
  http_referer:  -
  http_user_agent:  Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D))
  http_x_forwarded_for:  -
  remote_addr:  101.132.xx.xx
  request:  GET /alyun/htsw/?ad=5|8|6|11|  HTTP/1.1
  request_time:  6.729
  status:  200
  time_local:  07/Aug/2019:11:10:37 +0800
  upstream_addr:  1.2.3.4:8001
  upstream_response_time:  6.716
  upstream_status:  200
  ```