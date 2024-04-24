Alibaba Cloud Simple Log Service provides the real-time log delivery feature together with Alibaba Cloud CDN. This feature delivers the logs generated when Alibaba Cloud CDN accesses resources such as images, text, and videos to Simple Log Service in real time. Simple Log Service analyzes and mines the log data of Alibaba Cloud CDN to provide you with operational reports such as access dashboards and user behavior analysis. This helps you improve data decision-making capabilities and promotes your business development.

## Enable the real-time log delivery feature

Enable the real-time log delivery feature

- Custom Simple Log Service Project、Logstore

  > Do not delete the Simple Log Service project and Logstore that are created for the access logs of Alibaba Cloud CDN. Otherwise, the access logs cannot be delivered to Simple Log Service.

- Create a dedicated dashboard. By default, four dashboards are generated after you enable the feature.

For more information, see [Real-time log delivery](https://www.alibabacloud.com/help/en/doc-detail/99058.html)
After you enable the real-time log delivery feature, you can choose Logs & Reports > Logs > Real-time Logs in the left-side navigation pane of the Alibaba Cloud CDN console to view the information about real-time log delivery, as shown in the following figure.

## Visualized analysis

### Visualized analysis

Visualized analysis
[try Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_popular_resources_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

### Visualized analysis

This dashboard displays statistics on the health status, cache hit ratio, download speed, and latency distribution. This information helps you understand the access performance, overall service quality, and client access efficiency of Alibaba Cloud CDN. You can also handle unexpected exceptions in a timely manner based on the data.
[try Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_basic_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

### Error analysis

Error analysis
[try Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_error_detect_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

### User analysis

User analysis
[try Demo](https://sls4service.console.aliyun.com/lognext/project/simulator-cdn-demo/dashboard/cdn_user_analyze_cn_cdn-log?isShare=true&readOnly=true&hideTopbar=true&hideSidebar=true&hiddenAppBread=true&hiddenPSql=true&hiddenEtl=true)

## CDN Log fields

| field         | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| client_ip     | The IP address of the client.                                           |
| content_type  | Data type                                                               |
| domain        | region                                                                  |
| hit_info      | The cache hit information. Valid values: HIT and MISS.                  |
| method        | The cache hit information. Valid values: HIT and MISS.                  |
| refer_domain  | The cache hit information. Valid values: HIT and MISS.                  |
| refer_param   | The cache hit information. Valid values: HIT and MISS.                  |
| refer_uri     | The cache hit information. Valid values: HIT and MISS.                  |
| remote_ip     | The cache hit information. Valid values: HIT and MISS.                  |
| remote_port   | The port of the client that establishes a connection with the CDN node. |
| request_size  | The size of the request. Unit: bytes.                                   |
| request_time  | The response latency. Unit: milliseconds.                               |
| response_size | The response latency. Unit: milliseconds.                               |
| return_code   | The HTTP status code.                                                   |
| scheme        | The request protocol. Example:                                          |
| uri           | The requested resource.                                                 |
| uri_param     | The request parameters.                                                 |
| user_agent    | The request parameters.                                                 |
| uuid          | The unique ID of the request.                                           |
| xforwordfor   | The unique ID of the request.                                           |
