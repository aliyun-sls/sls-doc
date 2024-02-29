# 如何配置单位

字段单位，跟随在字段后显示。

## 原始数据
每60秒的Nginx访问日志的访问PV

```sql
* | select __time__ - __time__ % 60 as time, COUNT(*) + 300 as pv GROUP BY time order by time limit 200
```
![图 34](/img/src/visulization/generalDashbaord/unitConfig/e168915f35bb7253005ba9eb59963cb27839ef2b0d91a5aab0bfb779a4db527e.png)  

## 操作步骤

1. 在 **通用配置 > 标准配置 > 单位**，默认暂无配置。

![图 36](/img/src/visulization/generalDashbaord/unitConfig/f4df8b4798fb5ab4a86938c955ed00aafe0fa3ee3c821879bdbb01fdc9592754.png)  

2. 在下拉选择中选择自定义， 输入：次，效果如下图。
![图 37](/img/src/visulization/generalDashbaord/unitConfig/8107d6e9a30b4c033061b8762f95b19c83b95c01770257b8ae66e4ede7c2e6eb.png)  
