# 数据加工案例概览

## 常见日志处理

| 案例名称 | 描述 |
| -- | -- |
| [Nginx日志解析](./nginx_data_process.md) | 使用数据加工对Nginx日志进行解析 |

## 日志分发

| 案例名称 | 描述 |
| -- | -- |
| [复制Logstore数据](./copy_logstore_data.md) | 使用数据加工复制Logstore数据 |
| [复制和分发数据](./split_data_and_output.md) | 介绍数据复制后分发到不同Logstore的典型场景和操作方法 |
| [跨区域数据传输](./cross_region.md) | 通过数据加工进行数据的跨region传输 |
| [多目标Logstore数据分发](./output_logstore_data.md) | 介绍多目标Logstore数据分发的各种场景及操作步骤 |
| [多源Logstore数据汇总](./summary_logstore_data.md) | 多源Logstore数据汇总至某个Logstore |

## 数据富化

| 案例名称 | 描述 |
| -- | -- |
| [数据加工富化整体介绍](./data_join.md) | 数据加工富化整体介绍 |
| [用Logstore做数据富化](./pull_logstore_data.md) | 通过资源函数从其他Logstore中获取数据对数据进行富化 |
| [用OSS做数据富化](./parse_oss_csv.md) | 通过资源函数和映射富化函数从OSS中获取信息对日志数据进行富化 |
| [用RDS做数据富化](pull_rds_mysql_vpc.md) | 通过RDS内网地址访问RDS MySQL数据库获取数据 |
| [构建字典与表格做数据富化](./make_dict_table.md) | 字典与表格的常见构建方式与优缺点 |
