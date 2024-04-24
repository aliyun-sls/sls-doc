# logstore without index config

**ErrorCode**

> IndexConfigNotExist

**ErrorMessage**

> logstore without index config

## Error description

You are using the SQL syntax but no indexes are configured in the Logstore. At least one index must be configured in SQL.

## Cause

- No indexes are configured for the Logstore that you query.

## Solution

- Make sure that an index is configured for at least one column in the Logstore.

> SamplA built-in command line interface (CLI) is provided for you to perform self-service queries.e code:
