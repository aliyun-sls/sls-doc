# Overview of Query Analysis Cases

## General aggregation analysis

| Case Name                                                                                                | Description                                                   |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [Query the global distribution of clients](./客户端PV全球分布.md)                                        | Query the global distribution of clients                      |
| [Query the classification and PV trend of request methods](./请求方法分类pv趋势.md)                      | Query the classification and PV trend of request methods      |
| [Distribution of user agent requests by PV](./根据pv为http_user_agent进行排序展示.md)                    | Sort and analyze the number of PVs by user agent.             |
| [Query the daily consumption and trend prediction for this month](./本月每日消费及趋势预测.md)           | Sort and analyze the number of PVs by user agent.             |
| [Query the service consumption distribution of this month](./本月消费情况各产品的占比.md)                | Analyze the distribution of each service consumed this month. |
| [Query the consumption of yesterday and comparison to that of last month](./昨天的消费及与上月的同比.md) | Analyze the distribution of each service consumed this month. |

## NGINX log analysis

| Case Name                                                                                                                              | Description                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Day-to-day comparison of PVs based on NGINX access logs](./nginx%E4%BB%8A%E6%97%A5PV%E4%B8%8E%E6%98%A8%E6%97%A5%E5%AF%B9%E6%AF%94.md) | Compare the PVs of today with those of yesterday based on NGINX access logs. |
| [Query the distribution of source IP addresses from NGINX logs](./nginx日志来源IP的分布.md)                                            | Analyze the distribution of source IP addresses.                             |
| [Collect statistics on inbound and outbound NGINX traffic](./nginx流入流出的流量统计.md)                                               | Analyze the distribution of source IP addresses.                             |
| [Query the top 10 addresses that access NGINX](./nginx访问前十的地址.md)                                                               | Analyze top 10 addresses that access NGINX.                                  |
| [Predict PVs based on NGINX access logs](./nginx访问日志的PV预测.md)                                                                   | Analyze the predicted PVs based on NGINX access logs.                        |
| [Query the PV trend and day-to-day comparison from NGINX access logs](./nginx访问日志的PV趋势同比昨日.md)                              | Analyze the predicted PVs based on NGINX access logs.                        |

## Tomcat web service analysis

| Case Name                                                                                                                                | Description                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Analyze the trend of Tomcat request status](./tomcat%E8%AF%B7%E6%B1%82%E7%8A%B6%E6%80%81%E8%B6%8B%E5%8A%BF%E5%88%86%E6%9E%90.md)        | Analyze the trend of the number of Tomcat access requests in different states over time. |
| [Distribution of Tomcat access requests by status and quantity over time](./tomcat请求状态及数量跟随时间顺序展示.md)                     | Distribution of Tomcat access requests by status and quantity over time]                 |
| [Trend of PVs and UVs for Tomcat access over time](./展示tomcat访问的pv、uv随时间变化曲线.md)                                            | Analyze the trend of the PVs and unique visitors (UVs) of Tomcat access over time.       |
| [Query the number of Tomcat error requests and the comparison with that of last hour](./tomcat错误请求数量以及与上一小时错误请求比较.md) | Calculate the number of Tomcat error requests and compare it with that of last hour.     |
| [Query the top 10 URIs in Tomcat requests](./tomcat中请求数前十的uri展示.md)                                                             | Analyze top 10 URIs based on the number of Tomcat access requests.                       |
| [Query the types and distribution of Tomcat clients](./查询访问tomcat的客户端分类及数量分布.md)                                          | Analyze and query the types and number of clients that access Tomcat.                    |
| [Collect statistics on inbound and outbound Tomcat traffic](./tomcat流出流量统计.md)                                                     | 分析 tomcat 流出流量统计。                                                               |
| [Query the proportions of Tomcat error requests](./tomcat错误请求占比.md)                                                                | Analyze and query the types and number of clients that access Tomcat.                    |
| Analyze the proportion of Tomcat error requests.(./将请求客户端分布在地图上展示.md)                                                      | Analyze the proportion of Tomcat error requests.                                         |

## Alibaba Cloud CDN log analysis

| Case Name                                          | Description                                                                                                                      |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Alibaba Cloud CDN log analysis](./CDN日志分析.md) | Analyze the access logs of Alibaba Cloud CDN to generate a variety of operational data reports and analyze user access behavior. |

## SLB log analysis

| Case Name                                        | Description      |
| ------------------------------------------------ | ---------------- |
| [SLB log analysis](./负载均衡（SLB）日志分析.md) | SLB log analysis |

## Aggregate function analysis

| Case Name                                                 | Description                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| [Aggregate function analysis](../sqlfunction/聚合函数.md) | Describe a variety of aggregate function and give analysis examples. |
