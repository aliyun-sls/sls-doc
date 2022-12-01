> 非常有幸参加了QECon深圳站的云原生分会场，并和大家分享阿里云在面对可观测标准OpenTelemetry的一些思考和技术实践，本文主要是对于分享的文字整理。

# 可观测的必然趋势
可观测性这个概念最早出现于20世纪70年代的电气工程，核心的定义是：
> A system is said to be observable if, for any possible evolution of state and control vectors, the current state can be estimated using only the information from outputs.

![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/b21382dd05b91dcce7efaffebaddb3e5a38b6bc84dee63467b71a45025fd8831.png)
相比传统的告警、监控，可观测性能够以更加“白盒”的方式看透整个复杂的系统，帮助我们更好的观察系统的运行状况，快速定位和解决问题。就像发动机而言，告警只是告诉你发动机是否有问题，而一些包含转速、温度、压力的仪表盘能够帮我们大致确定是哪个部分可能有问题，而真正定位细节问题还需要观察每个部件的传感器数据才行。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/3836f6b37470cc00f554b1676d65f665389a746f8e952cb4fa00f4c2f8a60807.png)
电气领域的可观测和IT系统中的可观测本质上是为了解决同类的问题：让问题更早的被发现、处理问题的速度会更快、辅助我们的系统设计的更加稳定，而这一切的根本目的，是为了用更低的成本（可观测建设支出）去实现更高的价值（产品稳定、用户体验好）。

![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/d6bb8a19e3d93951d6acb61efa45e555413a1ef87d050de171621dfbab6b49ee.png)
# 标准化
> Standardization is the process of implementing and developing technical standards based on the consensus of different parties. Standardization can help maximize compatibility, interoperability, safety, repeatability, or quality.

标准化是行业发展到一定程度后必不可少的过程，例如最基础的电力标准：标准电压(GB/T 156-2007)，规定了国内电压在标准的220V/60Hz，没有这个标准，对于所有的电器制造商都是噩梦，所有设备都要背着一个超大的电压适配器，而且还不一定能够适配所有的各种电压和频率。IT行业也是类似，例如IPV4/IPV6是构成全球互联的基础，USB是民用电脑/手机数据传输的必备。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/98151e7018c497d513ee0302633e466622bd3accda9ed89e548398acd7b8c2f6.png)
而在可观测场景下，其实也需要这么一套标准来规范化可观测数据，因为可观测场景需要多种类型、大量的数据支撑，我们希望系统中的每个组件，包括自己开发的各语言应用、使用的各类开源软件、付费软件、云服务等，能够以一套统一的标准来输入可观测的数据，这样做的优势有：
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/69acd226ca52eb16b2fde3cee6c4add501946e11205c7a66d681eafc641920a3.png)

1. 各个组件输出的可观测数据遵守统一格式，无需针对不同类型的数据单独进行采集/转码
2. 分布式链路追踪可以贯穿数据经过的各种组件，透视一次请求真正的生命周期
3. 数据生成和存储后端解耦，厂商可以根据自己的优势来选择重点做数据采集还是存储、可视化等，让更专业的人干更专业的事情
4. 进一步从客户侧而言，前后端解耦后，也不用担心被厂商绑定，只要厂商遵循标准即可轻松替换

# OpenTelemetry
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/7fb856880686292cc0835bf4a0378109a5ce29308cfd5d472f91d266b7f5c2db.png)
在此背景下，云原生基金会CNCF下诞生了OpenTelemetry项目，旨在将Logging、Tracing、Metrics三者进行统一，实现数据的互通互操作。

> Create and collect telemetry data from your services and software, then forward them to a variety of analysis tools.

![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/eea2eb69a42a2d0a0bfd014fb57eab3f64f57174d953df971c7a2ef1c0d130f8.png)
OpenTelemetry最核心的功能是产生、收集可观察性数据，并支持传输到各种的分析软件中，整体的架构如下图所属，其中Library用于产生统一格式的可观察性数据；Collector用来接收这些数据，并支持把数据传输到各种类型的后端系统。OpenTelemetry标准化对于可观测有着重要的意义，我们认为，OpenTelemetry在可观测领域的突出贡献有：
## 统一性

各个组件遵循统一的标准后，观测可以轻松透传所有组件，而通过每个组件输出的观测数据，可以非常容易的定位用户访问的异常根因。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/9754dd4816e073433e83a707775d778c1a9d3749a50a641fd79ea2fea1098dd1.png)
除了包括协议的统一，OpenTelemetry还更进一步，在SDK、埋点框架上也做了很多工作，让Logs/Traces/Metrics能够用一套SDK和埋点框架就能搞定。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/8216bef5d271845ebdd516ec96cf06a944900ec49ee26047b0825207aaffb8b2.png)
## 数据表达的确定性
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/2d6489f5cdc7e3f23d8066527e4d56729942589725d9b37639563210593a5c63.png)
相比之前其他的协议（例如OpenTracing、SysLog等）只做了通信标准的定义，OpenTelemetry还对IT设施与运行状态进行了详细的定义，包括：调用语义公约和运行环境的标准化描述。在没有标准化的时候，例如OpenTracing，我们只知道每个Span是一次调用，具体调用的细节需要每个不同的实现方去定义，因此还需要配套的后端和可视化。而在OpenTelemetry标准化描述后，后端的程序、用户非常容易就能理解某一次的调用、输出究竟代表了什么含义，例如：

1. 通过OperationType了解到，这里是发起了一个外部调用，具体是什么调用？
2. 在调用的参数里，有DBType，因此是数据库调用
3. 调用结果里面的StatusCode是ERROR，因此我们知道调用出现了失败
4. 从DB的URL、Statement、USER我们知道调用的具体是哪个DB、执行的SQL以及登录的用户名
## 数据关联
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/4cd6f1d64d0d94d766182ce2b9294ad0b9df9fb47c64deb643ec53394b2bae1d.png)
数据表达的确定性让我们能够理解一次调用具体的行为，而数据关联则是让我们把所有的可观测数据串在一起进行分析，把独立的数据立体化，这里的数据关联从手段来讲主要包括两类：

1. 通过TraceID、SpanID、ParentSpanID将调用串联起来，也就是分布式链路追踪
2. 通过Resource（也就是上一节中的运行环境描述）将同一个Resource产生的Logs、Traces、Metrics关联起来

从问题排查架构上来讲，主要分为两个方向：

1. 横向关联：服务之间、主机之间、系统之间的依赖关系
2. 纵向关联：IT运行时的依赖关系，例如Region->可用区->K8s集群->主机->Pod
## 数据采集器 Collector
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/5515d39b65952e189585afeaaabc695ad301e6be00eb185900e3daece7a50d2d.png)
OpenTelemery内置了一个数据采集器：OpenTelemetry Collector，除了提供对于现有OpenTelemetry数据的采集外，还支持现存的各类可观测方案，例如Jaeger、OpenCensus、SkyWalking、Prometheus等，此外Collector还支持通用的数据处理以及支持对接大量的后端，包括开源后端以及商业化的后端。待OpenTelemetry Collector发展成熟后，有可能未来我们只需要一个Collector就可以完成Logs、Traces、Metrics三类可观测数据的采集。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/5309316434086ddf0e0ccb98ec40ce58d96f3379ca6b2a78b45a7c23767ca45d.png)
## 厂商无关
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/317462aa2f15f10ebd2ef59b3116f3b9956cc34e83b36ed7469e624aa3cbe513.png)
厂商无关其实是在前面特性下自然而然产生的一个特点，但之所以再次强调，还是因为这个特性在目前激烈的云竞争环境、可观测竞争环境下，厂商无关意味着：

1. 每个模块都高度标准化，支持任一厂商根据实际需求去定制/修改
2. 在后端存储、可视化、数据挖掘、告警、CICD等领域，每个厂商可以重点发挥自己擅长的领域
3. 对于用户而言，不用担心被厂商绑定，产品体验/服务不好可随时更换厂商，促使整个领域良性发展
# OpenTelemetry的本质
对企业而言，本质的目的是盈利，为了这个目标，就需要做大用户规模、做深产品功能、拓宽更多的业务场景，而这些就需要更多的人力、设计更加复杂的系统来支撑、而且还需要保持超高的迭代效率。几乎每个公司都会遵循这样的发展策略，而背后会导致整个系统和迭代越来越复杂，暴露的问题也会越来越多，因此才会出现告警、监控、可观测等辅助手段。本质目的还是为了让系统/服务更加稳定，用户体验更好，作为企业盈利的基石。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/d71fe0595ad728dd3417d0196d2d1c3bec772ed5e5a787d22640b76882d72b9b.png)
从信息论角度而言，可观测是一个熵减的过程，把复杂、混乱、无序变为稳定、可控、有序，同样，OpenTelemetry在可观测领域也起到了这个作用，把市面上各类开源、厂商的观测方案融合成统一的标准，将可观测方案本身的复杂变为简单，降低可观测本身的实施代价和不可控性。
# 阿里云与OpenTelemetry相遇
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/69730d79553bf057ee59f3c3efb3b3bdcb0eeeae1f94e77a7c307874ec185042.png)
由于面对的几乎全是企业客户，稳定性是重中之重，在两年前我们内部就提出了1-5-10的概念（1分钟发现故障、5分钟定位、10分钟恢复）。本质上1-5-10就是给可观测提出的目标，而这个目标其实就是一个字：快。而每个人单位时间内能够接受、处理的信息是固定的，要做到快，那就必须提高信息的密度。
但是在阿里云如此大的体量和复杂场景下，想要实现这个目标就更加的困难，众多的产品对应着大量不同架构的后端，本身产生的可观测数据各类各样，而且有些组件可能数据都不全。而OpenTelemetry的出现则给我们带来了指导方向：用统一的标准来去解决内部各式各样的观测方案，尽可能多的收集可观测数据，并且要想办法提炼出更精准的信息，只有真正的把信息的密度提升，才能让故障定位的时间缩的更短。
# 基于OpenTelemetry的可观测架构
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/98087576d9987fa3f637358d9f901f31e7ebc283e98c8a90dbaee14491aff34e.png)
在OpenTelemetry的方案实现上，我们选择研发统一的后端，来适应Logs、Traces、Metrics三类可观测数据的存储与分析。基于存储和分析平台，上层由于需要面对数百的使用方，无法用同一套应用方案满足所有人的需求。因此，我们开放可观测平台的基础能力，包括API接口、SDK、基础的可视化组件、计算等，各个业务场景可以针对可观测数据自由定制。而平台本身只需要重点做好基础的数据采集、大规模的数据存储、处理能力，并提供基础的算法能力供上层包装使用。下面将重点介绍可观测平台在数据收集、存储、计算、编排、算法上的一些工作。
# 全栈数据-广度与深度
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/a70bccb9d906b9a47d1e79b0e38d8bfe76fd42127d7b9cd0189151bea39ac2aa.png)
全栈的数据是可观测的基石，在数据获取上，我们做了大量的工作，主要分为数据的广度和深度。在数据广度上，除了OpenTelemetry以及OpenTelemetry Collector关联的数据外，我们还做了其他工作：

1. 在Logs这块OpenTelemetry不擅长的领域，我们研发并开源了针对日志特殊优化的采集器iLogtail，目前有上千万的装机量，每天采集几十PB的数据
2. 在服务端支持OpenTelemetry、Jaeger、Prometheus等接入协议，大部分的用户可以无需部署OpenTelemetry Collector就可将数据直接上传到阿里云后端
3. 提供服务端数据处理能力：数据加工，支持将非OpenTelemetry格式的数据加工处理成标准格式，便于统一的数据关联和分析

数据的广度保证各类可观测数据都能融入到我们的统一存储引擎中，此外还需要挖掘数据的深度，让每次调用经过的中间流程都能够透传出来，让可观测深入到每一个组件的每一个细节。尤其在云环境中，调用可能会经过众多云上提供的组件，例如负载均衡、CDN、高防、消息队列、数据库、各类SaaS服务等，若缺少这类数据，可观测将会出现众多盲区，让用户难以定位是哪个阶段出现了问题。这种情况下，我们的做法是：
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/5197b04eafbfeb80cad28c51b3e5f9743845d5189ec54199ac1c34ebe607645e.png)


1. 让Trace经过的阿里云系统能够支持OpenTelemetry协议，并产生对应的Span，采集到内部的存储中（可以精确计算每个部分的延迟）
2. 部分不支持OpenTelemetry协议的系统，能够将访问日志输出，并且附加输出TraceID字段（只能计算不精确的延迟）
3. 我们内部建设一套数据分发框架，能够支持用户在需要云产品内部观测数据时，可以将数据实时输出到用户空间下

# 统一存储引擎
对于存储引擎，我们的设计目标的第一要素是统一，能够用一套引擎存储各类可观测的数据；第二要素是快，包括写入、查询，能够适用于阿里内外部超大规模的场景（日写入几十PB）。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/b7e1ed167613cabb35302ced7c11b1f00d769c756071a4d059ecdc51e713792b.png)
对于Logs、Traces、Metrics，其中Logs和Traces的格式和查询特点非常相似，我们放到一起来分析，推导的过程如下：

- Logs/Traces：
   - 查询的方式主要是通过关键词/TraceID进行查询，另外会根据某些Tag进行过滤，例如hostname、region、app等
   - 每次查询的命中数相对较少，尤其是TraceID的查询方式，而且命中的数据极有可能是离散的
   - 通常这类数据最适合存储在搜索引擎中，其中最核心的技术是倒排索引
- Metrics：
   - 通查都是range查询，每次查询某一个单一的指标/时间线，或者一组时间线进行聚合，例如统一某个应用所有机器的平均CPU
   - 时序类的查询一般QPS都较高（主要有很多告警规则），为了适应高QPS查询，需要把数据的聚合性做好
   - 对于这类数据都会有专门的时序引擎来支撑，目前主流的时序引擎基本上都是用类似于LSM Tree的思想来实现，以适应高吞吐的写入和查询（Update、Delete操作很少）

同时可观测性数据还有一些共性的特点，例如高吞吐写入（高流量、QPS，而且会有Burst）、超大规模查询特点、时间访问特性（冷热特性、访问局部性等）。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/c0c948a6619bc0889e03e04488d3715c6d76e852c16b23854c5a5aafbac323b1.png)
针对上述的特性分析，我们设计了一套统一的可观测数据存储引擎，整体架构如下：

1. 接入层支持各类协议写入，写入的数据首先会进入到一个FIFO的管道中，类似于Kafka的MQ模型，并且支持数据消费，用来对接各类下游
2. 在管道之上有两套索引结构，分别是倒排索引以及SortedTable，分别为Traces/Logs和Metrics提供快速的查询能力
3. 两套索引除了结构不同外，其他各类机制都是共用的，例如存储引擎、FailOver逻辑、缓存策略、冷热数据分层策略等
4. 上述这些数据都在同一个进程内实现，大大降低运维、部署代价
5. 整个存储引擎基于纯分布式框架实现，支持横向扩展，单个Store最多支持日PB级的数据写入
# 统一分析引擎
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/2d4ae2f41c0cbb821533878b1d55e764ec5ff9cc208229c9cad78e3eaa8d547d.png)
如果把存储引擎比喻成新鲜的食材，那分析引擎就是处理这些食材的刀具，针对不同类型的食材，用不同种类的刀来处理才能得到最好的效果，例如蔬菜用切片刀、排骨用斩骨刀、水果用削皮刀等。同样针对不同类型的可观测数据和场景，也有对应的适合的分析方式：

1. Metrics：通常用于告警和图形化展示，一般直接获取或者辅以简单的计算，例如PromQL、TSQL等
2. Traces/Logs：最简单直接的方式是关键词的查询，包括TraceID查询也只是关键词查询的特例
3. 数据分析（一般针对Traces、Logs）：通常Traces、Logs还会用于数据分析和挖掘，所以要使用图灵完备的语言，一般程序员接受最广的是SQL

上述的分析方式都有对应的适用场景，我们很难用一种语法/语言去实现所有的功能并且具有非常好的便捷性（虽然通过扩展SQL可以实现类似PromQL、关键词查询的能力，但是写起来一个简单的PromQL算子可能要用一大串SQL才能实现），因此我们的分析引擎选择去兼容关键词查询、PromQL的语法。同时为了便于将各类可观测数据进行关联起来，我们在SQL的基础上，实现了可以连接关键词查询、PromQL、外部的DB、ML模型的能力，让SQL成为顶层分析语言，实现可观测数据的融合分析能力。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/3faf9c260f64ae888a5ca5ed4194a09614ba4f09da83ae4a6580d634c40798c7.png)
下面举几个我们的查询/分析的应用示例，前面3个相对比较简单，可以用纯粹的关键词查询、PromQL，也可以结合SQL一起使用。最后一个展示了实际场景中进行融合分析的例子：

- 背景：线上发现有支付失败的错误，需要分析这些出现支付失败的错误的机器CPU指标有没有问题
- 实现
   - 首先查询机器的CPU指标
   - 关联机器的Region信息（需要排查是否某个Region出现问题）
   - 和日志中出现支付失败的机器进行Join，只关心这些机器
   - 最后应用时序异常检测算法来快速的分析这些机器的CPU指标
   - 最后的结果使用线图进行可视化，结果展示更加直观

上述的例子同时查询了LogStore、MetricStore，而且关联CMDB以及ML模型，一个语句实现了非常复杂的分析效果，在实际的场景中还是经常出现的，尤其是分析一些比较复杂的应用和异常。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/3dd76291f79c504fb4e1d4350a992ead690fcc69aa79578ec343cf5786257b09.png)
# 数据编排能力
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/1d8c78c8e0264992c9b7d0e3969f1ccf5e83e7367128e66da08173e4e31d8f51.png)
可观测性相比传统监控，更多的还是在于数据价值的发掘能力更强，能够仅通过输出来推断系统的运行状态，因此和数据挖掘这个工作比较像，收集各类繁杂的数据、格式化、预处理、分析、检验，最后根据得到的结论去“讲故事”。因此在可观测性引擎的建设上，我们非常关注数据编排的能力，能够让数据流转起来，从茫茫的原始日志中不断的去提取出价值更高的数据，最终告诉我们系统是否在工作以及为什么不工作。为了让数据能够“流转”起来，我们开发了几个功能：

1. 数据加工：也就是大数据ETL（extract, transform, and load）中T的功能，能够帮我们把非结构化、半结构化的数据处理成结构化的数据，更加容易分析。
2. Scheduled SQL：顾名思义，就是定期运行的SQL，核心思想是把庞大的数据精简化，更加利于查询，例如通过AccessLog每分钟定期计算网站的访问请求、按APP、Region粒度聚合CPU、内存指标、定期计算Trace拓扑等。
3. AIOps巡检：针对时序数据特别开发的基于时序异常算法的巡检能力，用机器和算力帮我们去检查到底是哪个指标的哪个维度出现问题。
# ![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/1b044cd578e9726bd9377b8e1495613ae2fc23e64a45f3db12d4142a8f8ac671.png)
例如，在OpenTelemetry的Trace场景下，普通的Trace数据只是调用链信息，而针对调用链的各类数据，我们可以非常便捷的基于ScheduledSQL、ETL、巡检算法等去对调用链数据进行挖掘：

- 基于ParentSpanID、SpanID、TraceID，可以计算出服务之间的依赖关系，做服务拓扑分析
- 若ParentSpanID为空，代表这是服务入口的调用数据，基于这个调用数据中的Latency、StatusCode，能够计算出整体服务的延迟、QPS、错误率等信息
- 同样，针对每个服务的Type为Server、Client类型的调用，可以分别统计出本服务自身的SLO以及调用依赖的SLO
- 若调用的是DB、MQ之类的外部系统，可以结合对应系统的监控数据，做针对性的去做DB/MQ的监控

上述文本框中就是一个简单的计算数据库调用情况的ScheduledSQL：

1. 首先通过`attribute.db.system`过滤出调用目标为数据库的请求
2. 将数据库类型、数据URL、服务、接口、主机作为聚合维度
3. 分别统计请求总数、延迟总时间（除以请求总数可以得到平均延迟）、最大最小延迟、分位数的延迟（P50、P90、P99等）、错误率
# 辅助算法：基础算法
随着人口红利逐渐弱化，纯粹靠投人去做服务的运维管理成本压力越来越大；而同时，虽然摩尔定律的翻倍速度变慢，但单位成本的计算能力确实在不断增强。对比之下，未来一定是会逐渐用机器的算力+算法来代替一部分的手动运维/观测工作，因为本质上也是企业盈利的一个手段：开源节流。
相比Case By Case的整体化解决方案，我们更倾向于提供一些算法，由不同的应用方根据自己的业务、观测数据特点决定整合哪些算法。这里的算法整体上可以分为两大类：基础算法和综合性算法。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/d9b5d35b2aad1b66b11e58ecedbb16028d64b5041ee62eb2b64e3a19cc6f2d2b.png)
基础算法主要是针对某一类特定的观测数据，这些数据的特点是简单、通用，可以适用于大部分的观测数据，例如：

1. 针对时序数据的异常检测、预测
2. 针对日志类型数据的聚类分析，包括日志模式挖掘以及模式对比
3. 针对AccessLog、OpenTelemetry Trace类型数据的回归分析

![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/1a4f742c32d2c1940fd19e3f3d8a4d1676d35123460f1fd0a0fdf442e4f72db0.png)
# 辅助算法：根因定位
基础算法主要集中在发现局部性问题，优势是适用面较广，但对于异常的定位效果并不明显。另一大类的综合性算法主要是针对多维数据进行根因定位，结合调用链、指标等内外围的多种数据，算法能够计算出每个服务之间的依赖关系、服务与基础设施的依赖关系、每个服务/外部依赖的状态，在服务产生异常时自动定位到根因的服务/机器。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/5104663be3f242794fbecfc24433b4dc5ee44e1cd76ce96594e04aa72da670b6.png)
# 应用1：云原生应用架构的可观测方案
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/2f360eaa74bec896135c105097c562e7f9f040f8b36f3ae2a11e71e53c97a32d.png)
云原生不仅仅是针对云的客户而言，为了追求更快的迭代速度、更好的弹性、更高的资源利用率，在阿里云内部众多云服务也逐渐开始云原生应用架构改造。云原生场景下的可观测方案需要考虑多可用区、全球化、数据链路完整性、方案本身可控性等，整体方案如下：

1. 各类观测数据通过实时通道全部采集到同一可观测系统中，包括各类端上数据、服务入口访问日志、内部调用链、基础设施等，其中Trace使用OpenTelemetry方案，Metrics使用Prometheus方案，日志使用SLS方案
2. 可观测系统本身在全球的每个阿里云Region都有部署，因此所有的数据采集均在Region内部完成，减少公网传输的成本和安全风险
3. 基于数据加工、ScheduledSQL能力，可以将每个Region的数据降维计算到一个统一的Region，可以在一个地方查看全球的大盘
4. 在其他的实时告警、全链路分析、日志查询、基础设施监控等配套能力下，开发和运维可以快速的发现问题并在一个系统中完成排查、定位
5. 同时，一些重要的指标可以和集群的自动扩容系统打通，在流量上涨时自动扩容实例，低峰期释放实例，提升整体资源利用率，降低成本
# 应用2：云网关可观测平台1-5-10建设方案
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/005c73b5582fe49f414787a79943a106c737cfe3ab2b57a0ddeba83bc9d9c5a1.png)
阿里云网关承载了云上千产品的数万API，每天有千亿级的调用次数，服务本身也有上万台服务器并分布在全球多个Region。在如此大规模的情况下，面对阿里云1-5-10的稳定性要求，网关不仅仅要做到自身的可观测和稳定性，同时作为上千产品的入口调用，也需要为每个产品方提供可观测数据以及相应的稳定性方案。在经过多次的技术架构升级，目前已经能够做到：

1. 利用SLS的实时数据采集通道以及实时计算能力，做到端到端秒级延迟，告警延迟1分钟内
2. 日志、基于日志计算的指标、业务指标等统一存储在SLS，在一个系统中即可完成数据关联
3. 基于OpenTelemetry协议，贯穿网关和云产品后端，便于快速定位有问题的服务
4. 所有的观测数据以及告警逻辑以多租户模式向各个产品方提供服务，每个产品的人员都可以按需获取自己产品的观测数据
5. 提供多维度的数据诊断能力，在问题发生时，自动去关联各类数据并给出每个维度数据的巡检结果
6. 为了能24小时全天候保证快速恢复服务，支持移动端直接执行预案，问题发生时手机钉钉上即可快速对服务进行隔离、重启、限流等操作
# 应用3：基于OpenTelemetry的SkyWalking与Jaeger整合方案
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/549721a8b506b68b7ca65d924a88ab2053bd0c0b93c5ded4fc0936582456c055.png)
由于OpenTelemetry协议还很新，历史上很多应用都采用的其他Trace方案，对于Java应用主要使用SkyWalking，Golang应用则偏爱使用Jaeger。但两种协议本身不支持互通，且需要两套完整系统支撑采集、存储、可视化、告警，而且默认的后端ElasticSearch、Cassandra还存在性能和高可靠问题。
但由于历史应用基于SkyWalking、Jaeger方案深度开发，改造工程量较大，因此在进行整体的OpenTelemetry方案迁移时，为了兼容性，我们针对Trace的互通方案进行改造，让SkyWalking和Jaeger的协议能够互通，并使用统一的采集Agent iLogtail将数据采集到SLS的OpenTelemetry Trace后端，统一的Trace后端提供了标准的服务拓扑、Trace详情、Trace Explorer功能。并且基于标准的OpenAPI进行扩展，开发应用上线发布中经常使用的蓝绿版本对比功能。
# 应用4：基于可观测平台的精细化监控
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/b67efa9666fa42e59fc12d3b5c96e04cfb673b92202bda824d2029babb6a5ee6.png)
在讲究用户精细化运营的同时，对于可观测也在逐渐的进行精细化发展：例如最开始我们只关系服务的整体状态，后来开始基于P95 P99延迟关注长尾请求，而现在阿里云内部开始关注每个服务器、每个用户的实体化观测。同样的场景也包括：每个直播间的异常监控、在线视频会议、K8s服务等。而通常每个实体的行为是不同的，例如每个直播间的用户群体、用户人数、互动量等，无法使用同一类检测方法去观测，而且实体量超多，人工或简单的规则绝不可行。
在此背景下，我们开发了一套基于机器学习的巡检方案，支持对百万级的实例进行时序画像构建和建模，并且支持多维度的指标进行关联观测，同时异常判断支持用户打标反馈进行优化，异常事件可以直接对接到告警平台，并支持设置基于异常力度的动态基线告警。
# 总结与展望
OpenTelemetry在可观测的标准化上承担着非常重要的工作，虽然OpenTelemetry到Logs、Metrics、Traces全面的生产可用还有一定的时间，但我们坚信未来OpenTelemetry一定会成为可观测领域的事实性标准。

当然OpenTelemetry并不是万能银弹，它只是解决了数据源的问题，提高数据获取效率、降低数据获取的工程代价。而可观测方案本身，数据源虽然是非常关键的一步，但这个过程标准化后，对数据价值的提取能力才是方案的核心竞争力。针对数据价值提取，我们在数据存储、分析、计算、调度、算法等做了一系列工作，争取为不同的应用方提供一个通用的搭建可观测方案的数据平台。

近两年在可观测的技术发展中，我们能够看到基于eBPF的可观测数据采集技术逐渐开始被大家接受，国内外也出现了一些优秀的项目，随着内核对于eBPF的支持和扩展越来越好，相信未来的应用场景会更加广阔。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/a4d5ff576a5fb7b693bc875fa0a8ead166680a6104dc0d03cb0f03c753a4a736.png)
同时机器学习算法由于本身特别适用于观测目标多、数据类型多、数据维度多的场景，除了单一的场景外，现在我们也开始探索如何将一套AIOps算法应用在多种需求的融合场景中，让算法和算力来释放无穷无尽的人力需求。
![image.png](/img/src/technical/OpenTelemetry在阿里云的应用实践/25f0836b714acdf24c5f16922ef14955819056b0cfeec975aca68ff9b983f229.png)

