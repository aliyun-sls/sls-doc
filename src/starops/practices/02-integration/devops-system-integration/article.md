---
pageClass: sls-starops-article
status: published
journey: 集成扩展
id: devops-system-integration
title: 把自建 DevOps 系统接进 STAROps
---

<div class="sls-starops-article-crumb">
  <a href="/doc/starops/starops.html">STAROps</a> <span class="sep">/</span> <span>集成扩展</span>
</div>

# 把自建 DevOps 系统接进 STAROps：环境代理与官方 CLI

<div class="sls-starops-article-meta">
  <span>分类 · 集成扩展</span>
</div>

值班工程师的日常问题分两类。一类在监控里：服务的错误率、延迟、日志。另一类在监控外：这个服务最近谁改过代码，答案在团队自建的 GitLab 里；这个应用同步到了哪个版本，答案在 Argo CD 里。

以前回答第二类问题，要切到别的系统：打开 GitLab 查提交，打开 Argo CD 看同步状态，查完再切回来，把几个窗口里的线索拼在一起。STAROps 用指标、日志、APM、Trace 和 UModel 组织运行时证据，第一类问题数字员工直接能答；第二类的答案长在客户自己的系统里，产品内置不到。

环境代理改变了这条边界。**在能访问这些系统的机器上安装环境代理，数字员工就能执行这台机器上已经登录的官方 CLI，把监控外的答案带进同一个会话**：查 GitLab 的提交和流水线、看 Argo CD 的同步状态、读 Jenkins 的 Job 定义，用的都是各系统自己的命令行工具。本文以自建 GitLab、Jenkins、Argo CD 为例，讲清这条路径怎么接、每一步能确认什么、取不到什么。平台侧提供连接、审批和留痕，命令本身由客户机上已经登录的 CLI 执行；三个系统共用同一条通道，差别只在各自 CLI 能查什么。

接入前先对一下路径，不是所有需求都走同一条链：

| 要用的能力 | 走哪条路 |
|---|---|
| 云监控 2.0、日志服务 SLS、云效 Codeup、云效 Flow、GitHub Code、GitHub Actions 等平台已覆盖的数据 | 系统连接，直接添加 |
| 云资源现状查询与变更 | 云资源操作：数字员工通过托管的 aliyun CLI 按所选角色授权范围执行 |
| 只能从企业内网、多云等客户现场取的事实 | 客户环境执行：环境代理主动出站建连，机器不开入站端口；每个代理绑定一台机器，可用范围以[《环境代理》](https://help.aliyun.com/zh/starops/user-guide/environmental-agent)为准 |
| 团队自己的系统：自建代码平台、K8s 操作面、CMDB、工单、内部发布平台 | 环境代理：执行系统自己的 CLI；需要工具级治理时再评估 MCP 服务 |

前三行配置即可用，本文展开最后一行：团队自己的系统怎么接。

![](assets/images/06-two-paths.png)

## STAROps 的做法

这条路径接入后，STAROps 做三件事。

![](assets/images/07-access-chain.png)

**连接器绑定机器，能力和关注范围在连接器里声明。** 连接器是外部系统进入数字员工的唯一入口，一个接入对象对应一台能访问目标系统的机器和一组可执行能力，归属于一个数字员工。GitLab、Jenkins、Argo CD 各有对应的连接器类型：添加时选类型、选一台环境代理，再按项目、任务或应用选定关注范围，装上该系统的操作 Skill，机器上仍要备好并登录它的 CLI；每一步的入口、可选项与必装 Skill，以[《接入 GitLab》](https://help.aliyun.com/zh/starops/integrate-with-gitlab)、[《接入 Jenkins》](https://help.aliyun.com/zh/starops/integrate-with-jenkins)、[《接入 Argo CD》](https://help.aliyun.com/zh/starops/integrate-with-argo-cd)三篇文档为准。关注范围是选择器：项目、任务或应用按名称或分组列出，可以选全部，也可以只选指定的若干个。它不是授权，选全部时实际能访问的范围仍受机器上已登录身份的权限限制。这类接入不需要在控制台填写端点、登录凭证或访问密钥：它绑定机器，取数时使用这台机器上 CLI 已经登录的身份，凭据留在机器上。机器上的能力分两类：`bash` 执行数字员工给出的命令，本文三个系统都用这一类；`script` 执行机器上一个指定的程序，数字员工只能按声明填参数，不能改要执行哪个文件。这个程序能查什么、能做什么，由脚本自己决定，产品不额外限制。两类的字段、参数校验与生效方式见[《环境代理》](https://help.aliyun.com/zh/starops/user-guide/environmental-agent)的「声明能力」。机器上声明了哪几条，数字员工就只能用哪几条。连接检查确认机器在线、能力可用，不确认 CLI 是否安装、是否登录；连接状态正常，不等于查询一定能成功。

**执行方式按能力设定。** 每条能力单独设定执行前要不要人确认，默认值与配置方式见[《环境代理》](https://help.aliyun.com/zh/starops/user-guide/environmental-agent)。需要确认的，执行前弹出卡片，列明能力、主机和本次参数；确认请求有有效期，超时未确认就不会执行。本文三个系统用的 bash 能力都设为需要确认，所以查询和变更走同一道闸门，区别只在人看到的参数。

**命令与输出进证据链。** 每次执行留下命令、退出码和输出摘要，回答引用这些结果并说明依据。需要结构化字段时，用机器上的 jq 或 python3 解析输出；命令超时、退出码非零或返回为空时，明确说明缺口，不把空结果写成结论。

![](assets/images/08-evidence-chain-cli.png)

为连接器开启 Agentic 建模后，范围内的代码仓库与流水线会进入数字员工的 UModel：STAROps 自动分析这些对象，建立有依据的实体关系，并整理可复用的运维知识。运行记录与提交仍留在源系统，数字员工按需读取。配置见[《通过连接器自动建模》](https://help.aliyun.com/zh/starops/user-guide/automatic-modeling-via-connectors)。

这条路径不替代监控主链，指标、日志、Trace 该走系统连接的还走系统连接；取数质量由 CLI 版本、登录态和网络决定；命令最终能不能执行，由本机登录态和外部系统权限决定。

**接入前要落实的条件。** 环境代理目前受限使用，自 2026 年 10 月起只有订阅高级版或旗舰版的账号可以开通，且需先提交工单；数字员工要建在华北 2（北京）或新加坡地域。机器需要能访问目标系统、长期在线，重启后代理进程能自动拉起，一台机器可以装多个代理，VPC 内也能走内网接入。机器上装好并登录各系统的官方 CLI，登录态、token 和 kubeconfig 留在机器上，不进连接器配置。套餐、地域、机器、CLI 与凭据的具体要求，以[《环境代理》](https://help.aliyun.com/zh/starops/user-guide/environmental-agent)和三篇接入文档为准。

## 接入前的四个边界

**权限跟着本机登录态走。** 连接器不托管凭证，数字员工用的是机器上 CLI 已经登录的身份，可见范围由这个身份在目标系统里的权限决定：它可能是只读身份，也可能是管理员。接入前先确认三件事：CLI 登录的是谁、这个身份有哪些权限、是否只开放查询。平台侧提供执行链路和按能力设定的人工确认，本地凭据是否可读、能读到什么，由执行身份和客户机权限决定。

![](assets/screenshots/09-satellite-binding.png)

**闸门有三层，人工确认只是其中一层。**

| 闸门 | 落在哪 | 管什么 |
|---|---|---|
| 能力声明 | 客户机 | 没声明的能力调不到；script 只能按声明填参数，能做什么由脚本决定 |
| 执行方式 | 客户机声明，平台确认 | 需要确认的才弹卡片；确认在控制台完成，机器上不弹审批窗口 |
| 执行身份 | 客户机操作系统 | 这个用户能读写的文件、能出的网、能起的进程 |

三层都落在客户机上，平台侧的人工确认作用于第二层。需要更细的审批时，把审批放进外部系统的工单，或收窄机器上的能力声明。

自动放行策略是数字员工级的持久配置，同时支持环境代理与阿里云 CLI 两类调用；会话内自动通过只在当前会话有效，新建会话或更换数字员工后要重新添加。规则怎么加、按什么范围匹配，见[《会话内自动通过》](https://help.aliyun.com/zh/starops/user-guide/automatically-approved-within-the-conversation)。

![](assets/screenshots/10-hil-confirmation.png)

**责任分四方，各管一段。** 接入前把这张表和外部系统的负责人对齐：

| 方 | 负责什么 |
|---|---|
| STAROps | 理解意图、组织命令、解析输出、生成结论与建议 |
| 环境代理 | 出站连接、执行已声明能力、回传结果 |
| CLI 与外部系统 | 登录态、身份权限、真实数据、系统侧审计 |
| 人与审批系统 | 每次命令确认、高风险变更授权、回滚决策 |

**排障按层查。** 先看命令有没有执行（确认卡片是否出现、是否超时），再看退出码（CLI 或网络），再看返回（身份权限或查询范围），最后看控制台（连接器与机器绑定）。

## 典型场景：三个自建系统接进「运维值班」

团队的环境：GitLab、Jenkins、Argo CD 都跑在一台能访问的机器上，三个 CLI 已经在这台机器上登录。数字员工「运维值班」绑定这台机器后，值班工程师在同一个会话里问三类问题：这次改动是谁提的、这个应用同步到哪了、构建它的 Job 是怎么定义的。

### 先查代码：这次改动是谁提的

工程师先问 GitLab。数字员工执行：

```text
glab auth status
glab api "projects?per_page=5&simple=true"
glab api "projects/<id>/repository/commits?per_page=3"
glab api "projects/<id>/pipelines?per_page=5"
```

**确认什么**：本机 glab 登录的是哪个 GitLab、有哪些项目、最近提交和流水线是什么。

**取到什么**：项目 id、路径、默认分支、最近活动；提交的 sha 与说明；流水线的 id、sha、ref、status、created_at。

**取不到什么**：没有登录态或网络不通时取不到；身份权限不足时只返回可见范围；CLI 不会替人判断变更与故障之间的因果。

![](assets/screenshots/11-gitlab-cli.png)

### 再看发布：这个应用同步到哪了

接着问 Argo CD。数字员工执行：

```text
argocd app list -o name
argocd app get <应用名>
argocd app history <应用名>
argocd app diff <应用名>
```

**确认什么**：有哪些应用、同步状态、revision、健康状态、发布历史、期望态与实际态的差异。

**取到什么**：Application 层面的数据，包括 source、destination、syncPolicy、sync.status、health、history。

**取不到什么**：Pod 级运行态。集群 API 不可达时，kubectl 只会超时返回；这时能确认的是“取不到”，不是工作负载异常或正常。

![](assets/screenshots/12-argocd-cli.png)

### 最后看构建：Job 是怎么定义的

最后问 Jenkins。`jenkins-cli` 是本机的封装，等价于 `java -jar jenkins-cli.jar …`；装在哪个路径、用哪个 Java，由这台机器决定。数字员工执行：

```text
jenkins-cli who-am-i
jenkins-cli list-jobs
jenkins-cli get-job <Job 名>
```

**确认什么**：当前身份、有哪些 Job、Job 定义是什么。

**取到什么**：当前身份可见的 Job 清单与 Job 的 XML 定义。

**取不到什么**：未授权的写操作、未开放的构建日志；身份可见范围决定结果。

![](assets/screenshots/13-jenkins-cli.png)

三类数据放在一起，能回答“谁改的、发到哪、怎么构建的”，但每一步都要说明来源和缺口。CLI 返回的是控制面状态，不等于业务健康；Pod 级、业务指标和日志仍要回到监控与日志连接器。

![](assets/screenshots/14-session-evidence.png)

### 接不通先查哪里

接入和调用不顺时，先看现象落在哪一行：

| 现象 | 先查哪里 |
|---|---|
| 确认卡片没有出现 | 连接器是否绑定机器；能力是否声明为执行前确认 |
| 确认后命令没有执行 | 确认请求是否已超时 |
| 命令退出码非零 | 本机 CLI 是否登录；网络是否可达目标系统 |
| 命令成功但返回为空 | 该 CLI 身份在目标系统里的可见范围 |
| 控制台看不到连接器或机器 | 连接器归属与机器绑定状态 |
| 返回字段与预期不一致 | CLI 与服务端版本 |
| 连接状态正常但查询失败 | CLI 是否安装、是否登录、版本是否支持该子命令 |

## 总结

监控之外的答案要进到数字员工的会话里，做法是让环境代理在能访问系统的机器上执行官方 CLI：连接器只声明机器与能力，执行方式按能力设定，输出进证据链。范围内的代码仓库与流水线经自动建模进入 UModel，数字员工据此定位对象，取数仍走机器上的 CLI。GitLab、Jenkins、Argo CD 各有一套 CLI，能取到的是控制面数据；取不到的要说明缺口，不把空结果写成结论。

这套做法要长期可用，取决于四件事：CLI 登录的是谁、网络通不通、确认有没有人做、版本与字段对不对得上。需要工具级治理或统一工具面时，再评估 MCP 服务：它支持直连与 VPC 两种模式，直连要求服务端点公网可达，VPC 模式可以为私网 ECS/ACK 打通访问链路，详情见[《MCP 服务配置》](https://help.aliyun.com/zh/starops/user-guide/mcp-service-configuration)。自建内网不只有公网直连一条路，是否适用仍要按网络环境确认。

## 相关入口

- [返回 STAROps 最佳实践首页](/starops/starops.html)
- [打开 STAROps Playground](/playground/staropsdemo.html)
- [进入 STAROps 控制台](https://starops.console.aliyun.com)

<style>
.sls-starops-article .vp-doc details {
  margin: 12px 0;
}

.sls-starops-article .vp-doc details > summary {
  font-size: 14px;
  line-height: 1.6;
}

.sls-starops-article .vp-doc img {
  display: block;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  margin: 10px auto 2px;
  background: #f7f9fc;
  border: 1px solid var(--sls-starops-border, #e6ebf3);
  border-radius: 10px;
  box-shadow: none;
}

.sls-starops-article .vp-doc p {
  line-height: 1.85;
  margin: 14px 0;
}

.sls-starops-article .vp-doc h2 {
  margin-top: 36px;
}
</style>
