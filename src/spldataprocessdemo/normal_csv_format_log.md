# 正常形式的CSV格式日志
  * 原始日志
    ```
    _program_:access
    _severity_:6
    _priority_:14
    _facility_:1
    topic:syslog-forwarder
    content:10.64.10.20|10/Jun/2019:11:32:16 +0800|m.zf.cn|GET /css/mip-base.css HTTP/1.1|200|0.077|6404|10.11.186.82:8001|200|0.060|https://yz.m.sm.cn/s?q=%25%24%23%40%21&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei|-|Mozilla/5.0 (Linux; Android 9; HWI-AL00 Build/HUAWEIHWI-A00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36|-|-
    ```
  * 需求
    1. 当_program_字段值为 access 时，对字段content做一次PSV（pipe分隔的解析），然后丢弃content字段。
    2. 将request: GET /css/mip-base.css HTTP/1.1字段拆分为request_method、http_version以及request。
    3. http_referer做url解码。
  * 解决方案：
    1. 如果_program_字段值是 access ，则通过parse-csv函数解析content内容，并删除原始字段content。
        语句如下：
        ```python
        * | where _program_='access' | parse-csv -delim='|' content as remote_addr,time_local,host,request,status,request_time,body_bytes_sent,upstream_addr,upstream_status,upstream_response_time,http_referer,http_x_forwarded_for,http_user_agent,session_id,guid | project-away content
        ```
        返回的数据为：
        ```
        __source__:  1.2.3.4
        __tag__:__client_ip__:  2.3.4.5
        __tag__:__receive_time__:  1562845168
        __topic__:
        _facility_:  1
        _priority_:  14
        _program_:  access
        _severity_:  6
        body_bytes_sent:  6404
        guid:  -
        host:  m.zf.cn
        http_referer:  https://yz.m.sm.cn/s?q=%25%24%23%40%21&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei
        http_user_agent:  Mozilla/5.0 (Linux; Android 9; HWI-AL00 Build/HUAWEIHWI-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36
        http_x_forwarded_for:  -
        remote_addr:  10.64.10.20
        request: GET /css/mip-base.css HTTP/1.1
        request_time:  0.077
        session_id:  -
        status:  200
        time_local:  10/Jun/2019:11:32:16 +0800
        topic:  syslog-forwarder
        upstream_addr:  10.11.186.82:8001
        upstream_response_time:  0.060
        upstream_status:  200
        ```
    2. 使用parse-regexp函数将request字段解析成request_method、request、http_version。
        ```python
        * | parse-regexp request, '(\S+)' as request_method |  parse-regexp request, '\S+\s+\S+\s+(\S+)' as http_version | parse-regexp request, '\S+\s+(\S+)' as request
        ```
        返回的日志为：
        ```
        request:  /css/mip-base.css
        request_method:  GET
        http_version:  HTTP/1.1
        ```
    3. http_referer做url解码。
        ```python
        * | extend http_referer=url_decode(http_referer)
        ```
        返回的日志为：
        ```
        http_referer:https://yz.m.sm.cn/s?q=%$#@!&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei
        ```