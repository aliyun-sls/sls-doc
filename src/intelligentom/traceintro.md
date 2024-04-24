# 日志服务 SLS – Trace 服务

## 功能介绍

分布式链路追踪（Distributed Tracing，简称 Trace）可提供整个服务调用链路的调用关系、延迟、结果等信息，非常适用于云原生、分布式、微服务等涉及多个服务交互的系统。

:::tip Trace 服务
[试用 Demo](/playground/demo.html?dest=/lognext/trace/sls-mall/sls-mall%3Fresource=/trace/sls-mall/explorer){target="_blank"}
:::

## 视频介绍

<video src="https://static-aliyun-doc.oss-cn-hangzhou.aliyuncs.com/file-manage-files/zh-CN/20230806/wwaf/SLS Trace应用介绍.mp4" controls="controls" width="100%" height="500" autoplay="autoplay">
您的浏览器不支持 video 标签。
</video>

## 功能优势

- 支持多种接入方式：支持通过 OpenTelemetry、Jaeger、Zipkin 等协议直接接入 Trace 数据。支持接入 10 多种开发语言的 Trace 数据。支持接入多种 Trace 平台中的 Trace 数据。支持通过公网、阿里云内网（经典网络、VPC）、全球加速网络接入 Trace 数据。
- 遵循 OpenTelemetry Trace 1.0 标准规范
- 高性能：支持日 PB 级数据接入，支持提取与分析相关指标，具备海量场景下 Trace 数据 100% 采样的能力。
- 弹性支持：自定义设置日志存储周期，Logstore 存储容量可动态伸缩以满足业务增长需求。
- 具备丰富的 Trace 功能：包括 Trace 详情、服务概览、Trace 查询统计、依赖分析等，同时提供自定义 SQL 分析功能，满足特性化需求。
- 下游生态友好：日志服务 Trace 数据、计算后的指标数据等都支持对接各类流计算平台、离线计算引擎，并支持自定义订阅数据进行定制化处理。
- 提供多种内置的 AIOps 算法：自动分析 Trace 对于性能、错误率的影响，帮助开发者在复杂环境下快速排查问题的根因。

## 核心价值

- OpenTelemetry 只提供数据的格式定义、产生、收集、发送，但并不提供分析、可视化、告警等功能。日志服务 Trace APP 基于 OpenTelemetry 协议实现，支持采集 OpenTelemetry 以及其他平台（例如 Jaeger、Zipkin、SkyWalking 等）的 Trace 数据，并提供 Trace 数据接入、存储、分析、可视化、告警、人工智能运维等功能。
