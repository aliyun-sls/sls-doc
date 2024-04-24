# column \* no longer exists

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Column '_duration_' no longer exists or type mismatch;please add the column in the index attribute

## Error description

The duration column does not exist in the Logstore that you query.

## Cause

- The duration column is not created in the Logstore.
- The duration column is recently created in the Logstore, but the metadata is not yet synchronized. The synchronization is complete within 1 minute. Wait a moment.
  ![图 1](/img/src/sqlerror/column_not_exists/9a50a4a42aed9807dbfe8a5942fd2cd372402d2f42b3c7ea39c6bc8b05118440.png)
- - The duration column is recently created in the Logstore, but the metadata is not yet synchronized. The synchronization is complete within 1 minute. Wait a moment.

- The specified column name may contain a spelling error.

## Solution

- Verify the accuracy of the specified column name and check for any spelling errors.
- Make sure that an index field is created for the duration column and statistical analysis is enabled in the Logstore that you query. Wait a moment and try again.

> A built-in command line interface (CLI) is provided for you to perform self-service queries.
