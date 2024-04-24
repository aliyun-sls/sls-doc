# '\*' cannot be applied to bigint, varchar(#)

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> '=' cannot be applied to bigint, varchar(1)

## Error description

The "=" operator fails to be applied between variables of the BIGINT and VARCHAR(1) types.

## Cause

An error occurs when the system attempts to apply the "=" operator to compare a variable of the BIGINT type with another variable of the VARCHAR(1) type.

## Solution

Convert the two variables to compatible types.You can use the CAST function to convert a variable from one type to another.
Sample code:

```SQL
SELECT CAST(123, varchar(3)) = 123

```
