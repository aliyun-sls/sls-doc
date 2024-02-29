# 如何配置高德地图
## 数据准备
```sql
* | select  ip_to_geo(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
![image.png](/img/src/visulization/mapPro/map/6e1d11b4a86002568db40b5a25fa8aca1292de3ecedf77f5851dd5389bc17090.png)
在右边配置栏中,选择【通用配置栏】>【图表类型】>【高德地图 Pro】
![image.png](/img/src/visulization/mapPro/map/c5ae1f205cb79ee43f836a1f1f8d00e8c171a9da9d54b75aeb35fe8f5eeccc64.png)
## 配置
对于本案例，在查询分析配置中，经纬度字段为 **address** 数值列设置为 **count**

- **经维度**：需要把经度和维度组合成一个字段

![image.png](/img/src/visulization/mapPro/map/59eee1beae8246d6489667ceaac256161557d5220761baf1d98c0acd90b8daf9.png)
## 效果
![图 31](/img/src/visulization/mapPro/geoMap/25df10824afde9e33548603379ad23342a63dc2c759bf75452ed53646ab3ba69.png)

