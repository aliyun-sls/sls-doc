# duplicate column conflicts

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> duplicate column conflicts, [columnName:*user_agent*, aliasName:] and [columnName:*request.user-agent*, aliasName:*user_agent*]

## Error description

An index field alias conflict occurs in the Logstore that you query. The SQL system cannot determine the specific column that you want to analyze.

## Cause

- In the Logstore, the name of a column is the same as the alias of another column. For example, in the preceding error message, the name of the user_agent column is the same as the alias of the request.user-agent column, which causes a conflict.

## Solution

- Make sure that the name of each index field is unique in the Logstore that you query.

> SamplA built-in command line interface (CLI) is provided for you to perform self-service queries.e code:
