Use **time** - **time** % 60 to obtain the timestamps that are aligned based on minutes. Use the group by clause to aggregate data based on the timestamp. Use the COUNT function to calculate the number of page views (PVs) per minute and use the obtained result as a subquery. Use the ts_predicate_simple function to predict the number of PVs at the next 6 points of time. After you click Search, the results are automatically displayed in a time series chart.

```sql
* |
select
  ts_predicate_simple(stamp, value, 6)
from
  (
    select
      __time__ - __time__ % 60 as stamp,
      COUNT(1) as value
    from
      log
    GROUP BY
      stamp
    order by
      stamp
  )
LIMIT
  1000
```
