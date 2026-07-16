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
    <p>接入钉钉 IM 与 MCP 外部工具，让诊断结果、巡检报告和外部能力进入团队闭环。</p>
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
      <h3 class="sls-starops-card__title">RDS 脚本巡检与动态追因</h3>
      <p class="sls-starops-card__desc">脚本固化巡检事实口径，Agent 在异常后沿 UModel 动态追因，把阈值监控升级为可复核、可追因的健康报告。</p>
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
      <h3 class="sls-starops-card__title">告警 RCA：用 Skill 固化历史 Runbook</h3>
      <p class="sls-starops-card__desc">把企业历史 Runbook 固化为 Agent 可执行 Skill，按错误码分支并行取证，证据不足升级 InvestigationAgent。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/capacity-risk-prediction/article.html">
      <h3 class="sls-starops-card__title">自定义容量风险巡检设计最佳实践</h3>
      <p class="sls-starops-card__desc">把容量风险从看水位升级为看未来：series_forecast 预测触阈时间，沿 UModel 解释上升来源，跨产品联动归并后给出处置优先级。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/business-reliability-flow/article.html">
      <h3 class="sls-starops-card__title">业务服务可靠性巡检</h3>
      <p class="sls-starops-card__desc">5 Phase 串接业务基线、应用、拓扑、告警、报告，产出含 SLO 与行动项的服务可靠性体检报告。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/log-insight-pattern/article.html">
      <h3 class="sls-starops-card__title">日志模式定时巡检</h3>
      <p class="sls-starops-card__desc">日志模式聚类支持持续分析新增、消失与异常模式，按计划主动送达变化报告。</p>
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
      <h3 class="sls-starops-card__title">DevOps 跨域追因建模</h3>
      <p class="sls-starops-card__desc">把客户侧 DevOps 数据接入 UModel，让告警沿关系链追到镜像、发布、代码仓库和负责人。</p>
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
    <a class="sls-starops-card" href="/doc/starops/practices/dingtalk-integration/article.html">
      <h3 class="sls-starops-card__title">集成钉钉 IM 通道</h3>
      <p class="sls-starops-card__desc">钉钉应用 + AppFlow 连接流 + STAROps 数字员工三平台串联，4 步完成企业 IM 内对话式运维。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
    <a class="sls-starops-card" href="/doc/starops/practices/mcp-integration/article.html">
      <h3 class="sls-starops-card__title">MCP 能力扩展与工具治理</h3>
      <p class="sls-starops-card__desc">MCP 把客户侧探测、受控动作、研发上下文封装成结构化 tools，数据面之外的能力按需接入 STAROps，风险随工具显式分层治理。</p>
      <span class="sls-starops-card__cta">查看文档</span>
    </a>
  </div>
</section>
