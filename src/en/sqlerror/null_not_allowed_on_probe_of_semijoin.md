# NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.

## 错误描述
NULL值不允许出现在半连接（SemiJoin）的探测端。

## 可能原因
在半连接中，探测端不能出现非NULL值，否则半连接无法正确执行。可能是查询运行时的probe表中某行记录或子查询返回了NULL值。

## 解决方法
请检查查询计划以确定哪个表返回了NULL值。如果涉及到子查询，请确保其子查询返回的结果集不包含 NULL 值。如果是外部表中的NULL值导致了问题，可以考虑使用 INNER JOIN 替代半连接，或使用 COALESCE 或 ISNULL函数来处理NULL值。