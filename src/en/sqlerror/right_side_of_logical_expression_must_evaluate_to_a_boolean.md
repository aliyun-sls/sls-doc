# Right side of logical expression must evaluate to a boolean (actual: bigint)

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Right side of logical expression must evaluate to a boolean (actual: bigint)

## Error description

The logical expression expects BOOLEAN on the right side, but gets BIGINT instead.

## Cause

Generally, this error occurs when the variable type on the right side of the logical expression that you use is not BOOLEAN.

## Solution

Make sure that the value type on the right side of the logical expression is BOOLEAN.
