# GROUP BY clause cannot contain aggregations or window functions: *
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> GROUP BY clause cannot contain aggregations or window functions: ["count"(*)]

## 错误描述
GROUP BY子句不能包含聚合函数或窗口函数

## 可能原因
在GROUP BY子句中包含聚合函数或窗口函数

## 解决方法
请在GROUP BY子句中只包含列名，而不是聚合函数或窗口函数。聚合函数和窗口函数应该在SELECT语句中使用，而不是在GROUP BY子句中使用。如果您需要在GROUP BY子句中使用聚合函数，则可以使用列的别名或数字索引来代替聚合函数。  
例如，使用以下查询：
```SQL
SELECT column1, column2, COUNT(column3) as count_column3
FROM table
GROUP BY column1, column2, 3
```
在这个查询中，count_column3 是 COUNT(column3) 的别名，3 是 COUNT(column3) 在SELECT语句中的位置。请注意，使用数字索引可能会使代码难以理解，建议使用列别名。