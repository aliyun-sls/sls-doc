#  Configure the display format of numeric values

Configure the display format of numeric values, such as the unit, time format, and percentage.

## Raw data
Execute the following statement to query the numbers of page views (PVs) and unique visitors (UVs) per 60 seconds based on NGINX access logs:

```sql
* | select __time__ - __time__ % 60 as time, COUNT(*) + 300 as pv, approx_distinct(remote_addr) as uv GROUP BY time order by time limit 200
```

![图 26](/img/src/visulization/generalDashbaord/fieldFormat/0165b0c1af50fe351159dee22121e138d6a2f63e1c167a71138eaf52fe7d88d7.png)  

## Case 1: line chart (Pro)

1. On the **General Configurations** tab, click **Standard Configurations**. The default value of the **Format** parameter is **No Formatting**. The following figure shows that the raw data is displayed in the y-axis and tooltips.

![图 27](/img/src/visulization/generalDashbaord/fieldFormat/16f4896d9accec4976e9b86db84780ec8f22bd3cf7cef10094d3ed6c24d298db.png)

2. Set the **Format** parameter to **K,Mil,Bil** or **1,000,000**. The following figures show that the formatted data is displayed in the y-axis and tooltips.

![图 28](/img/src/visulization/generalDashbaord/fieldFormat/935933a7955d58caef844c6f155ebf8457b2de6bbb145c29681b868e6513eae5.png)  

![图 29](/img/src/visulization/generalDashbaord/fieldFormat/03b9f6e81668d732435f2376bbbb1d9761da15192d390bfe5138b03ca1521b3b.png) 

## Case 2: table (Pro)
1. On the **General Configurations** tab, click **Standard Configurations**. The default value of the **Format** parameter is **No Formatting**. The following figure shows that the raw data is displayed in the y-axis and tooltips.

![图 30](/img/src/visulization/generalDashbaord/fieldFormat/07ef4b4dab69bb2746afdfaca1f4f5a2acb394cae1bb9bb0cf40485de80a1d6a.png)  

2. Set the **Format** parameter to **K,Mil,Bil** or **1,000,000**. The following figures show that the formatted data is displayed in the y-axis and tooltips.

![图 31](/img/src/visulization/generalDashbaord/fieldFormat/70fbea25f4fb2bfafb432cd759a6878adb90a266a876d91c7dcab5b26ed0b863.png) 

![图 32](/img/src/visulization/generalDashbaord/fieldFormat/a460bbbf58c15bbf0a832e33ec12b0bc00b17f089a2257699a9d4086005511ea.png) 


## precautions

The configurations in the **Standard Configurations** section of the **General Configurations** tab apply to all fields. If you want to configure different formats for multiple fields, go to the **Field Configuration** tab to configure specified fields. The following figure shows the time format configuration of the time field. 

![图 33](/img/src/visulization/generalDashbaord/fieldFormat/fc25708c9121fc94583d392daaa4af5cb608c9569d777819a4a9ee112ffe0f42.png)  
