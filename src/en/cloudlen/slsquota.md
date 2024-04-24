# Use CloudLens for SLS to monitor project resource quotas

:::tip CloudLens for SLS
[试用 Demo](/playground/demo.html?dest=/lognext/app/lens/sls%3Fresource=/instancemenuoverview/dashboard/quota){target="\_blank"}
:::

# Background Introduction

CloudLens for SLS provides unified observability capabilities for cloud services. You can enable the collection of instance logs and global logs with a few clicks. Instance logs include important logs, detailed logs, and task operational logs. Global logs include audit logs, billing logs, error logs, and monitoring metrics.

| Log type     | Sub-type                    | Monitoring scenario                                                                         |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------- |
| Instance log | Detailed log (charged)      | Access traffic monitoring and access exception monitoring                                   |
|              | Important log (free)        | Consumer group monitoring Logtail collection monitoring                                     |
|              | Task operational log (free) | Data processing monitoring (new version) and scheduled SQL task monitoring                  |
| Global logs  | Audit log (free)            | Resource operation monitoring                                                               |
|              | Error log (free)            | Over-quota monitoring, access exception monitoring, and operation exception monitoring      |
|              | Monitored metric (free)     | Access traffic monitoring, access exception monitoring, and resource quota usage monitoring |
|              | Billing log (free)          | Resource usage tracking                                                                     |

For more information about the logs, see the following topic:[https://www.alibabacloud.com/help/en/doc-detail/456901.html?spm=a2c4g.456864.0.0.e979723c8We7zA](https://www.alibabacloud.com/help/en/doc-detail/456901.html?spm=a2c4g.456864.0.0.e979723c8We7zA)

# Usage scenarios

This topic describes how to use CloudLens for SLS to implement **usage monitoring** and **over-quota monitoring** of project resource quotas based on global error logs and monitoring metrics. This topic also describes how to **apply for resource quota adjustment**.

## CloudLens for SLS  quota monitoring dashboard

### Resource quota warning overview  

The report provides an overview of resource quota warnings for usage that exceeds 80% and over-quota distribution.

![image](/img/src/cloudlen/slsquota/fc627f3a8720cf32857caae3b444e7594565047037fba92cccdfbc266fb5abe5.png)

### Project Real-time quota usage details of key project resources

The report provides real-time usage details for some basic quotas and the data read and write quotas of projects.

![image](/img/src/cloudlen/slsquota/8d3c00d67c251c595bb2dde673d1fb163a399c979e7f911e2a7101e0bf8b9e8b.png)

![image](/img/src/cloudlen/slsquota/02698f8a1b9aecfe07b752baaafbaf122f91bd8e7c4b6dc060e3054870da995f.png)

![image](/img/src/cloudlen/slsquota/4d4b3f4a41bafa3c8224bd286a7b7dfe3b2e57f6ca9957e772e64cd7954e8a17.png)

### Project resource over-quota details

![image](/img/src/cloudlen/slsquota/bf630eb392ff98f32c9764233fb00dc386ef0a9df00764252b728226910c4b76.png)

# Monitoring practices

1. Monitoring metric classification of quota monitoring

| classification        | Monitoring metric               | description                                                                                                                             |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Real-time usage       | Basic resource quota usage      | Monitors whether the number of Logstores, machine groups, and Logtail configuration items of a project exceeds the specified threshold. |
|                       | Data read and write quota usage | Monitors the traffic written to a project and the number of data writes to the project exceeding the quota.                             |
| Over-quota monitoring | Resource over-quota count       | Monitors the over-quota counts for basic quotas and data read and write quotas. \_ Logstore dependency：internal-error_log              |

2.  Advanced monitoring metrics

| classification             | scene                             | Monitoring items       | description                                                                                                                                                   |
| -------------------------- | --------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic resource quota       | LogStore                          | Real-time usage        | Monitors whether the number of Logstores in a project exceeds the threshold in percentage.                                                                    |
|                            |                                   | Over-quota             | Monitors the number of times that the number of Logstores in a project exceeds the quota. Logstore dependency：internal-error_log                             |
|                            | Machine Groups                    | Usage                  | _ Monitors whether the number of machine groups in a project exceeds the threshold in percentage. _ Metricstore dependency：internal-monitor-metric           |
|                            |                                   | Over-quota             | _ Monitors the number of times that the number of machine groups in a project exceeds the quota. _ Logstore dependency：internal-error_log                    |
|                            | Logtail Collection Configurations | Water-level Monitoring | _ Monitors whether the number of Logtail configuration items in a project exceeds the threshold in percentage. _ Logstore dependency：internal-monitor-metric |
|                            |                                   | Over-quota             | _ Monitors the number of times that the number of Logstores in a project exceeds the quota. _ Logstore dependency：internal-error_log                         |
| Data read and write quotas | Data written to a project         | Usage                  | _ 监控 Monitors whether the number of machine groups in a project exceeds the threshold in percentage. _ Logstore dependency：internal-monitor-metric         |
|                            |                                   | Over-quota             | _ Monitors the traffic written to a project and the number of data writes to the project exceeding the quota. _ Logstore dependency：internal-error_log       |
|                            | Data written to a project         | Usage                  | _ Monitors whether the data written to a project exceeds the threshold in percentage. _ Logstore dependency：internal-monitor-metric                          |
|                            |                                   | Over-quota             | _ Monitors whether the number of data writes to a project exceeds the quota. _ Logstore dependency：internal-error_log                                        |

## Basic monitoring

### Basic resource quota usage

1. Execute an SQL query statement to check whether the number of Logstores, number of machine groups, and number of Logtail configuration items meet the alert thresholds at an interval of 15 minutes.

![image](/img/src/cloudlen/slsquota/60f9126a31ae6b155069ecc273d8dfc321286d9ed851f0b774fffca8ebd0eb29.png)

Note: An SQL query statement returns 100 data records by default. If you want to return all query results, you can add limit 1000 to the end of the SQL statement, indicating that 1,000 query results can be returned.

SQL query statement: **(Note: The SQL statement can check whether a maximum of 1,000 data records meet the alert conditions. We recommend that you filter the results in the SQL statement first)**. Example:

```
    * | select Project, region, logstore_ratio, machine_group_ratio, logtail_config_ratio from
    (SELECT A.id as Project , A.region as region,
    round(COALESCE(SUM(B.count_logstore), 0)/cast(json_extract(A.quota, '$.logstore') as double) * 100, 3)  as logstore_ratio,  cast(json_extract(A.quota, '$.logstore') as double) as quota_logstore,
    round(COALESCE(SUM(C.count_machine_group), 0)/cast(json_extract(A.quota, '$.machine_group') as double) * 100, 3)  as machine_group_ratio, cast(json_extract(A.quota, '$.machine_group') as double) as quota_machine_group,
    round(COALESCE(SUM(D.count_logtail_config), 0)/cast(json_extract(A.quota, '$.config') as double) * 100, 3)  as logtail_config_ratio, cast(json_extract(A.quota, '$.config') as double) as quota_logtail_config
    FROM  "resource.sls.cmdb.project" as A
    LEFT JOIN (
      SELECT project, COUNT(*) AS count_logstore
      FROM "resource.sls.cmdb.logstore" as B
      GROUP BY project
    ) AS B ON A.id = B.project
    LEFT JOIN (
      SELECT project, COUNT(*) AS count_machine_group
      FROM "resource.sls.cmdb.machine_group" as C
      GROUP BY project
    ) AS C ON A.id = C.project
    LEFT JOIN (
      SELECT project, COUNT(*) AS count_logtail_config
      FROM "resource.sls.cmdb.logtail_config" as D
      GROUP BY project
    ) AS D ON A.id = D.project
    group by  A.id, A.quota, A.region)
    where quota_logstore is not null and quota_machine_group is not null and quota_logtail_config is not null  and (logstore_ratio > 80 or machine_group_ratio > 80 or logtail_config_ratio > 80) limit 10000
```

2. Configure an alert.

Configure alert trigger conditions and alert policies based on your business requirements.

- The alert level is critical if the number of either Logstores, machine groups, or Logtail configuration items in a project exceed 90% of the quota.
- The alert level is medium if the number of either Logstores, machine groups, or Logtail configuration items in a project exceed 80% of the quota.

![image](/img/src/cloudlen/slsquota/0169f81ad104ff7e45ccc857a3d834f7e7e3afc85a11168ad8e309a4a6c4fdb0.png)

### Data read and write quota usage

1. Execute an SQL query statement to check whether the data written to a project and the number of writes to the project exceed the thresholds at an interval of 1 minute.

![image](/img/src/cloudlen/slsquota/bbd082c489da1f20034898e2103cdaeae15549764e0ea7e084eb7df15c2a4594.png)

Note: An SQL query statement returns 100 data records by default. If you want to return all query results, you can add limit 1000 to the end of the SQL statement, indicating that 1,000 query results can be returned.

SQL query statement: **(Note: The SQL statement can check whether a maximum of 1,000 data records meet the alert conditions. We recommend that you filter the results in the SQL statement first ）**. Example:

```
    (*)| select Project, region, inflow_ratio, write_cnt_ratio from (SELECT cmdb.id as Project, cmdb.region as region, round(COALESCE(M.name1,0)/round(cast(json_extract(cmdb.quota, '$.inflow_per_min') as double)/1000000000, 3) * 100, 3) as inflow_ratio, round(COALESCE(M.name2,0)/cast(json_extract(cmdb.quota, '$.write_cnt_per_min') as double) * 100, 3) as write_cnt_ratio
     from "resource.sls.cmdb.project" as cmdb
    LEFT JOIN (
         SELECT element_at(__labels__, 'project') as project,
     round(MAX(CASE WHEN __name__ = 'logstore_origin_inflow_bytes' THEN __value__ ELSE NULL END)/1000000000, 3) AS name1,
     MAX(CASE WHEN __name__ = 'logstore_write_count' THEN __value__ ELSE NULL END) AS name2
      FROM "internal-monitor-metric.prom" where __name__ in ('logstore_origin_inflow_bytes','logstore_write_count') and regexp_like(element_at( split_to_map(__labels__, '|', '#$#') , 'project') , '.*') group by project) AS M ON cmdb.id = M.project) where inflow_ratio > 80 or write_cnt_ratio > 80  limit 10000
```

2. Configure an alert.

Select a query interval of 5 minutes (relative). Configure alert trigger conditions and alert policies based on your business requirements.

- The alert level is critical if either of the data written to the project or the number of data writes to the project exceeds 90% of the quota.
- The alert level is medium if either of the data written to the project or the number of data writes to the project exceeds 80% of the quota.

![image](/img/src/cloudlen/slsquota/cf5e8850a69073b2fc4a6355c2039b454be1b1d5e1b9a36d6df7bf17026dd5b9.png)

![image](/img/src/cloudlen/slsquota/4ef76793966cfa0170205a83e644bc340de7ace1badce1c43551fd5353edd48e.png)

### Resource over-quota count

1. Execute an SQL query statement to check whether over-quota occurs at an interval of 15 minutes.

![image](/img/src/cloudlen/slsquota/185b99ba55ecd8efdd3a49ad321d89e182d1bfe90100a8691971108a7f0662a5.png)

SQL query statement:

```
    ((* and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed or ErrorCode: ShardWriteQuotaExceed or ErrorCode: ShardReadQuotaExceed)))| SELECT Project,
    CASE
    WHEN ErrorMsg like '%Project write quota exceed: inflow%' then 'Projectdata write exceeds the quota'
    WHEN ErrorMsg like '%Project write quota exceed: qps%' then 'Projectdata writes exceeds the quota'
    WHEN ErrorMsg like '%dashboard quota exceed%' then 'The report quota is exceeded'
    WHEN ErrorMsg like '%config count%' then 'Logtail configuration item count exceeds the quota'
    WHEN ErrorMsg like '%machine group count%' then 'The number of machine groups exceeds the quota.'
    WHEN ErrorMsg like '%Alert count %' then 'The alert count exceeds the quota'
    WHEN ErrorMsg like '%logstore count %' then 'LogStore count exceeds the quota'
    WHEN ErrorMsg like '%shard count%' then 'Shard count exceeds the quota.'
    WHEN ErrorMsg like '%shard write bytes%' then 'Shard write exceeds the quota'
    WHEN ErrorMsg like '%shard write quota%' then 'Shard write exceeds the quota'
    WHEN ErrorMsg like '%user can only run%' then 'The number of concurrent SQL analysis operations exceeds the quota'
        ELSE ErrorMsg
      END AS ErrorMsg,
    COUNT(1) AS count GROUP BY Project, ErrorMsg Limit 1000
```

2. Configure an alert.

Configure alert trigger conditions and alert policies based on your business requirements.

- The alert level is critical if any of the preceding types of over-quota occurs for more than ten times.

- The alert level is medium if any of the preceding types of over-quota occurs once.

![image](/img/src/cloudlen/slsquota/75eb25b097df385a3c986138ad0883fcc9ba79020b467e3bf4228ee63e5c78d7.png)

## Advanced monitoring

The following section describes basic monitoring sub-items, which are not required in most cases. It is for reference when you need more detailed alert monitoring.

### Logstore monitoring

#### Usage

1、Execute an SQL query statement to check whether the number of Logstores exceeds the threshold at an interval of 15 minutes.

Note: An SQL query statement returns 100 data records by default. If you want to return all query results, you can add limit 1000 to the end of the SQL statement, indicating that 1,000 query results can be returned.

![image](/img/src/cloudlen/slsquota/265ecfb587548b3adcc123b0237a76f3d1ecc5f6fa71ec75537efa11e598618c.png)

SQL query statement：

```
    * |  select Project, region, round(count_logstore/quota_logstore * 100, 3)  as logstore_ratio from
    (SELECT A.id as Project , A.region as region, COALESCE(SUM(B.count_logstore), 0)  AS count_logstore , cast(json_extract(A.quota, '$.logstore') as double)  as quota_logstore
    FROM  "resource.sls.cmdb.project" as A
    LEFT JOIN (
      SELECT project, COUNT(*) AS count_logstore
      FROM "resource.sls.cmdb.logstore" as B
      GROUP BY project
    ) AS B ON A.id = B.project
    group by A.id, A.quota, A.region) where  quota_logstore is not null   order by logstore_ratio desc limit 1000
```

2、Configure an alert

Configure alert trigger conditions and alert policies based on your business requirements.：

- The alert level is critical if Logstore over-quota occurs for ten times in a project.
- The alert level is medium if Logstore over-quota occurs once in a project.
