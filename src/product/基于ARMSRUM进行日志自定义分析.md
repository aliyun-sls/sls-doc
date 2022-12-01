# 什么是 ARMS RUM
ARMS RUM 前端监控专注于对 Web 场景、Weex 场景和小程序场景的监控，从页面打开速度（测速）、页面稳定性（JS诊断错误）和外部服务调用成功率（API）这三个方面监测Web和小程序页面的健康度。
# 为什么要进行自定义分析
ARMS RUM 前端监控控制台的功能已经能够满足大部分用户的需求。现有的控制台功能包括：前端监控实时大屏、页访问速度、会话追踪、JS错误诊断、API请求、API详情等，这些功能提能够极大程度的帮助用户在前端性能分析、错误定位等方向给用户帮助。
但是在真实的用户场景中，有很多用户的需求现有功能无法满足，而且很多用户提出的需求都是定制化的，无法统一作为特性开发上线。因此 ARMS RUM 和 日志服务 SLS 联合推出基于原始日志的自定义分析功能，ARMS
 RUM 的日志直接存储在日志服务中，能够完全复用日志服务的查询分析能力、可视化能力等。
# 自定义分析概览
首先我们以一个实际的例子看一下自定义分析的效果：
![armsrunlog.gif](/img/src/product/基于ARMSRUM进行日志自定义分析/1aa321bd6543ab14673107f837d2485bc8764de8cd3f1e6ac78b0a8fd850eb28.gif)
动图中使用了 SLS 的查询语法查询的测试环境下 api 请求时间大于 200 的日志。
# 自定义分析的主要功能

- 自定义存储时间
- 自定义日志分析
- 自定义仪表盘
## 自定义存储时间
ARMS RUM 使用日志服务作为存储有默认的存储时间：基础版（7天）、专家版（30天），可以在日志服务中修改此存储时间，超过提供的默认存储时长后按日志服务流量和存储的计费方式收费。
第一步：
进入 ARMS RUM 实例存储的日志服务日志库。
![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/b172fd4fae7879a4eef40903285e69740e607ebdbf45e04d22124b6246d5cc1b.png)
第二步：
打开日志库属性页面
![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/eaa6a247bfaff7398b849905bc516cde5c1c1f68e5b9e6dd56e05364855630d0.png)
第三步：
点击修改按钮
![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/3e7dbd4a54d809413ae067cb9b72f6b7312caa906e2e5e371bb36ee5ebdf6001.png)
第四步：
修改数据保存时间并保存
## ![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/4327d8128171389fa27f72cf486eab0c5a97876215c6e1d822e416be4fa6ac2f.png)
## 自定义日志分析
ARMS RUM 原始日志数据非常丰富，涵盖了大部分前端数据分析时所需要的数据，所有字段的含义具体请参考[https://help.aliyun.com/document_detail/449230.html](https://help.aliyun.com/document_detail/449230.html)
ARMS RUM 不同类型的数据都存储在同一个日志库，不同的类型使用 t 字段区分，下面是所有的类型：

| 类型t的值 | 描述 |
| --- | --- |
| api | api类型 |
| pv | pv类型，主要计算pv\\uv等 |
| perf | 页面性能 |
| health | 页面健康度 |
| speed | 自定义测速上报，测速关键字，必须是 s0 ~ s10 |
| behavior | 当出现异常后上报用户行为 |
| error | js错误 |
| resourceError | 资源错误，即将被resource(success=0)替代 |
| sum | 主动上报统计sum |
| avg | 主动上报统计avg |
| percent | 主动上报统计percent |
| custom | 用户自定义上报接口，所有字段不能超过 20 个字符，上报时会自动在字段前加上 x - 的前缀 |
| resource | 资源监控，替代 resourceError 和 res类型 |

基于原始日志的自定义分析可以满足 ARMS RUM  控制台无法覆盖的场景，下面列举一些自定义分析的场景。
### 交互式日志查询
交互式日志查询模式支持鼠标点击关键词进行日志过滤，最终搜索出符合条件的日志。
![armsrumdrilldown.gif](/img/src/product/基于ARMSRUM进行日志自定义分析/41bc2bbde732d851133ece95ba5f189cd29ee5f272667c8f68de50853740f430.gif)
支持快速分析，点击快速分析字段后支持直接添加过滤条件。快速分析还能统计当前字段的布局情况，点击右下角饼图和支持打开字段分布的图表。
![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/3ec9d7e87bb99a81ba328e716bdecbed6a3173884880497824ede6a392bdaf98.png)
### 日志 SQL 分析
支持使用 SQL 语句对日志进行分析，例如统计浏览器品牌的数量，并做一个饼图。
![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/642dab4abd406147a35e3c62404c016b8d24552a181ab9e6eb02c2fcad7f90ba.png)
### 自定义仪表盘
支持将 SQL 日志分析的结果保存为仪表盘，并支持设置过滤器，能够过滤出想要类型的数据。RUM 场景来说，一般可以用来过滤页面、版本号、用户UID、环境等，甚至可以基于用户自定义的数据进行过滤。例如，下图统计了浏览器、操作系统等信息，并且可以针对版本号等过滤。
![image.png](/img/src/product/基于ARMSRUM进行日志自定义分析/1e630636c54d932a953b6e2d3c647b486d5814a73beee046f579a9ed8526c1aa.png)
# 总结
ARMS RUM 和 日志服务 SLS 联合推出的基于原始日志的自定义分析功能能够让用户充分挖掘数据的潜力，除了自定义存储时间、自定义日志分析、定义仪表盘功能外，日志服务还提供 ETL （数据加工）、告警等其他强大的功能，欢迎使用。
# 相关文档
ARMS RUM: [https://help.aliyun.com/document_detail/440243.html](https://help.aliyun.com/document_detail/440243.html)
