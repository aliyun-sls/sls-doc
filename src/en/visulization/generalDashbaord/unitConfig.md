# Configure the unit of a field

Configure the unit of a field. The unit is displayed after the field.

## Raw data
Execute the following statement to query the numbers of page views (PVs) per 60 seconds based on NGINX access logs:

```sql
* | select __time__ - __time__ % 60 as time, COUNT(*) + 300 as pv GROUP BY time order by time limit 200
```
![图 34](/img/src/visulization/generalDashbaord/unitConfig/e168915f35bb7253005ba9eb59963cb27839ef2b0d91a5aab0bfb779a4db527e.png)  

## Procedure

1. In edit mode of a chart, choose **General Configurations > Standard Configurations**. In the **Standard Configurations** section, configure the **Unit** parameter. By default, the **Unit** parameter is set to **No configuration is available**.

![图 36](/img/src/visulization/generalDashbaord/unitConfig/f4df8b4798fb5ab4a86938c955ed00aafe0fa3ee3c821879bdbb01fdc9592754.png)  

2. Select **Custom** from the Unit drop-down list and enter times, as shown in the following figure.
![图 37](/img/src/visulization/generalDashbaord/unitConfig/8107d6e9a30b4c033061b8762f95b19c83b95c01770257b8ae66e4ede7c2e6eb.png)  
