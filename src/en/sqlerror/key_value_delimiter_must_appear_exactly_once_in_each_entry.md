# Key-value delimiter must appear exactly once in each entry. Bad input: '\*'

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Key-value delimiter must appear exactly once in each entry. Bad input: 'label_oxford_gaodun_c'

## Error description

The key-value delimiter must appear only once in each entry.

## Cause

The delimiter appears more than once or does not appear in an input key-value pair. As a result, the system cannot parse the key-value pair.

## Solution

Check whether the format of the key-value pair is correct. Make sure that each key-value pair contains only one delimiter, and the key and value on both sides of the delimiter are correct.If the error persists, consider using a more rigorous data format or check the documentation for help.You can also troubleshoot the error by checking the code context before and after the error prompt. If the error persists, submit a ticket to Simple Log Service for assistance.
