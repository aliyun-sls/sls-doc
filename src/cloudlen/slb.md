# 使用 CloudLens 对负载均衡进行全面观测

CloudLens 为阿里云负载均衡提供访问日志分析、秒级监控指标分析、实时告警等功能。

:::tip CloudLens for CLB
[试用 Demo](/playground/demo.html?dest=/lognext/app/lens/clb){target="_blank"}
:::

:::tip CloudLens for ALB
[试用 Demo](/playground/demo.html?dest=/lognext/app/lens/alb){target="_blank"}
:::

## 目标读者

需要对阿里云负载均衡访问日志进行分析监控的开发、运维、安全审计人员。

## 适用场景

### 开发运维

通过 CloudLens 对负载均衡进行全面观测，可实时关注负载均衡的各类指标信息，包括 PV、请求成功率、平均延迟、P50 延迟、P99 延迟、P9999 延迟、出入流量等，结合内置的告警可实时监控感知到流量高峰以及异常场景，并及时通知给特定的开发人员做后续的服务调整。同时 CloudLens for ALB/CLB 提供负载均衡访问日志的实时存储、查询与分析，提高了问题定位效率。

### IT 运维

IT 运维人员更注重后台服务的稳定性、黄金指标、并告警监控进行及时响应。IT 运维人员可通过 CloudLens for ALB/CLB 的告警功能对负载均衡的错误码、流量、异常事件、错误率、延迟等指标及时识别异常并响应（24×7 的值班）。

### 安全审计

安全审计更加偏重对后台重要服务访问日志的记录与较长时间保存以便审计，也可以对重要频繁访问的后台服务，基于访问日志或指标进行安全类监控（例如异常 IP 访问、DDoS 攻击等）和一定响应，在需要时进行安全分析与审计等。

### 相关概念

负载均衡 SLB（Server Load Balancer）是一种对流量进行按需分发的服务，通过将流量分发到不同的后端服务器来扩展应用系统的吞吐能力，并且可以消除系统中的单点故障，提升应用系统的可用性。阿里云负载均衡 SLB 分为两类：传统型负载均衡 CLB 和应用型负载均衡 ALB。
| 负载均衡分类 | 说明 |
| -- | -- |
| ALB（应用型负载均衡） | 专门面向七层，提供超强的业务处理性能，例如 HTTPS 卸载能力。单实例每秒查询数 QPS（Query Per Second）可达 100 万次。同时 ALB 提供基于内容的高级路由特性，例如基于 HTTP 报头、Cookie 和查询字符串进行转发、重定向和重写等，是阿里云官方云原生 Ingress 网关。
|
| CLB（传统型负载均衡） | 支持 TCP、UDP、HTTP 和 HTTPS 协议，具备强大的四层处理能力，以及基础的七层处理能力。|
![picture 1](/img/src/cloudlen/slb/65d9455090bed3058d15f2e185685921aaece644bdf9d52afd886af8ccfd3e2e.png)

## 方案架构

SLS 团队联合负载均衡团队发布的应用型负载均衡日志中心（CloudLens for ALB）以及传统型负载均衡日志中心（CloudLens for CLB），为不同类型的负载均衡提供访问日志分析、秒级监控指标分析、实时告警等功能，并提供基于 AIOps 的自动异常巡检功能，具体包括：

支持集中管理当前阿里云账号下所有的 ALB/CLB 实例。

支持一键开启 ALB/CLB 访问日志的采集功能，集中管理日志的采集状态。

提供 ALB/CLB 访问日志的实时存储、查询与分析。

基于原始访问日志实时提取各类指标信息，包括 PV、请求成功率、平均延迟、P50 延迟、P99 延迟、P9999 延迟、出入流量等。并支持多个维度组合，包括 app_lb_id、host、status。

提供丰富的可视化报表，包括监控中心、秒级监控、实例巡检等，并支持报表邮件、钉钉群订阅。

提供智能巡检功能，支持全局巡检和 app_lb_id 粒度巡检，并支持在可视化报表中直接标注异常点。

自定义告警配置，告警通知直接对接消息中心、短信、邮件、语音（电话）、钉钉，并支持对接自定义 WebHook。
![picture 2](/img/src/cloudlen/slb/c58ceed56366b7cb82c765535b81fff6e5cb3bc97a29f087d34a92567e599ba5.png)

### 方案优势

操作简单：一站式开通、中心化使用，无需关心日志收集、存储、计算、可视化等问题，将开发、运维人员从日志处理的繁琐耗时中解放出来，将更多的精力集中到业务开发和技术探索上去。

海量数据：负载均衡日志中心支持自定义配置预聚合功能，实时计算聚合指标，计算后的聚合结果可降低几个数量级，使查询速度大大提升。

实时查询：阿里云负载均衡结合日志服务强大的大数据计算能力，秒级分析处理实时产生的日志，满足 DevOps、监控、告警等场景对日志数据的实时性的要求。

弹性存储：Logstore 容量可动态伸缩，支持实例级别开通或关闭访问日志功能，任意设置日志存储周期以及冷热存储。

智能巡检：基于达摩院智能 AIOps 算法，提供 ALB/CLB 指标自动巡检功能，有助于更快、更准确的发现并定位问题。

开放平台：支持与三方系统进行对接，包括流计算框架、常见数仓、SDK 消费、三方可视化系统等。

### 接入管理模块介绍

接入管理提供实例集中管理视图。负载均衡 CloudLens 开启后会拉取所有 ALB(CLB) 实例全局展示，包括实例的基本信息：实例 id、名称、地域以及标签；实例日志采集状态：访问日志的采集操作、存储信息以及采集状态，开启访问日志后的实例通过访问日志按钮可一键跳转查询分析页面。
![picture 3](/img/src/cloudlen/slb/43e829c4f5807742228eba4e60869f204f31b5038bbff36c3b64e523542a299a.png)  
存储目标库汇聚实例开启访问日志存储的 project 以及 logstore 信息，支持修改日志存储周期。
![picture 4](/img/src/cloudlen/slb/72ba71e70c6e29f0713da4fadb509cce66f508755c513c3ce7e9c501c94d851e.png)

### 告警中心模块介绍

CloudLens for CLB/ALB 预设了丰富的监控告警规则，如基线告警、同环比告警、智能告警等，涵盖了 QPS、延迟、错误率、流量等场景，同时也支持短信、钉钉、邮件、语音、自定义 Webhook 等通知方式，用户可以根据实际应用场景选择开启不同的告警。
![picture 5](/img/src/cloudlen/slb/ecf1bb045dbd45c2a1860dac6527761a91f4f471261b648ff45d0b3d3469dded.png)

### 报表中心模块介绍

负载均衡 7 层访问日志支持的指标包括：全局指标，app_lb_id 维度指标、status 维度指标和 upstream_status 维度指标，具体可参考 CloudLens for ALB 指标说明以及 CloudLens for CLB 指标说明。报表中心包含监控概览、监控中心、秒级监控、实例巡检、访问概览这 5 部分。

#### 监控概览

监控概览主要展示负载均衡实例监控指标的总体情况，包括核心指标、错误码、流量、异常事件、访问 PV、访问成功率、流量、平均延迟等指标。
![picture 6](/img/src/cloudlen/slb/7322010ef86d7ee58167e9fdad41a3e5b10b444e25bb0b4a2edffe2012943e21.png)

### 监控中心

监控中心主要展示实例的实时监控数据，包括访问 PV、请求成功率、平均延时、4xx 请求数、Status 分布、流量、P50 延迟、P90 延迟、P99 延迟、P9999 延迟、TOP 请求 Host、TOP 延迟 Host、TOP 失败率 Host、TOP 请求 URL、TOP 延迟 URL、TOP 失败率 URL、TOP 请求后端、TOP 延迟后端、TOP 失败率后端等指标。
![picture 7](/img/src/cloudlen/slb/d8d9a1f8aea4d68189267d71cd4385aa871ba0ebddd77ae8bb6ca6809c329fd4.png)

#### 秒级监控

秒级监控主要展示实例的秒级监控指标，包括 QPS、访问延迟、Upstream 延迟、成功率、请求流量、返回 Body 流量、2xx 状态码、3xx 状态码、错误状态码、Upstream2xx 状态码、Upstream3xx 状态码、Upstream 错误状态码等指标。
![picture 8](/img/src/cloudlen/slb/4fc3c23aac90b2ccb614863d11879fb5cc5eb01d6ac0f5645024382ab85a7097.png)

#### 实例巡检

基于日志服务提供的机器学习算法，自动检测 ALB（CLB）实例的异常点，包括异常总数、高等级异常、异常等级分布、中等级异常、低等级异常、异常指标分布、异常列表、异常事件等指标。

#### 访问概览

访问概览主要展示实例的整体状态，包括 PV 对比昨日、PV 对比上周、UV 对比昨日、UV 对比上周、PV 分布、UV 分布、今日访问 PV、7 天访问 PV、TOP10 访问省份、移动端占比、TOP10 访问 Host、TOP10 访问 UserAgent、TOP 访问 IP 等指标。
![picture 9](/img/src/cloudlen/slb/f36225de403b03348d087e2059bf22c01680c8ab657a2bb4e429f7a883dc26f6.png)

## 如何接入

ALB 参考 https://help.aliyun.com/document_detail/197663.html

CLB 参考 https://help.aliyun.com/document_detail/183235.html
