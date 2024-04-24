阿里云日志服务联合 CDN 推出实时日志推送功能，将 CDN 访问图片、文字或视频资源时产生的日志实时推送到日志服务中。通过日志服务对 CDN 日志数据的分析和挖掘，为客户提供 CDN 访问大盘、用户行为分析等运营报表，帮助客户提高数据决策能力，将业务推向一个新的高度。

## 开启实时日志推送功能

CDN 访问日志分析支持在 CDN 控制台一键开启实时日志推送功能，将 CDN 日志推送到日志服务中。

- 自定义日志服务 Project、Logstore

  > 请勿删除 CDN 访问日志相关的日志服务 Project 和 Logstore，否则将无法正常推送日志到日志服务。

- 专属仪表盘默认生成 4 个仪表盘。

具体步骤请参考 [帮助文档](https://www.alibabacloud.com/help/en/doc-detail/99058.html)
开启 CDN 实时日志推送功能后，您将在 CDN 控制台的“日志与报表”-“实时日志”中看到类似如下图所示的实时日志资源：
![image.png](/img/src/sqldemo/index/c868ed64c97b6229d815779d9a3ed2a7744ee75fc748b8192a0ceacfa2af1747.png)

## 可视化分析

### CDN 热门资源

统计访问最大域名、URI、各省、运营商下载数据量、速度等信息。帮助您了解业务详情，获取热门的访问地区、资源。您也可 以从热门数据了解到您的运营活动效果是否正常，热点时间内的流量、下载的上涨是否符合预期需求，帮助您及时调整运营策略。
[试用 Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_popular_resources_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

### CDN 基础数据

统计健康度、缓存命中率、下载速度、延时分布等信息。帮助您了解 CDN 网络的访问性能，通过该数据您可以快速了解 CDN 整体的服务质量以及终端客户的访问效率，同时也可以根据突发的异常情况及时进行处理。
[试用 Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_basic_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

### CDN 错误分析

统计错误最多的域名、URI、错误来源分布等信息。帮助您在加速域名访问出现异常时，快速定位是由于 CDN 服务本身出现的访问问题，例如源站访问出现故障，节点不可用等，还是由于终端用户的网络故障或地域特性等问题。
[试用 Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_error_detect_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

### CDN 用户分析

统计用户访问信息，例如访问次数最高的用户等。帮助您更好的了解用户构成，包括用户的热门访问省份、热门终端、热门用户等。
[试用 Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_user_analyze_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

## CDN 实时日志字段详情

| 字段          | 说明                                                        |
| ------------- | ----------------------------------------------------------- |
| client_ip     | 客户端 IP 地址                                              |
| content_type  | 数据类型                                                    |
| domain        | 域名                                                        |
| hit_info      | 缓存命中信息，包括： _ HIT：表示命中。 _ MISS：表示未命中。 |
| method        | 请求方法                                                    |
| refer_domain  | 请求来源域名                                                |
| refer_param   | http refer 中的参数信息                                     |
| refer_uri     | http refer 中 uri 信息                                      |
| remote_ip     | 和 CDN 节点建连的 IP 地址                                   |
| remote_port   | 和 CDN 节点建联的客户端端口                                 |
| request_size  | 请求输入大小，单位：字节                                    |
| request_time  | 响应延时，单位：毫秒                                        |
| response_size | 请求返回大小，单位：字节                                    |
| return_code   | HTTP 状态码                                                 |
| scheme        | 请求协议， 例如 http                                        |
| uri           | 请求资源                                                    |
| uri_param     | 请求参数                                                    |
| user_agent    | 用户代理信息                                                |
| uuid          | 标识请求的唯一 ID                                           |
| xforwordfor   | 请求头中 XForwardFor 字段                                   |
