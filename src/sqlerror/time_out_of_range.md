# time # is out of specified time range 
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> time 1682438400000 is out of specified time range 

## 错误描述
时间戳超出了指定的时间范围

## 可能原因
在SQL语句中使用了超出指定时间范围的时间戳，可能是由于数据录入错误或者数据类型不匹配导致的。

## 解决方法
检查时间戳是否正确，如果是由于数据类型不匹配导致的，可以尝试使用相关的数据类型转换函数将时间戳转换为正确的数据类型。