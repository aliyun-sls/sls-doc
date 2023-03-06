# duplicate column conflicts
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> duplicate column conflicts, [columnName:*user_agent*, aliasName:] and [columnName:*request.user-agent*, aliasName:*user_agent*]

## 错误描述
您当前查询的logstore中索引字段别名发生冲突，SQL无法确定您想要分析的具体列

## 可能原因
- 该Logstore中某列名与某列的别名完全一样（如上述ErrorMessage中列user_agent与request.user-agent的别名完全一样，发生冲突）

## 解决方法
- 检查您需要查询的目标Logstore的索引列字段，确保命名没有冲突

> 内嵌cli提供用户自助查询