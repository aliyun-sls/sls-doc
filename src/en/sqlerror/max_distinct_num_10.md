# max distinct num is:10, please use approx_distinct

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> max distinct num is:10, please use approx_distinct

## Error description

A single query can contain a maximum of 10 DISTINCT keywords.

## Cause

You use more than 10 DISTINCT keywords in the SQL statement.

## Solution

- Reduce the number of DISTINCT keywords in the SQL statement to 10 or less.
- Replace distinct with approx_distinct.
