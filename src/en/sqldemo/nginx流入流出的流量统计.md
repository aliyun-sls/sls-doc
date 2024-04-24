Use the date_trunc function to truncate the value of the **time** field to hours. The **time** field is a system field that indicates the log collection time. The timestamps in seconds are used by default. Use the date_format function to format the aligned data, use the group by clause to aggregate the aligned time, and then use the sum function to calculate the total traffic per hour. The results are displayed in a line chart, in which the x-axis represents the time and the y-axis on the left represents the net_out and net_in fields.

```sql
* |
select
  sum(body_bytes_sent) as net_out,
  sum(request_length) as net_in,
  date_format(date_trunc('hour', __time__), '%m-%d %H:%i') as time
group by
  date_format(date_trunc('hour', __time__), '%m-%d %H:%i')
order by
  time
  10000
```
