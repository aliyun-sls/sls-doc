function getSidebar() {
    return [
      {
        text: '数据加工案例',
        items: [{ text: '案例总览', link: '/dataprocessdemo/index' }],
      },
      {
        text: '常见日志处理',
        items: [{ text: 'Nginx日志解析', link: '/dataprocessdemo/nginx_data_process' }],
      },
      {
        text: '日志分发',
        items: [{ text: '复制Logstore数据', link: '/dataprocessdemo/copy_logstore_data' },
            { text: '复制和分发数据', link: '/dataprocessdemo/split_data_and_output.md' },
            { text: '跨区域数据传输', link: '/dataprocessdemo/cross_region.md' },
            { text: '多目标Logstore数据分发', link: '/dataprocessdemo/output_logstore_data.md' },
            { text: '多源Logstore数据汇总', link: '/dataprocessdemo/summary_logstore_data.md' }
          ],
      },
      {
        text: '数据富化',
        items: [
          { text: '数据加工富化整体介绍', link: '/dataprocessdemo/data_join.md' },
          { text: '用Logstore做数据富化', link: '/dataprocessdemo/pull_logstore_data.md' },
          { text: '用OSS做数据富化', link: '/dataprocessdemo/parse_oss_csv.md' },
          { text: '用RDS做数据富化', link: '/dataprocessdemo/pull_rds_mysql_vpc.md' },
          { text: '构建字典与表格做数据富化', link: '/dataprocessdemo/make_dict_table.md' }
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
          { text: '数据脱敏', link: '/dataprocessdemo/remove_sensitive_info.md' },
          { text: '日期时间格式处理', link: '/dataprocessdemo/datetime_process.md'},
          { text: '字符串键值对动态提取', link: '/dataprocessdemo/parse_string_kv.md'},
          { text: '特定格式文本数据加工', link: '/dataprocessdemo/text_transform.md'},
          { text: 'JSON格式日志处理', link: '/dataprocessdemo/json_parse.md'},
          { text: 'CSV格式日志处理', link: '/dataprocessdemo/parse_csv.md'},
          { text: 'Log转Metric', link: '/dataprocessdemo/log2metric.md'}
        ]
      }
    ]
  }
  
  module.exports = getSidebar
  