# Could not choose a best candidate operator. Explicit type casts must be added.

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Could not choose a best candidate operator. Explicit type casts must be added.

## Error description

The system fails to select the best candidate operator. Explicit type conversion must be added.

## Cause

Generally, this error occurs when you attempt to perform arithmetic or comparison operations on variables of different types but the system cannot automatically determine the operator type to use.

## Solution

You must add explicit type conversion to inform the system of the operator type to use.
For example, if you want to add a variable of the STRING type to another variable of an integer type, you can use the CAST function to convert the STRING variable to an integer type before the add operation is performed.示 Sample code:

```SQL
SELECT CAST('10' AS INTEGER) + 5;
```

The sample code uses the CAST function to convert the string 10 to an integer, and then adds the converted integer to the integer 5.This method prevents the previously mentioned error.
