# ROW comparison not supported for fields with null elements 
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> ROW comparison not supported for fields with null elements

## 错误描述
ROW比较不支持带有null值的字段

## 可能原因
在SQL语句中使用了包含NULL值元素的ROW类型比较操作，例如使用”=“或”!=“运算符进行比较。

## 解决方法
在进行行比较之前，需要先对包含NULL元素的ROW进行处理。可以使用类似IS NULL或者IS NOT NULL的操作符将NULL值筛选出来，或者使用COALESCE函数对NULL值进行处理。另外，也可以在日志数据写入和处理过程时，尽早对包含NULL元素的行进行处理，避免出现以上错误。