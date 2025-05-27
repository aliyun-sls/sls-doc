# 日志服务 SLS - SPL/SQL里的机器学习算子

## 总体介绍
- get_log_patterns
- series_drilldown/series-drilldown指令
- series_pattern_anomalies
- series_decompose_anomalies
- series_forecast
- cluster
- series_plot
- series_describe
- correlation 
- diff_log_patterns
- diff_patterns 
- http-call 

### get_log_patterns
用于日志模板提取。它基于日志的文本特征，利用机器学习算法对日志数据进行聚类分析，识别典型的日志模板。该函数常用于日志模式识别、日志异常发现等场景。
使用限制
* 最大处理1w条日志数据。如果输入的日志数量超过了1w条，将随机处理其中的1w条日志；未被处理的日志的分析结果为 null

:::tip 日志模板提取
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747819760634-597050){target="_blank"}
:::

### series_drilldown/series-drilldown指令
异常下探函数。通过触发异常时间前的少量数据点，分析在异常触发时间时各种维度组合的异常情况。

:::tip 异常下探分析
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747905006268-991582){target="_blank"}
:::

### series_pattern_anomalies
基于神经网络的异常检测算法。

:::tip 时序模式异常检测
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747905246979-141136){target="_blank"}
:::

### series_decompose_anomalies
对指标进行基于时间序列分解的异常检测算法。

:::tip 时序分解异常检测
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747905246979-141136){target="_blank"}
:::

### series_forecast
预测某个指标接下来一段时间的数据。

:::tip 时序预测
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747912152509-313834){target="_blank"}
:::

### cluster
对于给定的N个向量（或者时间序列），需要快速的查看下向量或者指标的形态，可以使用聚类函数进行快速的分组分析。

:::tip 聚类分析
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747905028645-534376?token=n_clusters%253A3){target="_blank"}
:::

### series_plot
对时序画图

:::tip 时序可视化
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747977930680-599974){target="_blank"}
:::

### series_describe
对于给定的一个时间序列，该函数会对该序列从多个维度进行分析，返回相关的结果。其中多个维度具体如下：
* 数据是否连续、数据的缺失情况
* 序列是否是稳定的
* 序列是否是有周期的，周期是多少
* 序列是否有显著的趋势

:::tip 时序统计描述
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747967286277-446474){target="_blank"}
:::

### correlation
计算两个对象的相似度。如果两个对象都是一个向量，返回的是两个序列的相似度。如果一个对象是一组向量，另一个对象是一个向量，返回的是这一组向量里面的每个向量和另一个向量的相似度。如果两个对象都是一组向量，返回的是两两向量之间相似度的矩阵。

:::tip 相关性分析
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1748008573160-227373){target="_blank"}
:::

### diff_log_patterns
该函数用于比较两组日志在日志模板上的差异，通过日志的文本特征和机器学习算法进行聚类分析与模板差异对比，识别变化显著的日志模板，常应用于日志异常发现等场景。

:::tip 日志模式差异分析
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1747965715426-625078){target="_blank"}
:::

### diff_patterns
diff_pattern 函数用于比较两个具有相同结构的数据集，并找出表征这两个数据集之间差异的离散属性（维度）模式。
diffpatterns 的开发初衷是为了帮助分析故障（例如，通过比较给定时间范围内的故障与非故障情况），但它也可能找到任何两个具有相同结构的数据集之间的差异。

:::tip 模式差异分析
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/ml-spl-demo/dashboard/dashboard-1748008020004-564768){target="_blank"}
:::

### http-call
调用外部 http 服务。

:::tip HTTP 调用
[试用 Demo](/doc/playground/demo.html?dest=/lognext/project/embedding-benchmark-cn-heyuan-public/dashboard/dashboard-1748238241785-859679){target="_blank"}
:::
