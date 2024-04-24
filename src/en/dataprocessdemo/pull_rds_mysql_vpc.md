# Obtain data from an ApsaraDB RDS for MySQL database over the internal network

If your data is stored in Simple Log Service and ApsaraDB RDS for MySQL, you can use the data transformation feature of Simple Log Service to obtain data from ApsaraDB RDS for MySQL for data enrichment.This topic describes how to configure data transformation rules and advanced parameters to obtain data from an ApsaraDB RDS for MySQL database over the internal network.

**Note**

- RDS MySQL The instance on which your ApsaraDB RDS for MySQL database is created must reside in the same region as your Simple Log Service project. Otherwise, you cannot obtain data from the database.

- Simple Log Service allows you to access the ApsaraDB RDS for MySQL database across Alibaba Cloud accounts.

-Before you access the ApsaraDB RDS for MySQL database over the internal network, you must specify a whitelist of CIDR blocks for the database. In this example, the CIDR block is 100.104.0.0/16.For more information, see [Set a whitelist](https://www.alibabacloud.com/help/en/doc-detail/43185.htm?spm=a2c4g.11186623.2.8.576b2c1c2nCZIC#concept-pdr-k2f-vdb).

- Simple Log Service allows you to access ApsaraDB RDS for MySQL databases over the internal network. Simple Log Service also allows you to access AnalyticDB for MySQL databases and PolarDB for MySQL databases over the internal network.。For more information, see [Access an AnalyticDB for MySQL database or PolarDB for MySQL database over the internal network](https://www.alibabacloud.com/help/en/doc-detail/162753.html?spm=a2c4g.11186623.6.1030.17d4272cnFGFcF#section-m4o-edb-6kt).

## Processing data

The following figures show how to configure data transformation rules and advanced parameters to obtain data from the ApsaraDB RDS for MySQL database over the internal network.

- Raw data

  - RDS MySQL Sample data records in a table of a database![](/img/dataprocessdemo/数据富化/mysql数据样例.png)

  - Sample log in a Logstore of Simple Log Service![](/img/dataprocessdemo/数据富化/Raw log entries2.png)

- Transformation process

  1. Enable the data transformation feature in the source Logstore.

  2. Use functions such as the res_rds_mysql function to pull data from the ApsaraDB RDS for MySQL database.

  3. Save the data transformation result to the destination Logstore.

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

  **Note** You must use the following transformation syntax to access the ApsaraDB RDS for MySQL database over the internal network.

  Transformation syntax:

  ```python
  e_table_map(
    res_rds_mysql(
      str_format(
        "{}:{}",
        res_local("config.vpc.instance_id.name"),
        res_local("config.vpc.instance_port.name")
      ),
      "Database account",
      "Database password",
      "Database name",
      table="Database table name"
    ),
    "field",
    "output_fields"
  )
  ```

  - You must set the same value for the name parameter in config.vpc.instance_id.name and config.vpc.instance_port.name, and the name parameter in the **Advanced Parameter Settings** section. You can customize the value.

  - The field parameter specifies the field that you want to map. This field exists in the Logstore and the ApsaraDB RDS for MySQL database. If the value of the field in the Logstore is different from the value of the field in the ApsaraDB RDS for MySQL database, the data mapping fails.

  - The output_fields parameter specifies the output fields. If the data mapping succeeds, a new log entry is generated.

- Advanced parameter settings. You must configure Advanced Parameter Settings when you configure the preview mode and a transformation rule. For more information about how to configure other parameters, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.13.576b2c1c2nCZIC#task-1181217).

  ![Add preview configuration](/img/dataprocessdemo/数据富化/高级参数设置3.png)

You must set the same value for the name parameter in the config.vpc.vpc_id.name, config.vpc.instance_id.name, and config.vpc.instance_port.name parameters. The value must be the same as the name specified in the transformation rule. You can customize the value.

| Key Format                    | Key Example value              | Value Example value       | Note                                                                                                   |
| ----------------------------- | ------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| config.vpc.vpc_id.name        | config.vpc.vpc_id.test1        | vpc-uf6mskb0b\*\*\*\*n9yj | The vpc_id parameter specifies the ID of the VPC in which the ApsaraDB RDS for MySQL instance resides. |
| config.vpc.instance_id.name   | config.vpc.instance_id.test1   | rm-uf6e61k\*\*\*\*ahd7    | The instance_id parameter specifies the ID of the ApsaraDB RDS for MySQL instance.ID。                 |
| config.vpc.instance_port.name | config.vpc.instance_port.test1 | 3306                      | specifies the internal endpoint of the ApsaraDB RDS for MySQL instance.                                |

## Query and analyze data

After you obtain data from the ApsaraDB RDS for MySQL database and enrich the data, you can analyze the data in the Simple Log Service console.For example, you can analyze the impact of the bicycle brand on shared bicycle rental, count the number of shared bicycle users per hour, and analyze the impact of bicycle batches in the market on shared bicycle rental.For more information, see [Enrich and analyze data based on the data transformation feature of Simple Log Service and ApsaraDB RDS for MySQL](https://yq.aliyun.com/articles/755595?spm=a2c4e.11155435.0.0.33d53312jdskCD).

## Troubleshooting

- A whitelist of IP addresses is not configured for the ApsaraDB RDS for MySQL instance. If the following error message is displayed, Simple Log Service is authorized to access the VPC in which the ApsaraDB RDS for MySQL database resides. However, a whitelist of IP addresses is not configured for the ApsaraDB RDS for MySQL database. Therefore, Simple Log Service cannot connect to the ApsaraDB RDS for MySQL database.

  ```
  reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
  Detail: {"errorCode": "InvalidConfig", "errorMessage": "Database connection failed, cause: (2003, "Can't connect to MySQL server on '192.168.1.1' (timed out)")
  Detail: None", "requestId": "" }", "requestId": ""}
  ```

- Advanced parameters are invalid.

  - Different names are specified in the advanced parameters. If the following error message is displayed, the name specified in the config.vpc.instance_port.name parameter is inconsistent with the name specified in the config.vpc.instance_id.name and config.vpc.vpc_id.name parameters:

    ```
    reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
    Detail: {"errorCode": "InvalidConfig", "errorMessage": "address check failed, please check the configuration of address. address: rm-bp***r5
    Detail: None", "requestId": ""}", "requestId": ""}
    ```

  - Incomplete parameter configuration. If the following error is prompted, it indicates that the configuration information for config.vpc.vpc_id.name is missing.

    ```
    reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
    Detail: {"errorCode": "InvalidConfig", "errorMessage": "address check failed, please check the configuration of address. address: rm-bp1***9r5
    Detail: None", "requestId": ""}", "requestId": ""}`
    ```

- The syntax of the transformation rule is invalid. If the following error message is displayed, the syntax of the transformation rule is invalid:

  ```
  reason: {"errorCode": "InvalidConfig", "errorMessage": "error when calling : res_rds_mysql
  Detail: {"errorCode": "InvalidConfig", "errorMessage": "Database connection failed, cause: (2003, "Can't connect to MySQL server on 'rm-bp***r5.mysql.rds.aliyuncs.com' (timed out)")
  Detail: None", "requestId": ""}", "requestId": ""}
  ```
