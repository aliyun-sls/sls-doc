# SQL错误中心

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
| [you are using nested sql, please specify FROM LOGSTORE in the innermost sql](./innermost_sql_missing_from.md) | 嵌套子查询最内层需要from log |
| [mismatched input '*' expecting ...](./mismatched_input.md) | 输入不匹配预期字符 |
| [IN value and list items must be the same type: *varchar*](./in_value_and_list_must_be_the_same_type.md) | IN子句中的值和列表项必须是同一数据类型：varchar |
| [Unexpected parameters (*bigint*) for function *url_decode*. Expected: *url_decode(varchar(x))*](./unexpected_parameters_for_function.md) | 函数参数类型非法 |
| ['*' cannot be applied to bigint, varchar(#)](./cannot_be_applied_to_x_and_y.md) | 运算符无法应用于数据类型x和y之间 |
| [target of repeat operator is not specified](./target_of_repeat_operator_is_not_specified.md) | 重复操作符的目标未指定 |
| [extraneous input '*' expecting ...](./extraneous_input_expecting.md) | SQL多余输入x期望y |
| [Can not cast '*' to DOUBLE](./cannot_cast_to_double.md) | 类型转换错误：无法转换'*'为DOUBLE类型 |
| [Can not cast '*' to INT](./cannot_cast_to_int.md) | 类型转换错误：无法转换'*'为INT类型 |
| [NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.](./null_not_allowed_on_probe_of_semijoin.md) | 在SemiJoin运算符的探测端不允许使用NULL值 |
| [Array subscript out of bounds](./array_subscript_out_of_bounds.md) | 数组下标越界 |
| [Expression "*" is not of type ROW](./expression_is_not_of_type_row.md) | 表达式'x'不是ROW类型 |
| [identifiers must not contain '*'](./identifiers_must_not_contain.md) | 标识符不能包含特定字符 |
| [identifiers must not start with a digit; surround the identifier with double quotes](./identifiers_must_not_start_with_a_digit.md) | 标识符不能以数字开始 |
| [no viable alternative at input '*'](./no_viable_alternative.md) | 在SQL结束之前可能没有输入完 |
| [Duplicate keys (version) are not allowed](./duplicate_keys_not_allowed.md) | 不允许重复的key |
| [Key-value delimiter must appear exactly once in each entry. Bad input: '*'](./key_value_delimiter_must_appear_exactly_once_in_each_entry.md) | 每个条目中的键值分隔符必须只出现一次 |
| [Pattern has # groups. Cannot access group #](./pattern_cannot_access_group.md) | 正则匹配无法访问指定组 |
| [ts_compare must  gropu by timestamp,your grouping by type is :bigint](./ts_compare_must_group_by_timestamp.md) | ts_compare函数必须按timestamp类型分组 |
| [time # is out of specified time range](./time_out_of_range.md) | 时间戳超出了指定的时间范围 |
| [ROW comparison not supported for fields with null elements](./row_comparison_not_support_null.md) | ROW比较不支持带有null值的字段 |
| [The specified key does not exist.](./oss_access_key_not_exist.md) | OSS bucket访问失败：指定Key不存在 |
| [reading data with pagination only allow reading max #](./pagination_max_1000000_rows.md) | 分页最大行数不能超过1000000 |
| [Could not choose a best candidate operator. Explicit type casts must be added.](./could_not_choose_a_best_candidate_operator.md) | 无法选择最佳的候选操作符，必须添加显式类型转换。 |
| [Function * not registered](./function_not_registered.md) | 函数不存在 |
| [SQL array indices start at 1](./sql_array_indices_start_at_1.md) | SQL数组索引位置从1开始 |
| [Index must be greater than zero](./index_must_be_greater_than_zero.md) |  索引位置从1开始 |
| [All COALESCE operands must be the same type: *](./coalesce_operands_must_be_the_same_type.md) | COALESCE函数中的所有参数必须类型一致 |
| [Multiple columns returned by subquery are not yet supported.](./multiple_columns_returned_by_subquery_not_supported.md) | 标量查询不支持返回多个列 |
| [GROUP BY clause cannot contain aggregations or window functions](./group_by_clause_cannot_contain_aggregations_or_window_functions.md) | GROUP BY子句不能包含聚合函数或窗口函数 |
| [WHERE clause cannot contain aggregations or window functions](./where_clause_cannot_contain_aggregations_or_window_functions.md) | WHERE子句不能包含聚合函数或窗口函数 |
| [Left side of LIKE expression must evaluate to a varchar (actual: bigint)](./left_side_of_like_expression_must_evaluate_to_a_varchar.md) | LIKE表达式左侧必须为varchar类型（实际为bigint） |
| [Left side of logical expression must evaluate to a boolean (actual: varchar)](./left_side_of_logical_expression_must_evaluate_to_a_boolean.md) | 逻辑表达式左侧必须为boolean类型（实际为varchar） |
| [Right side of logical expression must evaluate to a boolean (actual: bigint)](./right_side_of_logical_expression_must_evaluate_to_a_boolean.md) | 逻辑表达式右侧必须为boolean类型（实际为bigint） |
| [Invalid JSON path: ...](./invalid_json_path.md) | 非法JSON访问路径 |
| [output rows execeed 100000 rows, please refine your sql](./output_execeed_100000_rows.md) | 输出超过100000行 |
| [max distinct num is:10, please use approx_distinct](./max_distinct_num_10.md) | 单个Query中限制最多使用10个distinct |
| [Key not present in map](./key_not_in_map.md) | Map中不存在指定key |