# identifiers must not contain ':'
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> identifiers must not contain ':'

## 错误描述
标识符不能包含':'

## 可能原因
在标识符中使用了“:”字符，例如在表名、列名、变量名等标识符中使用“:”。

## 解决方法
- 请修正标识符，将其中的“:”替换为合法的字符，例如使用字母、数字、下划线等。
- 如果必须使用“:”作为标识符的一部分，可以尝试使用引号将其包括起来，例如使用双引号""将标识符包括起来。