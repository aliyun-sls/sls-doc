# 账单自定义告警案例

## 使用前提

使用成本管家的前提需要开通成本管家。

## 创建告警

日志服务告警是一站式的告警监控、降噪、事务管理、通知分派的智能运维平台。我们可以通过使用 SLS 的告警功能，实现实时监控日志服务用量的能力。在成本管家中集成了告警，可以快速进入告警中心。点击新建告警即可创建自定义告警。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692190858284-d5e6d209-cd3d-445d-9028-785099d92659.png#clientId=u2be2b1a6-cc28-4&from=paste&height=1214&id=ua636a734&originHeight=2428&originWidth=5034&originalType=binary&ratio=2&rotation=0&showTitle=false&size=4732124&status=done&style=none&taskId=u5696f64a-b0fe-4d20-a732-0e55f204807&title=&width=2517)
除此之外，您也可以进入自定义分析页面，将您执行的查询语句直接添加为告警。首先填入查询语句，其次查询时间范围选择昨天。点击另存为告警即可快速配置告警。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692350607590-4f12123d-167d-4f98-ae2e-77badbed6505.png#clientId=ub880d1bc-f89c-4&from=paste&height=805&id=u819952d2&originHeight=1610&originWidth=5116&originalType=binary&ratio=2&rotation=0&showTitle=false&size=3028633&status=done&style=none&taskId=uf0955e75-782b-4a51-b159-c9601986cdf&title=&width=2558)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692350652171-ed23e135-02d4-44f3-a646-9f533865fcaf.png#clientId=ub880d1bc-f89c-4&from=paste&height=104&id=u20dbac6d&originHeight=280&originWidth=1118&originalType=binary&ratio=2&rotation=0&showTitle=false&size=135669&status=done&style=none&taskId=uc57d4447-4f39-45f3-aad6-246f41ac361&title=&width=415)
由于账单数据同步时间为 T+1，在告警语句查询范围处您可以选择时间为昨日。同时受限于较多云产品为按日出账，因此您需要在告警检查频率处配置为固定时间 1 天。接下来我们提供几个常见费用、用量告警样例作为参考。

## 昨日总费用告警

创建昨日总费用告警可以用以下查询语句，选择查询时间范围为昨日，告警触发条件为有数据匹配，并配置表达式为 "cost">告警阈值即可。

```sql
* | select
  sum(PretaxAmount) as cost
FROM  instance_bill
```

## 单一云产品昨日总费用告警

创建单一云产品昨日总费用告警可以用以下查询语句，其中，需要将 ProductCode 过滤条件替换为需要监控的云产品 code。选择查询时间范围为昨日，告警触发条件为有数据匹配，并配置表达式为 "cost">告警阈值即可。

```sql
* | select
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  ProductCode = '${ProductCode}'
```

## 昨日云产品用量告警

创建昨日云产品用量告警可以用以下查询语句，其中，需要将 ProductCode 过滤条件替换为需要监控的云产品 code，BillingItem 过滤条件替换为需要监控的计费项，这里以 SLS 存储量告警为例。选择查询时间范围为昨日，告警触发条件为有数据匹配，并配置表达式为 "Usage">告警阈值即可。

```sql
* | select
  sum(Usage) as Usage
FROM  instance_bill
where
  ProductCode = 'sls'
  and BillingItem like '%存储%'
```

## 昨日云产品单一实例用量告警

创建昨日云产品用量告警可以用以下查询语句，其中，需要将 ProductCode 过滤条件替换为需要监控的云产品 code，BillingItem 过滤条件替换为需要监控的计费项，InstanceId 过滤条件替换为需要监控的云产品实例资源。这里以 SLS 单一 project 存储量告警为例。选择查询时间范围为昨日，告警触发条件为有数据匹配，并配置表达式为 "Usage">告警阈值即可。

```sql
* | select
  sum(Usage) as Usage
FROM  instance_bill
where
  ProductCode = 'sls'
  and BillingItem like '%存储%'
  and InstanceId like '%project%'
```

## 费用同比告警

创建单一云产品昨日总费用告警可以用以下查询语句。选择查询时间范围为昨日，告警触发条件为有数据匹配，并配置表达式为 "同比增加">告警阈值即可。

```sql
* |
SELECT
  diff [1] AS "昨日费用",
  diff [2] AS "前日费用",
  diff [3] * 100 -100 as "同比增加"
FROM (
    SELECT
      compare(amount, 86400) as diff
    FROM (
        SELECT
          sum(PretaxAmount) AS amount
        FROM instance_bill
      )
  )
```
