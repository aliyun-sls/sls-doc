# 查询分析案例概览

## 通用聚合分析
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [Query the global distribution of clients](./客户端PV全球分布.md) | 分析客户端PV全球分布。 |
| [Query the classification and PV trend of request methods](./请求方法分类pv趋势.md) | 分析请求方法分类pv趋势。 |
| [http_user_agent请求PV分布](./根据pv为http_user_agent进行排序展示.md) | 根据pv为http_user_agent进行排序分析。 |
| [Query the daily consumption and trend prediction for this month](./本月每日消费及趋势预测.md) | 分析本月每日消费及趋势预测。 |
| [Query the service consumption distribution of this month](./本月消费情况各产品的占比.md) | 分析本月消费情况各产品的占比。 |
| [Query the consumption of yesterday and comparison to that of last month](./昨天的消费及与上月的同比.md) | 分析昨天的消费及与上月的同比。 |

## Nginx日志分析

| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [今日PV与昨日对比](./nginx%E4%BB%8A%E6%97%A5PV%E4%B8%8E%E6%98%A8%E6%97%A5%E5%AF%B9%E6%AF%94.md) | nginx 日志查看今日PV和昨日PV对比。 |
| [Query the distribution of source IP addresses from NGINX logs](./nginx日志来源IP的分布.md) | 统计分析IP来源分布。 |
| [Collect statistics on inbound and outbound NGINX traffic](./nginx流入流出的流量统计.md) | 统计nginx流入流出的流量统计。 |
| [Query the top 10 addresses that access NGINX](./nginx访问前十的地址.md) | 统计nginx访问前十的地址。 |
| [Predict PVs based on NGINX access logs](./nginx访问日志的PV预测.md) | 分析nginx访问日志的PV预测。 |
| [Query the PV trend and day-to-day comparison from NGINX access logs](./nginx访问日志的PV趋势同比昨日.md) | 分析nginx访问日志的PV趋势同比昨日。 |

## Tomcat Web服务分析
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [Analyze the trend of Tomcat request status](./tomcat%E8%AF%B7%E6%B1%82%E7%8A%B6%E6%80%81%E8%B6%8B%E5%8A%BF%E5%88%86%E6%9E%90.md) | 分析 tomcat 不同请求状态数量随时间的变化趋势。 |
| [tomcat请求状态及数量时间分布](./tomcat请求状态及数量跟随时间顺序展示.md) | 分析tomcat请求状态及数量跟随时间的趋势变化。 |
| [tomcat访问的pv、uv时间分布](./展示tomcat访问的pv、uv随时间变化曲线.md) | 分析tomcat访问的pv、uv随时间变化曲线的趋势变化。 |
| [Query the number of Tomcat error requests and the comparison with that of last hour](./tomcat错误请求数量以及与上一小时错误请求比较.md) | 分析tomcat错误请求数量以及与上一小时错误请求比较。 |
| [Query the top 10 URIs in Tomcat requests](./tomcat中请求数前十的uri展示.md) | 分析tomcat中请求数前十的uri。 |
| [Query the types and distribution of Tomcat clients](./查询访问tomcat的客户端分类及数量分布.md) | 分析查询访问tomcat的客户端分类及数量分布。 |
| [Collect statistics on inbound and outbound Tomcat traffic](./tomcat流出流量统计.md) | 分析tomcat流出流量统计。 |
| [Query the proportions of Tomcat error requests](./tomcat错误请求占比.md) | 分析tomcat错误请求占比。 |
| [tomcat请求客户端分布](./将请求客户端分布在地图上展示.md) | 分析请求客户端分布。 |

## CDN日志分析
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [CDN日志分析](./CDN日志分析.md) | 分析CDN访问日志数据，产生各种各样的运营数据报表、用户访问行为分析。 |

## 负载均衡（SLB）日志分析
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [负载均衡（SLB）日志分析](./负载均衡（SLB）日志分析.md) | 分析SLB访问日志数据，产生各种各样的运营数据报表、用户访问行为分析。 |

## 聚合函数分析
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [聚合函数分析](../sqlfunction/聚合函数.md) | 各种各样的聚合函数分析示例。 |


