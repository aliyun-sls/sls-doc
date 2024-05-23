## **端到端全链路追踪**

### **使用场景**
**链路追踪的价值在于“关联”，用户终端、网关、后端应用、云端组件（数据库、消息等）共同构成了链路追踪的轨迹拓扑大图。**这张拓扑覆盖的范围越广，链路追踪能够发挥的价值就越大。而端到端全链路追踪就是覆盖全部关联 IT 系统，能够完整记录用户行为在系统间调用路径与状态的最佳实践方案。目前可观测链路 OpenTelemetry 版已经支持 Web/Andriod/iOS 终端、ALB/MSE/API Gateway/ASM 网关、Java/Go/Python 等多语言后端应用接入，提供完整的端到端调用链路，快速定位错慢异常。
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/36556451/1716356547021-f24efd26-a443-4af1-a820-35be711fc13f.png#clientId=u14f84cb1-662e-4&from=paste&id=ubfe49394&originHeight=800&originWidth=1342&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud4c1abcf-ece7-4bd8-9b22-4969a480b71&title=)
### **使用前提**

- 已接入可观测链路 OpenTelemetry 版
### **Demo 地址**
[https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou](https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou)