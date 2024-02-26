# All COALESCE operands must be the same type: *
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> All COALESCE operands must be the same type: boolean

## 错误描述
COALESCE函数中的所有参数必须类型一致

## 可能原因
在COALESCE函数中，操作数必须具有相同的数据类型，否则会出现数据类型错误。在此错误中，操作数中至少有一个是布尔类型，而其他操作数则具有不同的数据类型，例如数字、字符串等。

## 解决方法
请检查COALESCE函数中的每个操作数，并确保它们具有相同的数据类型。如果数据类型不同，请进行数据类型转换，以使它们具有相同的数据类型。可以使用CAST函数执行数据类型转换。