# 使用 CloudLens for SLS 监控 Project 资源配额最佳实践

:::tip CloudLens for SLS
[试用 Demo](/playground/demo.html?dest=/lognext/app/lens/sls%3Fresource=/instancemenuoverview/dashboard/quota){:rel="noopener noreferrer" target="\_blank"}
:::

# 背景介绍

Alibaba Cloud Lens  基于  SLS  构建统一云产品可观测能力，支持一键开启实例日志（重要日志、详细日志、作业运行日志）和全局日志（审计日志、计费日志、错误日志、监控指标）的采集功能。

| 日志分类 | 子分类               | 监控场景说明                               |
| -------- | -------------------- | ------------------------------------------ |
| 实例日志 | 详细日志（收费）     | 访问流量监控 访问异常监控                  |
|          | 重要日志（免费）     | 消费组监控 Logtail 采集监控                |
|          | 作业运行日志（免费） | 数据加工（新版）监控 定时 SQL 任务监控     |
| 全局日志 | 审计日志（免费）     | 资源操作监控                               |
|          | 错误日志（免费）     | 额度超限监控 访问异常监控 操作异常监控     |
|          | 监控指标（免费）     | 访问流量监控 访问异常监控 资源配额水位监控 |
|          | 计费日志（免费）     | 资源用量跟踪                               |

各日志说明参考 CloudLens 日志索引表：[https://help.aliyun.com/document_detail/456901.html?spm=a2c4g.456864.0.0.e979723c8We7zA](https://help.aliyun.com/document_detail/456901.html?spm=a2c4g.456864.0.0.e979723c8We7zA)

# 使用场景

本文主要介绍如何使用 CloudLens for SLS 中全局错误日志、监控指标做 Project  资源配额的**水位监控** 、**超限监控**  以及   如何**提交资源配额提升申请。**

## 使用前提

1.  开通 CloudLens for SLS  以及全局错误日志、监控指标

![image](/img/src/cloudlen/slsquota/4e47711e0062d88ae4ac619fe94a7a10b3b76023c6178b062dd2ce75b7d4a779.png)

2.  全局监控日志需存储在同一个 Project 下

为了构建实时资源配额水位监控，全局日志的几种监控日志（错误日志、指标监控）需存放在**相同的 Project**下。同时为了避免监控日志存放在业务 Project 导致监控占用 Project 的 Quota，可直接挑选一个固定地域的目标 Project，如杭州地域：log-service-{用户 ID}-cn-hangzhou。

## CloudLens for SLS  额度监控大盘

### 资源配额预警概览  

报表提供资源配额预警概览  （水位超过 80%）以及   额度超限分布

![image](/img/src/cloudlen/slsquota/fc627f3a8720cf32857caae3b444e7594565047037fba92cccdfbc266fb5abe5.png)

### Project 重点资源配额实时水位详情

包含 Project 部分基础资源配额以及数据读写资源配额的实时水位详情

![image](/img/src/cloudlen/slsquota/8d3c00d67c251c595bb2dde673d1fb163a399c979e7f911e2a7101e0bf8b9e8b.png)

![image](/img/src/cloudlen/slsquota/02698f8a1b9aecfe07b752baaafbaf122f91bd8e7c4b6dc060e3054870da995f.png)

![image](/img/src/cloudlen/slsquota/4d4b3f4a41bafa3c8224bd286a7b7dfe3b2e57f6ca9957e772e64cd7954e8a17.png)

### Project 资源配额超限详情

![image](/img/src/cloudlen/slsquota/bf630eb392ff98f32c9764233fb00dc386ef0a9df00764252b728226910c4b76.png)

# 监控实践

1.  额度监控监控项分类说明：

| 分类         | 监控项               | 说明                                                                                                                     |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 实时水位监控 | 基础资源配额水位监控 | _ 监控 Project  内 LogStore 数、机器组数、Logtail 采集配置水位是否超阈值预期百分比 _ 依赖时序库：internal-monitor-metric |
|              | 数据读写配额水位监控 | _ 监控 Project 写入流量、Project 写入次数超配额次数 _ 依赖时序库：internal-monitor-metric                                |
| 额度超限监控 | 资源配额超限次数监控 | _ 监控基础配额、数据读写超配额次数 _ 依赖日志库：internal-error_log                                                      |

2.  高级监控项细分说明如下：

| 分类             | 场景             | 监控项       | 说明                                                                                               |
| ---------------- | ---------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| 基础资源配额     | LogStore         | 实时水位监控 | _ 监控 Project 下 LogStore 数水位是否超阈值预期百分比 _ 依赖时序库：internal-monitor-metric        |
|                  |                  | 额度超限监控 | _ 监控 Project 下 LogStore 数超配额次数 _ 依赖日志库：internal-error_log                           |
|                  | 机器组           | 水位监控     | _ 监控 Project 下机器组数水位是否超阈值预期百分比 _ 依赖时序库：internal-monitor-metric            |
|                  |                  | 额度超限监控 | _ 监控 Project 下机器组数超配额次数 _ 依赖日志库：internal-error_log                               |
|                  | Logtail 采集配置 | 水位监控     | _ 监控 Project 下 Logtail 采集配置数水位是否超阈值预期百分比 _ 依赖时序库：internal-monitor-metric |
|                  |                  | 额度超限监控 | _ 监控 Project 下 Logtail 采集配置数超配额次数 _ 依赖日志库：internal-error_log                    |
| 数据读写资源配额 | Project 写入流量 | 水位监控     | _ 监控 Project 写入流量水位是否超阈值预期百分比 _ 依赖时序库：internal-monitor-metric              |
|                  |                  | 额度超限监控 | _ 监控 Project 写入流量超配额次数 _ 依赖日志库：internal-error_log                                 |
|                  | Project 写入次数 | 水位监控     | _ 监控 Project 写入次数水位是否超阈值预期百分比 _ 依赖时序库：internal-monitor-metric              |
|                  |                  | 额度超限监控 | _ 监控 Project 写入次数超配额次数 _ 依赖日志库：internal-error_log                                 |

## 基础监控

### 基础资源配额水位监控

1、确认告警 SQL：15min 定时检查 LogStore 数、机器组数、Logtail 采集配置水位是否达到告警阈值。

![image](/img/src/cloudlen/slsquota/60f9126a31ae6b155069ecc273d8dfc321286d9ed851f0b774fffca8ebd0eb29.png)

注意：查询 SQL 默认返回 100 条数据，如需返回全部查询结果 SQL 结尾可添加  limit 1000，代表可返回 1000 条查询结果

查询 SQL 如下：**（注意：告警只能对比结果中最多 1000 条数据是否满足告警条件，建议告警 SQL 内先针对水位做下筛选，比如此处 logstore_ratio > 80 or machine_group_ratio > 80 or logtail_config_ratio > 80 ）**

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

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

- 当有 Project 的 LogStore 数、机器组数、Logtail 采集配置其中一个水位超过额度的 90%时告警级别为严重
- 当有 Project 的 LogStore 数、机器组数、Logtail 采集配置其中一个水位超过额度的 80%时告警级别为中

![image](/img/src/cloudlen/slsquota/0169f81ad104ff7e45ccc857a3d834f7e7e3afc85a11168ad8e309a4a6c4fdb0.png)

### 数据读写配额水位监控

1、确认告警 SQL：每分钟定时检查 Project 写入流量、写入次数水位是否达到告警阈值。

![image](/img/src/cloudlen/slsquota/bbd082c489da1f20034898e2103cdaeae15549764e0ea7e084eb7df15c2a4594.png)

注意：查询 SQL 默认返回 100 条数据，如需返回全部查询结果 SQL 结尾可添加  limit 1000，代表可返回 1000 条查询结果

查询 SQL：（**注意：告警只能对比结果中最多 1000 条数据是否满足告警条件，建议告警 SQL 内先针对写入流量/写入次数做下筛选，比如此处 where inflow_ratio > 80 or write_cnt_ratio > 80** ）

```
    (*)| select Project, region, inflow_ratio, write_cnt_ratio from (SELECT cmdb.id as Project, cmdb.region as region, round(COALESCE(M.name1,0)/round(cast(json_extract(cmdb.quota, '$.inflow_per_min') as double)/1000000000, 3) * 100, 3) as inflow_ratio, round(COALESCE(M.name2,0)/cast(json_extract(cmdb.quota, '$.write_cnt_per_min') as double) * 100, 3) as write_cnt_ratio
     from "resource.sls.cmdb.project" as cmdb
    LEFT JOIN (
         SELECT element_at(__labels__, 'project') as project,
     round(MAX(CASE WHEN __name__ = 'logstore_origin_inflow_bytes' THEN __value__ ELSE NULL END)/1000000000, 3) AS name1,
     MAX(CASE WHEN __name__ = 'logstore_write_count' THEN __value__ ELSE NULL END) AS name2
      FROM "internal-monitor-metric.prom" where __name__ in ('logstore_origin_inflow_bytes','logstore_write_count') and regexp_like(element_at( split_to_map(__labels__, '|', '#$#') , 'project') , '.*') group by project) AS M ON cmdb.id = M.project) where inflow_ratio > 80 or write_cnt_ratio > 80  limit 10000
```

2、告警配置

查询区间选择相对 5 分钟，依据业务场景配置告警触发条件、以及告警策略：

- 当有 Project 的 Project 写入流量、写入次数其中一个水位超过额度的 90%时告警级别为严重
- 当有 Project 的 Project 写入流量、写入次数其中一个水位超过额度的 80%时告警级别为中

![image](/img/src/cloudlen/slsquota/cf5e8850a69073b2fc4a6355c2039b454be1b1d5e1b9a36d6df7bf17026dd5b9.png)

![image](/img/src/cloudlen/slsquota/4ef76793966cfa0170205a83e644bc340de7ace1badce1c43551fd5353edd48e.png)

### 资源配额超限次数监控

1、确认告警 SQL：15min 定时检查是否有额度超限发生。

![image](/img/src/cloudlen/slsquota/185b99ba55ecd8efdd3a49ad321d89e182d1bfe90100a8691971108a7f0662a5.png)

查询 SQL：

```
    ((* and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed or ErrorCode: ShardWriteQuotaExceed or ErrorCode: ShardReadQuotaExceed)))| SELECT Project,
    CASE
    WHEN ErrorMsg like '%Project write quota exceed: inflow%' then 'Project写入流量超限'
    WHEN ErrorMsg like '%Project write quota exceed: qps%' then 'Project写入次数超限'
    WHEN ErrorMsg like '%dashboard quota exceed%' then '报表额度超限'
    WHEN ErrorMsg like '%config count%' then 'Logtail采集配置超限'
    WHEN ErrorMsg like '%machine group count%' then '机器组超限'
    WHEN ErrorMsg like '%Alert count %' then '告警超限'
    WHEN ErrorMsg like '%logstore count %' then 'LogStore数超限'
    WHEN ErrorMsg like '%shard count%' then 'Shard数超限'
    WHEN ErrorMsg like '%shard write bytes%' then 'Shard写入超限'
    WHEN ErrorMsg like '%shard write quota%' then 'Shard写入超限'
    WHEN ErrorMsg like '%user can only run%' then 'SQL分析操作并发数超限'
        ELSE ErrorMsg
      END AS ErrorMsg,
    COUNT(1) AS count GROUP BY Project, ErrorMsg Limit 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

- 当有任意额度超限 10 次错误告警级别为严重

- 当有任意额度发生超限 1 次错误时告警级别为中

![image](/img/src/cloudlen/slsquota/75eb25b097df385a3c986138ad0883fcc9ba79020b467e3bf4228ee63e5c78d7.png)

## 高级监控

以下是基础监控的细分项，一般情况下不需要，如果需更精细的告警监控，可以参考。

### LogStore 监控

#### 水位监控

1、确认告警 SQL：15min 定时检查 LogStore 数水位是否达到告警阈值。

注意：查询 SQL 默认返回 100 条数据，如需返回全部查询结果 SQL 结尾可添加  limit 1000，代表可返回 1000 条查询结果

![image](/img/src/cloudlen/slsquota/265ecfb587548b3adcc123b0237a76f3d1ecc5f6fa71ec75537efa11e598618c.png)

查询 SQL：

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

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

- 当有 Project 的 LogStore 数超过额度的 90%时告警级别为严重
- 当有 Project 的 LogStore 数超过额度的 80%时告警级别为中

此处需注意，告警触发条件配置多个时，判断顺序是从上至下，因此 logstore_ratio>90 需配置在 logstore_ratio>80 的上面。

![image](/img/src/cloudlen/slsquota/9de416bd9fd9c4b2e239773bb646aa2ce0d0a46d9cbe81cfa1075090bb4d238e.png)

#### 超限监控

1、确认告警 SQL：15min 定时检查 LogStore 是否发生超限现象。

![image](/img/src/cloudlen/slsquota/b10b68a4e838cee1788446f194d53199c9862a10af5bae22ef2077367d7f36b3.png)

查询 SQL：

```
    * and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed)| SELECT Project,
    COUNT(1) AS count where ErrorMsg like '%logstore count %' GROUP BY Project ORDER BY count DESC LIMIT 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

- 当有 Project 的 LogStore 发生超限 10 次错误告警级别为严重
- 当有 Project 的 LogStore 发生超限 1 次错误时告警级别为中

![image](/img/src/cloudlen/slsquota/223b5b7d1eed943558a72e45b27bbb0816c376ab62b9748ae9330fb24d966168.png)

### 机器组监控

#### 水位监控

1、确认告警 SQL：15min 定时检查机器组数水位是否达到告警阈值。

注意：查询 SQL 默认返回 100 条数据，如需返回全部查询结果 SQL 结尾可添加  limit 1000，代表可返回 1000 条查询结果

![image](/img/src/cloudlen/slsquota/4301dbbd18c11b89c265c35e149db0c116ee82720263520ded4a8e2c128e29d8.png)

查询 SQL：

```
    * |  select Project, region, round(count_machine_group/quota_machine_group * 100, 3)  as machine_group_ratio from
    (SELECT A.id as Project , A.region as region, COALESCE(SUM(B.count_machine_group), 0)  AS count_machine_group , cast(json_extract(A.quota, '$.machine_group') as double)  as quota_machine_group
    FROM  "resource.sls.cmdb.project" as A
    LEFT JOIN (
      SELECT project, COUNT(*) AS count_machine_group
      FROM "resource.sls.cmdb.machine_group" as B
      GROUP BY project
    ) AS B ON A.id = B.project
    group by A.id, A.quota, A.region) where  quota_machine_group is not null   order by machine_group_ratio desc limit 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

- 当有 Project 的机器组超过额度的 90%时告警级别为严重
- 当有 Project 的机器组超过额度的 80%时告警级别为中

![image](/img/src/cloudlen/slsquota/72f729b0b8c5000a0d35581bd3d7140a91e571f0166dc57e4d1c95595c362a4d.png)

#### 超限监控

1、确认告警 SQL：15min 定时检查机器组是否发生超限现象。

![image](/img/src/cloudlen/slsquota/d08c47b1e3e2b60f210f4aa319529d022b3b40622242c8e99c324603d1905e23.png)

查询 SQL：

```
    * and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed)| SELECT Project,
    COUNT(1) AS count where ErrorMsg like '%machine group count%' GROUP BY Project ORDER BY count DESC LIMIT 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

\*  当有 Project 的机器组发生超限 10 次错误告警级别为严重

\*  当有 Project 的机器组发生超限 1 次错误时告警级别为中

![image](/img/src/cloudlen/slsquota/50047828bd8648ce8b601f8ed2b7fed63733f39a47e0c90c2fcbe837745eabeb.png)

### Logtail 采集配置

#### 水位监控

1、确认告警 SQL：15min 定时检查 Logtail 采集配置数水位是否达到告警阈值。

注意：查询 SQL 默认返回 100 条数据，如需返回全部查询结果 SQL 结尾可添加  limit 1000，代表可返回 1000 条查询结果

![image](/img/src/cloudlen/slsquota/50047828bd8648ce8b601f8ed2b7fed63733f39a47e0c90c2fcbe837745eabeb.png)

查询 SQL：

```
    * |  select Project, region, round(count_logtail_config/quota_logtail_config * 100, 3)  as logtail_config_ratio from
    (SELECT A.id as Project , A.region as region, COALESCE(SUM(B.count_logtail_config), 0)  AS count_logtail_config , cast(json_extract(A.quota, '$.config') as double)  as quota_logtail_config
    FROM  "resource.sls.cmdb.project" as A
    LEFT JOIN (
      SELECT project, COUNT(*) AS count_logtail_config
      FROM "resource.sls.cmdb.logtail_config" as B
      GROUP BY project
    ) AS B ON A.id = B.project
    group by A.id, A.quota, A.region) where  quota_logtail_config is not null   order by logtail_config_ratio desc limit 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

- 当有 Project 的 Logtail 采集配置数超过额度的 90%时告警级别为严重
- 当有 Project 的 Logtail 采集配置数超过额度的 80%时告警级别为中

![image](/img/src/cloudlen/slsquota/356499d4d9675c9be9351e720054330c9ecd6541ab88b742e9c1102763893ff0.png)

#### 超限监控

1、确认告警 SQL：15min 定时检查 LogStore 是否发生超限现象。

![image](/img/src/cloudlen/slsquota/cbb74e54df570fa963ac5c3e2bf16fb50186d3028f82a8ac3f0ec740964d75d3.png)

查询 SQL：

```
    * and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed)| SELECT Project,
    COUNT(1) AS count where ErrorMsg like '%config count%' GROUP BY Project ORDER BY count DESC LIMIT 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

\*  当有 Project 的 Logtail 采集配置发生超限 10 次错误告警级别为严重

\*  当有 Project 的 Logtail 采集配置发生超限 1 次错误时告警级别为中

![image](/img/src/cloudlen/slsquota/969008114aa8c81d670e824ca4b19d6d3f3202a6ca5d61342c3bd470af5056d9.png)

### Project 写入流量监控

#### 水位监控

1、确认告警 SQL：每分钟定时检查相对 5 分钟内 Project 写入流量水位是否达到告警阈值。

![image](/img/src/cloudlen/slsquota/d34eb9dffb64c48b64417e8df77b275423c528c36e243647b74b8f8383b49f50.png)

SQL 详情：

```
    (*)| SELECT Project, region , round(count_inflow/cast(quota_inflow as double) * 100, 3) as inflow_ratio
    FROM
    (SELECT cmdb.id as Project, cmdb.region as region, COALESCE(M.name1,0) as count_inflow, round(cast(json_extract(cmdb.quota, '$.inflow_per_min') as double)/1000000000, 3) as quota_inflow  from "resource.sls.cmdb.project" as cmdb
    LEFT JOIN (
         SELECT element_at(__labels__, 'project') as project,
     round(MAX(CASE WHEN __name__ = 'logstore_origin_inflow_bytes' THEN __value__ ELSE NULL END)/1000000000, 3) AS name1
      FROM "internal-monitor-metric.prom" where __name__ ='logstore_origin_inflow_bytes' and regexp_like(element_at( split_to_map(__labels__, '|', '#$#') , 'project') , '.*') group by project) AS M ON cmdb.id = M.project )order by inflow_ratio desc  limit 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

\*  当有 Project 写入流量超过额度的 90%时告警级别为严重

- 当有 Project 写入流量超过额度的 80%时告警级别为中

![image](/img/src/cloudlen/slsquota/5bfa19e25d2dd29e278f24a2bd0a16990e463fcc1bc51735e3638f75ce80a616.png)

![image](/img/src/cloudlen/slsquota/cec9cb60974eefc86aa3088cd5761860e44440ff385927ab7d806fe76ac2913d.png)

#### 超限监控

1、确认告警 SQL：15min 定时检查 Project 写入流量是否发生超限现象。

![image](/img/src/cloudlen/slsquota/32bd7d95a85d658854efefed2ca11a44fda815fcf91205b4fec49873ae42546b.png)

查询 SQL：

```
    * and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed)| SELECT Project,
    COUNT(1) AS count where ErrorMsg like '%Project write quota exceed: inflow%' GROUP BY Project ORDER BY count DESC LIMIT 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

\*  当有 Project 写入流量发生超限 10 次错误告警级别为严重

\*  当有 Project 写入流量发生超限 1 次错误时告警级别为中

![image](/img/src/cloudlen/slsquota/73c4c2af305da97a497fe91b02027b259faea07cb836c33dbfd61289c22e8565.png)

### Project 写入次数监控

#### 水位监控

1、确认告警 SQL：每分钟定时检查相对 5 分钟内 Project 写入次数水位是否达到告警阈值。

![image](/img/src/cloudlen/slsquota/8fb003b2e5d5016b81c9fbd21edac115a121f80cf1756022914bd108420c0fc0.png)

查询 SQL：

```
    (*)| SELECT Project, region,  round(count_write_cnt/cast(quota_write_cnt as double) * 100, 3) as write_cnt_ratio
    FROM
    (SELECT cmdb.id as Project, cmdb.region as region, COALESCE(M.name1,0) as count_write_cnt,
    cast(json_extract(cmdb.quota, '$.write_cnt_per_min') as bigint) as quota_write_cnt from "resource.sls.cmdb.project" as cmdb
    LEFT JOIN (
         SELECT element_at(__labels__, 'project') as project,
      MAX(CASE WHEN __name__ = 'logstore_write_count' THEN __value__ ELSE NULL END) AS name1
      FROM "internal-monitor-metric.prom" where __name__ ='logstore_write_count' and regexp_like(element_at( split_to_map(__labels__, '|', '#$#') , 'project') , '.*') group by project) AS M ON cmdb.id = M.project ) order by write_cnt_ratio desc  limit 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

\*  当有 Project 写入次数超过额度的 90%时告警级别为严重

\*  当有 Project 写入次数超过额度的 80%时告警级别为中

![image](/img/src/cloudlen/slsquota/5bfa19e25d2dd29e278f24a2bd0a16990e463fcc1bc51735e3638f75ce80a616.png)

![image](/img/src/cloudlen/slsquota/53d86836bc35710a8fc1eb7b64c8f2609aea09c539ccfc81323f5d09c23f95b8.png)

#### 超限监控

1、确认告警 SQL：15min 定时检查 Project 写入次数是否发生超限现象。

![image](/img/src/cloudlen/slsquota/a9d77a23ca04eca89fa6e5af770d22aec19da813493188447a322ce0ccbc66c2.png)

查询 SQL：

```
    * and (ErrorCode: ExceedQuota or ErrorCode: QuotaExceed or ErrorCode: ProjectQuotaExceed or ErrorCode:WriteQuotaExceed)| SELECT Project,
    COUNT(1) AS count where ErrorMsg like '%Project write quota exceed: qps%' GROUP BY Project ORDER BY count DESC LIMIT 1000
```

2、告警配置

依据业务场景配置告警触发条件、以及告警策略：

\*  当有 Project 写入次数发生超限 10 次错误告警级别为严重

\*  当有 Project 写入次数发生超限 1 次错误时告警级别为中

![image](/img/src/cloudlen/slsquota/e06c6a613dd4355fc1b81b596465b3257138dfc6454b746d109f852edba4da63.png)

# 资源配额调整申请

## 操作步骤

1.  登录[日志服务控制台](https://sls.console.aliyun.com/)。
2.  在 Project 列表区域，单击目标 Project。
3.  单击![image](/img/src/cloudlen/slsquota/4e3a3ee4fff8eb024c5205ceb2c083178e19d2fe3914ec498525d36fe89b7dc9.png)图标。
4.  单击**资源配额**对应的**管理**。

![image](/img/src/cloudlen/slsquota/82dd39830dc427afa6efd6ffdcda789eeac5f34827b0469e3810aa7529654943.png)

5.  在**资源配额**面板中，调整目标资源的配额，然后单击**保存**。

![image](/img/src/cloudlen/slsquota/3a4a9fc1bf053f45795996110c277412f3fb6b7e38e140834ef9a80780aa7d89.png)
