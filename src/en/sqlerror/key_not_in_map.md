# Key not present in map

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Key not present in map: cloud_region_id

## Error description

The specified key does not exist in the map.

## Cause

You use a map in SQL, but the specified key does not exist.

## Solution

- Check the data of the map type and make sure that the specified key exists in the map.
- If the key may not exist in the map, you can use the try function to wrap the map access to ignore the error.
  Sample code:

```SQL
SELECT try(map['name']) -- map是一个map类型列，如果该列中不存在名为'name'的key，则返回NULL
```
