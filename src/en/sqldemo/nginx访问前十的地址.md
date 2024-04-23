Use the split_part function to split the request URIs into arrays by question mark (?) and obtain the requested paths from the first string after splitting. Use the group by clause to aggregate the requested paths, use the count function to calculate the number of times that each path is accessed, and then use the order by clause to sort the access counts. In this clause, the desc keyword indicates that the access counts are sorted from large to small. The results are displayed in a table.
```sql
* |
select
  count(1) as pv,
  split_part(request_uri, '?', 1) as path
group by
  path
order by
  pv desc
limit
  10
```
Sample SQL query result
![image.png](/img/src/sqldemo/nginx访问前十的地址/9d329dcd11d9c7591507c4d07bdc9717b666820ea6b1a79bc939b186e57af58d.png)

