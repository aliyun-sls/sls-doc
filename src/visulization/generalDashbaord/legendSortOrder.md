## 适用场景
趋势线数量过多<br/>
趋势线显示名区分度不大<br/>
TOP K 的曲线 （只适用流图 pro）<br/>
## 数据准备
统计每分钟每种请求方式的数量
```sql
* | select __time__ - __time__% 60 as minute, count(1) as c,  request_method group by minute, request_method order by minute asc limit 100000
```
**图表类型**： 流图Pro
## 配置方式
在**通用配置**tab下，点击**图例配置**，设置**排序方式**![image.png](/img/src/visulization/generalDashbaord/legendSortOrder/9deeced2a67c376b48528b1e6ba632816160e197729c19fe9d0e9d7d95664e8a.png)

1. 默认**不排序**，此时图例会根据内部计算出来的顺序来展示

此时顺序： DELETE > GET > POST > PUT > HEAD
![image.png](/img/src/visulization/generalDashbaord/legendSortOrder/d334f311f31f519056bacccaa776e1c8e902d101fd9cbadb80f0dfa8fa91a55c.png)

2. **选择升序**，此时内部会计算每条曲线在当前时间区间的**最大值**，并按照最大值进行升序

此时顺序： HEAD > DELETE > PUT > POST > GET
![图 2](/img/src/visulization/generalDashbaord/legendSortOrder/74d7274be49fd1f9f913a1dfbcb08c3705061e52f2b2aad2c6ed6b30d84c679a.png)

3. **选择降序**，此时内部会计算每条曲线在当前时间区间的**最大值**，并按照最大值进行降序

此时顺序：GET > POST > PUT > DELETE > HEAD
![图 3](/img/src/visulization/generalDashbaord/legendSortOrder/a57dbff0a786c0372cdfd30b88f5bd4a52713e2787cc8231324fd69aeddc71fa.png)

## 流图 Top k

1. 设置 k 的数量，**通用配置 > 数据配置 > 设置最大分类数量**
2. 设置图例排序为降序， **通用配置 > 图例配置 > 排序方式降序**
## ![image.png](/img/src/visulization/generalDashbaord/legendSortOrder/87ff82dbd53be25a1adc3961ed9779596e3f98ec30a03b77b28076dd63ec33ad.png)
