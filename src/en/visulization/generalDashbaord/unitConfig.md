# Configure the unit of a field

Configure the unit of a field. The unit is displayed after the field.

## Raw data
Execute the following statement to query the numbers of page views (PVs) per 60 seconds based on NGINX access logs:

```sql
* | select __time__ - __time__ % 60 as time, COUNT(*) + 300 as pv GROUP BY time order by time limit 200
```


## Procedure

1. In edit mode of a chart, choose **General Configurations > Standard Configurations**. In the **Standard Configurations** section, configure the **Unit** parameter. By default, the **Unit** parameter is set to **No configuration is available**.
2. Select **Custom** from the Unit drop-down list and enter times, as shown in the following figure.

![图 36](/img/src/en/visulization/generalDashbaord/unitConfig/unitConfig01.png)  
 
