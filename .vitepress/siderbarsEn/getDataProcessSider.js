function getSidebar() {
  return [
    {
      text: 'Overview of data transformation cases',
      items: [{ text: 'Case overview', link: '/en/dataprocessdemo/home' }],
    },
    {
      text: 'Common log processing',
      items: [{ text: 'Parse NGINX logs', link: '/en/dataprocessdemo/nginx_data_process.md' },
          { text: 'Check data by using functions', link: '/en/dataprocessdemo/event_judgment.md' },
      ],
    },
    {
      text: 'Log Distribution',
      items: [{ text: 'Replicate data from a Logstore', link: '/en/dataprocessdemo/copy_logstore_data.md' },
          { text: 'Replicate and distribute data', link: '/en/dataprocessdemo/split_data_and_output.md' },
          { text: 'Transmit data across regions', link: '/en/dataprocessdemo/cross_region.md' },
          { text: ' Distribute data to multiple destination Logstores', link: '/en/dataprocessdemo/output_logstore_data.md' },
          { text: 'Aggregate data from multiple source Logstores', link: '/en/dataprocessdemo/summary_logstore_data.md' }
        ],
    },
    {
      text: 'Data masking',
      items: [
        { text: 'Data masking', link: '/en/dataprocessdemo/remove_sensitive_info.md' },
      ]
    },
    {
      text: 'Convert datetime',
      items: [
        { text: 'Convert datetime', link: '/en/dataprocessdemo/datetime_process.md'},
      ]
    },
    {
      text: 'Text parsing',
      items: [
        { text: 'Parse Syslog messages in standard formats', link: '/en/dataprocessdemo/parse_sys_data.md' },
        { text: 'Parse NGINX logs', link: '/en/dataprocessdemo/parse_nginx.md' },
        { text: 'Parse Java error logs', link: '/en/dataprocessdemo/parse_java_error.md' },
        { text: 'Convert logs to metrics', link: '/en/dataprocessdemo/transform_log_to_metric.md' },
        { text: 'Extract dynamic key-value pairs from a string', link: '/en/dataprocessdemo/parse_string_kv.md'},
        { text: 'Transform logs in specific text formats', link: '/en/dataprocessdemo/text_transform.md'},
        { text: 'Use the data transformation feature to parse and update JSON data', link: '/en/dataprocessdemo/json_parse_and_update.md'}
      ]
    },
    {
      text: 'IP address data',
      items: [
        { text: 'Obtain the IPIP library from OSS and enrich IP address data', link: '/en/dataprocessdemo/geo_parse_ipip.md' },
        { text: 'Obtain the IP2Location library from OSS and enrich IP address data', link: '/en/dataprocessdemo/oss_ip2location.md' },
        { text: 'Filter flow logs that record Internet traffic', link: '/en/dataprocessdemo/filter_flow.md'},
        { text: 'Cleanse data by using functions', link: '/en/dataprocessdemo/use_func.md'}
      ]
    },
    {
      text: 'Specific format processing',
      items: [
        { text: 'Transform complex JSON data', link: '/en/dataprocessdemo/json_parse.md'},
        { text: 'Parse log entries in a CSV-format log file', link: '/en/dataprocessdemo/parse_csv.md'},
        { text: 'Use the data transformation feature to convert logs to metrics', link: '/en/dataprocessdemo/log2metric.md'}
      ]
    },
    {
      text: 'Configure data processing tasks using RAM users',
      items: [
        { text: 'Use a default role to transfer data within the same Alibaba Cloud account', link: '/en/dataprocessdemo/default_role_data_flow_of_same_account.md' },
        { text: 'Use custom roles to transfer data across different Alibaba Cloud accounts', link: '/en/dataprocessdemo/defined_role_data_flow_of_same_account.md' },
        { text: 'Use custom roles to transfer data within the same Alibaba Cloud account', link: '/en/dataprocessdemo/defined_role_data_flow_of_cross_account.md' },
        { text: 'Use AccessKey pairs to transfer data across different Alibaba Cloud accounts', link: '/en/dataprocessdemo/ak_data_flow_of_same_account.md' },
        { text: 'Use access keys to complete cross account data flow', link: '/en/dataprocessdemo/ak_data_flow_of_cross_account.md' },
      ]
    },
    {
      text: 'Data enrichment practices',
      items: [
        { text: 'Log enrichment practices', link: '/en/dataprocessdemo/data_join.md' },
        { text: 'Pull data from one Logstore to enrich log data in another Logstore', link: '/en/dataprocessdemo/pull_logstore_data.md' },
        { text: 'Retrieve CSV files from OSS for data enrichment', link: '/en/dataprocessdemo/parse_oss_csv.md' },
        { text: 'Obtain data from an ApsaraDB RDS for MySQL database over the internal network', link: '/en/dataprocessdemo/pull_rds_mysql_vpc.md' },
        { text: 'Build dictionaries and tables for data enrichment', link: '/en/dataprocessdemo/make_dict_table.md' },
        { text: 'Obtain data from an ApsaraDB RDS for MySQL database for data enrichment', link: '/en/dataprocessdemo/pull_rds_mysql_data.md' },
        { text: 'Use a resource function to obtain incremental data', link: '/en/dataprocessdemo/pull_data_from_resource_func.md' },
        { text: 'Use the e_dict_map and e_search_dict_map functions to enrich log data', link: '/en/dataprocessdemo/enrichment_data.md' },
        { text: 'Pull data from a Hologres database for data enrichment', link: "/en/dataprocessdemo/pull_data_from_hologres.md" },
        { text: 'Use the e_table_map function to enrich HTTP response status codes', link: "/en/dataprocessdemo/enrichment_http_data.md" },
        { text: 'Filter VPC flow logs for Internet traffic logs', link: "/en/dataprocessdemo/filter_vpc_stream.md"}
      ]
    },
    {
      text: 'other',
      items: [
        { text: 'Best practices for transforming historical data', link: '/en/dataprocessdemo/history_data_process.md' }
      ]
    }
  ]
}

module.exports = getSidebar
