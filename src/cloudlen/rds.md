# 基于 RDS lens 的日志采集和应用

:::tip CloudLens for RDS
[试用 Demo](/playground/demo.html?dest=/lognext/app/lens/rds){:rel="noopener noreferrer" target="\_blank"}
:::

### 背景

去年阿里云日志服务与云数据库 RDS 联合推出 CloudLens for RDS，可以通过该产品实时查看 RDS SQL 审计日志的采集状态，集中管理采集配置，并可基于采集到的日志进行后续的审计、分析、告警等操作。近期，RDS Lens  在此基础上，针对无审计需求的客户场景，提供了可单独采集慢日志和错误日志的能力。用户可以在无需开启审计日志的情况下，单独使用慢日志和错误日志来满足自己的监控需求，从而降低使用成本。

本文将介绍如何开通 RDS Lens、如何单个开启指定类型的日志采集，如何自动化批量开启指定类型的日志的采集，以及罗列一些基于这些采集日志的常见的使用场景，方便大家参考做更多场景的二次开发。

### 开通和采集

第一步：在[SLS](https://sls.console.aliyun.com/lognext/profile)中的日志应用里的云产品 Lens 下，搜索  [CloudLens for RDS](https://sls.console.aliyun.com/lognext/app/lens/rds?resource=/common-data-access)进入，点击立即开启开通 RDS Lens

![image](/img/src/cloudlen/rds/580bc0bafc43a58ee74c1c3074a1ceb7d3271d13207660181e369ee68c299e80.png)

![image](/img/src/cloudlen/rds/0ae707f0151bd992f4f42011f0279bee7b0238d7d30e8797f7dbce9d7dd8e4af.png)

第二步：在 RDS  的产品官网[购买](https://rdsnext.console.aliyun.com/rdsList/cn-hangzhou/basic)RDS  的实例，已经购买的可以忽略。

第三步：RDS lens  会自动同步您的 RDS  实例信息。如果是刚购买实例，实例创建成功后，一分钟内，就可以在 RDS Lens 看到实例列表信息。

![image](/img/src/cloudlen/rds/4efe7a95a7f5aeb6640c28d43a872af2b03ed20cff725639e77f47228734ed3e.png)

第四步：开启 RDS  实例的日志采集。点击开启可以为单个实例单独做开启。。需要注意的是，审计日志依赖 RDS  的 sql 洞察，所以开通审计日志的时候，RDS Lens  会默认帮您开启 sql  洞察。

审计日志开启可以自由指定目标 project logstore

![image](/img/src/cloudlen/rds/7cbf611d0e08d33622acf5e24bd7e729c0d18207f1df1f213d26dc789d78c01a.png)

其他日志采用固定 project  和 logstore  命名，不允许修改。慢日志和错误日志统一都投递到 slow_error_log 里

![image](/img/src/cloudlen/rds/db1148419d0b8a45a216c0dccb82faa0d67b7911e662fe6be570152db8de70d7.png)

也可以通过自动化采集为一些特定属性的实例做批量的开启（按地域，实例名，引擎类型等）

![image](/img/src/cloudlen/rds/b13d0c4931288887f770f9b64dbf308310be9857d3189a2bdadb3a9f93cefee8.png)

下图为自动化采集，按区域进行自动化的采集。

![image](/img/src/cloudlen/rds/35db24ee60229ed5020ae0e9222a0b4561243fc6c6189c94ce1a81e1f6988f19.png)

不管通过哪种手段，开启后的实例，将会自动帮用户采集对应的日志类型的日志。

### 日志字段介绍

按照上一步就可以采集到您想要的指定类型的日志到目标 logstore 里了。下面为日志的具体字段名以及含义，了解这些含义方便我们写更多复杂的 sql 来适应自己的业务场景。

审计日志

| 字段名称      | 说明                                                                                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_\_topic\_\_ | 日志主题，固定为 rds_audit_log。                                                                                                                                                                          |
| instance_id   | RDS 实例 ID。                                                                                                                                                                                             |
| check_rows    | 扫描的行数。                                                                                                                                                                                              |
| db            | 数据库名。                                                                                                                                                                                                |
| fail          | SQL 执行是否出错。 _ 如果是 MySQL 实例或 SQL Server 实例，则执行成功时，字段值为 0，除 0 之外的其他值都表示失败。 _ 如果是 PostgreSQL 实例，则执行成功时，字段值为 0000，除 0000 之外的其他值都表示失败。 |
| client_ip     | 访问 RDS 实例的客户端 IP 地址。                                                                                                                                                                           |
| latency       | 执行 SQL 操作后，多久返回结果，单位：微秒。                                                                                                                                                               |
| origin_time   | 执行操作的时间点。                                                                                                                                                                                        |
| return_rows   | 返回的行数。                                                                                                                                                                                              |
| sql           | 执行的 SQL 语句。                                                                                                                                                                                         |
| thread_id     | 线程 ID。                                                                                                                                                                                                 |
| user          | 执行操作的用户名。                                                                                                                                                                                        |
| update_rows   | 更新的行数。                                                                                                                                                                                              |

慢日志

| 字段          | 解释                                                        |
| ------------- | ----------------------------------------------------------- |
| \_\_topic\_\_ | 日志主题：默认为  rds_error_log，pg 引擎为 rds_error_log_pg |
| db_name       | 数据库名称                                                  |
| db_type       | 数据库类型                                                  |
| db_version    | 数据库版本                                                  |
| instance_id   | 集群 ID                                                     |
| lock_time     | 锁时间                                                      |
| owner_id      | aliuid                                                      |
| query_sql     | 查询语句                                                    |
| query_time    | 查询耗时                                                    |
| region        | 区域                                                        |
| rows_examined | 扫描行数                                                    |
| rows_sent     | 返回记录                                                    |
| start_time    | 执行时间                                                    |
| user_host     | 客户端信息                                                  |

错误日志

| 字段          | 解释                                                      |
| ------------- | --------------------------------------------------------- |
| \_\_topic\_\_ | 日志主题：默认为  rds_slow_log，pg 引擎为 rds_slow_log_pg |
| instance_id   | 集群 ID                                                   |
| collect_time  | 采集时间                                                  |
| db_type       | 数据库引擎类型                                            |
| db_version    | 数据库引擎版本                                            |
| content       | 日志内容                                                  |
| eventType     | 事件类型                                                  |

### 典型应用场景

有了上述这三种类型的日志，我们可以根据业务的需求来写 sql 分析。

这三种日志里：审计是覆盖了错误日志和慢日志的。如果业务是本来就需要审计日志的，直接开启审计日志就可以获取下面大部分场景的运维能力，如果无审计要求，为了降低成本，只需单独开通错误日志和慢日志也可以完成下面的部分场景的能力。

场景一：

日常运营

sql：

```
    ## 统一pv 依赖开通审计日志
    __topic__: rds_audit_log  | select count(1) as PV

    ## 统计uv 依赖开通审计日志
    __topic__: rds_audit_log  | select approx_distinct(client_ip) as UV

    ## 统计累计插入行数 依赖开通审计日志
    __topic__: rds_audit_log and sql: "insert " and update_rows > 0 | select coalesce(sum(update_rows), 0) as cnt where regexp_extract(sql, '(?is)\binsert\s+(?:into\s+)?`?(\w+)`?\b', 1) is not NULL

    ## 统计累计更新行数 依赖开通审计日志
    __topic__: rds_audit_log and sql: "update " and update_rows > 0 | select coalesce(sum(update_rows), 0) as cnt where regexp_extract(sql, '(?is)\s*update\s+`?(\w+)`?\b', 1) is not NULL

    ## 统计累计删除行数 依赖开通审计日志
    __topic__: rds_audit_log and sql: "delete from" and update_rows > 0 | select coalesce(sum(update_rows), 0) as cnt

    ## 统计执行错误日志 依赖开通审计日志
    __topic__: rds_audit_log  and fail > 0 | select *

    ## 统计执行错误日志 依赖开通错误日志
    __topic__:rds_error_log | select *
```

场景二：数据库安全

```
    ## 统计登陆错误次数 依赖开通审计日志
    __topic__: rds_audit_log and sql: "login failed!"  | select count(1) as cnt

    ## 统计登陆错误次数 依赖开通错误日志
    __topic__: rds_error_log and content: "Access denied for user" | select count(1) as cnt

    ## 统计大批量的删除次数 依赖开通审计日志
    __topic__: rds_audit_log and sql: "delete from" and update_rows > 10 | select count(1) as cnt

    ## 统计危险类sql次数：注入或者元数据表访问  依赖开通审计日志
    ## 此处条件可以接入第三方语库从而实现更精确的危险检测查询逻辑
    __topic__: rds_audit_log and (sql:information_schema or sql:1 or sql:a) | select count(1) as cnt where regexp_like(sql, '(?i)SELECT.+FROM\s+information_schema.+') or regexp_like(sql, '(?i)\b1\s*=\s*1\s+or\b') or regexp_like(sql, '(?i)\bor\s+1\s*=\s*1\b') or regexp_like(sql, '(?i)\bor\s+''a''\s*=\s*''a''\b')or regexp_like(sql, '(?i)\b''a''\s*=\s*''a''\s+or\b')
```

场景三：性能分析

1.慢 sql 记录

```
    ## 查询执行延迟1s的sql记录 依赖开通审计日志
    (__topic__: rds_audit_log and latency > 1000000)| select *

    ## 查询执行延迟1s的sql记录 依赖开通慢日志
    (__topic__: rds_slow_log and query_time > 1)| select *
```

上述罗列的场景，基本包含了   数据库运维场景的几大要素：安全、性能、运营。使用者可以基于采集过来的日志进行更复杂的组合来使用。通过 sdk 来调用日志查询结果来集成到自己的运维平台、也可以使用 SLS 提供的查询、[仪表盘](https://help.aliyun.com/document_detail/59324.html?spm=a2c4g.347680.0.0.62183e06EZWVJv)、[告警功能](https://help.aliyun.com/document_detail/207609.html?spm=a2c4g.209950.0.0.541e2e58j8ZRfl)来应用自己的数据库日志数据。

### 总结

除了 RDS Lens，sls  在关系型数据库和 nosql 领域提供了诸如 PolarDB Lens、Redis Lens 等帮助用户快速接入云产品数据库的产品日志。通过统一的采集能力和形态，并基于 sls  强大的查询分析能力、可视化、告警等功能，可以帮用户更全面稳定的使用好数据库的日志。
