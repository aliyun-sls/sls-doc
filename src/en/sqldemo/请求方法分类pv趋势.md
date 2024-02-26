时间按照分钟对齐，然后与method一起分组聚合计算pv，然后按照时间继续排序， 使用流图展示，x轴为时间，y轴pv，聚合列 request_method  
```sql
* |
select
  date_format(date_trunc('minute', __time__), '%m-%d %H:%i') as t,
  request_method,
  count(*) as pv
group by
  t,
  request_method
order by
  t asc
limit
  10000
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/请求方法分类pv趋势/b85b192864e8b9acccfd445ea0ba70f384a6eaca2efb3788e307fe8a4e9e174f.png)
