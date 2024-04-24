# SQL error center

This topic lists known common errors to help you locate, diagnose, and fix errors based on the error message.

## Common errors

| Error message                                                           | Description                                                   |
| ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| [logstore \* does not exist](./logstore_not_exist.md)                   | The Logstore that you query does not exist.                   |
| [logstore without index config](./logstore_without_index.md)            | No indexes are configured for the Logstore that you query.    |
| [Too many queued queries](./too_many_queued_querise.md)                 | The number of concurrent SQL queries exceeds the upper limit. |
| [duplicate column conflicts](./duplicate_column_conflicts.md)           | An index field configuration conflict occurs.                 |
| [Column '\*' no longer exists or type mismatch](./column_not_exists.md) | An index field error occurs.                                  |
| [key ('\*') is not config as numberic column](./key_not_number.md)      | The specified index field is not of the NUMERIC type.         |
| [key ('\*') is not config as key value config](./key_not_config.md)     | The index field value is not of the configured type.          |

## Permission errors

| Error message                                                     | Description                                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [AccessKeyId is disabled](./accesskeyid_disabled.md)              | The AccessKey pair does not have sufficient permissions.                                               |
| [AccessKeyId not found](./accesskeyid_not_found.md)               | The AccessKey pair is not found.                                                                       |
| [The security token you provided has expired](./token_expired.md) | The security token has expired.                                                                        |
| [denied by sts or ram](./denied_by_sts_ram.md)                    | Insufficient Security Token Service (STS) or Resource Access Management (RAM) permissions are granted. |

## SQL syntax errors

| Error message                                                                                                                                     | Description                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [you are using nested sql, please specify FROM LOGSTORE in the innermost sql](./innermost_sql_missing_from.md)                                    | The innermost layer of nested subqueries must contain FROM log.                                   |
| [mismatched input '\*' expecting ...](./mismatched_input.md)                                                                                      | The input contains unexpected characters.                                                         |
| [IN value and list items must be the same type: _varchar_](./in_value_and_list_must_be_the_same_type.md)                                          | The values in the IN clause and the list items must be of the same data type VARCHAR.             |
| [Unexpected parameters (_bigint_) for function _url_decode_. Expected: _url_decode(varchar(x))_](./unexpected_parameters_for_function.md)         | The data type of an input parameter of a function is invalid.                                     |
| ['\*' cannot be applied to bigint, varchar(#)](./cannot_be_applied_to_x_and_y.md)                                                                 | An operator fails to be applied between data of different types.                                  |
| [target of repeat operator is not specified](./target_of_repeat_operator_is_not_specified.md)                                                     | The target of the repeat operator is not specified.                                               |
| [extraneous input '\*' expecting ...](./extraneous_input_expecting.md)                                                                            | The SQL input contains extra information x, which is expected to be y.                            |
| [Can not cast '\*' to DOUBLE](./cannot_cast_to_double.md)                                                                                         | Type conversion error: The asterisk (\*) fails to be converted to the DOUBLE type.                |
| [Can not cast '\*' to INT](./cannot_cast_to_int.md)                                                                                               | Type conversion error: The asterisk (\*) fails to be converted to the INT type.                   |
| [NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.](./null_not_allowed_on_probe_of_semijoin.md) | Null values are not allowed on the probe side of the SemiJoin operator. 值                        |
| [Array subscript out of bounds](./array_subscript_out_of_bounds.md)                                                                               | The array subscript is out of bounds.                                                             |
| [Expression "\*" is not of type ROW](./expression_is_not_of_type_row.md)                                                                          | The "x" expression is not of the ROW type.                                                        |
| [identifiers must not contain '\*'](./identifiers_must_not_contain.md)                                                                            | An identifier must not contain specific characters.                                               |
| [identifiers must not start with a digit; surround the identifier with double quotes](./identifiers_must_not_start_with_a_digit.md)               | An identifier must not start with a digit.                                                        |
| [no viable alternative at input '\*'](./no_viable_alternative.md)                                                                                 | The input may be incomplete before the SQL statement ends.                                        |
| [Duplicate keys (version) are not allowed](./duplicate_keys_not_allowed.md)                                                                       | Duplicate keys are not allowed.                                                                   |
| [Key-value delimiter must appear exactly once in each entry. Bad input: '\*'](./key_value_delimiter_must_appear_exactly_once_in_each_entry.md)    | The key-value delimiter must appear only once in each entry.                                      |
| [Pattern has # groups. Cannot access group #](./pattern_cannot_access_group.md)                                                                   | The regular expression cannot access the specified group.                                         |
| [ts_compare must gropu by timestamp,your grouping by type is :bigint](./ts_compare_must_group_by_timestamp.md)                                    | The ts_compare function must group data by timestamp.组                                           |
| [time # is out of specified time range](./time_out_of_range.md)                                                                                   | The timestamp is out of the specified time range.                                                 |
| [ROW comparison not supported for fields with null elements](./row_comparison_not_support_null.md)                                                | ROW comparison is not supported for fields whose values are null.                                 |
| [The specified key does not exist.](./oss_access_key_not_exist.md)                                                                                | Failed to access an Object Storage Service (OSS) bucket because the specified key does not exist. |
| [reading data with pagination only allow reading max #](./pagination_max_1000000_rows.md)                                                         | The maximum number of rows per page must not exceed 1,000,000.                                    |
| [Could not choose a best candidate operator. Explicit type casts must be added.](./could_not_choose_a_best_candidate_operator.md)                 | The system fails to select the best candidate operator. Explicit type conversion must be added.   |
| [Function \* not registered](./function_not_registered.md)                                                                                        | The specified function does not exist.                                                            |
| [SQL array indices start at 1](./sql_array_indices_start_at_1.md)                                                                                 | The array index in SQL must start from 1.                                                         |
| [Index must be greater than zero](./index_must_be_greater_than_zero.md)                                                                           | The index must start from 1.                                                                      |
| [All COALESCE operands must be the same type: \*](./coalesce_operands_must_be_the_same_type.md)                                                   | All parameters in the COALESCE function must be of the same type.                                 |
| [Multiple columns returned by subquery are not yet supported.](./multiple_columns_returned_by_subquery_not_supported.md)                          | Scalar queries are not allowed to return multiple columns.                                        |
| [GROUP BY clause cannot contain aggregations or window functions](./group_by_clause_cannot_contain_aggregations_or_window_functions.md)           | The GROUP BY clause must not contain aggregate or window functions.                               |
| [WHERE clause cannot contain aggregations or window functions](./where_clause_cannot_contain_aggregations_or_window_functions.md)                 | The WHERE clause must not contain aggregate or window functions.                                  |
| [Left side of LIKE expression must evaluate to a varchar (actual: bigint)](./left_side_of_like_expression_must_evaluate_to_a_varchar.md)          | The LIKE expression expects VARCHAR on the left side, but gets BIGINT instead.                    |
| [Left side of logical expression must evaluate to a boolean (actual: varchar)](./left_side_of_logical_expression_must_evaluate_to_a_boolean.md)   | The logical expression expects BOOLEAN on the left side, but gets VARCHAR instead.                |
| [Right side of logical expression must evaluate to a boolean (actual: bigint)](./right_side_of_logical_expression_must_evaluate_to_a_boolean.md)  | The logical expression expects BOOLEAN on the right side, but gets BIGINT instead.                |
| [Invalid JSON path: ...](./invalid_json_path.md)                                                                                                  | Invalid JSON access path.                                                                         |
| [output rows execeed 100000 rows, please refine your sql](./output_execeed_100000_rows.md)                                                        | The output exceeds 100,000 rows.                                                                  |
| [max distinct num is:10, please use approx_distinct](./max_distinct_num_10.md)                                                                    | A single query can contain a maximum of 10 DISTINCT keywords.                                     |
| [Key not present in map](./key_not_in_map.md)                                                                                                     | The specified key does not exist in the map.                                                      |
