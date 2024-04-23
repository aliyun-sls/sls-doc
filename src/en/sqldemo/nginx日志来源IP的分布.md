Use the ip_to_province function to obtain the provinces based on the IP addresses, use the group by clause to aggregate the provinces, and then use the count function to calculate the number of requests from each province. The results are displayed on a map. You can move the pointer over a province on the map to view the number of requests from the specified province.
```sql
* |
select
  count(1) as c,
  ip_to_province(remote_addr) as address
group by
  address
limit
  100
```

Sample SQL query result
![image.png](/img/src/sqldemo/index/99548efeb6f162424decd707000e353de1817f3b33592ed61dfa21e3d2114f2b.png)

