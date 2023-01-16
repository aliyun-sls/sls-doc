使用time_series将数据时间对齐，然后聚合时间计算 body_bytes_sent 的和，按照时间顺序展示， 展示使用折现图，x轴时间，y轴body_sent
```sql
* |
select
  time_series(__time__, '10s', '%H:%i:%S', '0') as time,
  sum(body_bytes_sent) as body_sent
GROUP by
  time
ORDER by
  time
LIMIT
  1000
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/tomcat流出流量统计/d234a7f0d98ed8507a74f4f52d1632083a0e5c40d14ab2364eee63630ddbf22c.png)
