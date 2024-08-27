function getSidebar() {
  return [
    {
      text: 'SPL数据处理',
      items: [{ text: 'Case overview', link: '/en/spldataprocessdemo/home' }],
    },
    {
      text: '处理日期时间',
      items: [{ text: '日期时间对象和Unix时间戳的相互转换', link: '/en/spldataprocessdemo/date_time_object_to_unix.md' },
        { text: '日期时间对象和日期时间字符串的相互转换', link: '/en/spldataprocessdemo/date_time_object_to_date_time_str.md' },
      ],
    },
    {
      text: '数据过滤与清洗',
      items: [{ text: '过滤日志', link: '/en/spldataprocessdemo/filter_log.md' },
        { text: '为日志空缺字段赋值', link: '/en/spldataprocessdemo/assign_values_to_log.md' },
        { text: '删除和重命名字段', link: '/en/spldataprocessdemo/delete_rename_fields.md' },
        { text: '转换日志参数类型', link: '/en/spldataprocessdemo/conversion_log_parameter_types.md' },
        { text: '为日志不存在的字段填充默认值', link: '/en/spldataprocessdemo/set_default_values_to_log.md' },
        { text: '判断日志并增加字段', link: '/en/spldataprocessdemo/judge_log_and_add_fileds.md' },
      ],
    },
    {
      text: '解析CSV格式日志',
      items: [
        { text: '正常形式的CSV格式日志', link: '/en/spldataprocessdemo/normal_csv_format_log.md' },
        { text: '非正常形式的CSV格式日志', link: '/en/spldataprocessdemo/abnormal_csv_format_log.md'}
      ]
    },
    {
      text: '解析Java报错日志',
      items: [
        { text: '解析Java报错日志', link: '/en/spldataprocessdemo/parse_java_error_log.md' },
      ]
    },
    {
      text: '提取字符串动态键值对',
      items: [
        { text: '关键字提取', link: '/en/spldataprocessdemo/get_keyword.md' },
        { text: '值提取', link: '/en/spldataprocessdemo/get_value.md' },
        { text: '关键字加工', link: '/en/spldataprocessdemo/keyword_process.md' },
        { text: '值加工', link: '/en/spldataprocessdemo/value_process.md' },
        { text: '案例应用', link: '/en/spldataprocessdemo/case_application.md' },
      ]
    },
    {
      text: '解析Nginx日志',
      items: [
        { text: '解析Nginx日志', link: '/en/spldataprocessdemo/parse_nginx_log.md' },
      ]
    },
        {
      text: '数据脱敏',
      items: [
        { text: '手机号脱敏', link: '/en/spldataprocessdemo/phone_number_desensitization.md' },
        { text: '银行卡信息脱敏', link: '/en/spldataprocessdemo/bank_card_desensitization.md' },
        { text: '邮箱地址脱敏', link: '/en/spldataprocessdemo/email_desensitization.md' },
        { text: 'AK脱敏', link: '/en/spldataprocessdemo/ak_desensitization.md' },
        { text: 'IP脱敏', link: '/en/spldataprocessdemo/ip_desensitization.md' },
        { text: '身份证脱敏', link: '/en/spldataprocessdemo/id_card_desensitization.md' },
        { text: '网址脱敏', link: '/en/spldataprocessdemo/net_address_desensitization.md' },
        { text: '订单号脱敏', link: '/en/spldataprocessdemo/order_id_desensitization.md' }
      ]
    },
    {
      text: '阿里云Flink SQL基于SPL实现',
      items: [
        { text: '阿里云Flink SQL基于SPL实现行过滤', link: '/en/spldataprocessdemo/flink_spl_filter.md' },
        { text: '阿里云Flink SQL基于SPL实现列裁剪', link: '/en/spldataprocessdemo/flink_spl_cut.md' },
        { text: '阿里云Flink SQL基于SPL实现弱结构化分析', link: '/en/spldataprocessdemo/flink_spl_structured_analysis.md' },
      ]
    },
    {
      text: '使用SDK基于SPL消费',
      items: [
        { text: '使用Java SDK基于SPL消费', link: '/en/spldataprocessdemo/java_sdk_sql_consumer.md' },
        { text: '使用Java消费组基于SPL消费日志', link: '/en/spldataprocessdemo/java_consumer_group_sql_consumer.md' },
        { text: '使用Go SDK基于SPL消费', link: '/en/spldataprocessdemo/go_sdk_sql_consumer.md' },
        { text: '使用Go消费组基于SPL消费日志', link: '/en/spldataprocessdemo/go_consumer_group_sql_consumer.md' },
        { text: '使用Python SDK基于SPL消费日志', link: '/en/spldataprocessdemo/python_sdk_spl_consumer.md' },
        { text: '使用Python消费组基于SPL消费日志', link: '/en/spldataprocessdemo/python_consumer_group_sql_consumer.md' },
      ]
    },
  ]
}

module.exports = getSidebar
