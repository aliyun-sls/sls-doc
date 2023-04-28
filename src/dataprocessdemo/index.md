# 数据加工案例概览

## 常见日志处理

| 案例名称 | 描述 |
| -- | -- |
| [Nginx日志解析](./nginx_data_process.md) | 使用数据加工对Nginx日志进行解析 |
| [事件判断](./event_judgment.md) | 使用数据加工对日志进行事件判断 |

## 日志分发

| 案例名称 | 描述 |
| -- | -- |
| [复制Logstore数据](./copy_logstore_data.md) | 使用数据加工复制Logstore数据 |
| [复制和分发数据](./split_data_and_output.md) | 介绍数据复制后分发到不同Logstore的典型场景和操作方法 |
| [跨区域数据传输](./cross_region.md) | 通过数据加工进行数据的跨region传输 |
| [多目标Logstore数据分发](./output_logstore_data.md) | 介绍多目标Logstore数据分发的各种场景及操作步骤 |
| [多源Logstore数据汇总](./summary_logstore_data.md) | 多源Logstore数据汇总至某个Logstore |

## 数据脱敏

| 案例名称 | 描述 |
| -- | -- |
| [数据脱敏](./remove_sensitive_info.md) | 数据加工过程中常见的数据脱敏场景、对应的脱敏方法及示例 |

## 时间格式处理

| 案例名称 | 描述 |
| -- | -- |
| [日期时间格式处理](./datetime_process.md) | 使用函数进行日期时间数据类型转换和日期时间偏移 |

## 文本解析

| 案例名称 | 描述 |
| -- | -- |
| [解析Syslog标准格式数据](./parse_sys_data.md) | 使用SLS DSL中的GROK函数高效快捷的解析不同格式的Syslog日志 |
| [解析Nginx日志](./parse_nginx.md) | 使用正则表达式函数或GROK函数解析Nginx访问日志 |
| [解析Java报错日志](./parse_java_error.md) | 通过数据加工解析Java错误日志 |
| [字符串键值对动态提取](./parse_string_kv.md) | 使用不同方案提取字符串键值对 |
| [特定格式文本数据加工](./text_transform.md) | 从工单需求，加工编排等方面介绍如何使用LOG DSL编排解决任务需求 |
| [转换Log为Metric](./transform_log_to_metric.md) | 使用日志服务数据加工函数将Log字段转换为Metric |

## IP地址相关

| 案例名称 | 描述 |
| -- | -- |
| [使用ipip库解析ip地址](./geo_parse_ipip.md) | 从OSS获取IPIP库数据，对日志中的IP地址进行富化，补充IP地址所属的国家、省、市等信息 |
| [使用ip2location解析ip地址](./oss_ip2location.md) | 从OSS获取IP2Location库数据，对日志中的IP地址进行富化，补充IP地址所属的国家、省、市等信息 |
| [FlowLog公网流量过滤](./filter_flow.md) | 根据流量的5元组信息通过数据加工对流量进行过滤 |
| [调用函数清洗数据](./use_func.md) | 介绍调用函数清洗数据的常见场景和相关操作 |


## 特定格式处理


| 案例名称 | 描述 |
| -- | -- |
| [JSON格式日志处理](./json_parse.md) | 使用数据加工功能对复杂的JSON数据进行加工 |
| [CSV格式日志处理](parse_csv.md) | 介绍在解析Syslog或者其他文本格式时，针对数据中以特殊字符分隔的格式如何进行解析 |
| [Log转Metric](./log2metric.md) | 使用数据加工将Log转成Metric |


## 使用RAM用户配置数据加工作业
| 案例名称 | 描述 |
| -- | -- |
| [使用默认角色完成同账号数据流转](./default_role_data_flow_of_same_account.md) | 通过默认角色完成同账号内的日志数据流转 |
| [使用自定义角色完成同账号数据流转](./defined_role_data_flow_of_same_account.md) | 通过自定义角色完成同账号内的日志数据流转|
| [使用自定义角色完成跨账号数据流转](./defined_role_data_flow_of_cross_account.md) | 通过自定义角色完成跨账号的日志数据流转 |
| [使用访问密钥完成同账号数据流转](./ak_data_flow_of_same_account.md) | 通过访问密钥完成同账号内的日志数据流转 |
| [使用访问密钥完成跨账号的数据流转](./ak_data_flow_of_cross_account.md) | 通过访问密钥完成跨账号的日志数据流转 |

## 数据富化

| 案例名称 | 描述 |
| -- | -- |
| [数据加工富化整体介绍](./data_join.md) | 数据加工富化整体介绍 |
| [用Logstore做数据富化](./pull_logstore_data.md) | 通过资源函数从其他Logstore中获取数据对数据进行富化 |
| [用OSS做数据富化](./parse_oss_csv.md) | 通过资源函数和映射富化函数从OSS中获取信息对日志数据进行富化 |
| [用RDS做数据富化](pull_rds_mysql_vpc.md) | 通过RDS内网地址访问RDS MySQL数据库获取数据 |
| [构建字典与表格做数据富化](./make_dict_table.md) | 字典与表格的常见构建方式与优缺点 |
| [用RDS Mysql做数据富化](pull_rds_mysql_data.md) | 通过资源函数从RDS MySQL数据库获取数据进行数据富化 |
| [用资源函数增量获取数据](pull_data_from_resource_func.md) | 通过res_rds_mysql函数增量获取数据增量获取数据 |
| [用映射函数进行数据富化](enrichment_data.md) | 通过e_dict_map、e_search_dict_map函数进行数据富化 |
| [用Hologres数据库做数据富化](pull_data_from_hologres.md) | 通过资源函数从进行Hologres数据库获取数据进行富化 |
| [用e_table_map函数对HTTP请求返回码做数据富化](enrichment_http_data.md) | 通过e_table_map函数对HTTP请求返回码做数据富化 |
| [过滤VPC流日志公网流量](filter_vpc_stream.md) | 通过日志服务数据加工对流日志进行公网流量过滤|