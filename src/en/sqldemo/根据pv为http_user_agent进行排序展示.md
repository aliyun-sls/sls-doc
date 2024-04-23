Aggregate the data based on the http_user_agent field, and query the number of the requests from each agent and the total traffic returned to clients. The traffic unit is byte. Convert the unit into MB and round the values to two decimal places. Then, use the case when clause to divide the data into several layers based on the value of the status field, which can be 2xx, 3xx, 4xx, and 5xx. Calculate the percentage of each layer. The results are displayed in a table, which allows you to view the data and their meanings more intuitively.
```sql
* |
select
  http_user_agent as "User agent",
  count(*) as pv,
  round(sum(request_length) / 1024.0 / 1024, 2) as "Request message traffic (MB)",
  round(sum(body_bytes_sent) / 1024.0 / 1024, 2) as "Traffic returned to clients (MB)",
  round(
    sum(
      case
        when status >= 200
        and status < 300 then 1
        else 0
      end
    ) * 100.0 / count(1),
    6
  ) as "2xx ratio (%)",
  round(
    sum(
      case
        when status >= 300
        and status < 400 then 1
        else 0
      end
    ) * 100.0 / count(1),
    6
  ) as "3xx ratio (%)",
  round(
    sum(
      case
        when status >= 400
        and status < 500 then 1
        else 0
      end
    ) * 100.0 / count(1),
    6
  ) as "4xx ratio (%)",
  round(
    sum(
      case
        when status >= 500
        and status < 600 then 1
        else 0
      end
    ) * 100.0 / count(1),
    6
  ) as "5xx ratio (%)"
group by
  "User agent"
order by
  pv desc
limit
  100
```
Sample SQL query result
![image.png](/img/src/sqldemo/根据pv为http_user_agent进行排序展示/90d75af1e25a889abb085f0582444fbad2e39eac5d7cc53b64711e2b86445573.png)
