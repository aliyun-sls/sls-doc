# Expression "*" is not of type ROW
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Expression "fields" is not of type ROW

## 错误描述
表达式'fields'不是ROW类型。

## 可能原因
在使用ROW类型时，表达式“fields”不符合ROW类型的要求。可能是因为在使用ROW函数时，参数不符合要求。 

## 解决方法
请检查ROW函数的参数是否正确，并且参数中所有的字段是否存在且符合要求。如果参数正确，但结果仍然不是ROW类型，可以尝试使用CAST函数将其转换为ROW类型。