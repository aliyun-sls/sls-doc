# Use CloudLens for RDS to collect and use logs

:::tip CloudLens for RDS
[试用 Demo](/playground/demo.html?dest=/lognext/app/lens/rds){target="\_blank"}
:::

### Activation and collection

Step 1: Log on to the [Simple Log Service console].(https://sls.console.aliyun.com/lognext/profile)On the Cloud Service Lens tab in the Log Application section, find the [CloudLens for RDS] (https://sls.console.aliyun.com/lognext/app/lens/rds?resource=/common-data-access)application and click the application. On the page that appears, click Enable to activate CloudLens for RDS.

![image](/img/src/cloudlen/rds/580bc0bafc43a58ee74c1c3074a1ceb7d3271d13207660181e369ee68c299e80.png)

![image](/img/src/cloudlen/rds/0ae707f0151bd992f4f42011f0279bee7b0238d7d30e8797f7dbce9d7dd8e4af.png)

Step 2: Purchase an ApsaraDB RDS instance in the [ApsaraDB RDS console]. (https://rdsnext.console.aliyun.com/rdsList/cn-hangzhou/basic)Skip this step if an ApsaraDB RDS instance is available.

Step 3: CloudLens for RDS automatically synchronizes your ApsaraDB RDS instance information.

![image](/img/src/cloudlen/rds/4efe7a95a7f5aeb6640c28d43a872af2b03ed20cff725639e77f47228734ed3e.png)

Step 4: Enable log collection for the ApsaraDB RDS instance.

When you enable audit log collection, you can specify a custom project or Logstore.

![image](/img/src/cloudlen/rds/7cbf611d0e08d33622acf5e24bd7e729c0d18207f1df1f213d26dc789d78c01a.png)

Other logs have fixed project and Logstore names, which cannot be modified.

![image](/img/src/cloudlen/rds/db1148419d0b8a45a216c0dccb82faa0d67b7911e662fe6be570152db8de70d7.png)

You can also enable automatic collection for multiple instances with specific attributes such as the region, instance name, or engine type at a time.

![image](/img/src/cloudlen/rds/b13d0c4931288887f770f9b64dbf308310be9857d3189a2bdadb3a9f93cefee8.png)

Regardless of the method used, CloudLens for RDS automatically collects logs of the specified log types for the instances after log collection is enabled.

### Log fields

After you enable log collection by following the preceding steps, CloudLens for RDS collects logs of the specified types and delivers the logs to the destination Logstore.

Audit log

| Field Name    | Description                                                                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_\_topic\_\_ | The topic of the log. The value is fixed tords_audit_log.                                                                                                                                                                                |
| instance_id   | The ID of the ApsaraDB RDS instance.                                                                                                                                                                                                     |
| check_rows    | The number of scanned rows.                                                                                                                                                                                                              |
| db            | The database name                                                                                                                                                                                                                        |
| fail          | Indicates whether the SQL statement fails. If the instance is an ApsaraDB RDS for MySQL or SQL Server instance and the SQL statement is successfully executed, the value of this field is 0. All values other than 0 indicate a failure. |
| client_ip     | The IP address of the client that accesses the ApsaraDB RDS instance.                                                                                                                                                                    |
| latency       | The time that is consumed to return the result of the SQL statement. Unit: microsecond.                                                                                                                                                  |
| origin_time   | The point in time at which the SQL statement is executed.                                                                                                                                                                                |
| return_rows   | The number of returned rows.                                                                                                                                                                                                             |
| sql           | The SQL statement that is executed.                                                                                                                                                                                                      |
| thread_id     | The ID of the thread.                                                                                                                                                                                                                    |
| user          | The name of the user who executes the SQL statement.                                                                                                                                                                                     |
| update_rows   | The number of updated rows.                                                                                                                                                                                                              |

Slow query logs

| Fields        | 解释                                                                                 |
| ------------- | ------------------------------------------------------------------------------------ |
| \_\_topic\_\_ | The topic of the log：Default value  rds_error_log,pg The engine is rds_error_log_pg |
| db_name       | The database name                                                                    |
| db_type       | The database type.                                                                   |
| db_version    | The database version.                                                                |
| instance_id   | The cluster ID.                                                                      |
| lock_time     | The lock time.                                                                       |
| owner_id      | aliuid                                                                               |
| query_sql     | The query statement.                                                                 |
| query_time    | The execution time of the statement.                                                 |
| region        | The region                                                                           |
| rows_examined | The number of scanned rows.                                                          |
| rows_sent     | The number of returned rows.                                                         |
| start_time    | The start time of the query.                                                         |
| user_host     | The information about the client.                                                    |

Error logs

| Field         | Description                                                                       |
| ------------- | --------------------------------------------------------------------------------- |
| \_\_topic\_\_ | The topic of the log：Default value rds_slow_log,pg The engine is rds_slow_log_pg |
| instance_id   | The cluster ID                                                                    |
| collect_time  | The collection time                                                               |
| db_type       | The type of the database engine.                                                  |
| db_version    | The version of the database engine                                                |
| content       | The log content                                                                   |
| eventType     | The event type                                                                    |

### Typical scenarios

After the preceding three types of logs are collected, you can write SQL statements to analyze the logs based on your business requirements.

Audit logs cover error logs and slow query logs.If your business requires audit logs, you can directly enable audit log collection to provide O&M capabilities for most of the following scenarios. If you do not have audit requirements, you can enable collection of error logs and slow query logs separately to reduce costs.

Scenario 1：

Routine operations

sql：

```
    ## Collect PV data from audit logs.
    __topic__: rds_audit_log  | select count(1) as PV

    ## Collect UV data from audit logs.
    __topic__: rds_audit_log  | select approx_distinct(client_ip) as UV

    ## Collect the accumulative number of rows inserted from audit logs.
    __topic__: rds_audit_log and sql: "insert " and update_rows > 0 | select coalesce(sum(update_rows), 0) as cnt where regexp_extract(sql, '(?is)\binsert\s+(?:into\s+)?`?(\w+)`?\b', 1) is not NULL

    ## Collect the accumulative number of rows updated from audit logs.
    __topic__: rds_audit_log and sql: "update " and update_rows > 0 | select coalesce(sum(update_rows), 0) as cnt where regexp_extract(sql, '(?is)\s*update\s+`?(\w+)`?\b', 1) is not NULL

    ## Collect the accumulative number of rows deleted from audit logs.
    __topic__: rds_audit_log and sql: "delete from" and update_rows > 0 | select coalesce(sum(update_rows), 0) as cnt

    ## Collect statistics on execution error logs from audit logs.
    __topic__: rds_audit_log  and fail > 0 | select *

    ## Collect statistics on execution error logs from error logs.
    __topic__:rds_error_log | select *
```

Scenario 2：Database security

```
    ## Collect the number of logon errors from audit logs.
    __topic__: rds_audit_log and sql: "login failed!"  | select count(1) as cnt

    ## Collect the number of logon errors from error logs.
    __topic__: rds_error_log and content: "Access denied for user" | select count(1) as cnt

    ## Collect the number of batch deletions from audit logs.
    __topic__: rds_audit_log and sql: "delete from" and update_rows > 10 | select count(1) as cnt

    ## Collect the number of high-risk SQL statements for injection or metadata table access from audit logs.
    ## You can use a third-party library for the condition to achieve more accurate detection and query logic for high-risk SQL statements.
    __topic__: rds_audit_log and (sql:information_schema or sql:1 or sql:a) | select count(1) as cnt where regexp_like(sql, '(?i)SELECT.+FROM\s+information_schema.+') or regexp_like(sql, '(?i)\b1\s*=\s*1\s+or\b') or regexp_like(sql, '(?i)\bor\s+1\s*=\s*1\b') or regexp_like(sql, '(?i)\bor\s+''a''\s*=\s*''a''\b')or regexp_like(sql, '(?i)\b''a''\s*=\s*''a''\s+or\b')
```

Scenario 3：Performance analysis

1.Slow SQL query records

```
    ## Query SQL records with a latency of 1 second from audit logs.
    (__topic__: rds_audit_log and latency > 1000000)| select *

    ## Query SQL records with a latency of 1 second from slow query logs.
    (__topic__: rds_slow_log and query_time > 1)| select *
```

The preceding scenarios cover major elements in most database O&M scenarios: security, performance, and operations.You can combine the collected logs for more complex scenarios.通 You can use an SDK to call log query results and integrate them with your own O&M platform. You can also use the query, [dashboard],(https://www.alibabacloud.com/help/en/doc-detail/59324.html?spm=a2c4g.347680.0.0.62183e06EZWVJv)、 and [alert] (https://www.alibabacloud.com/help/en/doc-detail/207609.html?spm=a2c4g.209950.0.0.541e2e58j8ZRfl)features provided by Simple Log Service to use your database logs.

### summary

In addition to CloudLens for RDS, Simple Log Service also provides other applications for relational databases and NoSQL databases, such as CloudLens for PolarDB and CloudLens for Redis. This helps you quickly collect logs of cloud databases.
