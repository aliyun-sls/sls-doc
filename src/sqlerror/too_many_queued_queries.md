# Too many queued queries
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Too many queued queries

## 错误描述
您当前Project下的SQL并发请求超过并发上限（普通SQL15，增强SQL150）。

## 原理解释
*SLS SQL并发*
SLS SQL并发配额是用户Project级别隔离，同一个Project中的多个SQL请求提交到SLS服务端，当SQL正在执行中，将占用一个SQL并发配额；当SQL执行完成，将归还本次分配的SQL并发配额。
用户一个Project的SQL并发配额，执行普通SQL模式时为15，执行增强SQL模式时为150。

## 可能原因
- 您的并发请求数过高
- 您单次请求SQL的延时较高
- 您的业务代码中SQL请求异常重试逻辑导致的大量循环重试

## 解决方法
- 降低请求量
- 优化SQL，减低单次SQL的执行延时
- 重试逻辑增加随机等待时间，避免无效重复的循环重试，导致额外并发请求压力的增加

> 内嵌cli提供用户自助查询