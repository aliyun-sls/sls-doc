# tomcat请求状态趋势分析

通过 date_trunc 函数对日志时间按照分钟对齐，使用 date_format 函数提取出小时、分钟，将提取后的时间与访问状态码status通过group by聚合，获取每分钟每个状态码的count值，
最后使用流图展示数据，x轴为time，y轴count，聚合列是status


```SQL
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

# SQL查询结果样例：

![样例图片](http://slsconsole.oss-cn-hangzhou.aliyuncs.com/sql_sample/1584591439516%5BTomcat%5D%20Access%20logs_bruce-docker-test1542016396000%20(2).png)
