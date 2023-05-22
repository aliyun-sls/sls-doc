# '*' cannot be applied to bigint, varchar(#)
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> '=' cannot be applied to bigint, varchar(1)

## 错误描述
无法将“=”运算符应用于bigint和varchar(1)类型的数据之间。

## 可能原因
尝试将一个bigint类型变量与一个varchar(1)类型变量进行“=”运算符比较时，发生了错误。  

## 解决方法
将变量类型进行转换，使它们的类型相匹配，才能进行比较。可以使用CAST函数将一个变量转换为另一个变量类型。
例如：
```SQL
SELECT CAST(123, varchar(3)) = 123 -- 使用CAST函数将bigint类型参数转换为字符串类型

```