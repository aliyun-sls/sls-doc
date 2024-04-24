# you are using nested sql, please specify FROM LOGSTORE in the innermost sql

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> you are using nested sql, please specify FROM LOGSTORE in the innermost sql

## Error description

You must specify the table name in the innermost subquery when you use nested subqueries in SQL.

## Cause

To simplify single-table queries, Simple Log Service specifies the current Logstore as the table from which data is to be queried by default.For example, the current Logstore is named test. The following three query statements have the same meaning:

> - search | SELECT colname
> - search | SELECT colname FROM log
> - search | SELECT colname FROM test

In the first statement, you do not need to specify the FROM clause.
In the second statement, you can use FROM log to specify the current Logstore.
In the third statement, you can explicitly specify the table named Logstore test as the table from which data is to be queried.

但当您进行包含子查询的复杂查询时，SLS 无法为您推断各子查询中目标表，所以您必须在子查询中手动指定 FROM 子句。

## Solution

- However, when you perform a complex query that contains subqueries, Simple Log Service cannot infer the target table in each subquery. Therefore, you must manually specify the FROM clause in each subquery.If you want to query data from the current Logstore, you can directly use the FROM log constant string to specify the current Logstore as the table from which data is to be queried.
- You can also explicitly specify the name of the Logstore from which data is to be queried.
