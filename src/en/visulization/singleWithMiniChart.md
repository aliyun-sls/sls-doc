# 如何配置带有迷你图的单值图

当您需要统计某个字段的在一定范围内的计算值（求和、求平均值等），同时也想看到该字段在这一范围的变换趋势，可以在统计图 Pro 中配置迷你图。本文介绍如何在统计图 Pro 中配置迷你图。
最终效果：
![image.png](/img/src/visulization/singlewithMiniChart/4e0664c2379aa363b5f8ab78440caefc54d5ea7a931908bb0c0b4ff460efc198.png)

## 数据准备

迷你图属于趋势类分析图表，一般用于表示一组数据在一个有序数据类别（多为连续时间间隔）上的变化情况，用于直观分析数据变化趋势，所以需要展示的字段需要是一组数据。
例如：
![image.png](/img/src/visulization/singlewithMiniChart/6e05998d5f7cfc47c3913e708fca86a192fff88c9457395421c5c46ca7392533.png)

## 查询分析场景

统计一天内 pv 总数，并直观看到 pv 变化趋势

1. 在仪表盘页面，单击编辑。
2. 在编辑模式下，选择新建图表 > 统计图 pro 图标。
3. 设置查询分析，然后单击应用。
   添加如下查询分析语句。更多信息，请参见[查询分析](https://www.alibabacloud.com/help/en/doc-detail/339860.htm?spm=a2c4g.11186623.0.0.56145b29B9NO9c#concept-2134122)。

```sql
* | select __time__ - __time__ % 3600 as time, COUNT(*) as pv GROUP BY time order by time limit 10000
```

![image.png](/img/src/visulization/singlewithMiniChart/5427dec05cf10ffbe9bb05c089edac37db7c1ffb02dbbb2a25db59e67346dbd9.png)

4. 单击应用，然后在通用配置下的查询分析配置中，设置显示字段为 pv。因为我们重点关注的是 pv 的变化趋势，以及需要去计算查询到 pv 的总数。

![image.png](/img/src/visulization/singlewithMiniChart/e01a4d8416865446dcac436606945b3f0f1598b11853d3b782465355a1e9b60a.png)

5. 计算查询到 pv 的总数。在通用配置下的数据配置中，设置展示模式为计算值，选择计算函数为总和。

![image.png](/img/src/visulization/singlewithMiniChart/14aabd89c1b85adf3917cae8c342381f145a8b7065ad7e752b3194306eb3fd75.png)

6. 显示迷你图。在配置显示迷你图前，需要确认当前的展示模式是否是计算值以及该字段为一组数据。在通用配置下的图表样式中，将图像模式设置为区域。设置完成后如下图所示。

![image.png](/img/src/visulization/singlewithMiniChart/a090f5f29e0b81fb096279fc6db2ee99f3d266ba6fa2d60a90776f2763ce4a60.png)

7. 单击确定，保存统计图表。
8. 单击保存，保存仪表盘。
