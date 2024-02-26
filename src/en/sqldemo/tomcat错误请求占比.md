先在SQL内部获取到请求status超过400的错误请求数量，以及总的请求数量，然后再外部计算比值， 展示时使用单值图中的刻度盘，单位改为 %
```sql
* |
select
  round((errorCount * 100.0 / totalCount), 2) as errorRatio
from
  (
    select
      sum(
        case
          when status >= 400 then 1
          else 0
        end
      ) as errorCount,
      count(1) as totalCount
    from
      log
  )
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/tomcat错误请求占比/5dc737065737ada1ed7d0b61bb625130a647c84491e99e4ded94f4f353288b4d.png)

