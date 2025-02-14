# Configure AMAP
## Prepare data
```sql
* | select  ip_to_geo(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
![image.png](/img/src/visulization/mapPro/map/6e1d11b4a86002568db40b5a25fa8aca1292de3ecedf77f5851dd5389bc17090.png)
On the **General Configurations** tab, click the **AMAP Pro** icon in the **Chart Types** section.
![image.png](/img/src/visulization/mapPro/map/c5ae1f205cb79ee43f836a1f1f8d00e8c171a9da9d54b75aeb35fe8f5eeccc64.png)
## Configure parameters
In this example, in the **Query and Analysis Configurations** section, the **Latitude,Longitude** parameter is set to **address** and the **Value Column** parameter is set to **count**.

- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.

![image.png](/img/src/visulization/mapPro/map/59eee1beae8246d6489667ceaac256161557d5220761baf1d98c0acd90b8daf9.png)
## Configuration result
![图 31](/img/src/visulization/mapPro/geoMap/25df10824afde9e33548603379ad23342a63dc2c759bf75452ed53646ab3ba69.png)

