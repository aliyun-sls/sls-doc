# Can not cast '*' to INT
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Can not cast 'name' to INT

## 错误描述
类型转换错误：无法转换'*'为INT类型。

## 可能原因
name列可能并非数值类型，而SQL中可能将该列作为INT类型使用。

## 解决方法
可以使用CAST函数将一个变量转换为另一个变量类型。