# **性能剖析**
## **Java应用持续性能剖析**
### **使用场景**
持续性能剖析用于监控生产环境的应用程序性能，有效识别因CPU、内存和IO导致的性能瓶颈，并按照方法名称、类名称和行号进行统计，辅助定位问题根因。最终协助开发者提高系统稳定性，优化程序性能，降低延迟，提高系统吞吐量。
### **使用前提**

- 接入ARMS应用监控，并且将Agent版本更新至v2.7.3.5或以上版本
- 操作系统版本在Linux 2.6.32-431.23.3.el6.x86_64及以上
- JDK版本满足以下条件之一
   - OpenJDK 8u352+
   - OpenJDK 11.0.17+
   - OpenJDK 17.0.5+
   - Oracle JDK 11.0.21+
   - Oracle JDK 17.0.9+
### **Demo地址**
[https://armsnext4service.console.aliyun.com/tracing#/tracing/cn-hangzhou?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=appDiagnosis&source=TRACE&sideFilters=%5B%5D](https://armsnext4service.console.aliyun.com/tracing#/tracing/cn-hangzhou?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=appDiagnosis&source=TRACE&sideFilters=%5B%5D)
## **查询JVM监控**
### **使用场景**
通过JVM监控指标，分析线上Java应用的性能问题，指标包括：GC次数、堆内存大小、非堆内存大小、元空间大小、直接缓冲区大小、JVM线程数等。
### **使用前提**

- 接入ARMS应用监控
### **Demo地址**
[https://armsnext4service.console.aliyun.com/tracing#/serviceDetail?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=arms-instance-jvm&source=TRACE&preTab=instanceMonitoring&regionId=cn-hangzhou&hostName=10.0.0.45](https://armsnext4service.console.aliyun.com/tracing#/serviceDetail?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=arms-instance-jvm&source=TRACE&preTab=instanceMonitoring&regionId=cn-hangzhou&hostName=10.0.0.45)
## **使用Arthas探索应用性能**
### 使用场景
Arthas是诊断Java应用线上问题的利器，利用字节码增强技术，可以在不重启JVM进程的情况下，查看程序的运行情况，包括：

- 查看JVM概览：查看当前JVM进程实时的内存使用情况、系统信息、系统变量和环境变量。
- 分析线程耗时：查看当前JVM进程的线程耗时情况以及指定线程的实时方法栈。
- 分析方法执行：抓取任意方法（非JDK方法）满足指定条件的一次执行记录，记录该方法的参数、异常、返回值以及方法内部各个方法执行耗时。
- 查看对象：查看任意类的某个实例实时的属性取值情况。
- 通过Arthas Shell执行命令：通过命令行方式使用Arthas诊断。
### **使用前提**

- 已接入ARMS应用监控，且ARMS Java Agent版本为v2.7.1.3或以上
- 在应用**自定义配置**页签的**Arthas监控**区域，打开**Arthas开关**
### Demo地址
[https://armsnext4service.console.aliyun.com/tracing#/tracing/cn-hangzhou?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=appDiagnosis-arthas&source=TRACE&sideFilters=%5B%5D](https://armsnext4service.console.aliyun.com/tracing#/tracing/cn-hangzhou?appId=ckv8e2vzfj%407e393063f3fd6ad&tab=appDiagnosis-arthas&source=TRACE&sideFilters=%5B%5D)
