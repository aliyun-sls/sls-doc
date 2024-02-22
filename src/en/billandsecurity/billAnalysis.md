# 账单自定义分析案例

## 使用前提

使用成本管家的前提需要开通成本管家。

## 账单数据字段说明

| **字段**                  | **说明**                                                                                                                       | **样例**               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| BillingDate               | 账期                                                                                                                           | 2022-11-06             |
| BillingItem               | 计费项                                                                                                                         | PUT 及其他类型请求次数 |
| BillingType               | 计费方式                                                                                                                       | 其它                   |
| CostUnit                  | 财务单元                                                                                                                       | 未分配                 |
| Currency                  | 币种                                                                                                                           | CNY                    |
| DeductedByCashCoupons     | 优惠券抵扣                                                                                                                     | 0.0                    |
| DeductedByCoupons         | 代金券优惠金额                                                                                                                 | 0.0                    |
| DeductedByPrepaidCard     | 储值卡抵扣                                                                                                                     | 0.0                    |
| DeductedByResourcePackage | 资源包抵扣                                                                                                                     | 0                      |
| InstanceConfig            | 实例详细配置                                                                                                                   | 无                     |
| InstanceID                | 实例 ID                                                                                                                        | me-east-1%3Bstandard   |
| InstanceSpec              | 实例规格                                                                                                                       | 无                     |
| InternetIP                | 公网 IP 地址                                                                                                                   | 无                     |
| IntranetIP                | 内网 IP 地址                                                                                                                   | 无                     |
| InvoiceDiscount           | 优惠金额                                                                                                                       | 0.001                  |
| Item                      | 账单类型。包括 （1）SubscriptionOrder：预付费订单。（2）PayAsYouGoBill：后付费账单。（3）Refund：退款。（4）Adjustment：调账。 | PayAsYouGoBill         |
| ListPrice                 | 单价                                                                                                                           | 1.020000               |
| ListPriceUnit             | 单价单位                                                                                                                       | 元/万次                |
| NickName                  | 实例昵称                                                                                                                       | test                   |
| OutstandingAmount         | 未结清金额                                                                                                                     | 0.0                    |
| OwnerID                   | Account ID                                                                                                                     | 12\*\*\*3212           |
| PaymentAmount             | 现金支付                                                                                                                       | 0.0                    |
| PretaxAmount              | 应付金额                                                                                                                       | 0.0                    |
| PretaxGrossAmount         | 原始金额                                                                                                                       | 0.005                  |
| ProductCode               | 产品代码                                                                                                                       | oss                    |
| ProductDetail             | 产品明细                                                                                                                       | 对象存储 OSS           |
| ProductName               | 产品名称                                                                                                                       | 对象存储               |
| ProductType               | 产品类型                                                                                                                       | 无                     |
| Region                    | 地域                                                                                                                           | 上海                   |
| ResourceGroup             | 资源组                                                                                                                         | 无                     |
| ServicePeriod             | 服务周期                                                                                                                       | 10800                  |

| SubscriptionType | 订阅类型。包括：

- Subscription：预付费。
- PayAsYouGo：后付费。
  | PayAsYouGo |
  | Tag | 标签 | 无 |
  | Usage | 使用量 | 0.005000 |
  | UsageUnit | 使用量单位 | 万次 |
  | Zone | 可用区 | cn-shanghai-b |

## 基础语法

新版成本管家以外表形式关联到 Logstore，查询时需要通过查询外表来查询账单数据。

- 查询语句只能为星号（_） ，即竖线（|）前面只能为星号（_）。
- 分析语句中的外表名称固定为 instance_bill，需统一将查询条件添加在 where 子句中。

```sql
* | select xxx from instance_bill where xxx group by xxx limit xxx
```

例如查询 SLS 产品每日消费金额，查询语句如下所示。

```sql
* |
select
  date_trunc('day', __time__) as day,
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'sls'
group by
  day
```

## 示例 1：聚合查询

例如：获取 SLS 总的账单费用。

- 查询和分析语句

```sql
* |
select
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'sls'
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696081-411901b3-8977-4c8f-bba7-810a91b35ff2.png#clientId=uf6657e90-1ef8-4&from=paste&id=udadcf13d&originHeight=160&originWidth=1444&originalType=url&ratio=2&rotation=0&showTitle=false&size=12884&status=done&style=none&taskId=u172c5153-299c-4f1c-a8b7-d6ec664a9ed&title=)

## 示例 2：分组查询

例如：查询不同产品的账单费用。

- 查询和分析语句

```sql
* |
select
  productcode,
  sum(PretaxAmount) as cost
FROM  instance_bill
group by
  productcode
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696365-4e6370d6-0dac-4e6d-b69a-accad7beb8b3.png#clientId=uf6657e90-1ef8-4&from=paste&id=uc48aed10&originHeight=380&originWidth=1432&originalType=url&ratio=2&rotation=0&showTitle=false&size=35844&status=done&style=none&taskId=uad1d0b54-9024-4777-aad9-e9fda5b0e26&title=)

## 示例 3：同比环比分析

例如：按照产品，与上月进行同比分析。

- 查询和分析语句

```sql
* |
SELECT
  diff [1] AS "本月费用",
  diff [2] AS "上月费用",
  diff [3] * 100 -100 as "同比增加%"
FROM (
    SELECT
      compare(amount, 604800) as diff
    FROM (
        SELECT
          sum(PretaxAmount) AS amount
        FROM instance_bill
      )
  )
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696352-ec04d2e4-1cc9-4ddf-8d81-d2992d28d3ec.png#clientId=uf6657e90-1ef8-4&from=paste&id=u96302229&originHeight=160&originWidth=1432&originalType=url&ratio=2&rotation=0&showTitle=false&size=22431&status=done&style=none&taskId=u670cd69b-6256-47e4-b195-01af4139c36&title=)

## 示例 4：分析产品计费项信息

例如：查询 SLS 产品每个计费项的消费金额与用量。

- 查询和分析语句

```sql
* |
SELECT
  BillingItem,
  sum(PretaxAmount) AS "消费",
  sum(Usage) as "用量"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  BillingItem
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696353-a36d9c12-665e-4c59-819d-5e7475a7bdff.png#clientId=uf6657e90-1ef8-4&from=paste&id=u7180aa6f&originHeight=306&originWidth=1432&originalType=url&ratio=2&rotation=0&showTitle=false&size=45857&status=done&style=none&taskId=u608be063-0c6c-4f3c-a7a4-af5866ad3f3&title=)

## 示例 5：按天统计计费项用量趋势

```sql
* |
SELECT
	date_trunc('day', __time__) as t,
  BillingItem,
  sum(PretaxAmount) AS "消费",
  sum(Usage) as "用量"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  BillingItem,
  t
ORDER by
	t
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692342074141-32813ffd-1d36-4de7-be6a-0006545a110e.png#clientId=uf6657e90-1ef8-4&from=paste&height=815&id=u5e3fd12c&originHeight=1630&originWidth=3726&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2564242&status=done&style=none&taskId=uec960ed8-b16b-4676-b8cd-29819e23eea&title=&width=1863)

## 示例 6：统计产品实例费用

例如：查询 SLS 产品每个实例的消费金额。

- 查询和分析语句

```sql
* |
SELECT
  InstanceID,
  sum(PretaxAmount) AS "消费"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  InstanceID
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696367-752b8567-997f-47a9-8505-e3bedb9a7e1b.png#clientId=uf6657e90-1ef8-4&from=paste&id=u91f0ea4a&originHeight=394&originWidth=1438&originalType=url&ratio=2&rotation=0&showTitle=false&size=44429&status=done&style=none&taskId=u75ca8eae-3e80-45fa-bfb5-a3512e7b44d&title=)

## 实例 7：按天统计产品实例费用趋势

```sql
* |
SELECT
	date_trunc('day', __time__) as t,
  InstanceID,
  sum(PretaxAmount) AS "消费"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  InstanceID,
  t
ORDER by
	t
```

- 查询和分析结果

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692342174999-b240bd2b-4568-4915-95ed-f82ab02bcf46.png#clientId=uf6657e90-1ef8-4&from=paste&height=771&id=u99b6328c&originHeight=1542&originWidth=3718&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2306412&status=done&style=none&taskId=ub25be937-9b5d-4df7-add0-aa2a01436f7&title=&width=1859)

## 示例 8：外表联合查询

例如：联合查询账单数据与您自定义的外表数据。
样例中外表为 instance_name_table，您需要修改为实际关联的外部数据源。

- 查询和分析语句

```sql
* | with t1 as (
  select
    InstanceID,
    sum(PretaxAmount) as PretaxAmount
  FROM    instance_bill
),
t2 as (
  select
    InstanceID,
    InstanceName
  FROM    instance_name_table
)
select
  t1.InstanceID,
  t1.PretaxAmount,
  t2.InstanceName
FROM  t1
  left join t2 on t1.InstanceID = t2.InstanceID
```
