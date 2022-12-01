随着微服务、云原生、DevOps等技术逐渐发展，应用开发速度、部署方式、迭代效率出现了巨大的提升。但对于可观测的要求也越来越高，例如需要针对多种语言、多种中间件、动态运行的K8s环境来定制观测手段。众多传统的观测手段适应性越来越低，我们希望能够有一套更加通用的手段来观测整个系统的行为。基于以上背景，阿里云SLS 与阿里云基础软件系统服务团队面向龙蜥社区共同合作，研发了应用无侵入监控 ，我们希望以开放、高性能、无侵入的内核观测技术为广大云上开发者提供更加便捷的可观测方式，目前商业集成版本已上线SLS 日志应用[全栈监控](https://help.aliyun.com/document_detail/356443.html)，同时开源版本将发布于[iLogtail](https://github.com/alibaba/ilogtail) 与 [Coolbpf](https://github.com/aliyun/coolbpf)。
# 传统手段
### 异构语言
针对可观测数据采集领域指标，传统方式一般采取集成Agent/SDK，采用Pull或Push的方式上报指标，如下图所示，不同语言的服务可能依赖下层相同的数据库或MQ 等中间件。对于JVM 类型语言，基于虚拟机特性，Javaagent 技术可以低成本的动态修改字节码进行接入，但大多数语言并不不具备此特性，这也就意味着大多数语言需要在不同的服务模块集成SDK进行可观测数据收集，这意味着巨大的人力集成成本。其次，如集成的SDK/Agent 绑定于某一特定的观测服务，这意味着后续平台迁移或升级时，同样存在巨大的人力迁移或改造成本。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/744a5c4d59a3ec8094a158fb68593848b0cc08f2f6045bf43da2696963e73bed.png)
### 多种协议
随着云原生的推进，多传输协议越来越普遍，同一个Kubernetes 集群可能存在着诸多协议，应用层传输协议有HTTP、Dubbo、gRPC 等；中间件层传输协议有Redis、Kafka、MySQL等；网络层协议有DNS 等。而针对以上问题，基于传统手段，应用层要集成多种SDK与Agent，中间件层或网络层需要依赖对应中间件提供的指标采集方式。可以看出，在云原生环境下，传统手段维护整套采集设施反倒可能会成为严重的运维负担。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/b6595105de3257222dac3da52d028c6c3fa60b9b04945a92a04fb2feef510c7c.png)
# 什么是无侵入监控？
随着微服务、云原生、DevOps 等技术的推进，推动着服务部署环境动态性的不断提升，带来了弹性、资源利用率、解耦等诸多优势，但也带来了如上文所述的异构语言、多种协议等诸多问题，这对传统观测性带来了极大的挑战，而这时发布于2014年的技术eBPF 逐渐回到舞台中心，成为观测复杂场景的新手段。从下图Google Trends 趋势可以看到，近几年来，eBPF 的热度几乎是翻倍的上升，原因正是eBPF 为上述复杂场景带来了诸多可能，如网络性能问题、容器安全、容器观测等。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/940fb2223900ab52cfb634dfe2d92a26515b22f310249c0f22b1965017eab0fc.png)
当我们聚焦到可观测领域，会发现，eBPF 可以灵活、无侵入、高性能的解决上述复杂环境带来的多语言与多协议观测等挑战。
首先eBPF 相对于传统用户态观测手段，eBPF 提供了内核态观测的手段。上文提到，目前复杂开发运维场景面临着多语言异构的问题，但不论是什么语言，真实的交互过程还是会交给操作系统内核来完成，如recv、write 等系统调用；而对于多协议场景，核心诉求实际为观测7层流量协议，而不论是什么7层协议，真实的交互过程还是会依赖操作系统内核级别的四层网络进行传输。所以eBPF 在网络观测方面，天然具备了解决复杂场景下异构语言、多传输协议等观测痛点。
其次，eBPF 相对于传统观测手段，为所有语言提供了类似“Javaagent ”般的使用体验，无需更改代码，即可完成应用观测。Javaagent的基本功能是程序启动时对于已存在的字节码进行代理字节码织入，从而在无需业务修改代码的情况下，自动为用户程序加入埋点，比如在某函数进入和返回时添加埋点可以计算此函数的耗时。而eBPF 类似，提供了一系列内核态执行的切入点函数，无需修改代码，即可观测应用的内部状态，以下为常用于可观测性的切入点类型：kprobe（动态附加到内核调用点函数）、tracepoints（内核预定义切入点）、uprobe（动态附加到用户态调用函数的切入点）、perf_events（Perf事件）。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/d209589f4be3a9a6c41cb57d03327a1a51ae61057509e400fb21572fb49b2caf.png)
正是基于日益复杂的开发运维环境与eBPF观测的动态性，[iLogtail](https://github.com/alibaba/ilogtail) 与 [Coolbpf](https://github.com/aliyun/coolbpf)合作研发了无侵入监控，日前已经商业版已经上线阿里云SLS 日志应用全栈监控，和其他全栈监控特性类似，无侵入监控也同样仅收取存储、数据索引等费用，详细请参考[计费项](https://help.aliyun.com/document_detail/107745.htm?spm=a2c4g.11186623.0.0.45da52a8D9oxNu#concept-xzl-hjg-vgb)。从[iLogtail](https://github.com/alibaba/ilogtail) 与 [Coolbpf](https://github.com/aliyun/coolbpf)开源至今，收到了很多社区小伙伴的贡献与建议，而这些也促进着[iLogtail](https://github.com/alibaba/ilogtail) 与 [Coolbpf](https://github.com/aliyun/coolbpf)不断的成长，eBPF 极佳的动态性意味着可以兼容各式各样的观测场景，因此无侵入特性将同时发布于[iLogtail](https://github.com/alibaba/ilogtail) 与 [Coolbpf](https://github.com/aliyun/coolbpf)社区版本，希望可以解决更多开发者面对复杂云原生场景下时的观测难题。
# 无侵入监控采集原理介绍
[iLogtail](https://github.com/alibaba/ilogtail)  无侵入监控采集特性的程序工作空间分为Kernel Space与User Space。
Kernel Space 主要负责数据的抓取与预处理：

- 抓取：Hook模块会依据KProbe定义拦截网络数据，虚线中为具体的KProbe 拦截的内核函数，如connect、accept 以及write 等。
- 预处理：预处理模块会根据用户态配置进行数据的拦截丢弃以及数据协议的推断，只有符合需求的数据才会传递给SendToUserSpace模块，而其他数据将会被丢弃。其后SendToUserSpace 模块通过eBPF Map 将过滤后的数据由内核态数据传输到用户态。 

User Space 的模块主要负责数据分析、聚合以及管理：

- 分析：Process 模块会不断处理eBPF Map中存储的网络数据，首先由于Kernel 已经推断协议类型，Process 模块将根据此类型进行细粒度的协议分析，如分析MySQL 协议的SQL、分析HTTP 协议的状态码等。其次由于 Kernel 所传递的连接元数据信息只有Pid 与FD 等进程粒度元信息，而对于Kubernetes 可观测场景来说，Pod、Container 等资源定义更有意义，所以Correlate Meta 模块会为Process 处理后的数据绑定容器相关的元数据信息。
- 聚合：当绑定元数据信息后，Aggreate 模块会对数据进行聚合操作以避免重复数据传输，比如聚合周期内某SQL 调用1000次，Aggreate 模块会将最终数据抽象为 XSQL：1000 的形式进行上传。
- 管理：整个eBPF 程序交互着大量着进程与连接数据，因此eBPF 程序中对象的生命周期需要与机器实际状态相符，当进程或链接释放，相应的对象也需要释放，这也正对应着Connection Management 与Garbage Collection 的职责。

![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/22e98fdbbb04187f6bb14eba3d59877fcb820b57bba051e5eb58ce8d3fb45472.png)
上文提到内核模块的主要职责为数据的抓取与预处理，而真实的程序运行环境中，某虚拟机或K8s 节点会存在着诸多干扰因素，如不关心的进程、本地的网络调用等，因此[iLogtail](https://github.com/alibaba/ilogtail)  无侵入监控采集特性扩展了多种采集选择能力，支持从用户态控制内核态采集范围。

| 特性类型 | 描述 |
| --- | --- |
| 协议处理 | 支持开启协议解析 |
|  | 支持选择协议解析范围 |
| 连接过滤 | 支持过滤unix socket 数据 |
|  | 支持过滤本机交互进程数据 |
| 主机进程过滤 | 支持cmdline正则匹配需要保留的进程 |
|  | 支持cmdline正则匹配需要排除的进程 |
| K8s 进程过滤 | 支持使用Pod名称正则匹配保留的Pod容器进程 |
|  | 支持使用Pod名称正则匹配排除的Pod容器进程 |
|  | 支持使用 Namespace名称正则匹配保留的容器进程 |
|  | 支持使用 Namespace名称正则匹配排除的容器进程 |
|  | 支持使用 Label 标签正则匹配保留的容器进程 |
|  | 支持使用 Label 标签正则匹配保留的容器进程 |
|  | 支持使用环境变量正则匹配保留的容器进程 |
|  | 支持使用环境变量正则排除保留的容器进程 |

# 无侵入监控数据分析能力介绍
目前无侵入监控已经集成于全栈监控K8s 类别监控与主机网络监控，详细的接入文档请参考[无侵入监控接入文档](https://help.aliyun.com/document_detail/446963.html)，下文基于功能更加丰富的K8s 无侵入监控进行核心能力。
## L4 级别流量分析
上文提到，云原生场景下多语言、多协议导致真实的服务拓扑刻画困难，导致无法发现集群热点流量服务，而通过无侵入监控功能则可以顺利实现此功能，下图展示了frontend 服务的上下游，可以从拓扑图中看出，不论是服务直接交互，或者是DNS 请求，再或者为外部IP 调用，无侵入监控都能良好的刻画出真实的服务网络流量拓扑，并且可以针对L4 层进行流量包或流量大小的分析，从而知道基础层热点服务与瓶颈。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/74d20a8ec1619ad539516a017e051b0e0cfe74527e4d3aaf96bc6d162e3bf6ad.png)
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/de7869d212401d73c281c11567ee058b118d4da9adca7b9636daa05e42af0267.png)
## L7 流量细节分析
但L4 网络级别的流量往往不足以定位问题，此时需要L7 网络级别的流量细节加以辅助排查，目前无侵入监控已经支持从L4 流量分析HTTP、Redis、MySQL、DNS、PgSQL 等多种应用层传输协议，更多传输协议如Mongo、Dubbo、Kafka等后续也会陆续支持。
以下分析一个实际的场景，如下图所示，一个Spring Cloud Restful 项目Client端通常使用HTTP 发送数据，Server 端一般采用线程池、阻塞队列模式响应客户端请求，而埋点的位置会导致Client 端计算消耗时间与Server 端计算消耗时间不一致的现象，当流量过多或前序请求大量阻塞时，后续的请求会发生阻塞，这时传统手段下Time1 与Time2 可能存在巨大差值，且此问题如果埋点仅存在于ServiceB ，则消耗时间可能始终处于正常状态，整个系统瓶颈问题会被忽略。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/6c74a05ec20dd0ac15c746e2e4c8f57a2412f9ab6c8109a10f373b56e8ce2466.png)
而当使用无侵入监控后，不论是Client 端还是Server端，数据来源都是基于真实的内核层处理网络请求的时间，如Revc、Write、Sendmsg 等内核函数，这也就给了开发者了解真实服务真实运行状态的能力。如下图所示，当开启HTTP 协议分析后，全程无需埋点，即可收集真实Client端与Server 端运行状态。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/fcb44bcb1fcd5e54cfe6cdfb0c8fef30eb4871dd73e36d10ec5c1b06ad750dbe.png)
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/21a3d20aefb66884059cb3879b2d62c6f0a5c348d741abb6cc03e43403d394c1.png)
同时无侵入监控也支持多种中间件分析，如MySQL、Redis、PgSQL等，下图展示了基于MySQL 客户端调用刻画的MySQL 调用性能情况。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/c2f3bd13da97c5bee72b716ac549fe44c318c5bab7e4d51a783bba12eb964a0a.png)
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/bbce69190d89a8c22f1717699e42c66a8a8d6c69a3e4adb617832ad9134632fc.png)
# 性能与安全性怎么样？
无侵入监控基于的eBPF 目前还属于较新的技术，且运行于内核态，可能部分读者对于性能与安全性存在疑虑。首先eBPF 是动态扩展的内核程序，所以Linux 内核对于eBPF程序增加了诸多限制，如最大堆栈512、最大指令数100万等，且验证器会验证集成的eBPF 程序是否存在死循环、是否有异常打印行为等情况。因此从安全性上Linux 系统为eBPF程序提供了有效的支持。并且[iLogtail](https://github.com/alibaba/ilogtail) 的eBPF 特性继承了阿里云龙蜥社区[Coolbpf](https://github.com/aliyun/coolbpf) 项目全部优势，[Coolbpf](https://github.com/aliyun/coolbpf) 借助libbpf以 CO-RE（Compile Once-Run Everywhere）为基础实现一次编译多处运行，保留了资源占用低、可移植性强等优点。除此之外，[Coolbpf](https://github.com/aliyun/coolbpf) 具备支持低版本内核bpf的能力，可实现全量内核版本安全运行能力。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/5e54aa1352fc10998c5b08757f5e652c471320ee3249b7ef3200b548723df3e9.png)在性能方面，内核态执行的优势是会避免大量数据拷贝到用户态，对于一个值类型，如某连接一段时间内传输数据包的大小，内核态会直接进行计算并累加记录，而不需要所有数据发送到用户态。下文压测实验，模拟了一个大规模流量环境，通过比较接入无侵入监控前后的内核态与用户态的CPU损耗，反映了无侵入监控真实的性能损耗情况。通过此实验可以看出，无侵入监控在大规模流量下具有良好的安全性以及较低的资源消耗。
## 压测数据
测试机：ecs.g7.16xlarge 64 vCPU 256 GiB
测试场景：节点同时部署客户端与服务端，节点客户端分别产生2.5w qps、5W qps、10W qps 流量，因此节点总流量为5W qps、10W qps 以及 20W qps，每万条交互流量平均值0.8 MB。
无侵入监控会同时运行于内核态与用户态，内核态CPU 消耗如下图所示（总CPU），无侵入监控在5W qps、10W  qps、20W qps 分别会增加0.4%、1.59%、1.81% CPU。
![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/a7ab7e3053fc392c69cab5554d78fad01097a9ea3ae21333cec952c90536db06.png)
对于用户态无侵入监控程序，主要职责为数据聚合与解析，用户态CPU 消耗如下图所示（单核CPU），无侵入监控在5W qps、10W  qps、20W qps CPU 消耗分别为5.3%、11.70%、29.5%。内存消耗增量分别为140M、146M以及148M。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22279413/1661135350627-2d2b08e0-88e4-4e37-8cf9-95ed9abed8ff.png#clientId=u230ed076-3300-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=214&id=u1895710c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=434&originWidth=724&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27492&status=done&style=none&taskId=ubc56a184-e5bc-495c-8d55-575d8e4d906&title=&width=357)![image.png](/img/src/product/阿里SLS无侵入监控采集方案发布/530fa77c8abf5b7aa7e38ad4f993a1897e8ee8c2209a923a9025123844332ee8.png)
# 未来展望
[iLogtail](https://github.com/alibaba/ilogtail)致力于打造覆盖Trace、Metrics 以及Logging 领域、高性能的可观测性统一Agent，而无侵入监控特性的发布，将为广大[iLogtail](https://github.com/alibaba/ilogtail) 用户或开发者提供的开箱即用、高性能、无侵入的云原生观测能力。在后续版本中，阿里云[iLogtail](https://github.com/alibaba/ilogtail)社区将继续携手阿里云龙蜥社区 [Coolbpf](https://github.com/aliyun/coolbpf)项目，持续增强无侵入监控能力，为广大开发者带来更多丰富特性，包括但不限于以下特性，欢迎大家关注和互相交流。

- 更多的传输协议支持，如Kafka，Dubbo 等。
- 更灵活的性能分析功能，如热点代码分析、慢请求上报等。
- 更广的应用范围，支持低版本内核（目前仅能运行于4.x版本内核）。
- 更多的社区场景。
# 参考
[基于eBPF的应用可观测技术实践](https://www.bilibili.com/video/BV1Gg411d7tq)
[What is ebpf？](https://ebpf.io/)
[一文详解用eBPF观测HTTP](https://zhuanlan.zhihu.com/p/551257831)
