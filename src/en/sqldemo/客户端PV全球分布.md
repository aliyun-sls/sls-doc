通过ip_to_country获取IP所在国家，然后根据ip_country聚合，计算每个国家的客户端数量， 选择世界地图展示，国家为 ip_country ，数值 pv  
```sql
* |
select
  ip_to_country(client_ip) as ip_country,
  count(*) as pv
group by
  ip_country
order by
  pv desc
limit
  500
```
SQL查询结果样例：
![image.png](/img/src/sqldemo/客户端PV全球分布/bcd0697eda51d491cbf28e786df4f256371745bafcb1a37a35bf6c8af76763b4.png)
