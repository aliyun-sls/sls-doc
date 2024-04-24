# output rows execeed 100000 rows, please refine your sql

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> output rows execeed 100000 rows, please refine your sql

## Error description

The number of output rows exceeds the maximum limit of 100,000.

## Cause

This error may occur when you download the analysis results and the number of output rows exceeds the maximum limit of 100,000.

## Solution

- You can use the LIMIT clause to limit the maximum number of rows read per page to 100,000.
- Narrow the query scope to limit the maximum number of rows read per page to 100,000.
- Use the scheduled SQL service of Simple Log Service for regular window-based SQL aggregation and analysis. This service automatically exports the analysis results to a new Logstore. Then, you can directly consume or pull all data in the Logstore.
