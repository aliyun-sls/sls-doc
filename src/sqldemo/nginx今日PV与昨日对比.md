# nginx日志查看今日的PV和昨日的对比

先通过count函数计算总的pv，再用compare函数得出今日的pv与昨日的同比

通过单值图进行展示，显示值为20.381Mil，对比值为-2%

```SQL
* |
select
  diff [1] as today,
  round((diff [3] -1.0) * 100, 2) as growth
FROM
  (
    SELECT
      compare(pv, 86400) as diff
    FROM
      (
        SELECT
          COUNT(1) as pv
        FROM
          log
      )
  )
```

# 查询结果：

![样例图片](/img/sqldemo/pvcompare.png)

# 可视化展示

![样例图片](/img/sqldemo/pvcomparechart.png)

# 可视化配置

![样例图片](/img/sqldemo/pvcompareconfig.png)