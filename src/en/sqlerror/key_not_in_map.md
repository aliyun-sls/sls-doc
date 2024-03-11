# Key not present in map
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> Key not present in map: cloud_region_id

## 错误描述
Map中不存在指定key

## 可能原因
您在SQL中使用了map类型，并指定了一个不存在的key

## 解决方法
- 检查map类型数据，确认您指定的key在map中存在
- 如果map类型数据中有可能不存在该key，你可以使用try函数将map访问包裹，以忽略该错误  
例如：
```SQL
SELECT try(map['name']) -- map是一个map类型列，如果该列中不存在名为'name'的key，则返回NULL
```