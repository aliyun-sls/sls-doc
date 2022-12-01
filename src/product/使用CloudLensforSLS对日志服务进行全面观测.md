本文为您介绍使用CloudLens fo SLS 对日志服务的Project内资源进行监控。
# 适用场景
## 开发运维
开发人员通过CloudLens for SLS，可监控和管理日志服务Project、Logstore等资产，提升对日志服务资产的管理效率。同时通过CloudLens for SLS对Project实例的详细日志、重要日志以及作业监控日志提供了查询与分析，提高了问题定位的效率。
## IT运维
IT运维人员更注重后台服务的稳定性、黄金指标、并告警监控进行及时响应。IT运维人员可通过CloudLens for SLS的告警功能对Project服务状态、流量、Quota以及Logtail多维度指标异常感应和响应。
## 安全审计
CloudLens for SLS的审计日志可以记录用户对Project内资源的创建、更新、删除操作，方便安全审计人员在特定时间内的操作进行安全分析与审计。
# 方案架构
CloudLens for SLS支持如下功能与优势如下。

- 支持集中管理当前阿里云账号下Project和Logstore。
- 支持一键开启实例日志（重要日志、详细日志、作业运行日志）以及全局日志（审计日志）的采集功能，集中管理日志的采集状态。
- 支持Project内Logstore、报表、告警等10种静态指标以及写入流量、读写次数等3种动态指标的限额定时同步展示。
- 提供丰富的可视化报表，包括访问监控、采集监控、操作监控、作业监控和额度监控五大类别报表。全面监控Project指标（访问指标、操作指标）、Logtail采集状态、数据导入以及ScheduleSQL运行状态。
- 提供自定义告警配置，告警通知直接对接消息中心、短信、邮件、语音（电话）、钉钉，并支持对接自定义WebHook。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/e4a7890b59d359eb2dbbc13674763ffacd453ab37fe2f9dc893bc637c331aa18.png)
## 接入管理模块介绍
接入管理提供实例日志和全局日志两种集中管理视图。其中实例日志管理如下图所示，会展示账号下所有的Project实例以及Project的日志采集状态：详细日志、重要日志以及作业运行日志，也可通过报表查询跳转到对应的报表查看。全局日志提供审计日志的开启与关闭操作，通过审计日志记录日志服务所有Project内资源创建、修改、更新、删除等操作日志，并保存在指定Project的Logstore (internal-audit_log)中。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/f40a61a8a7a8a5ec4bdb7e8a8a3038e7e198c93bebe79331133466733f2f6837.png)
存储目标库管理了所有开启实例日志或者全局日志存储的project和logstore信息。同时可通过索引重置功能一键升级目标存储库的索引到内置索引最新版本。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/7dc97fef3c014c9093a3658b0d8e7ea88cd90aa7d9c0cd72956c499e78895d8f.png)
## 资产概览模块介绍
资产概览提供Project资产概览以及Logstore资产概览。Project资产概览提供Project实例详详情展示以及包含的Logstore数，通过点击Quota详情可获取Project的静态/动态额度。资产概览还支持15min内Project写流量超限、写Qps超限以及Shard的读取超限统计。如需监控全量额度超限统计可开通Project的详细日志，开通全局的审计日志亦可获得操作的额度监控。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/ead41081fa6016d0ed5d57fc62efa97483aa1aa3f0d1c23193836c291d04c103.png)
## 告警管理模块介绍
CloudLens for SLS预设了基线告警、同环比告警等相关的告警监控规则，用于监控Project、Logtail、消费组等资源的使用，并支持短信、钉钉、邮件、语音、自定义Webhook等通知方式。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/e0dc46d9088321b29dd071402b2b5b38468b011fb2e0be9001be3ee4e5f3ea16.png)
## 报表中心模块介绍
报表中心依据实例的重要日志、详细日志、作业运行日志以及全局的审计日志支持访问、采集、操作以及作业纬度的报表展示，此外还提供了额度监控支持账号下所有Project内超限指标详情。
报表中心除了支持不同纬度的指标分析外还提供**索引重置**功能，对于报表依赖的Logstore索引缺失问题可一键通过报表右上角"索引重置"按钮恢复。
### 访问监控
访问监控支持基于Project详细日志开启的访问流量监控、访问异常监控以及基于Project重要日志的消费组监控：

- **访问流量监控**：展示日志服务的访问情况，包括今日请求总数、客户端个数、今日用户数、今日IP读取网络流量Top 10、今日IP写入网络流量Top 10、请求数、写入流量等图表。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/6664d2f7190fc3db21b96cdbd4f1254d3a2e753f79fd24c54cea20d1cdeccf05.png)

- **访问异常监控：**展示日志服务的异常访问情况，包括今日请求总数、失败请求占比、额度超出限制异常、请求异常状态分布、写入流量/次数超过限制、请求异常数、请求处理耗时趋势等图表。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/f4a3170fb7b9a6d9c296f0a698a58fa40c2a57f55e42097b90249f12e362c117.png)

- **消费组监控：**展示消费组相关信息，包括消费组个数、消费Logstore个数、消费Shard个数、消费组延迟数、消费组数据占比、消费组列表、消费组延时Top 10、消费落后时长等图表。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/9e67adc52a46d0f3b0c121d13d0f6ef71198c3e3ef410249e1dba5af54925f86.png)
### 采集监控
采集监控基于Project的重要日志，包含Logtail整体状态、Logtail文件采集监控以及Logtail异常监控

- **Logtail整体状态：**展示Logtail相关信息，包括活跃Logtail数、原始数据流量、运行状态分布、内存占用分布、Logtail整体状态、CPU趋势、内存趋势、数据发送流量、Logtail写入流量/写入次数等图表。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/f947e383e51a0091d2dc597e2ec7b5d6ef6ac94386445812b401a397867e4e5b.png)

- **Logtail文件采集监控：**展示待采集文件的相关信息，包括采集文件数、采集机器数、采集文件分布、采集日志量、平均采集延迟、解析失败率、发送次数趋势等图表。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/ca3453a558f98912f3675398ffc5cfd4ebb2d066c47701619e94d16e161e1f83.png)

- **Logtail异常监控：**展示Logtail的异常情况，包括活跃Logtail数、Logtail重启列表、重启客户端数、关键错误等图表，其中关键错误、Logtail写入异常中列出了必须处理的错误，方便用户一眼看出Logtail使用过程中的异常；日志文件重复配置问题里还带有解决方案，用户可通过解决方案快速修复错误，完成问题的自闭环。

![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/ae8debefc7432488f29d849dccd279f1f93a1bd483741413b7b047f43d5e92c3.png)
### 作业监控
作业监控基于Project的作业运行日志，展示数据导入作业（新版）、投递作业（新版）或Scheduled SQL作业运行情况，包括读成功条数、读失败条数、写成功条数、写失败条数、读公网流量、写公网流量、处理速率、进度落后、运行异常等图表。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/d3e68fd3f434fe881d257cfbb92088fc5e960e3d4f8d6f9391188afedd642eb3.png)
### 操作监控
操作监控基于全局的审计日志，展示日志服务操作记录，包括日志库操作总数、日志库操作失败占比、操作客户端个数。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/bb2d116661fe3b708ea653f71a43c1b320fcf37f18bb41f646b39952a6148ac3.png)
### 额度监控
额度监控基于全局的审计日志，展示资产额度超限情况，包括LogStore额度超限、Dashboard额度超限、Shard额度超限、告警额度超限、机器组额度超限、Logtail采集配置额度超限等。
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/29283d3adad2e83e6579285d13dc0d978a65d2b59afce422d4f88ab079a27d47.png)
# 方案实施
下面以Project超限场景为例，操作怎么监控Project的额度。
## 前提条件
创建Project、Logtore和报表，以及提前配置好告警管理内SLS Lens内置行动策略（短信）
## 操作步骤
### 步骤一：开启实例日志与全局日志监控

1. 登录[CloudLens for SLS](https://sls.console.aliyun.com/lognext/app/lens/sls?resource=/common-data-access)，点击左侧**接入管理**

i.在**实例日志**页面选择目标Project，开启**详细日志**
ii.在**全局日志**页面开启**审计日志**
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/75ee3965d190d5e2797066d849d871051afefb16ff753d51985bff0fddd65172.png)
### 步骤二：配置告警规则

1. 进入CloudLens for SLS告警管理

i. 点击**规则/事务**栏里的**系统内置告警**
ii. 选择**Project Quota超限监控**，点击**设置**调整阈值后点击**开启**
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/6e85cbc40f36ac7b945ee42b3c3b2461f10db55976c83cc9cfa548adde42699b.png)
### 步骤三：通过api或者控制台创建报表至提示超限
## 方案验证
完成操作步骤后CloudLens for SLS会提供审计日志以及Project详细日志的监控与分析。

1. 在CloudLens for SLS的报表中心查看分析

i. 点击**额度监控**，查看分析报告
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/ba3a4e1cbef2558379fa262475be2938f3ccff04a3d33e9db522d105cb24ccce.png)
ii. 点击操作监控，选择目标Project后查看分析
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/37e0c7f433044b11ad1828132886ae7328af327d5649556628934f48425f31b1.png)

2. 在**资产概览**中查询到Project的Quota上限

i. 点击**Project资产概览**，选择Project后点击Quota**详情**查看
![image.png](/img/src/product/使用CloudLensforSLS对日志服务进行全面观测/822a09f5387e25c59ee66fbbcc18a399cc9c74840abd47e517990349e1b6023a.png)

3. Project Quota告警短信接收

i. 接收到的告警短信如下
```
【阿里云】日志服务告警：共有1条告警。告警详情为：阿里云账号：165*******3050
告警标题：Project Quota超限次数过多
告警内容：在过去的1分钟，Project ****下共发生了2次Quota超限错误，超过了预设监控阈值，请检查是否存在异常
告警严重程度：高
```

