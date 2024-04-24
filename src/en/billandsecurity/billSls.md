# SLS 账单分析案例介绍

## 使用前提

使用成本管家的前提需要开通成本管家。

## SLS 账单数据概念

在分析 SLS 账单数据前，我们需要理解账单数据的一些基础概念。计费数据中我们可以获得云产品的资源用量。以日志服务为例，日志服务资源用量包含每一个日志服务实例在不同计费项产生的使用量，这里存在实例和计费项两个概念。下表为典型的用量数据包含的字段，接下来我们针对日志服务实例与日志服务计费项逐一介绍。

| 名称   | 字段        | 描述                                                                                 |
| ------ | ----------- | ------------------------------------------------------------------------------------ |
| 实例   | InstanceID  | 云服务的最小粒度资源，对于日志服务是 logstore（例如：12345;project;logstore;region） |
| 计费项 | BillingItem | 是日志服务的收费项，例如存储空间、索引流量等                                         |

### 什么是日志服务实例

日志服务实例是日志服务的最小粒度资源即为 Logstore，日志服务实例 ID 组成结构为：`${aliUid};${Project};${Logstore};${Region}`，其中术语解释如下表所示。

| **术语**           | **说明**                                                                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 项目（Project）    | 项目是日志服务的资源管理单元，是进行多用户隔离与访问控制的主要边界。更多信息，请参见[项目（Project）](https://www.alibabacloud.com/help/en/doc-detail/48873.htm#concept-t3x-hqn-vdb)                      |
| 日志库（Logstore） | 日志库是日志服务中日志数据的采集、存储和查询单元。更多信息，请参见[日志库（Logstore）](https://www.alibabacloud.com/help/en/doc-detail/48874.htm#concept-btb-4qn-vdb)                                     |
| 地域（Region）     | 地域是日志服务的数据中心所在物理位置。您可以在创建 Project 时指定地域，一旦指定之后就不允许更改。更多信息，请参见[开服地域](https://www.alibabacloud.com/help/en/doc-detail/252819.htm#reference-2084283) |

### 什么是日志服务计费项

日志服务计费项是日志服务提供能力的收费项，在日志服务中所有计费项都是单独计费的，例如您存储日志会产生日志存储费用，您采集日志会产生写流量费用等。具体计费项解释可以参考文档：[日志服务计费项](https://www.alibabacloud.com/help/en/doc-detail/107745.html?spm=a2c4g.48869.0.0.698929ecpUSyTH)
在账单中计费项由 BillingItem 字段描述，SLS 计费项包含以下几类：
![](https://intranetproxy.alipay.com/skylark/lark/0/2023/jpeg/24957466/1681269751325-d5a7952d-2685-4def-9785-39aa63189619.jpeg)

## SLS 自助分析报表使用

打开成本管家后可以看到我们提供了一些常见云产品的账单分析报表，打开“SLS 账单自助分析”报表即可查看 SLS 费用及用量的整体趋势情况。页面上方提供了全局过滤方式，您可以通过选择对应的 project、logstore、region 实现单一实例的用量分析。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190829390-a89b7549-00cd-45b5-b02b-7f5e816787c4.png#clientId=u2be2b1a6-cc28-4&from=paste&height=1254&id=u88576ee5&originHeight=2508&originWidth=5106&originalType=binary&ratio=2&rotation=0&showTitle=false&size=5362998&status=done&style=none&taskId=ufc71314e-e50e-48e6-a0f1-bc2dd47ea00&title=&width=2553)
用量分析中提供了 Top Project 用量明细，及 Top Logstore 用量明细。分别展示了 project 粒度费用及用量，以及 logstore 粒度的费用及用量，方便您时刻关注用量最多的资源。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190838103-acf83ae9-92a5-4163-b3f4-fb6b5d040b69.png#clientId=u2be2b1a6-cc28-4&from=paste&height=1145&id=ueb1a5644&originHeight=2290&originWidth=4608&originalType=binary&ratio=2&rotation=0&showTitle=false&size=4301593&status=done&style=none&taskId=uc40dbe38-46ae-422d-9140-43e34a0efd0&title=&width=2304)

## SLS 账单用量分析

打开“SLS 账单自助分析”报表，找到昨日金额图表，鼠标放置于图表右上角三个点处，可以看到展开项。在这里选择预览查询语句，可以看到该图表配置的查询语句。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190703172-f5e262bd-6dc8-484c-9d08-601b5395356d.png#clientId=u2be2b1a6-cc28-4&from=paste&height=150&id=udb16ea09&originHeight=388&originWidth=1290&originalType=binary&ratio=2&rotation=0&showTitle=false&size=227535&status=done&style=none&taskId=ud8ed7f9c-262d-4280-b133-2a0c89e8e02&title=&width=500)
如果您需要自定义修改查询语句，在展开的预览页面中点击“查询分析”，可以跳转到成本管家对应的 project 中，我们可以看到该图表具体的查询语句以及对应的统计结果，在该页面即可以修改查询语句与对应的查询时间，。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190729557-5c2faa1f-f84f-4842-adf0-06a2508047fe.png#clientId=u2be2b1a6-cc28-4&from=paste&height=284&id=u8afd8558&originHeight=816&originWidth=1064&originalType=binary&ratio=2&rotation=0&showTitle=false&size=407216&status=done&style=none&taskId=udbf016c8-0df4-47c5-a9cb-e36109ac47b&title=&width=370)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190788179-86e86cd3-3f40-4fd3-a75e-1a5c717cab07.png#clientId=u2be2b1a6-cc28-4&from=paste&height=970&id=u6cdd9310&originHeight=1940&originWidth=4522&originalType=binary&ratio=2&rotation=0&showTitle=false&size=3483992&status=done&style=none&taskId=ud496098a-080c-406b-a38e-660d7ff2556&title=&width=2261)
下面我们提供了两个常见的查询分析 query 语句。
demo1：查询 SLS 云产品各计费项用量趋势。

```sql
 * |
select
	date_trunc('day', __time__) as t,
	BillingItem,
	round(sum(Usage), 2) as "用量"
from instance_bill
where ProductCode='sls'
group by BillingItem, t
```

demo2：查询 SLS 个 project 各 logstore 用量明细，其中，${project_name}需要替换为待查询的 project。

```sql
 * | select
  split_part(instanceId, ';', 2) as project,
  split_part(instanceId, ';', 3) as logstore,
  split_part(instanceId, ';', 4) as region,
  BillingItem as "计费项",
  round(sum(Usage), 2) as "用量"
FROM  instance_bill
where
  ProductCode = 'sls'
  and split_part(instanceId, ';', 2) like '${project_name}'
group by
  BillingItem,
  project,
  logstore,
  region
```

## 配置 SLS 存储用量告警

在左侧侧边栏选择告警，可以看到成本管家对应的 project 的所有告警信息，通过配置告警可以自动化监控每日账单费用或用量情况。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190858284-d5e6d209-cd3d-445d-9028-785099d92659.png#clientId=u2be2b1a6-cc28-4&from=paste&height=1214&id=ua636a734&originHeight=2428&originWidth=5034&originalType=binary&ratio=2&rotation=0&showTitle=false&size=4732124&status=done&style=none&taskId=u5696f64a-b0fe-4d20-a732-0e55f204807&title=&width=2517)
通常情况下，为了控制整体成本我们会关注整体的用量。例如存储空间用量，则可以用以下查询语句查询存储空间用量。由于账单数据同步时间为 T+1，在语句查询范围处您可以选择时间为昨日。由于 SLS 账单数据为按日出账，因此您需要在告警检查频率处配置为固定时间 1 天。

```sql
 * |
select
	round(sum(Usage), 2) as "存储空间用量"
from instance_bill
where ProductCode='sls'
and BillingItem like '%存储空间%'
```

在设置页面设置触发条件为“有数据匹配”，并将匹配条件设置为存储空间用量大于您的告警阈值即可，图中以告警阈值 400 为例。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1681133056921-30fe1cfa-7e43-4592-9586-e767acb9abcc.png#clientId=u2ed38d4b-36a9-4&from=paste&height=69&id=ufda6d2a1&originHeight=138&originWidth=1522&originalType=binary&ratio=2&rotation=0&showTitle=false&size=63089&status=done&style=none&taskId=u49897619-cad3-4011-8e89-e98eec893bb&title=&width=761)
配置好查询语句与触发条件后，您可以选择对应的告警策略与通知方式来监控每日的存储用量情况。
