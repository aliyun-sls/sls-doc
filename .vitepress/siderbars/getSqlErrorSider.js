function getSidebar() {
  return [
    {
      text: 'SQL错误自助诊断',
      items: [{ text: 'SQL错误总览', link: '/sqlerror/index' }],
    },
    {
      text: '通用错误',
      items: [
        {
          text: 'logstore * does not exist',
          link: '/sqlerror/logstore_not_exist',
        },
        {
          text: 'logstore without index config',
          link: '/sqlerror/logstore_without_index',
        },
        {
          text: 'Too many queued queries',
          link: '/sqlerror/too_many_queued_queries',
        },
        {
          text: 'duplicate column conflicts',
          link: '/sqlerror/duplicate_column_conflicts',
        },
        {
          text: 'Column '*' no longer exists or type mismatch',
          link: '/sqlerror/column_not_exists',
        },
        {
          text: 'key ('*') is not config as numberic column',
          link: '/sqlerror/key_not_number',
        },
        {
          text: 'key ('*') is not config as key value config',
          link: '/sqlerror/key_not_config',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: '权限错误',
      items: [
        {
          text: 'AccessKeyId is disabled',
          link: '/sqlerror/accesskeyid_disabled',
        },
        {
          text: 'AccessKeyId not found',
          link: '/sqlerror/accesskeyid_not_found',
        },
        {
          text: 'The security token you provided has expired',
          link: '/sqlerror/token_expired',
        },
        {
          text: 'denied by sts or ram',
          link: '/sqlerror/denied_by_sts_ram',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'SQL语法错误',
      items: [
        {
          text: 'you are using nested sql, please specify FROM LOGSTORE in the innermost sql',
          link: '/sqlerror/innermost_sql_missing_from.md',
        },
        {
          text: 'mismatched input * expecting ...',
          link: '/sqlerror/mismatched_input.md',
        },
        {
          text: 'IN value and list items must be the same type: *varchar*',
          link: '/sqlerror/in_value_and_list_must_be_the_same_type.md',
        },
        {
          text: 'Unexpected parameters (*bigint*) for function *url_decode*. Expected: *url_decode(varchar(x))*',
          link: '/sqlerror/unexpected_parameters_for_function.md',
        },
        {
          text: ''*' cannot be applied to bigint, varchar(#)',
          link: '/sqlerror/cannot_be_applied_to_x_and_y.md',
        },
        {
          text: 'target of repeat operator is not specified',
          link: '/sqlerror/target_of_repeat_operator_is_not_specified.md',
        },
        {
          text: 'extraneous input '*' expecting ...',
          link: '/sqlerror/extraneous_input_expecting.md',
        },
        {
          text: 'Can not cast '*' to DOUBLE',
          link: '/sqlerror/cannot_cast_to_double.md',
        },
        {
          text: 'Can not cast '*' to INT',
          link: '/sqlerror/cannot_cast_to_int.md',
        },
        {
          text: 'NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.',
          link: '/sqlerror/null_not_allowed_on_probe_of_semijoin.md',
        },
        {
          text: 'Array subscript out of bounds',
          link: '/sqlerror/array_subscript_out_of_bounds.md',
        },
        {
          text: 'Expression "*" is not of type ROW',
          link: '/sqlerror/expression_is_not_of_type_row.md',
        },
        {
          text: 'identifiers must not contain *',
          link: '/sqlerror/identifiers_must_not_contain.md',
        },
        {
          text: 'identifiers must not start with a digit; surround the identifier with double quotes',
          link: '/sqlerror/identifiers_must_not_start_with_a_digit.md',
        },
        {
          text: 'no viable alternative at input '*'',
          link: '/sqlerror/no_viable_alternative.md',
        },
        {
          text: 'Duplicate keys (version) are not allowed',
          link: '/sqlerror/duplicate_keys_not_allowed.md',
        },
        {
          text: 'Key-value delimiter must appear exactly once in each entry. Bad input: *',
          link: '/sqlerror/key_value_delimiter_must_appear_exactly_once_in_each_entry.md',
        },
        {
          text: 'Pattern has # groups. Cannot access group #',
          link: '/sqlerror/pattern_cannot_access_group.md',
        },
        {
          text: 'ts_compare must  gropu by timestamp,your grouping by type is :bigint',
          link: '/sqlerror/ts_compare_must_group_by_timestamp.md',
        },
        {
          text: 'time # is out of specified time range',
          link: '/sqlerror/time_out_of_range.md',
        },
        {
          text: 'ROW comparison not supported for fields with null elements',
          link: '/sqlerror/row_comparison_not_support_null.md',
        },
        {
          text: 'The specified key does not exist.',
          link: '/sqlerror/oss_access_key_not_exist.md',
        },
        {
          text: 'reading data with pagination only allow reading max #',
          link: '/sqlerror/pagination_max_1000000_rows.md',
        },
        {
          text: 'Could not choose a best candidate operator. Explicit type casts must be added.',
          link: '/sqlerror/could_not_choose_a_best_candidate_operator.md',
        },
        {
          text: 'Function * not registered',
          link: '/sqlerror/function_not_registered.md',
        },
        {
          text: 'SQL array indices start at 1',
          link: '/sqlerror/sql_array_indices_start_at_1.md',
        },
        {
          text: 'Index must be greater than zero',
          link: '/sqlerror/index_must_be_greater_than_zero.md',
        },
        {
          text: 'All COALESCE operands must be the same type: *',
          link: '/sqlerror/coalesce_operands_must_be_the_same_type.md',
        },
        {
          text: 'Multiple columns returned by subquery are not yet supported.',
          link: '/sqlerror/multiple_columns_returned_by_subquery_not_supported.md',
        },
        {
          text: 'GROUP BY clause cannot contain aggregations or window functions',
          link: '/sqlerror/group_by_clause_cannot_contain_aggregations_or_window_functions.md',
        },
        {
          text: 'WHERE clause cannot contain aggregations or window functions',
          link: '/sqlerror/where_clause_cannot_contain_aggregations_or_window_functions.md',
        },
        {
          text: 'Left side of LIKE expression must evaluate to a varchar (actual: bigint)',
          link: '/sqlerror/left_side_of_like_expression_must_evaluate_to_a_varchar.md',
        },
        {
          text: 'Left side of logical expression must evaluate to a boolean (actual: varchar)',
          link: '/sqlerror/left_side_of_logical_expression_must_evaluate_to_a_boolean.md',
        },
        {
          text: 'Right side of logical expression must evaluate to a boolean (actual: bigint)',
          link: '/sqlerror/right_side_of_logical_expression_must_evaluate_to_a_boolean.md',
        },
        {
          text: 'Invalid JSON path: ...',
          link: '/sqlerror/invalid_json_path.md',
        },
        {
          text: 'output rows execeed 100000 rows, please refine your sql',
          link: '/sqlerror/output_execeed_100000_rows.md',
        },
        {
          text: 'max distinct num is:10, please use approx_distinct',
          link: '/sqlerror/max_distinct_num_10.md',
        },
        {
          text: 'Key not present in map',
          link: '/sqlerror/key_not_in_map.md',
        },
        // ...sqldemoFiles,
      ],
    },
  ]
}

module.exports = getSidebar
