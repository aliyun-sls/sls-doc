# target of repeat operator is not specified

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> target of repeat operator is not specified

## Error description

The target of the repeat operator is not specified.

## Cause

This may be an error in the regular expression, which indicates that the target of the repeat operator is not specified.The repeat operator "()" is used to match zero or more occurrences of the preceding character or character group. You need to specify a target to which the repeat operator is to be applied.For example, "(a) _" is used to match zero or more occurrences of the letter "a".If no target is specified, such as "() _", the regular expression engine does not know how to apply the repeat operator and throws this error.

## Solution

You must check whether a correct target is specified for the repeat operator "()" in the regular expression. If not, specify a correct target.
