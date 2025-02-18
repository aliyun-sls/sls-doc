# Bill analysis cases

## Prerequisite for use

Cost Manager is activated.

## ECS 实例计费项概念

ECS 计费项主要分为以下几类，详情参考：[ECS 计费项](https://help.aliyun.com/zh/ecs/product-overview/billable-items/?spm=a2c4g.11186623.0.0.c70d3c57WzcpSm)
![](https://intranetproxy.alipay.com/skylark/lark/0/2023/jpeg/24957466/1692339087581-302d4cd7-78bf-4e12-b2d1-1e2068b81194.jpeg)

## ECS 账单分析报表使用

在成本管家中，我们提供了“ECS 账单分析”统计报表。在“ECS 账单分析”报表中，我们统计了 OSS 近期的费用趋势、实例统计、以及 tag 成本分摊统计等信息。您可以在 ECS 账单分析中查看 ECS 账单的总览信息。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692339170786-394edfdc-8828-4d40-9e18-a99d95f1ae2f.png#clientId=uad6cb318-98d5-4&from=paste&height=1116&id=u40baa207&originHeight=2232&originWidth=4564&originalType=binary&ratio=2&rotation=0&showTitle=false&size=3639706&status=done&style=none&taskId=ua088ebbf-6ba8-4edf-a717-86a20668414&title=&width=2282)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692339189883-edb68079-bded-4c8d-88a8-0557d00dc1a3.png#clientId=uad6cb318-98d5-4&from=paste&height=1117&id=u08767d72&originHeight=2234&originWidth=4642&originalType=binary&ratio=2&rotation=0&showTitle=false&size=3902831&status=done&style=none&taskId=u226c2a0f-5019-4401-b2ab-d910d8e3d0a&title=&width=2321)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692339229838-2a3b5993-095f-42c3-8eee-8a5b828c931f.png#clientId=uad6cb318-98d5-4&from=paste&height=504&id=u729951cf&originHeight=1008&originWidth=4568&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1637526&status=done&style=none&taskId=u7f068170-861f-42f9-83b2-b8114597170&title=&width=2284)

## OSS 自定义费用分析

如果您需要自定义查询语句，可以进入成本管家，选择“自定义分析”tab 进行查询，在这里我们提供了两个统计查询的 demo 样例。

demo1：统计 ECS 实例级别费用，region 为实例的地域，cost 为对应实例的费用。

```sql
* | select
  instanceId, region,
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'ecs'
group by
  instanceId,region
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692340492550-5c7dd8f4-f5a5-4a58-9f12-e30201389363.png#clientId=uad6cb318-98d5-4&from=paste&height=302&id=u5a9d31f8&originHeight=604&originWidth=2886&originalType=binary&ratio=2&rotation=0&showTitle=false&size=681105&status=done&style=none&taskId=ucb063463-29e4-456e-b38b-d3b583ee543&title=&width=1443)
demo2：查询单一实例每日各计费项费用情况，其中您可以将“${instanceId}”替换为需要查询的实例 id。

```sql
* | select
  date_trunc('day', __time__) as t,
  billingItem,
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'ecs'
  and instanceId = '${instanceId}'
group by
  t,
  billingItem
order by
  t
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341027734-00e4d806-0757-4dd8-ab03-52287ec47aef.png#clientId=uad6cb318-98d5-4&from=paste&height=447&id=uec56345c&originHeight=894&originWidth=3230&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1115123&status=done&style=none&taskId=u683cfc9f-99ad-46f0-b8c1-f9ed8feda70&title=&width=1615)

## ECS 实例流量用量告警设置

在左侧侧边栏选择告警，可以看到成本管家对应的 project 的所有告警信息，通过配置告警可以自动化监控每日账单费用或用量情况。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190858284-d5e6d209-cd3d-445d-9028-785099d92659.png#clientId=u2be2b1a6-cc28-4&from=paste&height=1214&id=ua636a734&originHeight=2428&originWidth=5034&originalType=binary&ratio=2&rotation=0&showTitle=false&size=4732124&status=done&style=none&taskId=u5696f64a-b0fe-4d20-a732-0e55f204807&title=&width=2517)
在这里我们以单一实例昨日流出流量不超过阈值为例，设置实例用量告警，您也可以按需替换为对应的计费项用量实现用量告警。首先需要在告警页面选择新建告警，可以用以下查询语句查询实例的昨日流出流量。由于账单数据同步时间为 T+1，在语句查询范围处您可以选择时间为昨日。由于 SLS 账单数据为按日出账，因此您需要在告警检查频率处配置为固定时间 1 天。

```sql
* | select
  instanceId,
  sum(Usage) as "流量"
FROM  instance_bill
where
  productcode = 'ecs'
	and billingItem = '流出流量'
group by
  instanceId
```

在设置页面设置触发条件为“有数据匹配”，并将匹配条件设置为流量大于您的告警阈值即可，图中以告警阈值 10 为例。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341390916-095dbd09-05df-4426-8679-7a56c34d334a.png#clientId=u261dbc39-d2ee-4&from=paste&height=98&id=ubb8b3bee&originHeight=196&originWidth=1596&originalType=binary&ratio=2&rotation=0&showTitle=false&size=133616&status=done&style=none&taskId=uf6e4ed8d-95a3-44f7-939a-a25d87aafba&title=&width=798)
配置好查询语句与触发条件后，您可以选择对应的告警策略与通知方式来监控每日实例费用情况。
