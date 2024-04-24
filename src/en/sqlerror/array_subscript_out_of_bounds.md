# Array subscript out of bounds

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Array subscript out of bounds

## Error description

The array subscript is out of bounds.

## Cause

The index of an element that you want to access in an array is out of bounds.For example, the index is a negative number or exceeds the array length.This may be caused by incorrect SQL logic or a data input error.

## Solution

The array index in SQL starts from 1. Check the valid array length in SQL and the reference of the array index, and make sure that the array subscript is not out of bounds.
