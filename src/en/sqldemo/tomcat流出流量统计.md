Use the time_series function to align the data by time, use the sum(body_bytes_sent) function to calculate the total outbound traffic after time aggregation, and then display the results by time. The results are displayed in a line chart, in which the x-axis represents the time and the y-axis represents the body_sent field.
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
Sample SQL query result
![image.png](/img/src/sqldemo/tomcat流出流量统计/d234a7f0d98ed8507a74f4f52d1632083a0e5c40d14ab2364eee63630ddbf22c.png)

