# WHERE BY clause cannot contain aggregations or window functions: *
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> WHERE clause cannot contain aggregations or window functions: ["sum"("delta")]

## 错误描述
WHERE子句不能包含聚合函数或窗口函数

## 可能原因
在WHERE子句中包含聚合函数或窗口函数

## 解决方法
请在WHERE子句中只包含列名，而不是聚合函数或窗口函数。聚合函数和窗口函数应该在SELECT语句中使用，而不是在WHERE子句中使用。如果您需要在WHERE子句中使用聚合函数，则可以使用列的别名来代替聚合函数。  
例如，使用以下查询：
```SQL
SELECT column1, column2, COUNT(column3) as count_column3
FROM table
WHERE count_column3 > 10
```
在这个查询中，count_column3 是 COUNT(column3) 的别名，它代表column3的聚合计数结果。