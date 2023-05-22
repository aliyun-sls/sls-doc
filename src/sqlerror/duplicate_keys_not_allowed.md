# Duplicate keys (version) are not allowed
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Duplicate keys (version) are not allowed

## 错误描述
不允许重复的key

## 可能原因
在logstore中可能存在重复的version列，这可能是起初在创建列索引字段时进行了错误的配置。

## 解决方法
请检查logstore中的列索引字段version，并决定取用正确的类型，其余删除以适当修正。