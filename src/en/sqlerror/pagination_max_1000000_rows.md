# reading data with pagination only allow reading max #
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> reading data with pagination only allow reading max 1000000

## 错误描述
分页最大行数不能超过1000000

## 可能原因
SLS SQL限制最大输出行数为1000000，您正在进行的分页读取请求超过了最大行数限制。

## 解决方法
- 通过LIMIT子句，限制分页读取最大行不超过1000000
- 通过缩小查询范围，限制分页读取最大行不超过1000000
- 利用SLS ScheduledSQL服务，分窗口定期进行SQL汇聚分析，然后再对汇聚结果进行二次聚合