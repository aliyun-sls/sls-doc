# Configure the world map
## Prepare data
Use the ip_to_country function to display region information in the world map.
```sql
* | select  ip_to_country(remote_addr) as address, count(1) as count group by address order by count desc limit 10
```
![image.png](/img/src/visulization/mapPro/worldMap/729ac4943d626ac9681b9ab85fa86eff02daa58e38752fb0657a4ce966d2eba7.png)
On the **General Configurations** tab, click the **AMAP Pro** icon in the **Chart Types** section.
![image.png](/img/src/visulization/mapPro/worldMap/c9133367e5b6a86c8bdbe6c868a5254d9154a55a1185a28dea2c708f8ed3573b.png)
## Configure parameters
### Data Type
Valid values of the **Data Type** parameter:

- **Region**: The **Area/Area Code** parameter is required if you set the **Data Type** parameter to **Region**.![image.png](/img/src/visulization/mapPro/worldMap/4eebbd4ee6a50687dd10d01f883026ae05341684dff1eee352248bd00f503e6b.png)
- **Latitude and Longitude**: The **Longitude** and **Latitude** parameters are required if you set the **Data Type** parameter to **Latitude and Longitude**.

![图 25](/img/src/visulization/mapPro/chinaMap/f4021ae27d3ee0d85da46560fc9feadf57cfb6f5bcc2443a44f23eed04f43273.png)


- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.
![图 26](/img/src/visulization/mapPro/chinaMap/384fd9bf51e01e133be7060fa4664f1328c4c0b64594b75dfed282135d4993be.png)
## Configuration result
In this example, in the **Query and Analysis Configurations** section, the **Latitude,Longitude** parameter is set to **address** and the **Value Column** parameter is set to **count**.
![image.png](/img/src/visulization/mapPro/worldMap/aab8050c66ea04bf580fda517227e69c1eb6658c2a32dfa09a18697fae09e74a.png)
![图 30](/img/src/visulization/mapPro/worldMap/fb1cd4955801192cff4e92f5d747b2fcbd40cad8863e44197351aa78a3092f5a.png)

