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