# Left side of LIKE expression must evaluate to a varchar (actual: bigint)

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Left side of LIKE expression must evaluate to a varchar (actual: bigint)

## Error description

The LIKE expression expects VARCHAR on the left side, but gets BIGINT instead.

## Cause

Generally, this error occurs when you attempt to use the LIKE operator to compare data of the BIGINT and VARCHAR types.The LIKE operator requires that data on both sides of the expression is of the same type.

## Solution

You can use the CAST function to convert the data type from BIGINT to VARCHAR. 
Sample code:

```SQL
SELECT * FROM table WHERE CAST(bigint_column AS varchar) LIKE 'pattern'
```

The sample code converts a BIGINT column to VARCHAR, and then uses the LIKE operator to match the data with the specified pattern.
