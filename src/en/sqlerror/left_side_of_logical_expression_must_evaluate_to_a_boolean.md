# Left side of logical expression must evaluate to a boolean (actual: varchar)
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Left side of logical expression must evaluate to a boolean (actual: varchar)

## 错误描述
逻辑表达式左侧必须为boolean类型（实际为varchar）

## 可能原因
该错误通常发生在您尝试使用逻辑表达式时，关系运算符“=”或“!=”等右侧是boolean类型值（true或false）但左侧类型是非boolean类型，可能是varchar等其他类型。

## 解决方法
您需要检查逻辑表达式左侧的值类型，确保是boolean类型。