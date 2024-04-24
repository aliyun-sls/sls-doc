# GROUP BY clause cannot contain aggregations or window functions: \*

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> GROUP BY clause cannot contain aggregations or window functions: ["count"(*)]

## Error description

The GROUP BY clause must not contain aggregate or window functions.

## Cause

The GROUP BY clause contains aggregate or window functions.

## Solution

Make sure that the GROUP BY clause contains only column names, without aggregate or window functions.Aggregate and window functions can be used in a SELECT statement, but not the GROUP BY clause.If you want to use an aggregate function in the GROUP BY clause, you can use a column alias or ordinal position instead.
Sample code:

```SQL
SELECT column1, column2, COUNT(column3) as count_column3
FROM table
GROUP BY column1, column2, 3
```

In the preceding query statement, count_column3 is the alias of COUNT(column3), and 3 specifies the position of COUNT(column3) in the SELECT statement.Note: Using ordinal positions may make the code difficult to understand. We recommend that you use column aliases.
