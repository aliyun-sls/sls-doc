# key (\*) is not config as numberic column

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> key (_HttpCode_) is not config as numberic column

## Error description

The column, such as HttpCode, specified in the current query is not of the NUMERIC type.

## Cause

- The type of the column is not correctly configured for the Logstore. For example, the type should be NUMERIC but is configured as TEXT.
- A numeric function is incorrectly applied to the text columns in the SQL analysis statement.

## Solution

- Check whether the type (NUMERIC or TEXT) of the column in the Logstore is as expected.
- If the specified column should be of the TEXT type, check whether the analysis function used in the SQL statement is correct.

> SamplA built-in command line interface (CLI) is provided for you to perform self-service queries.e code:
