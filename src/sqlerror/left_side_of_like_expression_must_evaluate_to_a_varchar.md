# Left side of LIKE expression must evaluate to a varchar (actual: bigint)
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Left side of LIKE expression must evaluate to a varchar (actual: bigint)

## 错误描述
LIKE表达式左侧必须为varchar类型（实际为bigint）

## 可能原因
该错误通常发生在您尝试使用LIKE运算符比较bigint数据类型与varchar数据类型时。 LIKE运算符要求表达式的两侧具有相同的数据类型。

## 解决方法
您可能需要使用CAST函数将bigint转换为varchar。  
例如：
```SQL
SELECT * FROM table WHERE CAST(bigint_column AS varchar) LIKE 'pattern'
```
这将会把bigint_column转换为varchar，然后可以使用LIKE运算符将其与指定模式进行匹配。