# IN value and list items must be the same type: varchar

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> IN value and list items must be the same type: varchar

## Error description

The SQL statement has a syntax error. The values in the IN clause and the list items must be of the same data type VARCHAR.

## Cause

When you use the IN operator to perform a query, the values in the IN clause and the list items are of different data types. For example, the values in the IN clause are of the VARCHAR type, whereas the list items are of an integer type.

## Solution

Make sure that the values in the IN clause and the list items are of the same data type.Before you perform a query, you can use the CAST or CONVERT function to convert data types, or convert the values in the IN clause and the list items to the same data type.In addition, we recommend that you use the same data type for each column written to logs to prevent similar errors.
