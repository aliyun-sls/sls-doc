用from_unixtime函数将__time__转成timestamp格式，用date_format函数将timestamp格式化成小时分钟的格式t，按时间t进行聚合，用count函数计算每分钟的次数pv，作为子查询1，用compare函数查询子查询1，得到今日和昨日的每分钟pv及比值的array，作为子查询2，再查询子查询2，将今天，昨天的pv和比值用编号从array取出，作为单独一列展示 用线图进行展示
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
SQL查询结果样例：
![image.png](/img/src/sqldemo/nginx访问日志的PV趋势同比昨日/e2921500b60ea208cafee4f5b7e7c19fff55a2fca0c281b9f7577a45465b869f.png)
