# 如何配置中国地图
## 数据准备
使用 ip_to_province 
```sql
* | select ip_to_province(http_x_forwarded_for) as province, count(1) as c group by province order by c desc limit 100000
```
![image.png](/img/src/visulization/mapPro/chinaMap/2a76d2efdc92d80336ff12c60026087a5a74ff383a95d15f83ac8cffedb32d6e.png)
在右边配置栏中,选择【通用配置栏】>【图表类型】>【地图】
![图 19](/img/src/visulization/mapPro/chinaMap/dff1d0e7994c438199907244ed7f12327f4a1c41890c5f1aec94e997185a6c49.png)
## 配置
### 数据类型
目前支持绘制的数据类型

- **区域**：需要查询的字段为区域或区域码

![image.png](/img/src/visulization/mapPro/chinaMap/c8af17539b0ef510730b4ff784130320fa6bfc738d3cf7672048883dce78aa2a.png)

- **经纬度**： 分别查出经度和纬度两个字段

![图 25](/img/src/visulization/mapPro/chinaMap/f4021ae27d3ee0d85da46560fc9feadf57cfb6f5bcc2443a44f23eed04f43273.png)


- **经度，维度**：把经度和维度组合成一个字段
![图 26](/img/src/visulization/mapPro/chinaMap/384fd9bf51e01e133be7060fa4664f1328c4c0b64594b75dfed282135d4993be.png)


### 定位区域
对于中国地图，可以指定当前的定位区域，默认为全国
![图 27](/img/src/visulization/mapPro/chinaMap/293b4e84fc5c3a518cbe822dd632c4ca1b3d010d91bcc5affa91d4e1f01de15b.png)

## 效果
对于本案例，在查询分析配置中，区域字段为 **province** 数值列设置为 **c**
### 区域定位（全国）
![image.png](/img/src/visulization/mapPro/chinaMap/17ad73905889c008c1079b428205cea0c88cdfba58c548bb386eefa98b4e35e2.png)
![image.png](/img/src/visulization/mapPro/chinaMap/385b97d7ae435c983fe8bc4db3955a4b53ad48fc25087ee7f1d96a2320763d90.png)
### 区域定位（浙江）
![图 29](/img/src/visulization/mapPro/chinaMap/7447ed4cef6a009b97f55217f59cc7becf68f327cc4d2634b24feb1cba0eda60.png)
![图 28](/img/src/visulization/mapPro/chinaMap/5f263ce276dfda9dc57a90ba6596456a9841448c3523f3c0ed24cc4ceee1430c.png)

