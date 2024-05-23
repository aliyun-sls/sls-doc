# **调用链分析**
## **端到端全链路追踪**
### **使用场景**
**链路追踪的价值在于“关联”，用户终端、网关、后端应用、云端组件（数据库、消息等）共同构成了链路追踪的轨迹拓扑大图。**这张拓扑覆盖的范围越广，链路追踪能够发挥的价值就越大。而端到端全链路追踪就是覆盖全部关联 IT 系统，能够完整记录用户行为在系统间调用路径与状态的最佳实践方案。目前可观测链路 OpenTelemetry 版已经支持 Web/Andriod/iOS 终端、ALB/MSE/API Gateway/ASM 网关、Java/Go/Python 等多语言后端应用接入，提供完整的端到端调用链路，快速定位错慢异常。
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/36556451/1716356547021-f24efd26-a443-4af1-a820-35be711fc13f.png#clientId=u14f84cb1-662e-4&from=paste&id=ubfe49394&originHeight=800&originWidth=1342&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud4c1abcf-ece7-4bd8-9b22-4969a480b71&title=)
### **使用前提**

- 已接入可观测链路 OpenTelemetry 版
### **Demo 地址**
[https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou](https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou)
## 通过错/慢调用链排查应用产生异常的原因
### 使用场景
在生产环境中，引发应用异常（如耗时突增、错误率突增）的原因有很多，常见的包括流量不均、单机故障、程序异常和依赖组件故障等。在新应用上线或大促备战前通常建议做一次系统性的性能调优，分析当前系统存在哪些性能瓶颈，梳理出常出错的或耗时较高的接口和组件进行优化。通过使用调用链分析的错/慢Trace分析功能，定位系统或应用产生错、慢调用的原因，帮助您排查问题、定位系统性能瓶颈。
### 使用前提

- 已接入 ARMS 应用监控或可观测链路 OpenTelemetry 版
### Demo地址
[https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou?filters=statusCode%21%3D%22200%22](https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou?filters=statusCode%21%3D%22200%22)
## **调用链采样配置最佳实践**
### 使用场景
对于绝大多数分布式系统，不是每一条调用链都值得被可观测平台记录，因为其中包含大量重复、低关注度信息。调整采样是目前解决这类问题最高效且主流的方式，但具体配置什么样的采样策略，能够在可控的资源开销和费用成本内，最大程度保证错、慢、异常等链路被采集，从而最大限度保障性能监控和问题排查的使用需求。ARMS 提供丰富灵活的采样策略，可以围绕不同业务场景下配置最合适的调用链采样策略以达到成本最优、效果最佳的目的。
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/36556451/1716356551592-34ee5d5c-2e3b-4ea6-8592-720bb363b1db.png#clientId=u14f84cb1-662e-4&from=paste&id=u77e51609&originHeight=318&originWidth=994&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u33c5a472-298c-4289-a847-769039e6a53&title=)
### 使用前提

- 已接入 ARMS 应用监控
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
