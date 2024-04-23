# 使用 RDS 内网地址访问 RDS MySQL 数据库

当您的数据分散存储在日志服务 Logstore 和 RDS MySQL 数据库中时，您可以通过日志服务数据加工功能从对应数据库获取数据，实现数据富化。本文介绍如何配置数据 Transformation rule 及高级参数，实现通过 RDS 内网地址访问 RDS MySQL 数据库获取数据。

**Note**

- RDS MySQL 实例与日志服务 Project 需处于同一地域，否则无法获取数据。

- 日志服务支持跨账号访问 RDS MySQL 数据库。

- 使用 RDS 内网地址访问 RDS MySQL 数据库时，需设置 IP 地址段白名单（固定设置为 100.104.0.0/16）。更多信息，请参见[设置白名单](https://help.aliyun.com/document_detail/43185.htm?spm=a2c4g.11186623.2.8.576b2c1c2nCZIC#concept-pdr-k2f-vdb)。

- 日志服务除了支持通过阿里云内网地址访问 RDS MySQL 数据库外，还支持通过内网地址访问 AnalyticDB MySQL 和 PolarDB MySQL 数据库。具体操作，请参见[附录：使用内网地址访问 AnalyticDB MySQL 或 PolarDB MySQL 数据库](https://help.aliyun.com/document_detail/162753.html?spm=a2c4g.11186623.6.1030.17d4272cnFGFcF#section-m4o-edb-6kt)。

## 加工数据

您可以参见如下 Solution 配置数据 Transformation rule 和高级参数，实现通过 RDS 内网地址访问 RDS MySQL 数据库获取数据。

- 原始数据

  - RDS MySQL 数据库表中的数据样例如下表所示。![](/img/dataprocessdemo/数据富化/mysql数据样例.png)

  - 日志服务 Logstore 中的日志样例如下所示。![](/img/dataprocessdemo/数据富化/Raw log entries2.png)

- 加工流程

  1. 在源 Logstore 中开启数据加工任务。

  2. 使用数据加工中的 res_rds_mysql 等函数从 RDS MySQL 数据库中拉取数据。

  3. 将 Transformation result 保存到目标 Logstore 中。

  ![](/img/dataprocessdemo/数据富化/加工流程.png)

- Transformation rule

  ```python
  e_table_map(
    res_rds_mysql(
      str_format("{}:{}",
      res_local("config.vpc.instance_id.test1"),
      res_local("config.vpc.instance_port.test1")),
      "your rds username",
      "your rds password",
      "your database",
      table="your table",
      primary_keys="bikeid"
    ),
    "bikeid",
    ["brand","batch"]
  )
  ```

  **Note** 通过 RDS 内网地址访问 RDS MySQL 数据库，请严格遵循以下语法，请勿使用其他加工语法。

  Transformation rule 格式如下所示：

  ```python
  e_table_map(
    res_rds_mysql(
      str_format(
        "{}:{}",
        res_local("config.vpc.instance_id.name"),
        res_local("config.vpc.instance_port.name")
      ),
      "数据库账号",
      "数据库密码",
      "数据库名称",
      table="数据库表名"
    ),
    "field",
    "output_fields"
  )
  ```

  - config.vpc.instance_id.name 和 config.vpc.instance_port.name 中的 name 需保持一致，且还需与 **高级参数配置** 中配置的 name 保持一致，支持自定义。

  - field 为匹配字段，Logstore 中的日志和 RDS MySQL 数据库表中数据存在共同字段，且字段的值相同，才能匹配成功。

  - output_fields 为输出字段，字段匹配成功后，返回输出字段，生成一条新的日志。

- 高级参数配置通过 RDS 内网地址访问 RDS MySQL 数据库，还需在预览数据和保存 Transformation result 时设置 **高级参数配置** ，其他参数配置请参见[创建数据加工任务](https://help.aliyun.com/document_detail/125615.htm?spm=a2c4g.11186623.2.13.576b2c1c2nCZIC#task-1181217)。

  ![添加预览配置](/img/dataprocessdemo/数据富化/高级参数设置3.png)

  config.vpc.vpc_id.name、config.vpc.instance_id.name 和 config.vpc.instance_port.name 中的 name 需保持一致，且还需与 Transformation rule 中配置的 name 保持一致，支持自定义。

  | Key 格式                      | Key 示例值                     | Value 示例值              | Note                                          |
  | ----------------------------- | ------------------------------ | ------------------------- | --------------------------------------------- |
  | config.vpc.vpc_id.name        | config.vpc.vpc_id.test1        | vpc-uf6mskb0b\*\*\*\*n9yj | vpc_id 为 RDS MySQL 实例所属于的网络类型 ID。 |
  | config.vpc.instance_id.name   | config.vpc.instance_id.test1   | rm-uf6e61k\*\*\*\*ahd7    | instance_id 为 RDS MySQL 实例 ID。            |
  | config.vpc.instance_port.name | config.vpc.instance_port.test1 | 3306                      | instance_port 为 RDS MySQL 实例内网地址端口。 |

## 查询分析数据

获取 RDS MySQL 数据，完成数据富化后，您可以在日志服务控制台上进行数据分析。例如：分析自行车品牌对共享单车租赁影响、统计每小时用车人数、分析自行车投放市场批次对共享单车租赁影响等。更多信息，请参见[基于日志服务数据加工与 RDS MySQL 做数据富化以及数据分析](https://yq.aliyun.com/articles/755595?spm=a2c4e.11155435.0.0.33d53312jdskCD)。

## 错误排查

- RDS 白名单未配置 如果提示如下错误，表示数据加工授权后台授权 VPC 映射已经成功，但是因为 RDS 没有配置白名单，导致无法连接到数据库。

  ```
  reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
  Detail: {"errorCode": "InvalidConfig", "errorMessage": "Database connection failed, cause: (2003, "Can't connect to MySQL server on '192.168.1.1' (timed out)")
  Detail: None", "requestId": "" }", "requestId": ""}
  ```

- 高级参数配置错误

  - 高级参数配置中 name 不一致 如果提示如下错误，表示 config.vpc.instance_port.name 中的 name 与 config.vpc.instance_id.name、config.vpc.vpc_id.name 中的 name 设置不一致。

    ```
    reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
    Detail: {"errorCode": "InvalidConfig", "errorMessage": "address check failed, please check the configuration of address. address: rm-bp***r5
    Detail: None", "requestId": ""}", "requestId": ""}
    ```

  - 参数配置不完整 如果提示如下错误，表示缺少 config.vpc.vpc_id.name 配置信息。

    ```
    reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
    Detail: {"errorCode": "InvalidConfig", "errorMessage": "address check failed, please check the configuration of address. address: rm-bp1***9r5
    Detail: None", "requestId": ""}", "requestId": ""}`
    ```

- 加工语句错误 如果提示如下错误，表示使用了错误的加工语法。

  ```
  reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
  Detail: {"errorCode": "InvalidConfig", "errorMessage": "Database connection failed, cause: (2003, "Can't connect to MySQL server on 'rm-bp***r5.mysql.rds.aliyuncs.com' (timed out)")
  Detail: None", "requestId": ""}", "requestId": ""}
  ```
