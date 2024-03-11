# max distinct num is:10, please use approx_distinct
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> max distinct num is:10, please use approx_distinct

## 错误描述
单个Query中限制最多使用10个distinct

## 可能原因
您在SQL中使用了超过10个distinct计算

## 解决方法
- 减少SQL中使用的distinct数量到10个以下
- 使用approx_distinct替换distinct