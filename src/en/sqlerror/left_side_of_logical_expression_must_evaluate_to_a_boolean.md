# Left side of logical expression must evaluate to a boolean (actual: varchar)

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Left side of logical expression must evaluate to a boolean (actual: varchar)

## Error description

The logical expression expects BOOLEAN on the left side, but gets VARCHAR instead.

## Cause

Generally, this error occurs when the variable type on the right side of a relational operator such as "=" or "!=" in the logical expression that you use is BOOLEAN (true or false) but the variable type on the left side is VARCHAR or another type.

## Solution

您需要检查逻辑表达式左侧的值类型，确保是 boolean 类型。
