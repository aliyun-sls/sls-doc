# ROW comparison not supported for fields with null elements

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> ROW comparison not supported for fields with null elements

## Error description

ROW comparison is not supported for fields whose values are null.

## Cause

The SQL statement uses an operator such as "=" or "! =" to compare row elements whose values are null.

## Solution

Before the comparison, you must process the row elements whose values are null.Filter out row elements whose values are null by using an operator similar to IS NULL or IS NOT NULL, or use the COALESCE function to process the null values.You can also process row elements whose values are null at the earliest opportunity during log data writing and processing to prevent this error.
