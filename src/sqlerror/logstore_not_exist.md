# logstore * does not exist
**ErrorCode**
> LogStoreNotExist

**ErrorMessage**
> logstore *internal-log* does not exist

## 错误描述
您当前查询的logstore在当前地域当前Project下不存在

## 可能原因
- 该Logstore已被删除
- 该Logstore本身就不存在，可能在其他Project下
- 该Logstore本身就不存在，可能在其他Region下

## 解决方法
- 检查您需要查询的目标Logstore，并确定其存在

> 内嵌cli提供用户自助查询