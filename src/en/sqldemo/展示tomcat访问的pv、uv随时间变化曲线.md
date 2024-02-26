使用 time_series 函数根据日志时间做两分钟对齐，然后对时间聚合计算COUNT即访问数量，使用approx_distinct(remote_addr) 计算remote_addr去重之后的数量，然后根据时间排序展示 图中x轴为时间、y轴表示数量，两条线分别是uv、pv的情况  
```sql
* |
select
  time_series(__time__, '2m', '%H:%i', '0') as time,
  COUNT(1) as pv,
  approx_distinct(remote_addr) as uv
GROUP by
  time
ORDER by
  time
LIMIT
  1000
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/展示tomcat访问的pv、uv随时间变化曲线/f5a82bdc6db8c0916b1e33b32868914f900f859eb5e8337a10e30dc725b0298e.png)
