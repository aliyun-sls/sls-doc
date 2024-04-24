# Analyze the trend of Tomcat request status

Use the date_trunc function to truncate the log time to minutes, use the date_format function to extract the hours and minutes, use the group by clause to aggregate the data based on the formatted time and the status code to obtain the count value of each status code per minute. The results are displayed in a flow chart, in which the x-axis represents the time, the y-axis represents the count, and the aggregated column represents the status.

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
