# Configure the world map
## Prepare data
Use the ip_to_country function to display region information in the world map.
```sql
* | select  ip_to_country(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```

On the **General Configurations** tab, click the **AMAP Pro** icon in the **Chart Types** section.

## Configure parameters
### Data Type
Valid values of the **Data Type** parameter:

- **Region**: The **Area/Area Code** parameter is required if you set the **Data Type** parameter to **Region**.
- **Latitude and Longitude**: The **Longitude** and **Latitude** parameters are required if you set the **Data Type** parameter to **Latitude and Longitude**.

- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.

## Configuration result
In this example, in the **Query and Analysis Configurations** section, the **Latitude,Longitude** parameter is set to **address** and the **Value Column** parameter is set to **count**.

## Configuration result
![image.png](/img/src/en/visulization/mapPro/heatMap/worldMap01.png)


