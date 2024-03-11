# Can not cast '*' to DOUBLE
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Can not cast 'name' to DOUBLE

## 错误描述
类型转换错误：无法转换'*'为DOUBLE类型。

## 可能原因
name列可能并非数值类型，而SQL中可能将该列作为DOUBLE类型使用。

## 解决方法
可以使用CAST函数将一个变量转换为另一个变量类型。