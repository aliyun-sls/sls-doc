Truncate the time to minutes, calculate the number of page views (PVs) based on the time and the request method, and then sort the results by time. The results are displayed in a flow chart, in which the x-axis represents the time, the y-axis represents the pv field, and the aggregated column represents the request_method field.

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
