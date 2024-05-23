# 调用链采样配置最佳实践

## 使用场景

对于绝大多数分布式系统，不是每一条调用链都值得被可观测平台记录，因为其中包含大量重复、低关注度信息。调整采样是目前解决这类问题最高效且主流的方式，但具体配置什么样的采样策略，能够在可控的资源开销和费用成本内，最大程度保证错、慢、异常等链路被采集，从而最大限度保障性能监控和问题排查的使用需求。ARMS 提供丰富灵活的采样策略，可以围绕不同业务场景下配置最合适的调用链采样策略以达到成本最优、效果最佳的目的。
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/36556451/1716356551592-34ee5d5c-2e3b-4ea6-8592-720bb363b1db.png#clientId=u14f84cb1-662e-4&from=paste&id=u77e51609&originHeight=318&originWidth=994&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u33c5a472-298c-4289-a847-769039e6a53&title=)

## 使用前提

- 已接入 ARMS 应用监控
