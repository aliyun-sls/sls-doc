# Multiple columns returned by subquery are not yet supported.
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Multiple columns returned by subquery are not yet supported. Found 2

## 错误描述
标量查询不支持返回多个列

## 可能原因
在子查询中SELECT了多个列

## 解决方法
确保子查询只返回一个列或一个值，可以修改子查询或者修改主查询。另外，还可以尝试使用JOIN语句代替子查询来检索所需的数据。