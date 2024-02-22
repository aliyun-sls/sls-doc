# OSS 账单分析案例介绍

## 使用前提

使用成本管家的前提需要开通成本管家。

## OSS 实例计费项概念

OSS 计费项主要分为以下几类，详情参考：[OSS 计费项](https://help.aliyun.com/zh/oss/product-overview/billable-items/?spm=a2c4g.11186623.0.0.33e6452eYnle7Q)
![](https://intranetproxy.alipay.com/skylark/lark/0/2023/jpeg/24957466/1692325320251-9d0b4fc0-27a8-43fc-91e1-ad2a9160e4d1.jpeg)

## OSS 自助分析报表使用

在成本管家中，我们提供了“OSS 账单自助分析”及“OSS 费用走势与成本构成”两张统计报表。
在“OSS 账单自助分析报”表中，我们统计了 OSS 费用使用情况，除此之外，您也可以在该报表中查看存储量以及流量的使用情况。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692325827857-665fe568-0d09-4851-9529-c82e579314b0.png#clientId=ub4e187e7-8b18-4&from=paste&height=852&id=ubf002cc5&originHeight=1704&originWidth=4590&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2779422&status=done&style=none&taskId=u5e326a74-3e5b-4941-bd24-68e800d1865&title=&width=2295)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692325743987-1aebb305-a4fa-4c69-a8a5-493285abbd6e.png#clientId=ub4e187e7-8b18-4&from=paste&height=782&id=u49342332&originHeight=1564&originWidth=4584&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2686552&status=done&style=none&taskId=u84e22162-6778-49a6-add3-ab4458ebdcb&title=&width=2292)
在“OSS 费用走势与成本构成”报表中，我们提供了近一个月的费用情况及费用预测、近半年的消费情况与费用预测。在成本构成中，我们对地域化、成本大类、存储类型的费用情况进行了统计，方便您快速查看成本构成情况。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692325917479-422d2461-f756-436b-a8b1-ad1cf8afa0a8.png#clientId=ub4e187e7-8b18-4&from=paste&height=866&id=u90d5e944&originHeight=1732&originWidth=4620&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2973719&status=done&style=none&taskId=u63d25be5-1370-49b6-bd79-afd20416890&title=&width=2310)

## OSS 自定义费用分析

如果您需要自定义查询语句，可以进入成本管家，选择“自定义分析”tab 进行查询，在这里我们提供了两个统计查询的 demo 样例。

demo1：统计 OSS 实例级别费用，region 为实例的地域，type 为实例存储类型。

```sql
* | select
  instanceId,
  split_part(InstanceID, ';', 1) as region,
  split_part(InstanceID, ';', 2) as type,
  sum(PretaxAmount) as cost
FROM  instance_bil
where
  productcode = 'oss'
group by
  split_part(InstanceID, ';', 1),
  split_part(InstanceID, ';', 2),
  instanceId
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692337752086-5a439474-0a02-4e43-8130-674124bcf2d5.png#clientId=u9834ff07-ccc2-4&from=paste&height=151&id=u283370e8&originHeight=302&originWidth=3290&originalType=binary&ratio=2&rotation=0&showTitle=false&size=374370&status=done&style=none&taskId=u318a45de-7df9-427c-bc62-53d8d86b259&title=&width=1645)
demo2：查询单一实例每日各计费项费用情况，其中您可以将“${instanceId}”替换为需要查询的实例 id。

```sql
* | select
  date_trunc('day', __time__) as t,
  billingItem,
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'oss'
  and instanceId = '${instanceId}'
group by
  t,
  billingItem
order by
  t
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692337727478-57dc9ce9-a2f8-4b6c-96d5-ec104ee99aa6.png#clientId=u9834ff07-ccc2-4&from=paste&height=564&id=ue83aafcd&originHeight=1128&originWidth=2836&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1262055&status=done&style=none&taskId=u4a1eab4d-19eb-436d-88b6-aed246d0b49&title=&width=1418)

## OSS 实例费用告警设置

在左侧侧边栏选择告警，可以看到成本管家对应的 project 的所有告警信息，通过配置告警可以自动化监控每日账单费用或用量情况。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190858284-d5e6d209-cd3d-445d-9028-785099d92659.png#clientId=u2be2b1a6-cc28-4&from=paste&height=1214&id=ua636a734&originHeight=2428&originWidth=5034&originalType=binary&ratio=2&rotation=0&showTitle=false&size=4732124&status=done&style=none&taskId=u5696f64a-b0fe-4d20-a732-0e55f204807&title=&width=2517)
在这里我们以单一实例总费用不超过阈值为例，设置实例费用告警。首先需要在告警页面选择新建告警，可以用以下查询语句查询实例的昨日总费用。由于账单数据同步时间为 T+1，在语句查询范围处您可以选择时间为昨日。由于 SLS 账单数据为按日出账，因此您需要在告警检查频率处配置为固定时间 1 天。

```sql
* | select
  instanceId,
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'oss'
group by
  instanceId
```

在设置页面设置触发条件为“有数据匹配”，并将匹配条件设置为 cost 大于您的告警阈值即可，图中以告警阈值 10 元为例。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692338792676-359db37d-4991-4a1d-9af7-ec2c9d1107fb.png#clientId=u6b924183-c2df-4&from=paste&height=102&id=u5693b95c&originHeight=204&originWidth=1630&originalType=binary&ratio=2&rotation=0&showTitle=false&size=141179&status=done&style=none&taskId=ud1770610-d6bc-4148-a254-3d4e9cca205&title=&width=815)
配置好查询语句与触发条件后，您可以选择对应的告警策略与通知方式来监控每日实例费用情况。
