# identifiers must not start with a digit; surround the identifier with double quotes

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> identifiers must not start with a digit; surround the identifier with double quotes

## Error description

An identifier must not start with a digit. If an identifier needs to start with a digit, enclose the digit in double quotation marks (").

## Cause

The SQL statement uses an identifier such as a column name, table name, or AS alias that starts with a digit.

## Solution

Enclose the identifier in double quotation marks ("). Example: "1_column" or "1_table".
