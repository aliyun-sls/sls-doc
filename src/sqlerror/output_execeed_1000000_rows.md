# output rows execeed 100000 rows, please refine your sql
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> output rows execeed 100000 rows, please refine your sql

## 错误描述
输出超过最大限制100000行

## 可能原因
这可能发生在分析结果下载中，当前最大行限制100000。

## 解决方法
- 通过LIMIT子句，限制分页读取最大行不超过100000
- 通过缩小查询范围，限制分页读取最大行不超过100000
- 利用SLS ScheduledSQL服务，分窗口定期进行SQL汇聚分析，这可以将分析结果自动导出到一个新的目标logstore中，然后您可以直接消费或拉取目标logstore中的全部数据