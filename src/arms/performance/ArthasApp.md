# 使用 Arthas 探索应用性能

:::tip 使用 Arthas 探索应用性能
[试用 Demo](/doc/playground/armsdemo.html?dest=https%3A%2F%2Farmsnext4service.console.aliyun.com%2Ftracing%23%2Ftracing%2Fcn-hangzhou%3FappId%3Dckv8e2vzfj%25407e393063f3fd6ad%26tab%3DappDiagnosis-arthas%26source%3DTRACE%26sideFilters%3D%255B%255D){target="_blank"}
:::

## 使用场景

Arthas 是诊断 Java 应用线上问题的利器，利用字节码增强技术，可以在不重启 JVM 进程的情况下，查看程序的运行情况，包括：

- 查看 JVM 概览：查看当前 JVM 进程实时的内存使用情况、系统信息、系统变量和环境变量。
- 分析线程耗时：查看当前 JVM 进程的线程耗时情况以及指定线程的实时方法栈。
- 分析方法执行：抓取任意方法（非 JDK 方法）满足指定条件的一次执行记录，记录该方法的参数、异常、返回值以及方法内部各个方法执行耗时。
- 查看对象：查看任意类的某个实例实时的属性取值情况。
- 通过 Arthas Shell 执行命令：通过命令行方式使用 Arthas 诊断。

## 使用前提

- 已接入 ARMS 应用监控，且 ARMS Java Agent 版本为 v2.7.1.3 或以上
- 在应用**自定义配置**页签的**Arthas 监控**区域，打开**Arthas 开关**
