Obtain the number of error requests for which the status code is greater than or equal to 400 and the total number of requests in the internal SQL statement, and then calculate the proportions in the external SQL statement. The results are displayed in a dial scale, in which the unit is percentage (%).

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
