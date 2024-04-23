Aggregate the data based on the request_uri field and then use the count function to calculate the page views (PVs) of each request URI. Sort the data based on the number of PVs in descending order and obtain the top 10 URIs. The top 10 URIs are displayed in a bar chart, in which the x-axis represents the URI and the y-axis represents the number of PVs. The URI with the most requests is displayed on the top.
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
Sample SQL query result
![image.png](/img/src/sqldemo/tomcat中请求数前十的uri展示/e178ce268c303b677074e3212468a09821e167e338d5e9e9e668d185aeb6b84b.png)

