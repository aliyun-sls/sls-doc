---
pageClass: sls-starops-home
---

<section class="sls-starops-hero">
  <div class="sls-starops-hero__content">
    <div class="sls-starops-hero__breadcrumb">
      <a href="/doc/index.html">阿里云可观测</a>
      <span>/</span>
      <span>STAROps</span>
    </div>
    <p class="sls-starops-hero__eyebrow">STAROps Best Practices</p>
    <h1>Agentic Ops<br /><em>最佳实践</em></h1>
    <p class="sls-starops-hero__lede">STAROps 在常见 Agentic Ops 场景下的使用案例。涵盖开始上手、基准评测、进阶必备、场景能力、DevOps 闭环、持续优化和集成扩展。</p>
    <div class="sls-starops-hero__actions">
      <a class="sls-starops-btn sls-starops-btn--primary" href="https://starops.console.aliyun.com" target="_blank">进入 STAROps 控制台</a>
      <a class="sls-starops-btn sls-starops-btn--ghost" href="/doc/playground/staropsdemo.html" target="_blank">体验 Playground</a>
    </div>
    <div class="sls-starops-hero__signals" aria-label="实践主题">
      <span>开始上手</span>
      <span>基准评测</span>
      <span>进阶必备</span>
      <span>场景能力</span>
      <span>DevOps 闭环</span>
      <span>持续优化</span>
      <span>集成扩展</span>
    </div>
  </div>
</section>

<section class="sls-starops-scene-nav">
  <a class="sls-starops-scene-card" href="#start" data-tone="brand">
    <h2>开始上手</h2>
    <p>掌握提问范式和 UModel 语义能力，让数字员工按实体、指标、拓扑和日志理解系统。</p>
    <span class="sls-starops-scene-card__cta">查看实践</span>
  </a>
  <a class="sls-starops-scene-card" href="#benchmark" data-tone="violet">
    <h2>基准评测</h2>
    <p>用同一 RCA Benchmark 对比 ReAct、OpenClaw 与 STAROps，覆盖评测基准、评测结果和 40 个诊断案例。</p>
    <span class="sls-starops-scene-card__cta">查看评测</span>
  </a>
  <a class="sls-starops-scene-card" href="#keypoint" data-tone="cyan">
    <h2>进阶必备</h2>
    <p>脚本固化巡检事实口径，Agent 在异常后沿 UModel 动态追因，把阈值监控升级为可复核、可追因的健康报告。</p>
    <span class="sls-starops-scene-card__cta">查看实践</span>
  </a>
  <a class="sls-starops-scene-card" href="#scenario" data-tone="violet">
    <h2>场景能力</h2>
    <p>告警追因、容量预测、日志模式与业务可靠性等场景化能力，按 SOP 完成取证、定位与报告。</p>
    <span class="sls-starops-scene-card__cta">查看实践</span>
  </a>
  <a class="sls-starops-scene-card" href="#devops" data-tone="amber">
    <h2>DevOps 闭环</h2>
    <p>将代码仓库、Release、镜像接入 UModel，补全告警到代码变更的跨域追因链路。</p>
    <span class="sls-starops-scene-card__cta">查看实践</span>
  </a>
  <a class="sls-starops-scene-card" href="#loop" data-tone="cyan">
    <h2>持续优化</h2>
    <p>可重复的 Runbook 与计算脚本沉淀为 Skill，让数字员工高效、稳定复用运维经验。</p>
    <span class="sls-starops-scene-card__cta">查看实践</span>
  </a>
  <a class="sls-starops-scene-card" href="#integration" data-tone="amber">
    <h2>集成扩展</h2>
    <p>接入钉钉 IM、MCP 外部工具与跨账号资源，让诊断结果、巡检报告和外部能力进入团队闭环。</p>
    <span class="sls-starops-scene-card__cta">查看实践</span>
  </a>
</section>

<section class="sls-starops-section" id="start">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">开始上手</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/onboarding/effective-prompts/article.html">
      <h3 class="sls-starops-card__title">与 STAROps 有效对话</h3>
      <p class="sls-starops-card__desc">对话落在 UModel、Agent、Skill 三层支撑上的人机协作契约：锚定实体、同 thread 累积、声明可验收输出。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/from-connection-to-diagnosis/article.html">
      <h3 class="sls-starops-card__title">从连接数据到完成一次诊断</h3>
      <p class="sls-starops-card__desc">第一次使用 STAROps：连接云监控 2.0 数据、等待自动建模、选中对象发起诊断，再顺着发现继续追问。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>

<section class="sls-starops-section" id="benchmark">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">基准评测</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/benchmark/rca/rca_benchmark_dataset.html" target="_self">
      <h3 class="sls-starops-card__title">评测基准</h3>
      <p class="sls-starops-card__desc">RCA Benchmark 的数据集设计、UModel 观测语义、评分协议和复现实验说明。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/benchmark/rca/rca_benchmark_results.html" target="_self">
      <h3 class="sls-starops-card__title">评测结果</h3>
      <p class="sls-starops-card__desc">多框架、多模型横向对照，展示 STAROps RCA 在同一评测集上的诊断表现。</p>
      <span class="sls-starops-card__cta">查看结果</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/benchmark/rca/cases_compare.html" target="_self">
      <h3 class="sls-starops-card__title">评测案例</h3>
      <p class="sls-starops-card__desc">40 个故障案例按 6 类展开，逐例对照 ReAct、OpenClaw 与 STAROps 的排查路径。</p>
      <span class="sls-starops-card__cta">查看案例</span>
    </a>
  </div>
</section>

<section class="sls-starops-section" id="keypoint">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">进阶必备</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/practices/rds-inspection-via-script/article.html">
      <h3 class="sls-starops-card__title">如何提升巡检稳定性，同时支持异常后的动态追因</h3>
      <p class="sls-starops-card__desc">脚本固化巡检事实口径，Agent 在异常后沿 UModel 动态追因，把阈值监控升级为可复核、可追因的健康报告。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/mysql-readonly-diagnosis/article.html">
      <h3 class="sls-starops-card__title">MySQL 只读性能诊断</h3>
      <p class="sls-starops-card__desc">用环境代理把已有的 MySQL 只读脚本接进数字员工，在会话里确认目标、执行检查，并围绕 SQL 与活跃会话继续追问。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>

<section class="sls-starops-section" id="scenario">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">场景能力</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/practices/alert-rca-flow/article.html">
      <h3 class="sls-starops-card__title">告警 RCA 多分支诊断最佳实践</h3>
      <p class="sls-starops-card__desc">把企业历史 Runbook 固化为 Agent 可执行 Skill，按错误码分支并行取证，证据不足升级 InvestigationAgent。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/capacity-risk-prediction/article.html">
      <h3 class="sls-starops-card__title">自定义容量风险巡检设计最佳实践</h3>
      <p class="sls-starops-card__desc">把容量风险从看水位升级为看未来：series_forecast 预测触阈时间，沿 UModel 解释上升来源，跨产品联动归并后给出处置优先级。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/business-reliability-flow/article.html">
      <h3 class="sls-starops-card__title">从一次深度评估到持续守住业务基线</h3>
      <p class="sls-starops-card__desc">一次性深度分析建立业务口径与基线，长期任务按周期对照守住基线，偏离变成有人跟进的问题发现。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/log-insight-pattern/article.html">
      <h3 class="sls-starops-card__title">STAROps 日志智能巡检实践</h3>
      <p class="sls-starops-card__desc">对核心日志做周期巡检，主动捕捉尚未告警的日志模式变化，并把确认的问题沉淀为持续跟踪的发现项。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/synthetics-closed-loop/article.html">
      <h3 class="sls-starops-card__title">用 STAROps 串起云拨测闭环</h3>
      <p class="sls-starops-card__desc">从业务目标创建云拨测任务，确认样本生效，沿协议阶段与 APM 调用链做跨域联合分析，再用原任务复核处理效果。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/cross-product-inspection-summary/article.html">
      <h3 class="sls-starops-card__title">多云产品融合巡检最佳实践</h3>
      <p class="sls-starops-card__desc">把多产品巡检结果汇总成一份报告，按 UModel 关系归并同一资源风险，让值班一次看清全局并减少重复通知。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/billing-cost-analysis/article.html">
      <h3 class="sls-starops-card__title">账单与成本分析最佳实践</h3>
      <p class="sls-starops-card__desc">用自然语言查询云费用、定位费用变化与实例级根因，结合资源水位形成可复核的成本优化建议。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>

<section class="sls-starops-section" id="devops">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">DevOps 闭环</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/practices/devops-code-to-runtime/article.html">
      <h3 class="sls-starops-card__title">从运行异常追到代码变更</h3>
      <p class="sls-starops-card__desc">把代码库与流水线接进 UModel，让数字员工从告警沿关系追到具体部署与提交。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/local-code-root-cause/article.html">
      <h3 class="sls-starops-card__title">把应用异常追到本地代码与配置</h3>
      <p class="sls-starops-card__desc">把运行日志与本地代码工作副本接进同一次调查，从 JDBC 报错沿 DB_URL 追到配置读取与注入位置，再回到运行实例核对。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/coding-agent-devops-loop/article.html">
      <h3 class="sls-starops-card__title">一个 Agent 入口完成 DevOps 闭环</h3>
      <p class="sls-starops-card__desc">以 Coding Agent 为统一入口，把发布后运行检查和告警到代码修复落在同一个任务，发布、提交、PR 由原系统人工确认。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>

<section class="sls-starops-section" id="loop">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">持续优化</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/practices/skill-authoring/article.html">
      <h3 class="sls-starops-card__title">编写 STAROps 运维 Skill</h3>
      <p class="sls-starops-card__desc">Skill 设计的 7 要素合规约束：触发、流程、脚本、输出、风控、失败、推理边界，附模板与自检 Checklist。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/skill-script-deterministic/article.html">
      <h3 class="sls-starops-card__title">编写 Skill 确定性脚本</h3>
      <p class="sls-starops-card__desc">数值计算交给脚本不交给 LLM——单位换算、聚合、阈值判断必须纯函数化，附 4 段 Python 模板。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>

<section class="sls-starops-section" id="integration">
  <div class="sls-starops-section__head">
    <div class="sls-starops-section__title-wrap">
      <h2 class="sls-starops-section__title">集成扩展</h2>
    </div>
  </div>
  <div class="sls-starops-grid sls-starops-grid--three">
    <a class="sls-starops-card" href="/doc/starops/practices/im-integration/article.html">
      <h3 class="sls-starops-card__title">把数字员工接进 IM 协作工具</h3>
      <p class="sls-starops-card__desc">扫码绑定与手动配置两条接入路径，接入后的配对准入、群上下文作用域与操作确认，把协作通道真正管住。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/mcp-integration/article.html">
      <h3 class="sls-starops-card__title">把团队自己的系统接进 STAROps</h3>
      <p class="sls-starops-card__desc">监控内已覆盖的数据走系统连接，监控外的自有系统通过 MCP 接进数字员工：准备服务、核对工具、定执行方式，再在会话里验证。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/cross-account-access/article.html">
      <h3 class="sls-starops-card__title">跨账号统一建模与问题排查</h3>
      <p class="sls-starops-card__desc">通过跨账号角色把多个业务账号接进同一名数字员工，自动建模成统一 UModel，围绕业务问题直接提问与联合排查。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>
