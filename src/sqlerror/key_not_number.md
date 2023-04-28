# key (*) is not config as numberic column
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> key (*HttpCode*) is not config as numberic column

## 错误描述
您当前查询中指定的列（如上述HttpCode）不是数值类型

## 可能原因
- 该Logstore中列字段的类型未配置正确（如应该是数值类型，但却配置了文本类型）
- 分析SQL中对文本列错误地使用了数值函数

## 解决方法
- 检查Logstore中列字段的类型是否符合预期（数值类型还是文本类型？）
- 如果指定列确实应该是文本类型，检查SQL中是否用错了分析函数

> 内嵌cli提供用户自助查询