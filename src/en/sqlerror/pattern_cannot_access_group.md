# Pattern has # groups. Cannot access group

**ErrorCode**

> ParameterInvalid

**ErrorMessage**

> Pattern has 0 groups. Cannot access group 1

## Error description

The regular expression cannot access the specified group.

## Cause

The regular expression matches zero groups and the first group is inaccessible.
The grouping syntax may be used in the regular expression, but no groups are defined.

## Solution

检查正则表达式中的分组语法，并确保至少有一个分组定义在模式中。可以使用圆括号 () 来定义分组。例如，要匹配一个字符串中的电子邮件地址，并将用户名和域名分别作为分组，请使用以下正则表达式：(w+)@(w+.w+)。在这个例子中，有两个分组，因此可以用 group(1) 和 group(2) 来访问分组的值。如果不需要分组，可以使用非捕获分组 (?:)，Sample code:(?:w+)@(?:w+.w+)。  
如果问题依然存在，可以使用在线正则检查器进行在线调试，待验证无误后再填充到 SQL 中。
