#  Configure the display format of numeric values

Configure the display format of numeric values, such as the unit, time format, and percentage.

## Raw data
Execute the following statement to query the numbers of page views (PVs) and unique visitors (UVs) per 60 seconds based on NGINX access logs:

```sql
* | select __time__ - __time__ % 60 as time, COUNT(*) + 300 as pv, approx_distinct(remote_addr) as uv GROUP BY time order by time limit 200
```

## Case 1: line chart (Pro)

1. On the **General Configurations** tab, click **Standard Configurations**. The default value of the **Format** parameter is **No Formatting**. The following figure shows that the raw data is displayed in the y-axis and tooltips.

![图 27](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat.png)

2. Set the **Format** parameter to **K,Mil,Bil** or **1,000,000**. The following figures show that the formatted data is displayed in the y-axis and tooltips.

![图 28](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat01.png)  

![图 29](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat02.png) 

## Case 2: table (Pro)
1. On the **General Configurations** tab, click **Standard Configurations**. The default value of the **Format** parameter is **No Formatting**. The following figure shows that the raw data is displayed in the y-axis and tooltips.

![图 30](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat03.png)  

2. Set the **Format** parameter to **K,Mil,Bil** or **1,000,000**. The following figures show that the formatted data is displayed in the y-axis and tooltips.

![图 31](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat04.png) 

![图 32](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat05.png) 


## precautions

The configurations in the **Standard Configurations** section of the **General Configurations** tab apply to all fields. If you want to configure different formats for multiple fields, go to the **Field Configuration** tab to configure specified fields. The following figure shows the time format configuration of the time field. 

![图 33](/img/src/en/visulization/generalDashbaord/fieldFormat/fieldFormat06.png)  
