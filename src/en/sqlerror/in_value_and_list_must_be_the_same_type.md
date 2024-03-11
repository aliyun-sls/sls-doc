# IN value and list items must be the same type: varchar
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> IN value and list items must be the same type: varchar

## 错误描述
SQL语句中存在语法错误，IN子句中的值和列表项必须是同一数据类型：varchar。

## 可能原因
在使用IN操作符进行查询时，提供的值和列表项数据类型不一致，例如值为varchar类型，列表项为整数类型。

## 解决方法
确保IN操作符中提供的值和列表项数据类型一致。可以使用CAST或CONVERT函数将数据类型进行转换，或者将值和列表项都转换为相同的数据类型后再进行查询。另外，建议在写入日志时，对应的列字段应该使用相同的数据类型来避免类似的错误。