# time # is out of specified time range

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> time 1682438400000 is out of specified time range

## Error description

The timestamp is out of the specified time range.

## Cause

The SQL statement uses a timestamp that is out of the specified time range. This may be caused by a data input error or data type mismatch.

## Solution

Check whether the timestamp is correct. If the invalid timestamp is caused by a data type mismatch, you can use the relevant data type conversion function to convert the timestamp to the correct data type.
