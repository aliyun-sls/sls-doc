# SQL错误自助诊断

这里罗列了已知的用户常见错误，旨在帮助用户根据请求错误提示，排查问题所在，自助诊断和修复问题。

## 通用错误
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [logstore * does not exist](./logstore_not_exist.md) | 查询的logstore不存在 |
| [logstore without index config](./logstore_without_index.md) | 查询的logstore索引不存在 |
| [Too many queued queries](./too_many_queued_querise.md) | SQL并发查询超限 |
| [duplicate column conflicts](./duplicate_column_conflicts.md) | 索引列配置冲突 |
| [Column '*' no longer exists or type mismatch](./column_not_exists.md) | 索引列错误 |
| [key ('*') is not config as numberic column](./key_not_number.md) | 索引字段非数值型 |
| [key ('*') is not config as key value config](./key_not_config.md) | 索引字段值非配置类型 |

## 权限错误
| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [AccessKeyId is disabled](./accesskeyid_disabled.md) | AK权限不足 |
| [AccessKeyId not found](./accesskeyid_not_found.md) | AK找不到 |
| [The security token you provided has expired](./token_expired.md) | Security token已过期 |
| [denied by sts or ram](./denied_by_sts_ram.md) | STS或RAM权限不足 |

## SQL语法错误

| 案例名称                                                                                                                                       | 描述                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| [you are using nested sql](./nested_missing_logstore.md) | 嵌套子查询最内层需要from log |
| [IN value and list items must be the same type](./in_type_mismatch.md) | IN子句的类型不一致 |
| [Unexpected parameters (`x`) for function `y`](./parameter_type_mismatch.md) | 参数类型和函数不一致 |
| ['=' cannot be applied to `x`, `y`](./equal_type_mismatch.md) | 等式左右类型不一致 |
| [Can not cast '*' to DOUBLE](./cast_type_mismatch.md) | CAST类型不匹配 |
| [NULL values are not allowed on the probe side of SemiJoin operator](./semijoin_null_values.md) | SemiJoin探测表不允许为空 |
| [Key-value delimiter must appear exactly once in each entry](./delimiter_exactly_once.md) | Key-value之间分割符只出现一次 |
| [Expression "params" is not of type ROW](./expression_not_row.md) | 表达式非ROW类型 |
| [Left side of logical expression must evaluate to a `x` (actual: `y`)](./logical_expression_type_missmatch.md) | 逻辑表达式左右类型不匹配 |