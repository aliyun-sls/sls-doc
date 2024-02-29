## 数据准备
```sql
* | select  ip_to_geo(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
![image.png](/img/src/visulization/mapPro/map/6e1d11b4a86002568db40b5a25fa8aca1292de3ecedf77f5851dd5389bc17090.png)
在右边配置栏中,选择【通用配置栏】>【图表类型】>【热力图】 ![image.png](/img/src/visulization/mapPro/heatMap/97b9915c7f1ea64641c5d906d8ae1ede82d97363bfb656711825642168d54029.png)
## 配置
对于本案例，在查询分析配置中，经纬度字段为 **address** 数值列设置为 **count**

- **经维度**：需要把经度和维度组合成一个字段

![image.png](/img/src/visulization/mapPro/heatMap/577006abf238b0d3146ebccbef6f6dcfc122f19f34fe85297734527390fdec5a.png)
## 效果
![image.png](/img/src/visulization/mapPro/heatMap/4a40bed6ff1d258940ca0182755bdad36cc601ee19725c957786134e69e4ecc6.png)
