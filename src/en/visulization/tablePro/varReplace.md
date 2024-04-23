# 如何在表格中使用变量替换

1. 在仪表盘编辑模式，编辑当前表格，当前查询语句如下

![image.png](/img/src/visulization/tablePro/varReplace/varReplace1.png)

2. 将语句**60**设置为变量，设置后的查询语句如下

```sql
* |  select __time__ - __time__ % ${{date| 60}} as time, COUNT(*) as pv, avg(request_time) as duration, request_method GROUP BY time, request_method order by time limit 1000
```

3. 在**通用配置**中设置变量替换。
   设置**变量 key**为 date，变量的**显示名**为时间，变量值的**显示名**为 min、hour，对应的变量值为 60、3600。

![image.png](/img/src/visulization/tablePro/varReplace/varReplace2.png)

4. 设置完成后，统计图表的左上方将出现一个过滤器。选择对应的值后，日志服务将根据您选择的值执行一次查询与分析操作。例如您选择**hour**，对应的查询分析语句为 `* | SELECT __time__ - __time__ %3600 AS time, COUNT(*) AS pv, approx_distinct(remote_addr) AS uv GROUP BY time ORDER BY time LIMIT 10000。`

![image.png](/img/src/visulization/tablePro/varReplace/varReplace3.png)
