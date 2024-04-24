# Expression "\*" is not of type ROW

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Expression "fields" is not of type ROW

## Error description

The fields expression is not of the ROW type.

## Cause

The fields expression does not meet the requirements for using the ROW type.This may be caused by invalid parameters in the ROW function.

## Solution

Check whether the parameters in the ROW function are correct and whether all fields in the parameters exist and meet the requirements.If a parameter is correct but is not of the ROW type, you can use the CAST function to convert the parameter to the ROW type.
