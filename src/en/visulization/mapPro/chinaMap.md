# Configure the map of China
## Prepare data
Use the ip_to_province function to display region information in the map of China.
```sql
* | select ip_to_province(http_x_forwarded_for) as province, count(1) as c group by province order by c desc limit 100000
```
On the **General Configurations** tab, click the **Map** icon in the **Chart Types** section.
![图 19](/img/src/en/visulization/mapPro/chinaMap/chinaMap01.png)
## Configure parameters
### Data Type
Valid values of the **Data Type** parameter:

- **Region**: The **Area/Area Code** parameter is required if you set the **Data Type** parameter to **Region**.

- **Latitude and Longitude**: The **Longitude** and **Latitude** parameters are required if you set the **Data Type** parameter to **Latitude and Longitude**.

- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.

### Location
For the map of China, you can specify the current location. By default, the **Location** parameter is set to **National**.

## Configuration result
In this example, in the **Query and Analysis Configurations** section, the **Data Type** parameter is set to **Region**, the **Area/Area Code** parameter is set to **province**, and the **Value Column** parameter is set to **c**.



