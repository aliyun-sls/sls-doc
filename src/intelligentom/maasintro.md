# 日志服务 SLS – 基础模型能力

## 功能介绍
在智能运维这个场景中，SLS针对Log、Metric、Trace这三类基础数据的特点，以及围绕这三类数据的高频场景进行建模

+ 时序预测
+ 时序异常检测
+ 时序片段异常形态分类
+ 文本数据中的实体识别（NER）
+ Trace调用链中的高延时Span识别

并对这些模型服务化，供客户可以远程调用。跟自己的业务系统进行API维度的能力集成。

### Metric 模型能力

在提供的数据中，可以使用如下SQL，提取相关的指标数据，当数据点数据量大于100个点时就可以主动触发该序列的异常检测。
```
* and endpoint: "cn-chengdu.192.168.11.202" | select __time__ - __time__ % 60 as time, sum(flow) as flow_sum from log group by time order by time limit 10000
```

:::tip 时序指标异常检测
[试用 Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/eip-flow-monitor){target="_blank"}
:::

### LogNER 模型能力

样例日志一：
```
{
    "source":"Hadoop",
    "content":"Address change detected. Old: msra-sa-41/10.190.173.170:8030 New: msra-sa-41:8030",
}
```

:::tip 标准软件库NER
[试用 Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/open-logs){target="_blank"}
:::


样例日志二：
```
{
    "source":"hibernate-orm",
    "content":"Unable to resolve connection default schema IOException"
}
```

:::tip 标准软件库NER
[试用 Demo](/playground/demo.html?dest=/lognext/project/maas-demo/logsearch/open-library-logs){target="_blank"}
:::

## 功能优势
- 在机器数据领域收集并整理了大量的真实数据，进行建模
- 相关模型在日志领域可以做到开箱即用，无需特别多的启动数据
- 在平台上提供了基础的API能力，客户在在自己的业务场景中进行集成


## 核心价值
- 智能异常分析应用围绕运维场景中的监控指标、程序日志、服务关系等核心要素展开，通过机器学习等手段产生异常事件，通过服务拓扑关联分析时序数据和事件，最终降低企业的运维复杂度，提高服务质量。


