function getSidebar() {
  return [
    {
      text: 'SQL error self diagnosis',
      items: [{ text: 'SQL Error Overview', link: '/en/sqlerror/home' }],
    },
    {
      text: 'General error',
      items: [
        {
          text: 'logstore * does not exist',
          link: '/en/sqlerror/logstore_not_exist',
        },
        {
          text: 'logstore without index config',
          link: '/en/sqlerror/logstore_without_index',
        },
        {
          text: 'Too many queued queries',
          link: '/en/sqlerror/too_many_queued_queries',
        },
        {
          text: 'duplicate column conflicts',
          link: '/en/sqlerror/duplicate_column_conflicts',
        },
        {
          text: 'Column '*' no longer exists or type mismatch',
          link: '/en/sqlerror/column_not_exists',
        },
        {
          text: 'key ('*') is not config as numberic column',
          link: '/en/sqlerror/key_not_number',
        },
        {
          text: 'key ('*') is not config as key value config',
          link: '/en/sqlerror/key_not_config',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: '权限错误',
      items: [
        {
          text: 'AccessKeyId is disabled',
          link: '/en/sqlerror/accesskeyid_disabled',
        },
        {
          text: 'AccessKeyId not found',
          link: '/en/sqlerror/accesskeyid_not_found',
        },
        {
          text: 'The security token you provided has expired',
          link: '/en/sqlerror/token_expired',
        },
        {
          text: 'denied by sts or ram',
          link: '/en/sqlerror/denied_by_sts_ram',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'SQL syntax error',
      items: [
        {
          text: 'you are using nested sql, please specify FROM LOGSTORE in the innermost sql',
          link: '/en/sqlerror/innermost_sql_missing_from.md',
        },
        {
          text: 'mismatched input * expecting ...',
          link: '/en/sqlerror/mismatched_input.md',
        },
        {
          text: 'IN value and list items must be the same type: *varchar*',
          link: '/en/sqlerror/in_value_and_list_must_be_the_same_type.md',
        },
        {
          text: 'Unexpected parameters (*bigint*) for function *url_decode*. Expected: *url_decode(varchar(x))*',
          link: '/en/sqlerror/unexpected_parameters_for_function.md',
        },
        {
          text: ''*' cannot be applied to bigint, varchar(#)',
          link: '/en/sqlerror/cannot_be_applied_to_x_and_y.md',
        },
        {
          text: 'target of repeat operator is not specified',
          link: '/en/sqlerror/target_of_repeat_operator_is_not_specified.md',
        },
        {
          text: 'extraneous input '*' expecting ...',
          link: '/en/sqlerror/extraneous_input_expecting.md',
        },
        {
          text: 'Can not cast '*' to DOUBLE',
          link: '/en/sqlerror/cannot_cast_to_double.md',
        },
        {
          text: 'Can not cast '*' to INT',
          link: '/en/sqlerror/cannot_cast_to_int.md',
        },
        {
          text: 'NULL values are not allowed on the probe side of SemiJoin operator. See the query plan for details.',
          link: '/en/sqlerror/null_not_allowed_on_probe_of_semijoin.md',
        },
        {
          text: 'Array subscript out of bounds',
          link: '/en/sqlerror/array_subscript_out_of_bounds.md',
        },
        {
          text: 'Expression "*" is not of type ROW',
          link: '/en/sqlerror/expression_is_not_of_type_row.md',
        },
        {
          text: 'identifiers must not contain *',
          link: '/en/sqlerror/identifiers_must_not_contain.md',
        },
        {
          text: 'identifiers must not start with a digit; surround the identifier with double quotes',
          link: '/en/sqlerror/identifiers_must_not_start_with_a_digit.md',
        },
        {
          text: 'no viable alternative at input '*'',
          link: '/en/sqlerror/no_viable_alternative.md',
        },
        {
          text: 'Duplicate keys (version) are not allowed',
          link: '/en/sqlerror/duplicate_keys_not_allowed.md',
        },
        {
          text: 'Key-value delimiter must appear exactly once in each entry. Bad input: *',
          link: '/en/sqlerror/key_value_delimiter_must_appear_exactly_once_in_each_entry.md',
        },
        {
          text: 'Pattern has # groups. Cannot access group #',
          link: '/en/sqlerror/pattern_cannot_access_group.md',
        },
        {
          text: 'ts_compare must  gropu by timestamp,your grouping by type is :bigint',
          link: '/en/sqlerror/ts_compare_must_group_by_timestamp.md',
        },
        {
          text: 'time # is out of specified time range',
          link: '/en/sqlerror/time_out_of_range.md',
        },
        {
          text: 'ROW comparison not supported for fields with null elements',
          link: '/en/sqlerror/row_comparison_not_support_null.md',
        },
        {
          text: 'The specified key does not exist.',
          link: '/en/sqlerror/oss_access_key_not_exist.md',
        },
        {
          text: 'reading data with pagination only allow reading max #',
          link: '/en/sqlerror/pagination_max_1000000_rows.md',
        },
        {
          text: 'Could not choose a best candidate operator. Explicit type casts must be added.',
          link: '/en/sqlerror/could_not_choose_a_best_candidate_operator.md',
        },
        {
          text: 'Function * not registered',
          link: '/en/sqlerror/function_not_registered.md',
        },
        {
          text: 'SQL array indices start at 1',
          link: '/en/sqlerror/sql_array_indices_start_at_1.md',
        },
        {
          text: 'Index must be greater than zero',
          link: '/en/sqlerror/index_must_be_greater_than_zero.md',
        },
        {
          text: 'All COALESCE operands must be the same type: *',
          link: '/en/sqlerror/coalesce_operands_must_be_the_same_type.md',
        },
        {
          text: 'Multiple columns returned by subquery are not yet supported.',
          link: '/en/sqlerror/multiple_columns_returned_by_subquery_not_supported.md',
        },
        {
          text: 'GROUP BY clause cannot contain aggregations or window functions',
          link: '/en/sqlerror/group_by_clause_cannot_contain_aggregations_or_window_functions.md',
        },
        {
          text: 'WHERE clause cannot contain aggregations or window functions',
          link: '/en/sqlerror/where_clause_cannot_contain_aggregations_or_window_functions.md',
        },
        {
          text: 'Left side of LIKE expression must evaluate to a varchar (actual: bigint)',
          link: '/en/sqlerror/left_side_of_like_expression_must_evaluate_to_a_varchar.md',
        },
        {
          text: 'Left side of logical expression must evaluate to a boolean (actual: varchar)',
          link: '/en/sqlerror/left_side_of_logical_expression_must_evaluate_to_a_boolean.md',
        },
        {
          text: 'Right side of logical expression must evaluate to a boolean (actual: bigint)',
          link: '/en/sqlerror/right_side_of_logical_expression_must_evaluate_to_a_boolean.md',
        },
        {
          text: 'Invalid JSON path: ...',
          link: '/en/sqlerror/invalid_json_path.md',
        },
        {
          text: 'output rows execeed 100000 rows, please refine your sql',
          link: '/en/sqlerror/output_execeed_100000_rows.md',
        },
        {
          text: 'max distinct num is:10, please use approx_distinct',
          link: '/en/sqlerror/max_distinct_num_10.md',
        },
        {
          text: 'Key not present in map',
          link: '/en/sqlerror/key_not_in_map.md',
        },
        // ...sqldemoFiles,
      ],
    },
  ]
}

module.exports = getSidebar
