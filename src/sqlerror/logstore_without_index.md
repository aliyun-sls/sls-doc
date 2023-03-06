# logstore without index config
**ErrorCode**
> IndexConfigNotExist

**ErrorMessage**
> logstore without index config

## 错误描述
您当前正在使用SQL语法，而Logstore并没有配置索引，使用SQL必须至少配置任一索引。

## 可能原因
- 您当前查询的目标Logstore没有配置索引

## 解决方法
- 检查您需要查询的目标Logstore，并确定已开启索引配置（至少一列）

> 内嵌cli提供用户自助查询