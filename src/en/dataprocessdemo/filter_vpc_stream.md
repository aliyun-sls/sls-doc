# Filter VPC flow logs for Internet traffic logs

After you enable the flow log feature in the Virtual Private Cloud (VPC) console, flow logs are collected and sent to Simple Log Service. You can use Simple Log Service to query and analyze the flow logs. You can also troubleshoot network errors based on the flow logs.

## Procedure

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/lognext/profile).
2. In the Projects section, click the desired project.
3. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
4. In the upper-right corner of the query and analysis page, click **Data Transformation**.
5. Use the data transformation feature to enrich log data. The following sample code provides a data transformation statement:

   ```python
   e_if(
     e_not_has("srcaddr"),
     e_drop()
   )
   e_if(
     e_not_has("dstaddr"),
     e_drop()
   )

   e_if(
     op_not(
       e_match("srcaddr", grok(r'%{IP}'))
     ),
     e_drop()
   )
   e_if(
     op_not(
       e_match("dstaddr", grok(r'%{IP}'))
     ),
     e_drop()
   )

   e_if(
     op_and(
       op_or(
         ip_cidrmatch("10.0.0.0/8", v("srcaddr")),
         ip_cidrmatch("172.16.0.0/12", v("srcaddr")),
         ip_cidrmatch("192.168.0.0/16", v("srcaddr"))
       ),
       op_or(ip_cidrmatch("10.0.0.0/8", v("dstaddr")),
         ip_cidrmatch("172.16.0.0/12", v("dstaddr")),
         ip_cidrmatch("192.168.0.0/16", v("dstaddr"))
       )
     ),
     e_drop()
   )
   ```

   - Use the e_if and e_not_has functions to delete raw logs that do not contain the srcaddr or the dstaddr field.For more information, see e_if, e_not_has, and e_drop.
   - Use the e_if, op_not, and e_match functions to delete raw logs in which the value of the srcaddr or the dstaddr field does not conform to the IP address format.
   - Use the e_if, op_and, op_or, and ip_cidrmatch functions to delete raw logs in which recorded traffic is transferred over internal networks.For more information, see op_and、op_or and ip_cidrmatch。

6. Click **Preview Data**.
   Only the flow logs that record Internet traffic are retained.
   ![Flow log](/img/dataprocessdemo/数据富化/流日志.png)
7. Click **Save as Transformation Job**.
8. In the **Create Data Transformation Job** panel, configure the parameters and click **OK**. The following table describes the parameters.
   a. Configure the basic parameters.
   |parameter | Note |
   | -------| --------- |
   | Job Name| The name of the data transformation job.Example: vpc-flowlog-public。 |
   |Authorization Method| The method that is used to authorize Simple Log Service to read data from the source Logstore.Example: Default Role. |

   b. setting Storage Destination
   |parameter | Note |
   | -------| --------- |
   |Destination Name| The name of the storage destination.Example: target-a。 |
   | Destination Region | The region in which the destination project residesIn this example, the China (Hangzhou) region is used. |
   | Destination Project |The name of the project that is used to store Internet traffic logs.Example: project-vpc-flowlog-public。 |
   | Target Store | The name of the Logstore that is used to store Internet traffic logs.Example: logstore-vpc-flowlog-public。 |
   |Authorization Method| The method that is used to authorize Simple Log Service to read data from and write data to the Logstore of the storage destination.Example: Default Role. |

   c. Specify a time range for data transformation.
   |parameter| Note |
   | -------| --------- |
   | Time Range | The time range for data transformation. If you select All, Simple Log Service transforms all data in the source Logstore from the start of the specified time range. |

After creation, you can:

- View the details and status of the data transformation job. You can also start, stop, modify, or delete the data transformation job.For more information, see [Manage a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/128744.htm?spm=a2c4g.11186623.0.0.7b002f7aJzc9c6#task-1580295).
- Go to the Logstore of the storage destination to view the Internet traffic logs of the VPC flow logs.The Logstore stores only Internet traffic logs.
  For example, you can enter the following query statement to query and analyze Internet traffic by source city and destination city:
  ```python
  * | select ip_to_city(srcaddr) as sourceAddr,ip_to_city(dstaddr) as dstAddr,COUNT(*) as pv group by sourceAddr,dstAddr order by pv limit 10
  ```
  ![Flow log1](/img/dataprocessdemo/数据富化/流日志1.png)
