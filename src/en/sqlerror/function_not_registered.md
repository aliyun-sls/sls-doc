# Function \* not registered

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Function wm_concat not registered

## Error description

The specified function does not exist.

## Cause

The specified function does not exist in the SQL system of Simple Log Service. Possible causes:

- The function that you specify is provided by a specific database vendor and is not a standard SQL function. The function is not supported by the SQL system of Simple Log Service.
- The specified function name contains a spelling error.

## Solution

Check the function name and make sure that the function is a valid function provided by the SQL system of Simple Log Service.
