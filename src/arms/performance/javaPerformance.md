# Java 应用持续性能剖析

:::tip Java 应用持续性能剖析
[试用 Demo](/doc/playground/armsdemo.html?dest=https%3A%2F%2Farmsnext4service.console.aliyun.com%2Ftracing%23%2Ftracing%2Fcn-hangzhou%3FappId%3Dckv8e2vzfj%25407e393063f3fd6ad%26tab%3DappDiagnosis%26source%3DTRACE%26sideFilters%3D%255B%255D){target="_blank"}
:::

## 使用场景

持续性能剖析用于监控生产环境的应用程序性能，有效识别因 CPU、内存和 IO 导致的性能瓶颈，并按照方法名称、类名称和行号进行统计，辅助定位问题根因。最终协助开发者提高系统稳定性，优化程序性能，降低延迟，提高系统吞吐量。

## 使用前提

- 接入 ARMS 应用监控，并且将 Agent 版本更新至 v2.7.3.5 或以上版本
- 操作系统版本在 Linux 2.6.32-431.23.3.el6.x86_64 及以上
- JDK 版本满足以下条件之一
  - OpenJDK 8u352+
  - OpenJDK 11.0.17+
  - OpenJDK 17.0.5+
  - Oracle JDK 11.0.21+
  - Oracle JDK 17.0.9+
