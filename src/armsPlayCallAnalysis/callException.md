## 通过错/慢调用链排查应用产生异常的原因

### 使用场景
在生产环境中，引发应用异常（如耗时突增、错误率突增）的原因有很多，常见的包括流量不均、单机故障、程序异常和依赖组件故障等。在新应用上线或大促备战前通常建议做一次系统性的性能调优，分析当前系统存在哪些性能瓶颈，梳理出常出错的或耗时较高的接口和组件进行优化。通过使用调用链分析的错/慢Trace分析功能，定位系统或应用产生错、慢调用的原因，帮助您排查问题、定位系统性能瓶颈。
### 使用前提

- 已接入 ARMS 应用监控或可观测链路 OpenTelemetry 版
### Demo地址
[https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou?filters=statusCode%21%3D%22200%22](https://arms4service.console.aliyun.com/#/tracing/callChains/cn-hangzhou?filters=statusCode%21%3D%22200%22)