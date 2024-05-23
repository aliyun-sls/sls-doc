## **查询应用实例资源监控**

### 使用场景
为Java应用安装探针后，ARMS即可开始监控Java应用，您可以在**实例监控**页面了解应用的主机或容器监控、JVM GC或内存、线程池或连接池等监控信息。您可以按**主机地址**对实例列表进行筛选过滤，单击实例IP可以查看实例详情，比如流量黄金三指标（请求数、错误数、平均耗时）、**JVM监控**（GC、内存、线程、文件）、**池化监控**（包括核心线程数量、当前线程数量、最大线程数量、活跃线程数量、任务队列容量）、**主机或容器监控**（CPU、内存、Disk、Load、网络流量和网络数据包）。
![picture 4](./img/appMonitoring4.png)
![picture 4.1](./img/appMonitoring4.1.png)
### 使用前提

- 已接入 ARMS 应用监控
### Demo地址
[https://trace4service.console.aliyun.com/#/tracing/cn-hangzhou?appId=ckv8e2vzfj%40a71c26ffd651d46&tab=instanceMonitoring&source=XTRACE&xtraceType=trace](https://trace4service.console.aliyun.com/#/tracing/cn-hangzhou?appId=ckv8e2vzfj%40a71c26ffd651d46&tab=instanceMonitoring&source=XTRACE&xtraceType=trace)