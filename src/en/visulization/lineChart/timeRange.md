# Relationships among the x-axis time range, data time range, and query time range

The following line chart shows the x-axis time range, data time range, and query time range.
![image.png](/img/src/visulization/lineChart/timeRange/timeRange1.png)

The x-axis time range varies based on the data time range and the query time range, whereas the query time range and the data time range are specified.
1. The query time range is inconsistent with the data time range.

- Set the query time range to `2023-05-10 09:39:39 - 2023-05-10 13:39:39` and the data time range to `2023-05-09 06:24:18 - 2023-05-09 10:24:18`. The following figure shows the configurations.
![image.png](/img/src/visulization/lineChart/timeRange/timeRange2.png)

-  On the **General Configurations** tab, click **Axis X**. If the **Time Range** parameter is set to **Data Timestamp**, the x-axis time range is `2023-05-09 06:24:18 - 2023-05-09 10:24:18`. The following figure shows the configurations.
![image.png](/img/src/visulization/lineChart/timeRange/timeRange3.png)

- If the **Time Range** parameter is set to **Query Time**, the x-axis time range is `2023-05-10 09:39:39 - 2023-05-10 13:39:39`. The query time range is inconsistent with the data time range. Therefore, no data exists in the line chart, as shown in the following figure.
![image.png](/img/src/visulization/lineChart/timeRange/timeRange4.png)

2. The query time range is the same as the data time range.

- If the **Time Range** parameter is set to **Query Time** or **Data Timestamp**, the x-axis time range is always fixed. The following figure shows the configuration result.
![image.png](/img/src/visulization/lineChart/timeRange/timeRange5.png)
![image.png](/img/src/visulization/lineChart/timeRange/timeRange6.png)

