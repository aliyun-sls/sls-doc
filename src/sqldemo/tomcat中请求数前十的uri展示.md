通过request_uri 分组聚合，计算每个 request_uri 对应的访问量，然后按照访问量倒序排列，取前十条数据， 使用条形图展示uri top10，x轴page，y轴pv，最上面一条是访问量最大的uri
```sql
* |
SELECT
  request_uri as page,
  COUNT(*) as pv
GROUP by
  page
ORDER by
  pv DESC
LIMIT
  10
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/tomcat中请求数前十的uri展示/e178ce268c303b677074e3212468a09821e167e338d5e9e9e668d185aeb6b84b.png)
