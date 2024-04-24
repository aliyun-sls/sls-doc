# Can not cast '\*' to DOUBLE

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Can not cast 'name' to DOUBLE

## Error description

Type conversion error: The asterisk (\*) fails to be converted to the DOUBLE type.

## Cause

An element in the name column may not be of the NUMERIC type, but this column may be used as the DOUBLE type in SQL.

## Solution

You can use the CAST function to convert a variable from one type to another.
