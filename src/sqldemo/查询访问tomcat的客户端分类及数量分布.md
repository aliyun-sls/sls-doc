通过 user_agent 字段聚合分析，计算出每种客户端的数量，之后根据数量倒序排列， 图中使用的是饼图下的环图展示，分类是user_agent，数值列 c  
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
SQL查询结果样例：
![image.png](/img/src/sqldemo/查询访问tomcat的客户端分类及数量分布/274a980dcec443ccb3a03f8a47127e54464e0f4a45cd274bae2fe181ea7f4725.png)
