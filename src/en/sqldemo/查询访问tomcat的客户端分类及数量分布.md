Aggregate the data based on the user_agent field, calculate the number of clients of each type, and then sort the client types by count in descending order. The results are displayed in a doughnut chart, in which the user_agent field indicates the client type and the c field indicates the value.

```sql
* |
SELECT
  user_agent,
  COUNT(*) AS c
GROUP BY
  user_agent
ORDER BY
  c DESC
```
