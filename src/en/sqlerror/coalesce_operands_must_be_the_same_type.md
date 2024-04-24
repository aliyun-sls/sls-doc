# All COALESCE operands must be the same type: \*

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> All COALESCE operands must be the same type: boolean

## Error description

All parameters in the COALESCE function must be of the same type.

## Cause

In the COALESCE function, all operands must be of the same data type to prevent data type errors.The current error indicates that at least one of the operands is of the BOOLEAN type, which conflicts with other operands that may be numbers or strings.

## Solution

Make sure that all operands in the COALESCE function are of the same data type.If the operands are of different data types, convert the operands to the same data type.You can use the CAST function to perform data type conversion.
