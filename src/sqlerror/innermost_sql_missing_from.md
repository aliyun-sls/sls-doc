# you are using nested sql, please specify FROM LOGSTORE in the innermost sql
**ErrorCode**
> ParameterInvalid

**ErrorMessage**
> you are using nested sql, please specify FROM LOGSTORE in the innermost sql

## 错误描述
您正在SQL中使用嵌套子查询，请在最内层的子查询中指定表名。

## 可能原因
SLS为了简化用户查询，在进行单表查询时，默认指定当前所在Logstore为From所在表。假设您当前Logstore名为test，那么，以下3个查询语句是同义的：
> - search | SELECT colname
> - search | SELECT colname FROM log
> - search | SELECT colname FROM test

第1条语句，您可以不指定FROM子句；  
第2条语句，您也可以使用FROM log，这将指定当前所在Logstore；  
第3条语句，您当然也可以显示指定您查询的表为Logstore test。  

但当您进行包含子查询的复杂查询时，SLS无法为您推断各子查询中目标表，所以您必须在子查询中手动指定FROM子句。

## 解决方法
- 如果您想查询当前Logstore，您可以直接使用"FROM log"常量字符串指定From表为当前Logstore。
- 当然您也可以显示指定您要查询的目标Logstore名字。
