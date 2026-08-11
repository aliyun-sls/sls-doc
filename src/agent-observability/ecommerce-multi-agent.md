# 电商场景：中文多 Agent 客服可观测实践

本文以一个纯文字电商客服为例，展示如何使用 LangGraph 构建中文多 Agent
工作流，并通过 LoongSuite 观察意图识别、专业 Agent、工具调用和最终回复审核。

用户只需要输入中文问题。示例不包含图片、文件上传、OCR、浏览器页面或多模态
模型，商品、订单和售后政策也全部使用虚构数据。

::: tip 示例源码
本文使用
[LoongSuite Python 电商客服示例](https://github.com/alibaba/loongsuite-python/tree/main/examples/ecommerce-customer-service){target="_blank"}。
该示例面向 LangGraph 1.2+，使用 LangChain 1.x 的 `create_agent` API。
:::

## 场景工作流

```text
中文问题
  -> intent_router
  -> presales_agent | aftersales_agent | clarify
  -> response_review
  -> 最终中文回复
```

工作流包含以下角色：

| 角色或节点 | 作用 | 可使用的能力 |
| --- | --- | --- |
| `intent_router` | 使用 LLM 将问题识别为售前、售后或意图不明确 | 结构化意图分类 |
| `presales_agent` | 运行显示名为“售前服务”的 ReAct Agent | 商品目录、商品知识和库存查询 |
| `aftersales_agent` | 运行显示名为“售后服务”的 ReAct Agent | 订单历史、售后政策和问题评估 |
| `clarify` | 在意图置信度不足时要求用户补充信息 | 不调用专业 Agent 或业务工具 |
| `response_review` | 根据专业 Agent 草稿和工具证据润色、审查最终回复 | 独立 LLM 调用 |

售前和售后 Agent 使用不同提示词和工具集。未选中的 Agent 不会执行，最终审核
节点也只能保留工具证据支持的事实，避免编造价格、库存、订单状态或售后承诺。

## 文字问答示例

售前问题：

```text
云步通勤鞋适合日常步行吗？42 码有货吗？
```

该问题会进入 `presales_agent`，由“售前服务”Agent 查询虚构商品知识和库存。

售后问题：

```text
订单 DEMO-1001 昨天签收，鞋底有问题，应该怎么处理？
```

该问题会进入 `aftersales_agent`，由“售后服务”Agent 先查询虚构订单，再根据
售后政策给出下一步建议。

意图不明确的问题：

```text
能帮帮我吗？
```

当分类置信度不足时，工作流进入 `clarify`，请用户说明要咨询商品还是已有订单。

## 可观测链路

一次售前或售后请求通常包含以下调用层次：

```text
意图识别 LLM
  -> 选中的 LangGraph 专业节点
  -> invoke_agent 售前服务 | invoke_agent 售后服务
     -> 专业 Agent LLM
     -> execute_tool <工具名>
     -> 专业 Agent LLM
  -> 最终审核 LLM
```

| 可观测信号 | 说明 |
| --- | --- |
| `invoke_agent 售前服务` | 售前专业 Agent 的完整执行过程 |
| `invoke_agent 售后服务` | 售后专业 Agent 的完整执行过程 |
| `gen_ai.agent.name` | 对应值为“售前服务”或“售后服务” |
| `execute_tool search_product_catalog` | 查询虚构商品目录 |
| `execute_tool check_inventory` | 查询虚构库存 |
| `execute_tool lookup_order_history` | 查询虚构订单历史 |
| `execute_tool query_after_sales_policy` | 查询虚构售后政策 |
| LLM Span | 查看路由、专业 Agent 和最终审核阶段的模型、耗时及 Token 用量 |

外层 LangGraph 节点名、内部路由值和工具名使用英文，以保持代码接口稳定；面向
国内用户展示的专业 Agent 名称使用中文。不同版本的 LangGraph 埋点可能将
ReAct 迭代显示为独立 Step，也可能显示为 `chain model` 和 `chain tools`，两种
形式都可以继续观察专业 LLM 和工具调用。

## 运行示例

克隆 LoongSuite Python 仓库后进入示例目录：

```bash
cd examples/ecommerce-customer-service
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

配置 OpenAI-compatible 模型。以 DashScope 为例：

```bash
export DASHSCOPE_API_KEY="your-api-key"
```

将 Span 输出到控制台并发送一个纯文字问题：

```bash
export OTEL_SERVICE_NAME="ecommerce-customer-service"
export OTEL_TRACES_EXPORTER="console"
export OTEL_METRICS_EXPORTER="none"
export OTEL_LOGS_EXPORTER="none"
export OTEL_SEMCONV_STABILITY_OPT_IN="gen_ai_latest_experimental"

loongsuite-instrument python app.py \
  --question "云步通勤鞋适合日常步行吗？42 码有货吗？"
```

省略 `--question` 后，可以在终端中连续输入中文问题。请勿把模型密钥提交到
源码仓库。

## 在线体验

访问 [AgentLoop Demo](https://sls.aliyun.com/doc/playground/agentloopdemo.html){target="_blank"}，
在左侧导航栏选择 **AI Agent 可观测**。在应用列表中找到
**ecommerce-text-support**，进入 **链路追踪** 页面，即可查看售前、售后、
工具调用和最终审核组成的 Trace。

## 隐私边界

示例中的 `P-DEMO-*` 商品、`DEMO-*` 订单和所有政策均为虚构数据，不连接真实
电商系统，也不包含任何客户账号、生产订单、项目标识、Trace ID 或内部地址。
