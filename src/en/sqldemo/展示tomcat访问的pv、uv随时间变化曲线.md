Use the time_series function to align the log time to two minutes, aggregate the data by time, and then use the count function to calculate the number of page views (PVs) and unique visitors (UVs). Use the approx_distinct(remote_addr) function to calculate the number of PVs and UVs after deduplicating the records with the same remote address. Then sort the results by time. The results are displayed in a line chart, in which the x-axis represents the time, the y-axis represents the quantity, and two lines represent the number of PVs and UVs.

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
