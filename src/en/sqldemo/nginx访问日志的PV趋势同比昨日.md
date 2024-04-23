Use the from_unixtime function to convert the value of the __time__ field into a timestamp, use the date_format function to format timestamps into time t in the hour-minute format, and then aggregate the data by time t. Use the count function to calculate the number of page views (PVs) per minute and use the results as Subquery 1. Use the compare function to query the results of Subquery 1 to obtain the arrays of PVs per minute and the ratio of PVs of today to PVs of yesterday and use the results as Subquery 2. Then, query the results of Subquery 2 to obtain the PVs of today and yesterday and the comparison ratio from the arrays. The results are displayed in separate columns in a line chart.
```sql
* |
select
  t,
  diff [1] as today,
  diff [2] as yestoday,
  diff [3] as percentage
from(
    select
      t,
      compare(pv, 86400) as diff
    from
      (
        select
          count(1) as pv,
          date_format(from_unixtime(__time__), '%H:%i') as t
        from
          log
        group by
          t
        limit
          10000
      )
    group by
      t
    order by
      t
    limit
      10000
  )
```
Sample SQL query result
![image.png](/img/src/sqldemo/nginx访问日志的PV趋势同比昨日/e2921500b60ea208cafee4f5b7e7c19fff55a2fca0c281b9f7577a45465b869f.png)
