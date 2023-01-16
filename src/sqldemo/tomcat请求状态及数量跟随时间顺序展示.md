通过 date_trunc 函数对日志时间按照分钟对齐，使用 date_format 函数提取出小时、分钟，将提取后的时间与访问状态码status通过group by聚合，获取每分钟每个状态码的count值， 最后使用流图展示数据，x轴为time，y轴count，聚合列是status
```sql
* |
select
  date_format(date_trunc('minute', __time__), '%H:%i') as time,
  COUNT(1) as c,
  status
GROUP by
  time,
  status
ORDER by
  time
LIMIT
  1000
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/tomcat请求状态及数量跟随时间顺序展示/ce87de16a8d615aaf441e3bdee84bdf6fc573a4d91e0c656745d36e7960f2e2b.png)
