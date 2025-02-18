# Configure variable replacement for a table

1. In edit mode of a dashboard, edit the current table. Enter the following query statement.

![image.png](/img/src/en/visulization/tablePro/varReplace/varReplace1.png)

2. Change the value **60** in the previous query statement to the ${{date| 60}} variable. The following example shows the modified query statement.

```sql
* |  select __time__ - __time__ % ${{date| 60}} as time, COUNT(*) as pv, avg(request_time) as duration, request_method GROUP BY time, request_method order by time limit 1000
```

3. On the **General Configurations** tab, configure the parameters in the **Variable Replacement** section.
  Click **AddVariable Replacement**. In the **Variable Replacement** dialog box, set the **Variable Key** parameter to date and the **Display Name** parameter below **Variable Key** to time. In the **Variable Values** section, click **Add**. Then, set the **Display Name** parameter below **Variable Values** to min and hour, and set the **Replacement Value** parameter to 60 for min and 3600 for hour.

![image.png](/img/src/en/visulization/tablePro/varReplace/varReplace2.png)

4. After you configure the parameters, a filter appears in the upper-left corner of the chart. If you select a value from the filter drop-down list, Simple Log Service performs a query and analysis operation based on the value that you select. For example, if you select **hour**, Simple Log Service executes the following query statement: `* | SELECT __time__ - __time__ %3600 AS time, COUNT(*) AS pv, approx_distinct(remote_addr) AS uv GROUP BY time ORDER BY time LIMIT 10000。`

![image.png](/img/src/en/visulization/tablePro/varReplace/varReplace3.png)
