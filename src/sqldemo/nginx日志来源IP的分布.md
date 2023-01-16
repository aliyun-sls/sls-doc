通过ip_to_province函数得出ip对应的省地址，用group by对地址聚合，用count函数计算出每个地址出现的次数 通过地图进行展示，鼠标悬浮可以展示，对应省的次数
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

SQL查询结果样例：
![image.png](/img/src/sqldemo/index/99548efeb6f162424decd707000e353de1817f3b33592ed61dfa21e3d2114f2b.png)
