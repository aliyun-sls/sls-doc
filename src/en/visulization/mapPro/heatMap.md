## Prepare data
```sql
* | select  ip_to_geo(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
![image.png](/img/src/visulization/mapPro/map/6e1d11b4a86002568db40b5a25fa8aca1292de3ecedf77f5851dd5389bc17090.png)
On the **General Configurations** tab, click the **Heatmap** icon in the **Chart Types** section. ![image.png](/img/src/visulization/mapPro/heatMap/97b9915c7f1ea64641c5d906d8ae1ede82d97363bfb656711825642168d54029.png)
## Configure parameters
In this example, in the **Query and Analysis Configurations** section, the **Latitude,Longitude** parameter is set to **address** and the **Value Column** parameter is set to **count**.

- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.

![image.png](/img/src/visulization/mapPro/heatMap/577006abf238b0d3146ebccbef6f6dcfc122f19f34fe85297734527390fdec5a.png)
## Configuration result
![image.png](/img/src/visulization/mapPro/heatMap/4a40bed6ff1d258940ca0182755bdad36cc601ee19725c957786134e69e4ecc6.png)
