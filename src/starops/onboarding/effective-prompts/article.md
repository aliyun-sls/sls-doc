---
pageClass: sls-starops-article
status: published
journey: 语义上手
id: effective-prompts
title: 与 STAROps 有效对话
---

<div class="sls-starops-article-crumb">
  <a href="/doc/starops/starops.html">STAROps</a> <span class="sep">/</span> <span>语义上手</span>
</div>

# 与 STAROps 有效对话

<div class="sls-starops-article-meta">
  <span>分类 · 语义上手</span>
</div>

> 对话回放：[6 原则会话回放](/playground/effective-prompts-replay.html)

在 STAROps 中，提问方式会影响 Agent 取哪些数据、调用哪些 Skill、关联哪些 UModel 实体。明确实体、时间窗、业务意图和期望输出，可以让 Agent 更快收敛到可验收结论。系统慢这类笼统描述会扩大搜索范围，增加反复补上下文的成本。

有效对话是所有上层实践的入口能力。业务可靠性巡检、RDS 巡检、告警 RCA 和容量风险预测都依赖清晰的实体、时间窗、数据范围和输出要求。

## 六条对话原则

这 6 条原则依赖 STAROps 的三层支撑。离开 UModel、Agent context 和 Skill routing，它们只会退化成泛化表达建议。

| 支撑层 | 作用 |
|---|---|
| UModel | 解析实体和关系，让 Agent 能把服务、接口、实例、日志、指标和拓扑关联起来。 |
| STAROps Agent | 维护同一 thread 内的上下文连续、一致和自动压缩，并约束输出形态。 |
| STAROps Skill | 通过显式 Skill 触发进入声明好的执行流程和参数 schema。 |

## 原则一：指定实体

支撑层：UModel 实体解析。

服务名、实例 ID、应用名和时间范围都是 UModel 可解析的对象。实体明确时，Agent 可以跳过对象猜测，直接围绕目标实体取数和关联证据。

| 类型 | 示例 | 说明 |
|---|---|---|
| 不推荐 | `帮我看下系统最近怎么样` | 搜索范围过宽，容易选错实体。 |
| 推荐 | `@checkout 给出当前实体的健康总览：近 24 小时核心指标（QPS、错误率、平均延迟、实例数）、近 24 小时告警次数与最严重告警、关联的上下游服务列表。` | 通过 `@checkout` 锁定实体，并声明指标和时间窗。 |

## 原则二：使用业务意图

支撑层：UModel 实体可查询 + STAROps Agent 意图转换。

使用业务意图描述目标。PromQL、SQL 和过滤表达式由 Agent 基于可查实体处理。这条原则依赖 UModel 实体可查和 Agent 的意图转换能力，不依赖 Skill。

| 类型 | 示例 | 说明 |
|---|---|---|
| 不推荐 | `sum(rate(http_requests_total{service="checkout",status=~"5.."}[5m])) by (instance)` | 用户把查询语法写死，容易脱离 STAROps 实体上下文。 |
| 推荐 | `@checkout @inventory 对比 3 小时前与 1 小时前这两个时间点最近半小时内，平均延迟、错误率、QPS 的差值，标出变化超过 20% 的指标。` | 用业务对象、时间窗和判断规则表达目标。 |

## 原则三：保持同一 Thread

支撑层：STAROps Agent context 管理，包括连续、一致和自动压缩。

每个 thread 是 Agent 的一段工作上下文。多轮对话保持在同一 thread 内，Agent 可以复用前轮结论；新开 thread 等于重新开始。

| 能力 | 说明 |
|---|---|
| 连续 | 同一 thread 内实体上下文跨轮累积。 |
| 一致 | 前后结论可引用，前轮确认的实体和判断不会断链。 |
| 自动压缩 | 长对话保留结构化摘要，适合承载多步分析。 |

| 类型 | 示例 | 说明 |
|---|---|---|
| 不推荐 | 在新 thread 提问 `刚才那个慢查询继续看下应用层` | 新 thread 没有前序上下文。 |
| 推荐 | `基于上面的 checkout 健康总览，关联最近 1 小时 checkout 下游 payment、cart、shipping 的错误率，定位哪个下游异常可能影响了 checkout。` | 在同一 thread 内复用前序结论。 |

涉及业务服务可靠性巡检、告警 RCA、多跳关联等多步分析时，应在同一 thread 内连续推进；新开 thread 后，需要重新提供前序结论。

## 原则四：声明输出形态

支撑层：STAROps Agent 输出形态约束。

在提问末尾写清期望产出，让 Agent 直接给出可验收结论。输出形态不明确时，Agent 容易返回大段叙述，用户还要二次整理。

| 类型 | 示例 | 说明 |
|---|---|---|
| 不推荐 | `分析下这个服务的健康状况` | 输出范围和验收标准不清。 |
| 推荐 | `@frontend 近 1 天内 [Health Rule] request_rate_compare 触发了多少次、平均存活时长、与 latency_avg_compare 的关联度；基于这些数据给出降噪建议（调阈值 / 调时间窗 / 合并规则 三选一并说明理由）。` | 明确指标、时间窗、输出字段和决策选项。 |

## 原则五：补齐缺失数据

支撑层：UModel 拓扑残缺兜底。

当 trace 采样率低、告警未接入或拓扑不完整时，Agent 可能只能画出残缺关系。把已知依赖补在提问末尾，可以让 Agent 优先采用这些背景，并合并实时发现的额外依赖。

| 类型 | 示例 | 说明 |
|---|---|---|
| 不推荐 | `给我画出 checkout 的依赖拓扑` | trace 不全时，结果可能缺失依赖且不提示缺口。 |
| 推荐 | `画出 @checkout 的依赖拓扑。已知下游依赖：checkout -> cart、checkout -> payment、checkout -> shipping、checkout -> inventory、checkout -> currency、checkout -> email、checkout -> flagd。如在 trace 中发现额外依赖请合并。` | 用已知依赖兜底 UModel 拓扑缺口。 |

## 原则六：显式调用 Skill

支撑层：STAROps Skill routing。

业务 Skill 应通过 `/` 显式触发。显式调用会进入 Skill 的既定流程，参数走声明好的 schema，执行更稳定，输出更结构化。

| 类型 | 示例 | 说明 |
|---|---|---|
| 不推荐 | `帮我巡检下 RDS` | Agent 可能走通用排查路径，或反复要求补上下文。 |
| 推荐 | `/Trace 调用链诊断 <traceId>` | 通过 Skill 入口锁定执行流程。 |

当 traceId、告警 ID 或任务 ID 等唯一定位 ID 已存在时，时间窗和数据源可以省略，ID 会锁定上下文。

## 提问模板

以下模板用于常见 STAROps 对话场景。

**单服务健康检查**

```text
@<服务名> 看最近 <时间范围> 的 <指标列表> 是否偏离 <基线>，
偏离的指标按严重程度排序，并给出是否需要立即介入的判定。
```

**跨服务影响分析**

```text
基于上面的 <前序结论>，关联 <下一层数据范围>，
定位哪些 <实体类型> 异常可能影响 <业务指标>。
```

**调用既定 Skill**

```text
/<skill 显示名> <参数>=<值> 执行 <动作>。
要求：<输出格式 / 分级 / 附加字段>。
```

## 常见问题

### 提问越长越好吗

长度应匹配任务复杂度。单一查询一句话即可，多步骤分析需要写明产出形态和兜底信息。冗长提问会让 Agent 在无关条件上过度匹配。

### 不知道准确服务名怎么办

先在 STAROps 控制台的应用列表或实例列表中确认名称，再写入提问。只能提供业务名时，Agent 会尝试用 UModel 模糊匹配，但准确性不如直接指明服务名。

### `@` 提及有什么区别

`@<服务名>` 是 STAROps 的实体提及语法，直接绑定到 UModel 中的对应实体。Agent 后续指标查询默认在这个实体范围内。直接写服务名也能解析，但作用范围弱一些，多个同名服务时容易选错。

### 何时显式分 Phase

简单场景可以让 Agent 自由分析。复杂场景，如业务服务可靠性巡检和告警 RCA，建议显式分 Phase，每个 Phase 都明确输入、输出和停止条件，便于复盘和归档。

### 输出和预期不一致怎么办

在同一 thread 内要求 Agent 调整输出形态。Agent 会基于已有上下文重新组织结果，不需要新开 thread 重复前序问题。

## 相关入口

- [返回 STAROps 最佳实践首页](/starops/starops.html)
- [打开 STAROps Playground](/playground/staropsdemo.html)
- [进入 STAROps 控制台](https://starops.console.aliyun.com)
