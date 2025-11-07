## 概述

### 背景介绍

在阿里云日志服务 SLS（Simple Log Service）中，默认的查询分析模式要求用户在数据写入前预先定义字段索引配置。这种预定义索引的方式在局限性：

- **动态字段场景**：日志字段不固定，无法提前规划索引配置
- **Elasticsearch 迁移**：需要适配 Elasticsearch 的 Dynamic Mapping 特性

为解决上述问题，SLS 推出了 **Scan Index** 特性，该特性具有以下优势：

- 无需预先定义字段索引
- 支持动态字段自动识别
- 结合 Kibana 可实现ELK平滑迁移

### 解决方案架构

本方案通过以下组件实现从 Elasticsearch 到 SLS 的平滑迁移：

1. **SLS Scan Index**：提供动态字段扫描能力
2. **Kibana 对接**：通过 ES 兼容 API 对接 SLS
3. **自动化脚本**：探测字段并自动配置 Kibana Index Pattern

```
                                  ┌──────────────────┐
                                  │    Kibana        │
                                  │  (查询/可视化)     │
                                  └──────────────────┘
                                       ▲         ▲
                                       │         │
                            ES兼容API  │         │ 配置Index Pattern
                            数据查询    │         │ (Runtime Fields)
                                       │         │
┌─────────────┐    ┌──────────────────┴─┐   ┌───┴──────────────┐
│   数据源     │───▶│  SLS Logstore      │   │  字段探测脚本     │
│  (任意格式)  │    │  (Scan Index)      │   │  ───────────────│
└─────────────┘    └────────────────────┘   │  1. 探测字段     │
        ▲                                     │  2. 识别类型     │
      写入日志                                │  3. 生成配置     │
                                             └──────────────────┘
```

## 实施步骤

### 步骤一：启用 Logstore Scan Index

#### 1.1 功能说明

Scan Index 是 SLS 提供的一种免索引配置的查询加速能力，启用后系统会自动扫描和识别日志中的所有字段。

**官方文档参考**：[Scan Index 介绍](https://help.aliyun.com/zh/sls/accelerated-scan-based-on-scan-index?spm=a2c4g.11186623.help-menu-28958.d_5_3_4.5f8343c6ZjoIHf&scm=20140722.H_2928713._.OR_help-T_cn~zh-V_1)

#### 1.2 配置方式

在 SLS 控制台中进入目标 Logstore 的属性配置页面，启用 Scan Index 开关：

![Scan Index 配置](/img/oscompatibledemo/scan_index.jpg)


### 步骤二：部署 Kibana 并对接 SLS

SLS 提供了与 Elasticsearch 兼容的 API 接口，支持直接使用 Kibana 进行可视化分析。

**官方文档参考**：[使用 Kibana 访问日志服务](https://help.aliyun.com/zh/sls/developer-reference/use-kibana-to-access-the-elasticsearch-compatible-api-of-log-service?scm=20140722.S_help%40%40%E6%96%87%E6%A1%A3%40%402803799._.ID_help%40%40%E6%96%87%E6%A1%A3%40%402803799-RL_%E5%AF%B9%E6%8E%A5kibana-LOC_doc%7EUND%7Eab-OR_ser-PAR1_212a5d3d17624980538173611d408a-V_4-PAR3_o-RE_new8-P0_0-P1_0&spm=a2c4g.11186623.help-search.i13)



### 步骤三：自动化字段探测与配置

#### 3.1 方案说明

对于启用了 Scan Index 的 Logstore，字段是动态生成的，无法在 Kibana 中预先配置。为了解决这个问题，我们提供了两个 Python 脚本来自动化完成字段发现和配置流程：
**工具列表**：

| 脚本名称 | 功能说明 | 下载地址 |
|---------|---------|---------|
| `ptn_index_field_probe.py` | 从 SLS Logstore 探测字段并生成配置文件 | [下载](https://raw.githubusercontent.com/aliyun-sls/sls-doc/refs/heads/main/src/oscompatibledemo/ptn_index_field_probe.py) |
| `ptn_add_runtime_fileds.py` | 将字段作为 Runtime Fields 添加到 Kibana Index Pattern | [下载](https://raw.githubusercontent.com/aliyun-sls/sls-doc/refs/heads/main/src/oscompatibledemo/ptn_add_runtime_fileds.py) |

#### 3.2 准备配置文件
创建 `sls_config.json`，包含 SLS 连接信息：
```json
{
    "endpoint": "cn-hangzhou.log.aliyuncs.com",
    "access_key_id": "your_access_key_id",
    "access_key_secret": "your_access_key_secret"
}
```

创建 `kibana_config.json`，包含 Kibana 连接信息：
```json
{
    "url": "http://your-kibana-host:5601",
    "user": "elastic",
    "password": "your_password",
    "space": "default"
}
```

#### 3.3 执行字段探测

使用 `ptn_index_field_probe.py` 脚本从 SLS Logstore 中探测所有字段及其类型。该脚本会自动发现所有字段并识别其数据类型（keyword、long、double）。

```bash
python ptn_index_field_probe.py sls_config.json etl-spe.accesslog_scan_index /tmp/fields.json
```

参数说明：
- `sls_config.json` - SLS 配置文件路径
- `etl-spe.accesslog_scan_index` - Project 和 Logstore 名称（格式：`project.logstore`）
- `/tmp/fields.json` - 输出文件路径（可选，默认为 `runtime_fields_config.json`）

执行过程示例：
```
[2025-11-07 10:00:00] SLS Endpoint: cn-hangzhou.log.aliyuncs.com
[2025-11-07 10:00:00] Project: etl-spe
[2025-11-07 10:00:00] Logstore: accesslog_scan_index
[2025-11-07 10:00:00] Output file: /tmp/fields.json
[2025-11-07 10:00:00] 
[2025-11-07 10:00:00] Starting to probe columns...
[2025-11-07 10:00:10] Progress: 10/100 queries processed, found 15 columns
[2025-11-07 10:00:20] Progress: 20/100 queries processed, found 23 columns
...
[2025-11-07 10:01:00] Probing completed! Found 45 columns
[2025-11-07 10:01:00] Detected field types:
[2025-11-07 10:01:00]   - request_time: double
[2025-11-07 10:01:00]   - status: long
[2025-11-07 10:01:00]   - remote_addr: keyword
...
```

生成的 `fields.json` 格式示例：
```json
{
    "index_pattern_name": "etl-spe.accesslog_scan_index",
    "runtime_fields": {
        "remote_addr": {
            "type": "keyword"
        },
        "status": {
            "type": "long"
        },
        "request_time": {
            "type": "double"
        }
    }
}
```

#### 3.4 应用字段配置到 Kibana

使用 `ptn_add_runtime_fileds.py` 脚本将探测到的字段以 Runtime Fields 的形式添加到 Kibana Index Pattern 中：

```bash
python ptn_add_runtime_fileds.py kibana_config.json /tmp/fields.json
```

参数说明：
- `kibana_config.json` - Kibana 配置文件路径
- `/tmp/fields.json` - 上一步生成的字段配置文件

执行过程示例：
```
[2025-11-07 10:05:00] Looking for index pattern: etl-spe.accesslog_scan_index
[2025-11-07 10:05:01] Found index pattern ID: abc-123-def
[2025-11-07 10:05:01] Processing 45 runtime field(s)...
[2025-11-07 10:05:02] Warning: Field 'timestamp' already exists as a non-runtime field, skipping...
[2025-11-07 10:05:03] Successfully updated runtime fields for pattern abc-123-def
[2025-11-07 10:05:03] Runtime fields operation completed successfully!
[2025-11-07 10:05:03] Added fields: remote_addr, status, request_time, ...
[2025-11-07 10:05:03] Skipped fields (conflicts with existing non-runtime fields): timestamp
```

#### 3.5 注意事项

**字段冲突处理**

如果探测到的字段与 Index Pattern 中已存在的非 Runtime 字段同名，脚本会自动跳过该字段，避免覆盖原有字段配置。

**字段类型识别规则**

脚本会根据字段值自动识别数据类型：
- `keyword` - 文本类型字段，适用于聚合和精确匹配
- `long` - 长整型数字字段，适用于数值计算
- `double` - 浮点型数字字段，适用于精度要求较高的场景

**增量更新支持**

可以多次运行探测和应用流程，脚本会智能合并新字段，已存在的 Runtime Fields 将被更新，不会被删除。

**环境依赖**

执行脚本前需要安装以下 Python 依赖：

```bash
pip install aliyun-log-python-sdk requests
```

#### 3.6 完整操作示例

```bash
# 步骤 1: 探测字段并生成配置
python ptn_index_field_probe.py sls_config.json etl-spe.accesslog_scan_index /tmp/fields.json

# 步骤 2: 将配置应用到 Kibana Index Pattern
python ptn_add_runtime_fileds.py kibana_config.json /tmp/fields.json
```

执行成功后，在 Kibana 的 Index Pattern 字段列表中即可看到自动添加的 Runtime Fields，可以直接用于查询、聚合和可视化分析。

## 相关资源

- [SLS Scan Index 官方文档](https://help.aliyun.com/zh/sls/accelerated-scan-based-on-scan-index)
- [Kibana 对接 SLS 官方文档](https://help.aliyun.com/zh/sls/developer-reference/use-kibana-to-access-the-elasticsearch-compatible-api-of-log-service)
- [ptn_index_field_probe.py 脚本下载](https://raw.githubusercontent.com/aliyun-sls/sls-doc/refs/heads/main/src/oscompatibledemo/ptn_index_field_probe.py)
- [ptn_add_runtime_fileds.py 脚本下载](https://raw.githubusercontent.com/aliyun-sls/sls-doc/refs/heads/main/src/oscompatibledemo/ptn_add_runtime_fileds.py)