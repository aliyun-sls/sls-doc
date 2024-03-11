# identifiers must not start with a digit; surround the identifier with double quotes
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> identifiers must not start with a digit; surround the identifier with double quotes

## 错误描述
标识符不能以数字开头，如果一定要以数字开始，需要用双引号括起来

## 可能原因
在SQL语句中使用了以数字开头的标识符，例如列名或者表名或者AS别名。

## 解决方法
将标识符用双引号括起来，例如"1_column"或者"1_table"。