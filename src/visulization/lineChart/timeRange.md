# x 轴时间范围、数据时间范围与查询时间范围之间的关系

在线图中，这三种时间范围显示如下：
![image.png](/img/src/visulization/lineChart/timeRange/timeRange1.png)

X轴时间范围是根据数据时间范围和查询时间范围来变化的，而查询时间和数据时间范围都是自定义。具体是：
1. 查询时间范围和数据时间范围不一致

- 设置查询时间为`2023-05-10 09:39:39 - 2023-05-10 13:39:39`，数据时间设置为`2023-05-09 06:24:18 -  2023-05-09 10:24:18`。如下：
![image.png](/img/src/visulization/lineChart/timeRange/timeRange2.png)

-  在右侧**通用配置**tab下，点击**X轴**，如果选择时间范围为**数据时间**，则X轴的时间范围为`2023-05-09 06:24:18 -  2023-05-09 10:24:18`。如下：
![image.png](/img/src/visulization/lineChart/timeRange/timeRange3.png)

- 如果选择时间范围为**查询时间**，则X轴的时间范围为`2023-05-10 09:39:39 - 2023-05-10 13:39:39` ，因为与查询分析的时间不一致，所以线图没有数据。如下：
![image.png](/img/src/visulization/lineChart/timeRange/timeRange4.png)

2. 查询时间范围和数据时间范围一致

- 无论选择时间范围是以**查询时间**为准还是以**数据时间**为准，X轴时间范围固定，线图展示也固定。如下：
![image.png](/img/src/visulization/lineChart/timeRange/timeRange5.png)
![image.png](/img/src/visulization/lineChart/timeRange/timeRange6.png)

