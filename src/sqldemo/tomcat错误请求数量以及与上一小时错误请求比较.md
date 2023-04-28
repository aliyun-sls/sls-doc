内层SQL获取到状态大于等于400的请求数，中间层SQL使用compare函数获取3600秒前的数据，外层中c1是当前时间的错误数量，c2是3600秒前的错误数量，c3是c1/c2的比值，用于展示趋势， 图中使用的是单值图中的同比环比图展示，c1为显示值，c3是对比值
```sql
status >= 400 |
SELECT
  diff [1] AS c1,
  diff [2] AS c2,
  round(diff [1] * 100.0 / diff [2] - 100.0, 2) AS c3
FROM
  (
    select
      compare(c, 3600) AS diff
    from
      (
        select
          count(1) as c
        from
          log
      )
  )
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/tomcat错误请求数量以及与上一小时错误请求比较/95d7010717267db2d993a1076f4e2fec522297a54fc538071acf6599159da47f.png)

