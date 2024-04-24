# Parse log entries in a CSV-format log file

Parse log entries in a CSV-format log file, such as a Syslog file.

## Parse a standard log entry in a CSV-format log file

- Raw log entries

  ```
  _program_:error
  _severity_:6
  _priority_:14
  _facility_:1
  topic:syslog-forwarder
  content:10.64.10.20|10/Jun/2019:11:32:16 +0800|m.zf.cn|GET /zf/11874.html HTTP/1.1|200|0.077|6404|10.11.186.82:8001|200|0.060|https://yz.m.sm.cn/s?q=%25%24%23%40%21&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei|-|Mozilla/5.0 (Linux; Android 9; HWI-AL00 Build/HUAWEIHWI-A00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36|-|-
  ```

- demand

  1. When the `_program_` field is set to _access_, a pipe-separated value (PSV) parsing is conducted to the `content` field. Then, the `content` field is dropped.

  2. The `request: GET /css/mip-base.css HTTP/1.1` field is split into the `request_method`, `http_version`, and `request` fields.

  3. `URL` decoding is conducted to `http_referer`

  4. `time` field is formatted.

- Solution

1. If the `_program_` field is set to _access_, use the e_psv function to parse the `content` field, and then delete the `content` field.

   ```python
   e_if(
   	e_search("_program_==access"),
   	e_compose(
   		e_psv(
   			"content",
   			"remote_addr,
   			time_local,
   			host,
   			request,
   			status,
   			request_time,
   			body_bytes_sent,
   			upstream_addr,
   			upstream_status,
   			upstream_response_time,
   			http_referer,
   			http_x_forwarded_for,
   			http_user_agent,
   			session_id,guid",
   			restrict=True
   		),
   		e_drop_fields("content")
   	)
   )
   ```

   The returned log is：

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
   request:  GET /zf/11874.html HTTP/1.1
   request_time:  0.077
   session_id:  -
   status:  200
   time_local:  10/Jun/2019:11:32:16 +0800
   topic:  syslog-forwarder
   upstream_addr:  10.11.186.82:8001
   upstream_response_time:  0.060
   upstream_status:  200
   ```

2. Use the `e_regex` function to parse the `request` field into the`request_method`、`request`、`http_version`。

   ```python
   e_regex(
   	"request",
   	r"^(?P<request_method>\w+) (?P<request>.+) (?P<http_version>\w+/[\d\.]+)$"
   )
   ```

The returned log :

```
request:  /zf/11874.html
request_method:  GET
http_version:  HTTP/1.1
```

3.Conduct URL decoding to the `http_referer` field.

```python
e_set("http",url_decoding("http_referer"))
```

The returned log :

```
http: https://yz.m.sm.cn/s?q=%$#@!&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei
```

4. Format the time.

   ```python
   e_set(
   	"time_local",
   	dt_strptime(v("time"),"%d/%b/%Y:%H:%M:%S +0800")
   )
   ```

The returned log :

```
time_local:  2019-06-13 13:45:11
```

5.Execute the following syntax:

```python
e_if(
	e_search("_program_==access"),
	e_compose(
		e_psv(
			"content",
			"remote_addr,
			time_local,
			host,
			request,
			status,r
			equest_time,
			body_bytes_sent,
			upstream_addr,
			upstream_status,
			upstream_response_time,
			http_referer,
			http_x_forwarded_for,
			http_user_agent,session_id,guid",
			restrict=True
		),
		e_drop_fields("content")
	)
)
e_regex(
	"request",
	r"^(?P<request_method>\w+) (?P<request>.+) (?P<http_version>\w+/[\d\.]+)$"
)
e_set("http",url_decoding("http_referer"))
e_set("time_local",dt_strptime(v("time"),"%d/%b/%Y:%H:%M:%S +0800"))
```

- Output log content
  ```
  __source__:  1.2.3.4
  __tag__:__client_ip__:  2.3.4.5
  __tag__:__receive_time__:  1562840879
  __topic__:
  _facility_:  1
  _priority_:  14
  _program_:  access
  _severity_:  6
  body_bytes_sent:  6404
  guid:  -
  host:  m.zf.cn
  http_referer:  https://yz.m.sm.cn/s?q=%E8%9B%8B%E8%8A%B1%E9%BE%99%E9%A1%BB%E9%9D%A2%E7%9A%84%E5%81%9A%E6%B3%95&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei
  http_user_agent:  Mozilla/5.0 (Linux; Android 9; HWI-AL00 Build/HUAWEIHWI-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36
  http_x_forwarded_for:  -
  remote_addr:  10.64.xx.xx
  request:  GET /zf/11874.html HTTP/1.1
  request_time:  0.077
  session_id:  -
  status:  200
  time_local:  10/Jun/2019:11:32:16 +0800
  topic:  syslog-forwarder
  upstream_addr:  10.11.xx.xx:8001
  upstream_response_time:  0.060
  upstream_status:  200
  http: https://yz.m.sm.cn/s?q=蛋花龙须面的做法&from=wy878378&uc_param_str=dnntnwvepffrgibijbprsvdsei
  ```

## Parse a nonstandard log entry in a CSV-format log file

The following example demonstrates how to parse a nonstandard log entry in a CSV-format log file.

- Raw log entries

  ```
  __source__:  1.2.3.4
  __tag__:__client_ip__:  2.3.4.5
  __tag__:__receive_time__:  1562840879
  __topic__:
  content: 101.132.xx.xx|07/Aug/2019:11:10:37 +0800|www.123.com|GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1|200|6.729|14559|1.2.3.4:8001|200|6.716|-|-|Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D))||
  ```

- Transformation requirements. The `content` field is parsed.

- Solution. In the `content` field, if no correct field can be parsed from the `GET /alyun/htsw/?ad=5|8|6|11| HTTP/1.1` part by using the `e_csv` function,

  ```python
  e_if(
  	e_search("not remote_addr: *"),
  	e_compose(
  		e_regex(
  			"content",
  			r"[^\|]+\|[^\|]+\|[^\|]+\|(?P<request>(.+)HTTP/\d.\d)"
  		),
  		e_set(
  			"content",
  			regex_replace(
  				v("content"),
  				r"([^\|]+\|[^\|]+\|[^\|]+)\|((.+)HTTP/\d.\d)\|(.+)",replace= r"\1||\4"
  			)
  		),
  		e_psv(
  			"content",
  			"remote_addr,time_local,host,request,status,request_time,body_bytes_sent,upstream_addr,upstream_status, upstream_response_time,http_referer,http_x_forwarded_for,http_user_agent,session_id,guid",
  			restrict=True)
  		)
  	)
  e_drop_fields("content")
  ```

- Output log content
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
