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
          text: 'you are using nested sql',
          link: '/sqlerror/nested_missing_logstore',
        },
        {
          text: 'IN value and list items must be the same type',
          link: '/sqlerror/in_type_mismatch',
        },
        {
          text: 'Unexpected parameters (`x`) for function `y`',
          link: '/sqlerror/parameter_type_mismatch',
        },
        {
          text: '\'=\' cannot be applied to `x`, `y`',
          link: '/sqlerror/equal_type_mismatch',
        },
        {
          text: 'Can not cast \'*\' to DOUBLE',
          link: '/sqlerror/cast_type_mismatch',
        },
        {
          text: 'NULL values are not allowed on the probe side of SemiJoin operator',
          link: '/sqlerror/semijoin_null_values',
        },
        {
          text: 'Key-value delimiter must appear exactly once in each entry',
          link: '/sqlerror/delimiter_exactly_once',
        },
        {
          text: 'Expression "params" is not of type ROW',
          link: '/sqlerror/expression_not_row',
        },
        {
          text: 'Left side of logical expression must evaluate to a `x` (actual: `y`)',
          link: '/sqlerror/logical_expression_type_missmatch',
        },
        // ...sqldemoFiles,
      ],
    },
  ]
}

module.exports = getSidebar
