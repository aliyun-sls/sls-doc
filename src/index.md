# 日志服务

日志服务 SLS 是云原生观测与分析平台，为 Log、Metric、Trace 等数据提供大规模、低成本、实时的平台化服务。日志服务一站式提供数据采集、加工、查询与分析、可视化、告警、消费与投递等功能，全面提升您在研发、运维、运营、安全等场景的数字化能力。

:::tip SLS Playground 发布啦！！！
SLS Playground 包含了 SLS 大部分功能的演示 demo，是一个完整的 SLS 控制台只读账号，包含智能运维类 APP Demo、CloudLen APP Demo、多种日志分析 Demo，可视化 Demo 等等，尽情畅玩吧！

[尝试](/playground/demo.html){target="_blank"}
:::

## 案例中心介绍

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/doc/searchdemo/query/search_with_index.html">
    <p class="next-steps-link">查询案例</p>
    <p class="next-steps-caption">日志服务（SLS）支持秒级查询十亿到千亿级别的日志数据，并支持使用SQL对查询结果进行统计分析，或者使用Scan功能对查询结果的指定字段进行扫描查询。</p>
  </a>
  <a class="vt-box" href="/doc/sqldemo/">
    <p class="next-steps-link">SQL分析案例</p>
    <p class="next-steps-caption">日志服务（SLS）基于 SQL 提供分析功能，分析语句可以对查询的结果进行计算或者统计，需结合查询语句一起使用并配置索引，并支持Scheduled SQL和SQL独享版。</p>
  </a>
  <a class="vt-box" href="/doc/sqlfunction/">
    <p class="next-steps-link">SQL函数案例</p>
    <p class="next-steps-caption">日志服务（SLS）分析 SQL 提供10多种查询运算符、10多种机器学习函数、100多个SQL函数。</p>
  </a>
</div>

<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/visulization/">
    <p class="next-steps-link">可视化案例</p>
    <p class="next-steps-caption">日志服务（SLS）支持查询与分析结果可视化，提供10多种统计图表，包括表格、线图、柱状图、地图等，并支持基于统计图表自定义仪表盘（支持外嵌与下钻分析）。</p>
  </a>
  <a class="vt-box" href="/doc/dataprocessdemo/">
    <p class="next-steps-link">加工案例</p>
    <p class="next-steps-caption">日志服务（SLS）提供200多个内置函数、400多个正则表达式、灵活的自定义函数，实现过滤、分裂、转换、富化、复制等效果，满足数据分派、规整、融合等场景。</p>
  </a>
  <a class="vt-box" href="/doc/oscompatibledemo/">
    <p class="next-steps-link">开源兼容</p>
    <p class="next-steps-caption">日志服务（SLS）提供了多种开源兼容的方案，本模块主要聚集介绍如何用开源的标准接口（Kafka等）访问SLS。</p>
  </a>
</div>

<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/dataaccess/">
    <p class="next-steps-link">数据采集案例</p>
    <p class="next-steps-caption">日志服务支持采集服务器与应用、开源软件、物联网、移动端、标准协议、阿里云产品等多种来源的数据。</p>
  </a>
  <a class="vt-box" href="/doc/alert/">
    <p class="next-steps-link">告警</p>
    <p class="next-steps-caption">日志服务（SLS）告警规则案例，包括数据加工、数据投递、Logtail、定时SQL</p>
  </a>
  <a class="vt-box" href="/doc/cloudlen/">
    <p class="next-steps-link">CloudLens 案例</p>
    <p class="next-steps-caption">日志服务（SLS）CloudLens 介绍与使用。</p>
  </a>
</div>

<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/sqlerror/">
    <p class="next-steps-link">错误中心</p>
    <p class="next-steps-caption">罗列了已知的用户常见错误，旨在帮助用户根据请求错误提示，排查问题所在，自助诊断和修复问题。</p>
  </a>
  <a class="vt-box" href="/doc/scheduledsql/">
    <p class="next-steps-link">定时SQL</p>
    <p class="next-steps-caption">日志服务（SLS）定时SQL 使用案例</p>
  </a>
</div>

## 智能运维应用 Demo

<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/observability/overview/sls-mall/sls-mall%3Fresource=/overview/sls-mall/explorer" target="_blank">
    <p class="next-steps-link">全栈可观测</p>
    <p class="next-steps-caption">一站式IT系统可观测方案，包含IT系统监控、全链路Trace、智能告警等功能。本文介绍全栈可观测功能的相关信息。
</p>
  </a>
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/trace/sls-mall/sls-mall%3Fresource=/trace/sls-mall/explorer" target="_blank">
    <p class="next-steps-link">Trace</p>
    <p class="next-steps-caption">日志服务提供基于原生OpenTelemetry协议的分布式链路追踪功能，支持各类Trace数据的接入、存储、分析、可视化、告警、人工智能运维等。</p>
  </a>
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/monitor/sls-mall/sls-mall%3Fresource=/fullmonitor/project/sls-mall/dataaccess/sls-mall" target="_blank">
    <p class="next-steps-link">全栈监控</p>
    <p class="next-steps-caption">全栈监控应用是日志服务提供的一站式IT系统监控方案，监控的目标包括主机监控、Kubernetes监控、数据库监控、中间件监控等。</p>
  </a>
</div>
<div class="vt-box-container next-steps margin-top-20">
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/ids/public-demo-aiops%3Fresource=/overview" target="_blank">
    <p class="next-steps-link">智能异常分析</p>
    <p class="next-steps-caption">智能时序异常发现、文本异常模式挖掘、自定义根因分析诊断平台。</p>
  </a>
</div>

## CloudLens Demo

CloudLens 基于日志服务构建统一的云产品可观测能力，通过日志、指标、配置计量等数据的关联分析，提供阿里云产品的用量分析、性能监控、安全分析、数据保护、异常检测、访问分析等服务。从成本、性能、安全、数据保护、稳定性、访问分析六个维度，助力您快速构建云产品的可观测性，更好地使用云产品。

<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/cloudlen/slb.html" target="_blank">
    <p class="next-steps-link">CloudLens for CLB</p>
    <p class="next-steps-caption">传统型负载均衡日志中心</p>
  </a>
    <a class="vt-box" href="/doc/cloudlen/slb.html" target="_blank">
    <p class="next-steps-link">CloudLens for ALB</p>
    <p class="next-steps-caption">应用型负载均衡日志中心</p>
  </a>
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/lens/sls" target="_blank">
    <p class="next-steps-link">CloudLens for SLS</p>
    <p class="next-steps-caption">SLS 数据洞察</p>
  </a>
</div>
<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/oss_lens%3Fresource=/ossLens/data-access" target="_blank">
    <p class="next-steps-link">CloudLens for OSS</p>
    <p class="next-steps-caption">OSS 数据洞察</p>
  </a>
   <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/lens/polardb" target="_blank">
    <p class="next-steps-link">CloudLens for PolarDB</p>
    <p class="next-steps-caption">PolarDB 数据洞察</p>
  </a>
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/lens/rds" target="_blank">
    <p class="next-steps-link">CloudLens for RDS</p>
    <p class="next-steps-caption">RDS 数据洞察</p>
  </a>
</div>
<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/ingress_metrics/project/k8s-log-cfa82911e541341a1b9d21d527075cbfe/logstore/nginx-ingress/dashboardtemplate/k8s-ingress-nginx-access" target="_blank">
    <p class="next-steps-link">Ingress 日志中心</p>
    <p class="next-steps-caption">Kubernetes Ingress访问日志中心</p>
  </a>
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/k8s-event/project/k8s-log-cfa82911e541341a1b9d21d527075cbfe/logstore/k8s-event/dashboardtemplate/k8s-event-center" target="_blank">
    <p class="next-steps-link">K8s 事件中心</p>
    <p class="next-steps-caption">Kubernetes 事件监控</p>
  </a>
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/nginx_metrics/project/nginx-demo-log/logstore/nginx-access-log/dashboardtemplate/nginx-overview" target="_blank">
    <p class="next-steps-link">Nginx 日志中心</p>
    <p class="next-steps-caption">Nginx 7层日志中心 </p>
  </a>
</div>
<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/flowlog/vpc-flowlog-demo/s7d5s02ji9%3Fresource=/flowlog/project/vpc-flowlog-demo/logstore/vpc-flowlog/dashboardtemplate/flowlog-overview" target="_blank">
    <p class="next-steps-link">Flowlog 日志中心</p>
    <p class="next-steps-caption">VPC Flowlog 日志分析APP</p>
  </a>
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/ebs_lens%3Fresource=/overview/project/aliyun-product-data-1819385687343877-cn-hangzhou/logstore/ebs_disk_metric/dashboardtemplate/ebs-overview" target="_blank">
    <p class="next-steps-link">CloudLens for EBS</p>
    <p class="next-steps-caption">块存储数据洞察</p>
  </a>
</div>


## 其他日志应用 Demo

<div class="vt-box-container next-steps margin-top-20">
  <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/bill_app" target="_blank">
    <p class="next-steps-link">成本管家</p>
    <p class="next-steps-caption">账单数据分析，云产品费用优化</p>
  </a>
    <a class="vt-box" href="/doc/playground/demo.html?dest=/lognext/app/audit/project/slsaudit-center-1819385687343877-cn-hangzhou/dashboard/internal-auditservice-overall_cn" target="_blank">
    <p class="next-steps-link">日志审计服务</p>
    <p class="next-steps-caption">跨区域中心化存储、审计</p>
  </a>
</div>

## 日志分析 Demo

| 日志类型     | 日志查询 Demo                                                                                                                                                 | 分析仪表盘 Demo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 主机指标日志   | [试用 Demo](/playground/demo.html?dest=/lognext/project/host-monitor-demo-log/dashboard/sls_host_host-monitor-metric%3FisShare%3Dtrue){target="_blank"}                         | [主机监控](/playground/demo.html?dest=/lognext/project/host-monitor-demo-log/dashboard/sls_host_host-monitor-metric%3FisShare%3Dtrue){target="_blank"}  |
| Nginx 日志   | [试用 Demo](/playground/demo.html?dest=/lognext/project/nginx-demo-log/logsearch/nginx-access-log%3FisShare%3Dtrue){target="_blank"}                         | [Nginx 访问日志](/playground/demo.html?dest=/lognext/project/nginx-demo-log/dashboard/nginx-access-log_nginx_dashboard_cn%3FisShare%3Dtrue){target="_blank"} [Nginx 监控中心](/playground/demo.html?dest=/lognext/project/nginx-demo-log/dashboard/nginx-access-log-metrics_nginx_monitoring_cn%3FisShare%3Dtrue){target="_blank"} [Nginx 秒级指标监控](/playground/demo.html?dest=/lognext/project/nginx-demo-log/dashboard/nginx-access-log-metrics_nginx_detail_monitoring_cn%3FisShare%3Dtrue){target="_blank"} [Nginx 访问日志分析](/playground/demo.html?dest=/lognext/project/nginx-demo-log/dashboard/nginx-access-log-metrics_nginx_access_cn%3FisShare%3Dtrue){target="_blank"} |
| CDN 日志     | [试用 Demo](/playground/demo.html?dest=/lognext/project/cdn-demo-log/dashboard/cdn_popular_resources_cn_cdn-access-log%3FisShare%3Dtrue){target="_blank"}    | [CDN 用户分析](/playground/demo.html?dest=/lognext/project/cdn-demo-log/dashboard/cdn_user_analyze_cn_cdn-access-log%3FisShare%3Dtrue){target="_blank"} [CDN 基础数据](/playground/demo.html?dest=/lognext/project/cdn-demo-log/dashboard/cdn_basic_cn_cdn-access-log%3FisShare%3Dtrue){target="_blank"} [CDN 错误分析](/playground/demo.html?dest=/lognext/project/cdn-demo-log/dashboard/cdn_error_detect_cn_cdn-access-log%3FisShare%3Dtrue){target="_blank"} [CDN 热门资源](/playground/demo.html?dest=/lognext/project/cdn-demo-log/dashboard/cdn_popular_resources_cn_cdn-access-log%3FisShare%3Dtrue){target="_blank"}                                                             |
| Ingress 日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/k8s-log-cfa82911e541341a1b9d21d527075cbfe/logsearch/nginx-ingress%3FisShare%3Dtrue){target="_blank"} | [Ingress 详细监控](/playground/demo.html?dest=/lognext/project/k8s-log-cfa82911e541341a1b9d21d527075cbfe/logstore/nginx-ingress/dashboardtemplate/k8s-ingress-nginx-metrics-monitoring%3FisShare%3Dtrue){target="_blank"} [Ingress 运营大盘](/playground/demo.html?dest=/lognext/project/k8s-log-cfa82911e541341a1b9d21d527075cbfe/logstore/nginx-ingress/dashboardtemplate/k8s-ingress-nginx-overview%3FisShare%3Dtrue){target="_blank"} [Ingress 访问中心](/doc/playground/demo.html?dest=/lognext/project/k8s-log-cfa82911e541341a1b9d21d527075cbfe/logstore/nginx-ingress/dashboardtemplate/k8s-ingress-nginx-access%3FisShare%3Dtrue){target="_blank"}                                |
| RDS 审计日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/rds-log-demo/logsearch/rds-audit-log%3FisShare%3Dtrue){target="_blank"}                              | [RDS 审计中心](/playground/demo.html?dest=/lognext/project/rds-log-demo/dashboard/rds-audit-log_rds_audit_center_cn%3FisShare%3Dtrue){target="_blank"} [RDS 审计性能中心](/playground/demo.html?dest=/lognext/project/rds-log-demo/dashboard/rds-audit-log_rds_performance_center_cn%3FisShare%3Dtrue){target="_blank"} [RDS 审计安全中心](/playground/demo.html?dest=/lognext/project/rds-log-demo/dashboard/rds-audit-log_rds_security_center_cn%3FisShare%3Dtrue){target="_blank"} |
| WAF 云产品日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/waf-demo-log/logsearch/waf-log%3FisShare%3Dtrue){target="_blank"}  | [WAF 访问中心](/playground/demo.html?dest=/lognext/project/waf-demo-log/dashboard/waf-log_waf_access_center_cn%3FisShare%3Dtrue){target="_blank"} [WAF 运营中心](/playground/demo.html?dest=/lognext/project/waf-demo-log/dashboard/waf-log_waf_operation_center_cn%3FisShare%3Dtrue){target="_blank"} [WAF 安全中心](/playground/demo.html?dest=/lognext/project/waf-demo-log/dashboard/waf-log_waf_security_center_cn%3FisShare%3Dtrue){target="_blank"} |
| VPC 流日志   | [试用 Demo](/playground/demo.html?dest=/lognext/project/vpc-flowlog-demo/logsearch/vpc-flowlog%3FisShare%3Dtrue){target="_blank"}   | [VPC 流日志概览](/playground/demo.html?dest=/lognext/project/vpc-flowlog-demo/dashboard/vpc-flowlog-vpc_flow_log_overview_cn%3FisShare%3Dtrue){target="_blank"}  |
| 云防火墙日志   | [试用 Demo](/playground/demo.html?dest=/lognext/project/firewall-demo-log/logsearch/firewall-log%3FisShare%3Dtrue){target="_blank"}   | [云防火墙统计中心](/playground/demo.html?dest=/lognext/project/firewall-demo-log/dashboard/firewall-log_cfw_report_center_cn%3FisShare%3Dtrue){target="_blank"}  |
| NAS 访问日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/nas-demo-log/logsearch/nas-access-log%3FisShare%3Dtrue){target="_blank"}     | [NAS文件系统操作统计中心](/playground/demo.html?dest=/lognext/project/nas-demo-log/dashboard/nas-access-log-nas_audit_dashboard_cn%3FisShare%3Dtrue){target="_blank"} [NAS文件系统明细信息](/playground/demo.html?dest=/lognext/project/nas-demo-log/dashboard/nas-access-log-nas_detail_dashboard_cn%3FisShare%3Dtrue){target="_blank"} [NAS运营中心](/playground/demo.html?dest=/lognext/project/nas-demo-log/dashboard/nas-access-log-nas_summary_dashboard_cn%3FisShare%3Dtrue){target="_blank"} |
| DDos 高防日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/ddos-demo-log/logsearch/ddos-anti-log%3FisShare%3Dtrue){target="_blank"}     | [DDos访问中心](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/ddos-anti-log-ddos_access_center_cn%3FisShare%3Dtrue){target="_blank"} [DDoS运营中心](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/ddos-anti-log_ddos_operation_center_cn%3FisShare%3Dtrue){target="_blank"} |
| DDos 高防（新BGP）日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/ddos-demo-log/logsearch/ddoscoo_access_log%3FisShare%3Dtrue){target="_blank"}     | [DDoS高防（新BGP）访问中心](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/dashboard-1687261346085-692043%3FisShare%3Dtrue){target="_blank"} [DDoS高防（新BGP）运营中心](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/ddoscoo_access_log_ddos_cd_operation_center_cn%3FisShare%3Dtrue){target="_blank"} |
| DDos 高防（国际）日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/ddos-demo-log/logsearch/ddosdip_access_log%3FisShare%3Dtrue){target="_blank"}     | [DDoS高防（国际）访问中心](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/dashboard-1687262195623-457552%3FisShare%3Dtrue){target="_blank"} [DDoS高防（国际）运营中心](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/ddosdip_access_log_ddos_cd_operation_center_cn%3FisShare%3Dtrue){target="_blank"} |
| DDos 原生防护日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/ddos-demo-log/logsearch/ddosbgp-logstore%3FisShare%3Dtrue){target="_blank"}     | [DDoS原生防护事件报表](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/ddosbgp-logstore_ddosbgp_event_center_cn%3FisShare%3Dtrue){target="_blank"} [DDoS原生清洗分析报表](/playground/demo.html?dest=/lognext/project/ddos-demo-log/dashboard/ddosbgp-logstore_ddosbgp_traffic_center_cn%3FisShare%3Dtrue){target="_blank"} |
| Api 网关日志（云产品） | [试用 Demo](/playground/demo.html?dest=/lognext/project/apigateway-demo-log/logsearch/apigateway-log%3FisShare%3Dtrue){target="_blank"}     | [API 网关访问日志](/playground/demo.html?dest=/lognext/project/apigateway-demo-log/dashboard/apigateway-log_accesslog_dashboard_cn%3FisShare%3Dtrue){target="_blank"} |
| 函数计算消费日志（云产品） | [试用 Demo](/playground/demo.html?dest=/lognext/project/fc-demo-log/logsearch/fc-log%3FisShare%3Dtrue){target="_blank"}     | |
| OSS 访问日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/oss-demo-log/logsearch/oss-access-log%3FisShare%3Dtrue){target="_blank"}     | [OSS访问中心](/playground/demo.html?dest=/lognext/project/oss-demo-log/dashboard/oss-access-log_oss_access_center_cn%3FisShare%3Dtrue){target="_blank"} [OSS审计中心](/playground/demo.html?dest=/lognext/project/oss-demo-log/dashboard/oss-access-log_oss_audit_center_cn%3FisShare%3Dtrue){target="_blank"} [OSS运维中心](/playground/demo.html?dest=/lognext/project/oss-demo-log/dashboard/oss-access-log_oss_operation_center_cn%3FisShare%3Dtrue){target="_blank"} [OSS性能中心](/playground/demo.html?dest=/lognext/project/oss-demo-log/dashboard/oss-access-log_oss_performance_center_cn%3FisShare%3Dtrue){target="_blank"} |
| OSS 计量日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/oss-demo-log/logsearch/oss-metering-log%3FisShare%3Dtrue){target="_blank"}     | |
| SAS 主机登录日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/sas-demo-log/logsearch/sas-login-log%3FisShare%3Dtrue){target="_blank"}     | [安骑士主机日志-登录中心](/playground/demo.html?dest=/lognext/project/sas-demo-log/dashboard/sas-login-log_aegis_login_center_cn%3FisShare%3Dtrue){target="_blank"} |
| SAS 主机进程日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/sas-demo-log/logsearch/sas-host-log%3FisShare%3Dtrue){target="_blank"}     | [安骑士主机日志-进程中心](/playground/demo.html?dest=/lognext/project/sas-demo-log/dashboard/sas-host-log_aegis_process_center_cn%3FisShare%3Dtrue){target="_blank"} |
| SAS 网络日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/sas-demo-log/logsearch/sas-net-log%3FisShare%3Dtrue){target="_blank"}     | [安骑士主机日志-网络连接中心](/playground/demo.html?dest=/lognext/project/sas-demo-log/dashboard/sas-net-log_aegis_network_center_cn%3FisShare%3Dtrue){target="_blank"} |
| 微服务引擎网关访问日志  | [试用 Demo](/playground/demo.html?dest=/lognext/project/mse-demo-log/logsearch/mse-access-log%3FisShare%3Dtrue){target="_blank"}   | [MSE 监控中心](/playground/demo.html?dest=/lognext/project/mse-demo-log/dashboard/dashboard-1631675736205-379262%3FisShare%3Dtrue){target="_blank"} [MSE 访问中心](/playground/demo.html?dest=/lognext/project/mse-demo-log/dashboard/dashboard-1631677853390-433228%3FisShare%3Dtrue){target="_blank"} [MSE 明细](/playground/demo.html?dest=/lognext/project/mse-demo-log/dashboard/dashboard-1634804997739-184262%3FisShare%3Dtrue){target="_blank"} [MSE TOP榜](/playground/demo.html?dest=/lognext/project/mse-demo-log/dashboard/dashboard-1636441241474-21287%3FisShare%3Dtrue){target="_blank"}  [MSE 实例详情](/playground/demo.html?dest=/lognext/project/mse-demo-log/dashboard/dashboard-1636945514950-44193%3FisShare%3Dtrue){target="_blank"}|
| Tomcat 访问日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/tomcat-demo-log/logsearch/tomcat-access-log%3FisShare%3Dtrue){target="_blank"}     | [Tomcat访问日志](/playground/demo.html?dest=/lognext/project/tomcat-demo-log/dashboard/tomcat-access-log_tomcat_access_log%3FisShare%3Dtrue){target="_blank"} |
| 移动端登录日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/mobile-demo-log/logsearch/mobile-login-log%3FisShare%3Dtrue){target="_blank"}     | |
| 教育类应用服务日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/edu-app-demo-log/logsearch/edu-app-log%3FisShare%3Dtrue){target="_blank"}     | |
| 游戏操作日志 | [试用 Demo](/playground/demo.html?dest=/lognext/project/game-demo-log/logsearch/game-op-log%3FisShare%3Dtrue){target="_blank"}     | |


## 可视化图表 Demo
| 图表类型      | 试用Demo |
| ----------- | ----------- |
| 表格Pro      |  [基础表格](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690422195014-620638%3FisShare%3Dtrue){target="_blank"} [支持排序](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690422195014-620638%3FisShare%3Dtrue){target="_blank"} [支持搜索](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690422195014-620638%3FisShare%3Dtrue){target="_blank"} [支持过滤](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690422195014-620638%3FisShare%3Dtrue){target="_blank"} [高亮显示](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690423226201-950041%3FisShare%3Dtrue){target="_blank"} [添加迷你图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690424022590-850634%3FisShare%3Dtrue){target="_blank"} [添加进度条](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690424319861-419445%3FisShare%3Dtrue){target="_blank"} [值映射](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690424919595-237155%3FisShare%3Dtrue){target="_blank"} [行列转换](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690425195526-131671%3FisShare%3Dtrue){target="_blank"}|
| 线图Pro      |  [基础线图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1688697691549-359026%3FisShare%3Dtrue){target="_blank"} [时序模式](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690422856947-609987%3FisShare%3Dtrue){target="_blank"} [多轴线图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1688697691549-359026%3FisShare%3Dtrue){target="_blank"} [线图阈值](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1688722594093-515613%3FisShare%3Dtrue){target="_blank"} [显示为柱状](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1688702541223-372683%3FisShare%3Dtrue){target="_blank"} [显示为点](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1688702541223-372683%3FisShare%3Dtrue){target="_blank"} [超大数据展示](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690421763870-242752%3FisShare%3Dtrue){target="_blank"} |
| 柱状图Pro     |  [基础柱状图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690425407306-385262%3FisShare%3Dtrue){target="_blank"} [分组柱状图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690425407306-385262%3FisShare%3Dtrue){target="_blank"} [堆叠柱状图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690425407306-385262%3FisShare%3Dtrue){target="_blank"} [标签多种形态](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426025303-320320%3FisShare%3Dtrue){target="_blank"} |
| 流图Pro     |  [线图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426301182-194897%3FisShare%3Dtrue){target="_blank"} [柱状图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426301182-194897%3FisShare%3Dtrue){target="_blank"} [面积图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426301182-194897%3FisShare%3Dtrue){target="_blank"} [交叉表](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426301182-194897%3FisShare%3Dtrue){target="_blank"} |
| 统计图Pro     |  [基础统计图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426621720-118657%3FisShare%3Dtrue){target="_blank"} [单值图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690426621720-118657%3FisShare%3Dtrue){target="_blank"} [对比值](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690429012230-245372%3FisShare%3Dtrue){target="_blank"} |
| 计量图Pro     |  [基础计量图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690429619942-631677%3FisShare%3Dtrue){target="_blank"} [刻度盘](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690430112270-795747%3FisShare%3Dtrue){target="_blank"} |
| 饼图Pro     |  [基础饼图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690430292895-651430%3FisShare%3Dtrue){target="_blank"} [环形饼图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690430459204-333118%3FisShare%3Dtrue){target="_blank"} [南丁玫瑰饼图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690430459204-333118%3FisShare%3Dtrue){target="_blank"} [多查询合并](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690436026442-414546%3FisShare%3Dtrue){target="_blank"} |
| 直方图Pro     |  [基础直方图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690436479475-208426%3FisShare%3Dtrue){target="_blank"} [限制区间范围](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690436479475-208426%3FisShare%3Dtrue){target="_blank"} [限制区间数量](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690436479475-208426%3FisShare%3Dtrue){target="_blank"} [多维度合成](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437097936-798907%3FisShare%3Dtrue){target="_blank"} [多维度堆叠](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437097936-798907%3FisShare%3Dtrue){target="_blank"} |
| 雷达图Pro     |  [基础雷达图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437304416-521089%3FisShare%3Dtrue){target="_blank"} [圆形雷达图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437304416-521089%3FisShare%3Dtrue){target="_blank"} [多查询合并](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437304416-521089%3FisShare%3Dtrue){target="_blank"} |
| 交叉表Pro     |  [基础交叉表](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437753752-134017%3FisShare%3Dtrue){target="_blank"} [多聚合字段交叉表](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437753752-134017%3FisShare%3Dtrue){target="_blank"} [多维度分类交叉表](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690437753752-134017%3FisShare%3Dtrue){target="_blank"} |
| 散点图Pro     |  [基础散点图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690438641963-167286%3FisShare%3Dtrue){target="_blank"} [分类散点图](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690438641963-167286%3FisShare%3Dtrue){target="_blank"} [动态设置点大小](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690438641963-167286%3FisShare%3Dtrue){target="_blank"}  [设置阈值](/playground/demo.html?dest=/lognext/project/charts-demo/dashboard/dashboard-1690438908181-599984%3FisShare%3Dtrue){target="_blank"} |

## 更多参考

B 站：https://space.bilibili.com/630680534

云栖博客：https://yq.aliyun.com/teams/4/type_blog-cid_8

知乎：https://zhuanlan.zhihu.com/aliyunlog

微信：智能日志分析  or AISecDevOps

产品网站：https://www.aliyun.com/product/sls
