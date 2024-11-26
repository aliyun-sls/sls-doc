# SPL案例（加工新版等）概览

## 处理日期时间数据

| 案例名称 | 描述 |
| -- | -- |
| [日期时间对象和Unix时间戳的相互转换](./date_time_object_to_unix.md) | 使用SPL语句进行日期时间对象和Unix时间戳的相互转换 |
| [日期时间对象和日期时间字符串的相互转换](./date_time_object_to_date_time_str.md) | 使用SPL语句进行日期时间对象和日期时间字符串的相互转换 |

## 数据过滤与清洗

| 案例名称 | 描述 |
| -- | -- |
| [过滤日志](./filter_log.md) | 使用SPL语句过滤数据 |
| [为日志空缺字段赋值](./assign_values_to_log.md) | 使用SSPL语句为日志空缺字段赋值 |
| [删除和重命名字段](./delete_rename_fields.md) | 使用SPL语句删除和重命名字段 |
| [转换日志参数类型 ](./conversion_log_parameter_types.md) | 使用SPL语句转换日志参数类型 |
| [为日志不存在的字段填充默认值](./set_default_values_to_log.md) | SPL语句为日志不存在的字段填充默认值 |
| [判断日志并增加字段](./judge_log_and_add_fileds.md) | 使用SPL语句判断日志并增加字段 |

## 解析CSV格式日志

| 案例名称 | 描述 |
| -- | -- |
| [正常形式的CSV格式日志](./normal_csv_format_log.md) | 使用SPL语句处理正常形式的CSV格式日志 |
| [非正常形式的CSV格式日志](./abnormal_csv_format_log.md) | 使用SPL语句处理非正常形式的CSV格式日志 |

## 解析Java报错日志

| 案例名称 | 描述 |
| -- | -- |
| [解析Java报错日志](./parse_java_error_log.md) | 使用SPL语句解析Java报错日志 |

## 提取字符串动态键值对

| 案例名称 | 描述 |
| -- | -- |
| [关键字提取](./get_keyword.md) | 使用parse-kv函数提取关键字 |
| [值提取](./get_value.md) | 使用parse-kv函数提取值 |
| [关键字加工](./keyword_process.md) | 使用parse-kv函数提取键值对 |
| [值加工 ](./value_process.md) | 使用parse-kv函数提取字段值|
| [案例应用 ](./case_application.md) |使用parse-kv函数和parse-regexp解析url数据 |


## 解析Nginx日志 

| 案例名称 | 描述 |
| -- | -- |
| [解析Nginx日志 ](./parse_nginx_log.md) | 使用正则表达式函数解析Nginx访问日志 |
| [解析非标准的Nginx日志 ](./parse_no_nginx_log.md) | 使用正则表达式函数解析非标准的Nginx访问日志 |


## 解析复杂日志中的字段 

| 案例名称 | 描述 |
| -- | -- |
| [解析复杂日志中的字段 ](./parse_fields.md) | 使用正则表达式函数解析日志

## 数据脱敏
| 案例名称 | 描述 |
| -- | -- |
| [数据脱敏](./phone_number_desensitization.md) | 使用正则表达式函数对关键信息进行脱敏 |

## 事件判断
| 案例名称 | 描述 |
| -- | -- |
| [事件判断](./event_judgment.md) | 使用条件语句对不同日志进行判断 |

## 阿里云Flink SQL基于SPL实现

| 案例名称 | 描述 |
| -- | -- |
| [阿里云Flink SQL基于SPL实现行过滤](./flink_spl_filter.md) | 阿里云Flink SQL基于SPL实现行过滤 |
| [阿里云Flink SQL基于SPL实现列裁剪](./flink_spl_cut.md) | 通过阿里云Flink SQL基于SPL实现列裁剪 |
| [阿里云Flink SQL基于SPL实现弱结构化分析](./flink_spl_structured_analysis.md) | 阿里云Flink SQL基于SPL实现弱结构化分析 |
## 使用SDK基于SPL消费
| 案例名称 | 描述 |
| -- | -- |
| [使用Java SDK基于SPL消费](./java_sdk_sql_consumer.md) | 使用Java SDK基于SPL消费 |
| [使用Java消费组基于SPL消费日志](./java_consumer_group_sql_consumer.md) | 使用Java消费组基于SPL消费日志 |
| [使用Go SDK基于SPL消费](./go_sdk_sql_consumer.md) | Go SDK基于SPL消费 |
| [使用Go消费组基于SPL消费日志](./go_consumer_group_sql_consumer.md) | 使用Go消费组基于SPL消费日志 |
| [使用Python SDK基于SPL消费日志](./python_sdk_spl_consumer.md) | 使用Python SDK基于SPL消费日志 |
| [使用Python消费组基于SPL消费日志](./python_consumer_group_sql_consumer.md) | 使用Python消费组基于SPL消费日志 |
