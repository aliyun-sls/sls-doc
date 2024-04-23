# Overview of data transformation cases

## Common log processing

| Case name                                            | Description                                              |
| ---------------------------------------------------- | -------------------------------------------------------- |
| [Parse NGINX logs](./nginx_data_process.md)          | Use the data transformation feature to parse NGINX logs. |
| [Check data by using functions](./event_judgment.md) | Use the data transformation feature to check log data.   |

## Log distribution

| Case name                                                                      | Description                                                                                                            |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [Replicate data from a Logstore](./copy_logstore_data.md)                      | Use the data transformation feature to replicate data from a Logstore.                                                 |
| [Replicate and distribute data](./split_data_and_output.md)                    | Replicate data from a source Logstore and distribute the data to multiple destination Logstores in a typical scenario. |
| [Transmit data across regions](./cross_region.md)                              | Use the data transformation feature to transmit data across regions.                                                   |
| [Distribute data to multiple destination Logstores](./output_logstore_data.md) | Distribute data to multiple destination Logstores in various scenarios.                                                |
| [Aggregate data from multiple source Logstores](./summary_logstore_data.md)    | Aggregate data from multiple source Logstores to a destination Logstore.                                               |

## Data masking

| Case name                                  | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| [Data masking](./remove_sensitive_info.md) | Use functions to mask sensitive data in various scenarios. |

## Datetime conversion

| Case name                                    | Description                                       |
| -------------------------------------------- | ------------------------------------------------- |
| [Datetime conversion](./datetime_process.md) | Use functions to convert and offset the datetime. |

## Text parsing

| Case name                                                             | Description                                                                                                                      |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Parse Syslog messages in standard formats](./parse_sys_data.md)      | Use the Grok function in the domain-specific language (DSL) of Simple Log Service to parse Syslog messages in different formats. |
| [Parse NGINX logs](./parse_nginx.md)                                  | Use regular expression functions or the Grok function to parse NGINX access logs.                                                |
| [Parse Java error logs](./parse_java_error.md)                        | Use the data transformation feature to parse Java error logs.                                                                    |
| [Extract dynamic key-value pairs from a string](./parse_string_kv.md) | Use different functions to extract dynamic key-value pairs from a string.                                                        |
| [Transform logs in specific text formats](./text_transform.md)        | Use LOG DSL orchestration to transform logs to meet data transformation requirements.                                            |
| [Convert logs to metrics](./transform_log_to_metric.md)               | Use a data transformation function to convert logs to metrics.                                                                   |
| [Parse and update JSON data](./json_parse_and_update.md)              | Use the data transformation feature to parse and update JSON data.                                                               |

## Cases related to IP addresses

| Case name                                                                                  | Description                                                                                                                                            |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Obtain the IPIP library from OSS and enrich IP address data](./geo_parse_ipip.md)         | Obtain the IPIP library from Object Storage Service (OSS) and use the library to identify the city, state, and country to which an IP address belongs. |
| [Obtain the IP2Location library from OSS and enrich IP address data](./oss_ip2location.md) | Obtain the IP2Location library from OSS and use the library to identify the city, state, and country to which an IP address belongs.                   |
| [Filter flow logs that record Internet traffic](./filter_flow.md)                          | Use the data transformation feature to filter traffic based on a 5-tuple of network traffic.                                                           |
| [Cleanse data by using functions](./use_func.md)                                           | Use functions to cleanse data in various scenarios.                                                                                                    |

## Processing of logs in specific formats

| Case name                                                  | Description                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------- |
| [Process logs in the JSON format](./json_parse.md)         | Use the data transformation feature to transform complex JSON data. |
| [Parse log entries in a CSV-format log file](parse_csv.md) | Parse log entries in a CSV-format log file, such as a Syslog file.  |
| [Convert logs to metrics](./log2metric.md)                 | Use the data transformation feature to convert logs to metrics.     |

## Configuration of a data transformation job as a RAM user

| Case name                                                                                                                 | Description                                                                        |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Use a default role to transfer data within the same Alibaba Cloud account](./default_role_data_flow_of_same_account.md)  | Specify a default role to transfer log data within the same Alibaba Cloud account. |
| [Use custom roles to transfer data within the same Alibaba Cloud account](./defined_role_data_flow_of_same_account.md)    | Use custom roles to transfer log data within the same Alibaba Cloud account.       |
| [Use custom roles to transfer data across different Alibaba Cloud accounts](./defined_role_data_flow_of_cross_account.md) | Use custom roles to transfer log data across different Alibaba Cloud accounts.     |
| [Use AccessKey pairs to transfer data within the same Alibaba Cloud account](./ak_data_flow_of_same_account.md)           | Use AccessKey pairs to transfer log data within the same Alibaba Cloud account.    |
| [Use AccessKey pairs to transfer data across different Alibaba Cloud accounts](./ak_data_flow_of_cross_account.md)        | Use AccessKey pairs to transfer log data across different Alibaba Cloud accounts.  |

## Data enrichment

| Case name                                                                                              | Description                                                                                                                              |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Log enrichment practices](./data_join.md)                                                             | Log enrichment practices                                                                                                                 |
| [Pull data from one Logstore to enrich log data in another Logstore](./pull_logstore_data.md)          | Use resource functions to pull data from one Logstore to enrich log data in another Logstore.                                            |
| [Pull a CSV file from OSS to enrich data](./parse_oss_csv.md)                                          | Use resource functions to pull data from OSS and use mapping functions to map the data fields to data fields in Simple Log Service.      |
| [Obtain data from an ApsaraDB RDS for MySQL database over the internal network](pull_rds_mysql_vpc.md) | Obtain data from an ApsaraDB RDS for MySQL database over the internal network.                                                           |
| [Build dictionaries and tables for data enrichment](./make_dict_table.md)                              | Describe common methods for building dictionaries and tables and compare the advantages and disadvantages of different building methods. |
| [Obtain data from an ApsaraDB RDS for MySQL database for data enrichment](pull_rds_mysql_data.md)      | Use resource functions to obtain data from an ApsaraDB RDS for MySQL database for data enrichment.化                                     |
| [Use a resource function to obtain incremental data](pull_data_from_resource_func.md)                  | Use the res_rds_mysql function to obtain incremental data.                                                                               |
| [Enrich log data by using mapping functions](enrichment_data.md)                                       | Use the e_dict_map and e_search_dict_map functions to enrich log data.                                                                   |
| [Pull data from a Hologres database for data enrichment](pull_data_from_hologres.md)                   | Use resource functions to pull data from a Hologres database for data enrichment.                                                        |
| [Use the e_table_map function to enrich HTTP response status codes](enrichment_http_data.md)           | Use the e_table_map function to enrich HTTP response status codes.                                                                       |
| [Filter VPC flow logs for Internet traffic logs](filter_vpc_stream.md)                                 | Use the data transformation feature to filter flow logs for Internet traffic logs.                                                       |

## other

| Case name                                              | Description                                     |
| ------------------------------------------------------ | ----------------------------------------------- |
| [Transform historical data](./history_data_process.md) | Best practices for transforming historical data |
