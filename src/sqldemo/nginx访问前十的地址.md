通过split_part函数将request_uri按?分割成array，取分割后的第一个字符串，得出请求的路径，按这个路径group by进行聚合，用count函数计算每个路径访问的次数，用order by对次数进行排序，desc表示顺序是从大到小 通过表格进行展示
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
SQL查询结果样例：
![image.png](/img/src/sqldemo/nginx访问前十的地址/9d329dcd11d9c7591507c4d07bdc9717b666820ea6b1a79bc939b186e57af58d.png)
