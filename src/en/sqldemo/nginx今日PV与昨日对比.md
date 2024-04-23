# nginx日志查看今日PV和昨日对比

Use the count function to calculate the total page views (PVs) and then use the compare function to obtain the day-to-day comparison for PVs of today and yesterday.

The results are displayed in a single value chart. In this example, the number of PVs of today is 20.381Mil, with a change of –2% compared with that of yesterday.

[Trial Demo](./../playground/demo.md?dest=%2Flognext%2Fproject%2Fnginx-demo-log%2Flogsearch%2Fnginx-access-log%3Fencode%3Dbase64%26queryString%3DKiB8IHNlbGVjdCBkaWZmIFsxXSBhcyB0b2RheSwgcm91bmQoKGRpZmYgWzNdIC0xLjApICogMTAwLCAyKSBhcyBncm93dGggRlJPTSAoIFNFTEVDVCBjb21wYXJlKHB2LCA4NjQwMCkgYXMgZGlmZiBGUk9NICggU0VMRUNUIENPVU5UKDEpIGFzIHB2IEZST00gbG9nICkgKQ%3D%3D%26queryTimeType%3D6%26isShare%3Dtrue&maxWidth=true){target="_blank"}

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

![样例图片](/img/sqldemo/pvcomparechart.png)

