## Prepare data
```sql
* | select  ip_to_geo(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
On the **General Configurations** tab, click the **Heatmap** icon in the **Chart Types** section. 
## Configure parameters
In this example, in the **Query and Analysis Configurations** section, the **Latitude,Longitude** parameter is set to **address** and the **Value Column** parameter is set to **count**.

- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.

## Configuration result
![image.png](/img/src/en/visulization/mapPro/heatMap/heatMap01.png)
