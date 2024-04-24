# WHERE BY clause cannot contain aggregations or window functions: \*

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> WHERE clause cannot contain aggregations or window functions: ["sum"("delta")]

## Error description

The WHERE clause must not contain aggregate or window functions.

## Cause

The WHERE clause contains aggregate or window functions.

## Solution

Make sure that the WHERE clause contains only column names, without aggregate or window functions.Aggregate and window functions can be used in a SELECT statement, but not the WHERE clause.If you want to use an aggregate function in the WHERE clause, you can use a column alias instead.
Sample code:

```SQL
SELECT column1, column2, COUNT(column3) as count_column3
FROM table
WHERE count_column3 > 10
```

In the preceding query statement, count_column3 is the alias of COUNT(column3), which represents the aggregate count result of column 3.
