# Multiple columns returned by subquery are not yet supported.

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Multiple columns returned by subquery are not yet supported. Found 2

## Error description

Scalar queries are not allowed to return multiple columns.

## Cause

The system selects multiple columns in a subquery.

## Solution

Make sure that each subquery returns only one column or one value. You can modify the subquery or the main query.You can also replace the subquery with the JOIN statement to retrieve the required data.
