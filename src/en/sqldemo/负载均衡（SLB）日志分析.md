日志服务联合负载均衡（SLB）推出访问日志功能，您可以通过负载均衡的访问日志了解客户端用户行为、客户端用户的地域分布，排查问题等。

## 开启实时日志推送功能

请前往负载均衡控制台上开通访问日志功能，将负载均衡 7 层访问日志采集到日志服务中
Step1：自定义日志服务 Project、Logstore

> - 该 Logstore 默认开启索引，并配置部分字段的索引。 您可以修改索引，修改索引后只对新数据生效，您还可以对历史数据重建索引。具体操作，请参见 [重建索引](https://www.alibabacloud.com/help/en/doc-detail/154965.htm#task-2424026) 。
> - 该 Logstore 默认永久保存日志，您也可以修改日志存储时间。具体操作，请参见[ 管理 Logstore](https://www.alibabacloud.com/help/en/doc-detail/48990.htm) 。

Step2：专属仪表盘 默认生成 2 个仪表盘。
具体步骤请参考 [帮助文档](https://www.alibabacloud.com/help/en/doc-detail/173889.html)

## 可视化分析

### SLB 访问中心

展示访问细节信息，包括：客户端 PV 分布、请求方法 PV 趋势、状态码 PV 趋势、top 客户端、请求报文流量拓扑等内容。
[试用 Demo](https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/?redirect=true&type=18)

### SLB 运营中心

展示总体运营情况，包括 PV、UV、请求成功率、请求报文流量、返回客户端流量等内容。
[试用 Demo](https://1340796328858956.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/demo/newconsoledemo/?redirect=true&type=17)

## 日志字段详情

| 字段                   | 说明                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| topic                  | 日志主题，固定为 slb_layer7_access_log。                                                                                  |
| body_bytes_sent        | 发送给客户端的 Body 字节数。                                                                                              |
| client_ip              | 请求客户端 IP 地址。                                                                                                      |
| host                   | 优先从请求参数中获取 host。如果获取不到则从 host header 取值，如果还是获取不到则以处理请求的后端服务器 IP 地址作为 host。 |
| http_host              | 请求报文 host header 的内容。                                                                                             |
| http_referer           | Proxy 收到的请求报文中 HTTP referer header 的内容。                                                                       |
| http_user_agent        | Proxy 收到的请求报文中 HTTP user-agent header 的内容。                                                                    |
| http_x_forwarded_for   | Proxy 收到的请求报文中 HTTP x-forwarded-for 的内容。                                                                      |
| http_x_real_ip         | 真实的客户端 IP 地址。                                                                                                    |
| read_request_time      | Proxy 读取请求的时间，单位：毫秒。                                                                                        |
| request_length         | 请求报文的长度，包括 startline、HTTP header 和 HTTP Body。                                                                |
| request_method         | 请求报文的方法。                                                                                                          |
| request_time           | Proxy 收到第一个请求报文的时间到 Proxy 返回应答之间的间隔时间，单位：秒。                                                 |
| request_uri            | Proxy 收到的请求报文的 URI。                                                                                              |
| scheme                 | 请求的 scheme，http 或 https。                                                                                            |
| server_protocol        | Proxy 收到的 HTTP 协议的版本，例如 HTTP/1.0 或 HTTP/1.1。                                                                 |
| slb_vport              | 负载均衡的监听端口。                                                                                                      |
| slbid                  | 负载均衡实例 ID。                                                                                                         |
| ssl_cipher             | 建立 SSL 连接使用的密码。                                                                                                 |
| ssl_protocol           | 建立 SSL 连接使用的协议，例如 TLSv1.2。                                                                                   |
| status                 | Proxy 应答报文的状态。                                                                                                    |
| tcpinfo_rtt            | 客户端 TCP 连接时间，单位：微秒。                                                                                         |
| time                   | 日志记录时间。                                                                                                            |
| upstream_addr          | 后端服务器的 IP 地址和端口。                                                                                              |
| upstream_response_time | 从负载均衡向后端建立连接开始到接受完数据然后关闭连接为止的时间，单位：秒。                                                |
| upstream_status        | Proxy 收到的后端服务器的响应状态码。                                                                                      |
| vip_addr               | VIP 地址。                                                                                                                |
| write_response_time    | Proxy 写的响应时间，单位：毫秒。                                                                                          |
