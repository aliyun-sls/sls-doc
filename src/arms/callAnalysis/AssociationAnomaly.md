## 通过调用链关联应用日志分析业务异常

### 使用场景
定位业务异常问题难度大、效率低，为了解决这一难题，ARMS应用监控和可观测链路 OpenTelemetry 版通过结合调用链路和日志分析，可以快速、准确地定位业务异常问题，提升微服务框架下的诊断效率。当应用服务出现错慢异常问题时，可以根据 TraceId 查询关联的业务日志。或者业务出现错误关键词时，通过 TraceId 反向查询调用链路上下游，快速定位异常节点与关联日志。
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/36556451/1716356553136-a6de6bd7-18b2-4f79-9396-770c516c9cd7.png#clientId=u14f84cb1-662e-4&from=paste&id=u93192d73&originHeight=364&originWidth=1393&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ua3d10113-c81c-45b3-b959-daa95cc8889&title=)
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/36556451/1716356553358-81dc5d4c-c180-4097-9ff8-6aef23a46438.png#clientId=u14f84cb1-662e-4&from=paste&id=ud9fe2bcd&originHeight=507&originWidth=1698&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u0f81f218-d840-4625-af74-2cc10d03710&title=)
### 使用前提

- 已接入 ARMS 应用监控或可观测链路 OpenTelemetry 版
- 已开通日志服务SLS。登录[日志服务控制台](https://sls.console.aliyun.com/)时，根据页面提示开通日志服务，并创建 Project 和 LogStore，完成应用日志上报 SLS。
### Demo地址
[https://armsnext4service.console.aliyun.com/tracing#/tracing/cn-hangzhou?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=scene-log&source=TRACE&sideFilters=%5B%5D](https://armsnext4service.console.aliyun.com/tracing#/tracing/cn-hangzhou?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=scene-log&source=TRACE&sideFilters=%5B%5D)
