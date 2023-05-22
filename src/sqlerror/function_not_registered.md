# Function * not registered
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Function wm_concat not registered

## 错误描述
函数不存在

## 可能原因
您指定的函数在SLS SQL系统中不存在，这可能是以下情况：
- 您使用了某数据库厂商的特定函数，其并非标准SQL函数，在SLS SQL系统并未提供
- 您拼写错了函数名称

## 解决方法
请检查函数名称，确认是SLS SQL提供的有效函数。