function getSidebar() {
  return [
    {
      text: '数据加工案例',
      items: [{ text: '案例总览', link: '/dataprocessdemo/home' }],
    },
    {
      text: '常见日志处理',
      items: [{ text: 'Nginx日志解析', link: '/dataprocessdemo/nginx_data_process.md' },
          { text: '事件判断', link: '/dataprocessdemo/event_judgment.md' },
      ],
    },
    {
      text: '日志分发',
      items: [{ text: '复制Logstore数据', link: '/dataprocessdemo/copy_logstore_data.md' },
          { text: '复制和分发数据', link: '/dataprocessdemo/split_data_and_output.md' },
          { text: '跨区域数据传输', link: '/dataprocessdemo/cross_region.md' },
          { text: '多目标Logstore数据分发', link: '/dataprocessdemo/output_logstore_data.md' },
          { text: '多源Logstore数据汇总', link: '/dataprocessdemo/summary_logstore_data.md' }
        ],
    },
    {
      text: '数据脱敏',
      items: [
        { text: '数据脱敏', link: '/dataprocessdemo/remove_sensitive_info.md' },
      ]
    },
    {
      text: '时间处理',
      items: [
        { text: '日期时间格式处理', link: '/dataprocessdemo/datetime_process.md'},
      ]
    },
    {
      text: '文本解析',
      items: [
        { text: '解析Syslog标准格式数据', link: '/dataprocessdemo/parse_sys_data.md' },
        { text: '解析Nginx日志', link: '/dataprocessdemo/parse_nginx.md' },
        { text: '解析Java报错日志', link: '/dataprocessdemo/parse_java_error.md' },
        { text: '转换Log为Metric', link: '/dataprocessdemo/transform_log_to_metric.md' },
        { text: '字符串键值对动态提取', link: '/dataprocessdemo/parse_string_kv.md'},
        { text: '特定格式文本数据加工', link: '/dataprocessdemo/text_transform.md'},
        { text: 'SLS数据加工对Json数据解析与更新', link: '/dataprocessdemo/json_parse_and_update.md'}
      ]
    },
    {
      text: 'IP地址相关',
      items: [
        { text: '使用ipip库解析ip地址', link: '/dataprocessdemo/geo_parse_ipip.md' },
        { text: '使用ip2location解析ip地址', link: '/dataprocessdemo/oss_ip2location.md' },
        { text: 'FlowLog公网流量过滤', link: '/dataprocessdemo/filter_flow.md'},
        { text: '调用函数清洗数据', link: '/dataprocessdemo/use_func.md'}
      ]
    },
    {
      text: '特定格式处理',
      items: [
        { text: 'JSON格式日志处理', link: '/dataprocessdemo/json_parse.md'},
        { text: 'CSV格式日志处理', link: '/dataprocessdemo/parse_csv.md'},
        { text: 'Log转Metric', link: '/dataprocessdemo/log2metric.md'}
      ]
    },
    {
      text: '使用RAM用户配置数据加工作业',
      items: [
        { text: '使用默认角色完成同账号数据流转', link: '/dataprocessdemo/default_role_data_flow_of_same_account.md' },
        { text: '使用自定义角色完成同账号数据流转', link: '/dataprocessdemo/defined_role_data_flow_of_same_account.md' },
        { text: '使用自定义角色完成跨账号数据流转', link: '/dataprocessdemo/defined_role_data_flow_of_cross_account.md' },
        { text: '使用访问密钥完成同账号数据流转', link: '/dataprocessdemo/ak_data_flow_of_same_account.md' },
        { text: '使用访问密钥完成跨账号的数据流转', link: '/dataprocessdemo/ak_data_flow_of_cross_account.md' },
      ]
    },
    {
      text: '数据富化',
      items: [
        { text: '数据加工富化整体介绍', link: '/dataprocessdemo/data_join.md' },
        { text: '用Logstore做数据富化', link: '/dataprocessdemo/pull_logstore_data.md' },
        { text: '用OSS做数据富化', link: '/dataprocessdemo/parse_oss_csv.md' },
        { text: '用RDS做数据富化', link: '/dataprocessdemo/pull_rds_mysql_vpc.md' },
        { text: '构建字典与表格做数据富化', link: '/dataprocessdemo/make_dict_table.md' },
        { text: '用RDS Mysql做数据富化', link: '/dataprocessdemo/pull_rds_mysql_data.md' },
        { text: '用资源函数增量获取数据', link: '/dataprocessdemo/pull_data_from_resource_func.md' },
        { text: '用映射函数进行数据富化', link: '/dataprocessdemo/enrichment_data.md' },
        { text: '用Hologres数据库做数据富化', link: "dataprocessdemo/pull_data_from_hologres.md" },
        { text: '用e_table_map函数对HTTP请求返回码做数据富化', link: "dataprocessdemo/enrichment_http_data.md" },
        { text: '过滤VPC流日志公网流量', link: "dataprocessdemo/filter_vpc_stream.md"}
      ]
    },
    {
      text: '其他',
      items: [
        { text: '历史数据加工最佳实践', link: '/dataprocessdemo/history_data_process.md' }
      ]
    }
  ]
}

module.exports = getSidebar
