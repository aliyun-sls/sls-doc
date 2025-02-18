# Configure sorting of legend items
## Scenarios
Many trendlines exist<br/>
The display names of trendlines are difficult to distinguish.<br/>
The chart is a Top K chart. This scenario is applicable to a flow chart (Pro).<br/>
## Prepare data
Execute the following statement to count the number of each request method per minute:
```sql
* | select __time__ - __time__% 60 as minute, count(1) as c,  request_method group by minute, request_method order by minute asc limit 100000
```
**Chart Types**: Set the parameter to **Flow ChartPro**.
## Configure sorting
On the **General Configurations** tab, click **Legend Configurations** and configure the **Sorting Order** parameter.

1. By default, the **Sorting Order** parameter is set to **No Sorting**. In this case, data is displayed in a chart based on the order calculated by the system.

Display order: DELETE > GET > POST > PUT > HEAD
![image.png](/img/src/en/visulization/generalDashbaord/legendSortOrder/d334f311f31f519056bacccaa776e1c8e902d101fd9cbadb80f0dfa8fa91a55c.png)

2. If you set the **Sorting Order** parameter to **Ascending**, the system calculates the **maximum value** of each line in the current time range and displays data in a chart based on the ascending order.

Display order HEAD > DELETE > PUT > POST > GET
![图 2](/img/src/en/visulization/generalDashbaord/legendSortOrder/74d7274be49fd1f9f913a1dfbcb08c3705061e52f2b2aad2c6ed6b30d84c679a.png)

3. If you set the **Sorting Order** parameter to **Descending**, the system calculates the **maximum value** of each line in the current time range and displays data in a chart based on the descending order.

Display order: GET > POST > PUT > DELETE > HEAD
![图 3](/img/src/en/visulization/generalDashbaord/legendSortOrder/a57dbff0a786c0372cdfd30b88f5bd4a52713e2787cc8231324fd69aeddc71fa.png)

## Top K in a flow chart (Pro)

1. Set the K field. On the **General Configurations** tab, click **Data Configuration** and configure the **Maximum Categories** parameter.
2. Configure sorting of legend items. On the **General Configurations** tab, click **Legend Configurations** and configure the **Sorting Order** parameter.

