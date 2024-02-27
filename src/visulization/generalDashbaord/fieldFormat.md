#  如何配置格式化

设置数字的显示格式。如单位，时间格式，百分比和多种计量单位等。

## 原始数据
每60秒的Nginx访问日志的访问PV和访问UV

```sql
* | select __time__ - __time__ % 60 as time, COUNT(*) + 300 as pv, approx_distinct(remote_addr) as uv GROUP BY time order by time limit 200
```

![图 26](/img/src/visulization/generalDashbaord/fieldFormat/0165b0c1af50fe351159dee22121e138d6a2f63e1c167a71138eaf52fe7d88d7.png)  

## 案例一：线图Pro

1. 在 **通用配置 > 标准配置**，格式化项默认 **无格式化**，下图中y轴和悬浮提示中都是原始数据显示。

![图 27](/img/src/visulization/generalDashbaord/fieldFormat/16f4896d9accec4976e9b86db84780ec8f22bd3cf7cef10094d3ed6c24d298db.png)

2. 下拉分别选择 K,Mil,Bil 或 1,000,000 (千位分隔符) 项后，对y轴数据和悬浮提示格式化的效果如下。

![图 28](/img/src/visulization/generalDashbaord/fieldFormat/935933a7955d58caef844c6f155ebf8457b2de6bbb145c29681b868e6513eae5.png)  

![图 29](/img/src/visulization/generalDashbaord/fieldFormat/03b9f6e81668d732435f2376bbbb1d9761da15192d390bfe5138b03ca1521b3b.png) 

## 案例二：表格Pro
1. 在 **通用配置 > 标准配置**，格式化项默认 **无格式化**，下图中y轴和悬浮提示中都是原始数据显示。

![图 30](/img/src/visulization/generalDashbaord/fieldFormat/07ef4b4dab69bb2746afdfaca1f4f5a2acb394cae1bb9bb0cf40485de80a1d6a.png)  

2. 下拉分别选择 K,Mil,Bil 或 1,000,000 (千位分隔符) 项后，对y轴数据和悬浮提示格式化的效果如下。

![图 31](/img/src/visulization/generalDashbaord/fieldFormat/70fbea25f4fb2bfafb432cd759a6878adb90a266a876d91c7dcab5b26ed0b863.png) 

![图 32](/img/src/visulization/generalDashbaord/fieldFormat/a460bbbf58c15bbf0a832e33ec12b0bc00b17f089a2257699a9d4086005511ea.png) 


## 注意事项

在 **通用配置 > 标准配置** 中的格式化中作用的是全部字段，如果需要给多个字段进行不同的格式化，可在 **字段配置** 下指定字段配置，下图是对time字段进行时间格式化。

![图 33](/img/src/visulization/generalDashbaord/fieldFormat/fc25708c9121fc94583d392daaa4af5cb608c9569d777819a4a9ee112ffe0f42.png)  
