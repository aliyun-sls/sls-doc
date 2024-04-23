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
Sample SQL query result
![image.png](/img/src/sqldemo/查询访问tomcat的客户端分类及数量分布/274a980dcec443ccb3a03f8a47127e54464e0f4a45cd274bae2fe181ea7f4725.png)
