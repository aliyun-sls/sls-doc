# ts_compare must gropu by timestamp,your grouping by type is :bigint

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> ts_compare must gropu by timestamp,your grouping by type is :bigint

## Error description

The ts_compare function must group data by timestamp.

## Cause

When you use the ts_compare function in SQL, the columns in the GROUP BY clause may be of the NUMERIC type or another type except TIMESTAMP.

## Solution

Make sure that the columns in the GROUP BY clause corresponding to the ts_compare function are of the TIMESTAMP type. You can use a function such as from_unittime to convert the columns from INTEGER to TIMESTAMP.
