# 如何配置世界地图
## 数据准备
使用 ip_to_country
```sql
* | select  ip_to_country(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
![image.png](/img/src/visulization/mapPro/worldMap/729ac4943d626ac9681b9ab85fa86eff02daa58e38752fb0657a4ce966d2eba7.png)
在右边配置栏中,选择【通用配置栏】>【图表类型】>【世界地图】 
![image.png](/img/src/visulization/mapPro/worldMap/c9133367e5b6a86c8bdbe6c868a5254d9154a55a1185a28dea2c708f8ed3573b.png)
## 配置
### 数据类型
目前支持绘制的数据类型

- **区域**：需要查询的字段为区域或区域码![image.png](/img/src/visulization/mapPro/worldMap/4eebbd4ee6a50687dd10d01f883026ae05341684dff1eee352248bd00f503e6b.png)
- **经纬度**： 分别查出经度和纬度两个字段

![图 25](/img/src/visulization/mapPro/chinaMap/f4021ae27d3ee0d85da46560fc9feadf57cfb6f5bcc2443a44f23eed04f43273.png)


- **经度，维度**：把经度和维度组合成一个字段
![图 26](/img/src/visulization/mapPro/chinaMap/384fd9bf51e01e133be7060fa4664f1328c4c0b64594b75dfed282135d4993be.png)
## 效果
对于本案例，在查询分析配置中，区域字段为 **address** 数值列设置为 **count**
![image.png](/img/src/visulization/mapPro/worldMap/aab8050c66ea04bf580fda517227e69c1eb6658c2a32dfa09a18697fae09e74a.png)
![图 30](/img/src/visulization/mapPro/worldMap/fb1cd4955801192cff4e92f5d747b2fcbd40cad8863e44197351aa78a3092f5a.png)

