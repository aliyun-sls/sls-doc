# Custom bill analysis cases

## Prerequisite for use

Cost Manager is activated.

## The billing cycle.

| **Field**                  | **Description**                                                                                                                       | **Sample**               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| BillingDate               | The billing cycle.                                                                                                                           | 2022-11-06             |
| Billing Item               | Billing Items                                                                                                                        | Number of PUT and other requests |
| BillingType               | The billing method.                                                                                                                      | other                   |
| CostUnit                  | The cost center.                                                                                                                       | Not allocated                 |
| Currency                  | The currency.                                                                                                                           | CNY                    |
| DeductedByCashCoupons     | The fee that is offset by using coupons.                                                                                                                     | 0.0                    |
| DeductedByCoupons         | The fee that is offset by using vouchers.                                                                                                                 | 0.0                    |
| DeductedByPrepaidCard     | The fee that is offset by using stored-value cards.                                                                                                                    | 0.0                    |
| DeductedByResourcePackage | The fee that is offset by using resource plans.                                                                                                                     | 0                      |
| InstanceConfig            | The configurations of the instance.                                                                                                                   | none                     |
| Instance ID                |  ID                                                                                                                        | me-east-1%3Bstandard   |
| InstanceSpec              | nstance Type                                                                                                                      | none                  |
| InternetIP                | The public IP address.                                                                                                                  | none                     |
| IntranetIP                | The internal IP address.                                                                                                                  | none                   |
| InvoiceDiscount           | The discount amount.                                                                                                                     | 0.001                  |
| Item                      | The type of the bill, which includes the subscription order, pay-as-you-go bill, refund bill, and adjustment bill. The unit price. | PayAsYouGoBill         |
| ListPrice                 | price                                                                                                                          | 1.020000               |
| ListPriceUnit             | The unit.                                                                                                                       | CNY/10,000 times               |
| NickName                  | The alias of the instance.                                                                                                                      | test                   |
| OutstandingAmount         | The unsettled amount.                                                                                                                     | 0.0                    |
| OwnerID                   | Account ID                                                                                                                     | 12\*\*\*3212           |
| PaymentAmount             | The fee that is paid in cash.                                                                                                                      | 0.0                    |
| PretaxAmount              | The payable amount.                                                                                                                      | 0.0                    |
| PretaxGrossAmount         | The original amount.                                                                                                                      | 0.005                  |
| ProductCode               | The service code.                                                                                                                       | oss                    |
| ProductDetail             | The service details.                                                                                                                      | OSS           |
| ProductName               | The service name.                                                                                                         instance            | Object Storage             |
| ProductType               | The service type.                                                                                                                       | none                    |
| Region                    | region                                                                                                                           | shanghai                   |
| ResourceGroup             | The resource group.                                                                                                                         | none                     |
| ServicePeriod             | The validity period.                                                                                                                       | 10800                  |

| SubscriptionType | The subscription type. Valid values:

- Subscription：Subscription
- PayAsYouGo：Pay-as-you-go
  | PayAsYouGo |
  | Tag | The tag | none |
  | Usage | The usage | 0.005000 |
  | UsageUnit | The usage unit | The unit |
  | Zone | The zone | cn-shanghai-b |

## Basic syntax

The dedicated Tablestore table of the new Cost Manager is associated with the dedicated Logstore of Cost Manager as an external table. You can query billing data only by using the external table.

- Search statement: Only an asterisk (*) can be specified before a vertical bar (|).
- Analytic statement: The name of the dedicated external table is instance_bill. All search conditions must be specified in a WHERE clause.

```sql
* | select xxx from instance_bill where xxx group by xxx limit xxx
```

The following sample query statement is executed to query the daily expenses of Simple Log Service:

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

## Example 1：Query aggregated data

The following example shows how to obtain the total amount of expenses of Simple Log Service.

- Query statement

```sql
* |
select
  sum(PretaxAmount) as cost
FROM  instance_bill
where
  productcode = 'sls'
```

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696081-411901b3-8977-4c8f-bba7-810a91b35ff2.png#clientId=uf6657e90-1ef8-4&from=paste&id=udadcf13d&originHeight=160&originWidth=1444&originalType=url&ratio=2&rotation=0&showTitle=false&size=12884&status=done&style=none&taskId=u172c5153-299c-4f1c-a8b7-d6ec664a9ed&title=)

## Example 2：Query billing data by group

The following example shows how to query the bills of different services.

- Query statement

```sql
* |
select
  productcode,
  sum(PretaxAmount) as cost
FROM  instance_bill
group by
  productcode
```

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696365-4e6370d6-0dac-4e6d-b69a-accad7beb8b3.png#clientId=uf6657e90-1ef8-4&from=paste&id=uc48aed10&originHeight=380&originWidth=1432&originalType=url&ratio=2&rotation=0&showTitle=false&size=35844&status=done&style=none&taskId=uad1d0b54-9024-4777-aad9-e9fda5b0e26&title=)

## Example 3：Example 2

The following example shows how to compare the expenses of the current month with the expenses of the previous month by service.

- Query statement

```sql
* |
SELECT
  diff [1] AS "Expenses of this month",
  diff [2] AS "Expenses of the previous month",
  diff [3] * 100 -100 as "Increased by%"
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

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696352-ec04d2e4-1cc9-4ddf-8d81-d2992d28d3ec.png#clientId=uf6657e90-1ef8-4&from=paste&id=u96302229&originHeight=160&originWidth=1432&originalType=url&ratio=2&rotation=0&showTitle=false&size=22431&status=done&style=none&taskId=u670cd69b-6256-47e4-b195-01af4139c36&title=)

## Example 4：Analyze the billable items of a service

The following example shows how to query the expenses and usage of each billable item in Simple Log Service.

- Query statement

```sql
* |
SELECT
  BillingItem,
  sum(PretaxAmount) AS "consumption",
  sum(Usage) as "usage"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  BillingItem
```

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696353-a36d9c12-665e-4c59-819d-5e7475a7bdff.png#clientId=uf6657e90-1ef8-4&from=paste&id=u7180aa6f&originHeight=306&originWidth=1432&originalType=url&ratio=2&rotation=0&showTitle=false&size=45857&status=done&style=none&taskId=u608be063-0c6c-4f3c-a7a4-af5866ad3f3&title=)

## Example 5: Query the usage trend of billable items by day

```sql
* |
SELECT
	date_trunc('day', __time__) as t,
  BillingItem,
  sum(PretaxAmount) AS "Consumption",
  sum(Usage) as "Usage"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  BillingItem,
  t
ORDER by
	t
```

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692342074141-32813ffd-1d36-4de7-be6a-0006545a110e.png#clientId=uf6657e90-1ef8-4&from=paste&height=815&id=u5e3fd12c&originHeight=1630&originWidth=3726&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2564242&status=done&style=none&taskId=uec960ed8-b16b-4676-b8cd-29819e23eea&title=&width=1863)

## Example  6：Query the expenses of each instance

The following example shows how to query the expenses of each instance in Simple Log Service.

- Query statement

```sql
* |
SELECT
  InstanceID,
  sum(PretaxAmount) AS "Consumption"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  InstanceID
```

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692341696367-752b8567-997f-47a9-8505-e3bedb9a7e1b.png#clientId=uf6657e90-1ef8-4&from=paste&id=u91f0ea4a&originHeight=394&originWidth=1438&originalType=url&ratio=2&rotation=0&showTitle=false&size=44429&status=done&style=none&taskId=u75ca8eae-3e80-45fa-bfb5-a3512e7b44d&title=)

## Example 7：Query the expense trend of instances by day

```sql
* |
SELECT
	date_trunc('day', __time__) as t,
  InstanceID,
  sum(PretaxAmount) AS "Consumption"
FROM  instance_bill
where
  productcode = 'sls'
GROUP by
  InstanceID,
  t
ORDER by
	t
```

- Query and analysis result

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/24957466/1692342174999-b240bd2b-4568-4915-95ed-f82ab02bcf46.png#clientId=uf6657e90-1ef8-4&from=paste&height=771&id=u99b6328c&originHeight=1542&originWidth=3718&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2306412&status=done&style=none&taskId=ub25be937-9b5d-4df7-add0-aa2a01436f7&title=&width=1859)

## Example 8： Query billing data by joining external tables

The following example shows how to query billing data by joining the instance_bill table with a custom external table.
In this example, the name of the external table is instance_name_table. You must replace it with the actual external table that is associated with Simple Log Service.

- Query statement

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
