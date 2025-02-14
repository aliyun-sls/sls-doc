# Configure the map of China
## Prepare data
Use the ip_to_province function to display region information in the map of China.
```sql
* | select ip_to_province(http_x_forwarded_for) as province, count(1) as c group by province order by c desc limit 100000
```
![image.png](/img/src/visulization/mapPro/chinaMap/2a76d2efdc92d80336ff12c60026087a5a74ff383a95d15f83ac8cffedb32d6e.png)
On the **General Configurations** tab, click the **Map** icon in the **Chart Types** section.
![图 19](/img/src/visulization/mapPro/chinaMap/dff1d0e7994c438199907244ed7f12327f4a1c41890c5f1aec94e997185a6c49.png)
## Configure parameters
### Data Type
Valid values of the **Data Type** parameter:

- **Region**: The **Area/Area Code** parameter is required if you set the **Data Type** parameter to **Region**.

![image.png](/img/src/visulization/mapPro/chinaMap/c8af17539b0ef510730b4ff784130320fa6bfc738d3cf7672048883dce78aa2a.png)

- **Latitude and Longitude**: The **Longitude** and **Latitude** parameters are required if you set the **Data Type** parameter to **Latitude and Longitude**.

![图 25](/img/src/visulization/mapPro/chinaMap/f4021ae27d3ee0d85da46560fc9feadf57cfb6f5bcc2443a44f23eed04f43273.png)


- **Latitude,Longitude**: The **Latitude,Longitude** parameter is required if you set the **Data Type** parameter to **Latitude,Longitude**.
![图 26](/img/src/visulization/mapPro/chinaMap/384fd9bf51e01e133be7060fa4664f1328c4c0b64594b75dfed282135d4993be.png)


### Location
For the map of China, you can specify the current location. By default, the **Location** parameter is set to **National**.
![图 27](/img/src/visulization/mapPro/chinaMap/293b4e84fc5c3a518cbe822dd632c4ca1b3d010d91bcc5affa91d4e1f01de15b.png)

## Configuration result
In this example, in the **Query and Analysis Configurations** section, the **Data Type** parameter is set to **Region**, the **Area/Area Code** parameter is set to **province**, and the **Value Column** parameter is set to **c**.
### Location (National)
![image.png](/img/src/visulization/mapPro/chinaMap/17ad73905889c008c1079b428205cea0c88cdfba58c548bb386eefa98b4e35e2.png)
![image.png](/img/src/visulization/mapPro/chinaMap/385b97d7ae435c983fe8bc4db3955a4b53ad48fc25087ee7f1d96a2320763d90.png)
### Location (Zhejiang)
![图 29](/img/src/visulization/mapPro/chinaMap/7447ed4cef6a009b97f55217f59cc7becf68f327cc4d2634b24feb1cba0eda60.png)
![图 28](/img/src/visulization/mapPro/chinaMap/5f263ce276dfda9dc57a90ba6596456a9841448c3523f3c0ed24cc4ceee1430c.png)

