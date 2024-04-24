# reading data with pagination only allow reading max

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> reading data with pagination only allow reading max 1000000

## Error description

The maximum number of rows per page must not exceed 1,000,000.

## Cause

Simple Logs Service SQL limits the maximum number of output rows to 1,000,000. The number of rows in the current paging request exceeds the limit.

## Solution

- You can use the LIMIT clause to limit the maximum number of rows read per page to 1,000,000.
- Narrow the query scope to limit the maximum number of rows read per page to 1,000,000.
- Use the scheduled SQL service of Simple Log Service for regular window-based SQL aggregation and analysis. Then, perform secondary aggregation on the aggregation results.
