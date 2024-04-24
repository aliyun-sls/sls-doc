# Use a resource function to obtain incremental data

When Simple Log Service pulls incremental data, it pulls only new or updated data to improve efficiency.This topic describes how to use the res_rds_mysql function to obtain incremental data from a database that is created on an ApsaraDB RDS for MySQL instance.

## Resources and data samples

- Simple Log Service resources
  - Project：client-project
  - source Logstore：client-log
    The following figure shows data samples.
  - target Logstore：client-information
- RDS resource

  - Database：client-db
  - Database table name：client
    The following figure shows data samples.

  - Username and password of an account that is used to connect to the database: test/test1234@@
  - Public endpoint of the database: rm-bp1k\*\*\*\*tp8o.mysql.rds.aliyuncs.com

## Procedure

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/?spm=a2c4g.11186623.0.0.9cd93c05OdrePh).
2. Go to the data transformation page.
   a.In the **Projects** section, click Destination Project（client-project）。
   b.In the left-side navigation pane, click **Log Storage**. On the Logstores page, clickLogstore（client-log）。
   c. On the query and analysis page, click **Data Transformation**.
3. In the upper-right corner of the page, specify a time range for the required log data.
   Make sure that log data exists on the **Raw Logs** tab.
4. In the code editor, enter the following data transformation statement.
   For more information, see[res_rds_mysql](https://www.alibabacloud.com/help/en/doc-detail/129401.htm?spm=a2c4g.11186623.0.0.9cd91cf8bLH92K#section-49h-ufh-ptu)。
   ```python
   e_table_map(
       res_rds_mysql(
           "rm-bp1k****tp8o.mysql.rds.aliyuncs.com",
           "test",
           "test1234@@",
           "client-db",
           table="client",
           fields=["c_id", "name", "telephone", "update_time"],
           refresh_interval=1,
           primary_keys="c_id",
           update_time_key="update_time",
           deleted_flag_key=None,
       ),
       "c_id",
       ["name", "telephone"],
   )
   ```
5. Quick Preview data in advanced mode.
   Check whether the specified data transformation statement is valid.For more information, see [Quick preview](https://www.alibabacloud.com/help/en/doc-detail/263336.htm?spm=a2c4g.11186623.0.0.9cd93c11K1aIHY#task-2089290).
   a. Select **Quick**.
   b. Click the **Test Data** tab, and then the **Data** tab. On the Data tab, enter the following content:
   `   {
  "__source__": "192.0.2.0",
  "__time__": 1624956516,
  "__topic__": "log",
  "__tag__:__client_ip__":"192.0.2.2",
  "c_id": "1",
  "staff_id": "002",
  "status": "Continuous follow-up",
  "tag": "Second follow-up",
}`
   c. Click the **Test Data** tab, and then the **Data** tab. On the Data tab, enter the following content:
   ```
   c_id,name,telephone,update_time,delete_flag
   1,maki,010-123,1606358931,false
   ```
   d. Click **Preview Data**.
   View the transformation results.Quick preview results
6. Preview data in advanced mode.
   Check whether Simple Log Service is connected to the ApsaraDB RDS for MySQL instance.
   a. Click **senior**。
   b. Click **Preview Data**.
   c. In the Add Preview Settings panel, configure the Authorization Method parameter and click **OK**.
  
   d. View the transformation results.
  
   If an error is reported, fix the error by following the instructions provided in [How do I fix syntax errors that occur when I pull data from ApsaraDB RDS for MySQL?](https://www.alibabacloud.com/help/en/doc-detail/135597.htm?spm=a2c4g.11186623.0.0.9cd93c05OdrePh#concept-2070603).

7. Create a data transformation job
   a. Click **Save as Transformation Job**.
   b. In the **Create Data Transformation Job** panel, configure the following parameters.
   For more information, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.0.0.9cd93d89eMoN40#task-1181217).
  
   After the data transformation job is created, you can view the transformed data in the destination Logstore.
  

## FAQ

How do I use the deletion feature in the incremental pulling mode?
In the incremental pulling mode, Simple Log Service pulls only new or updated data based on the primary key and time field of the required database table.If you configure delete_flag=true for a data record in a database table to mark the record for deletion, Simple Log Service still pulls the record for transformation.To resolve this issue, Simple Log Service adds the deleted_flag_key parameter to the res_rds_mysql function.If you configure the deleted_flag_key parameter in a data transformation statement to pull data from a database table, the data transformation job deletes data rows for which the delete_flag parameter is set to true from the in-memory dimension table of the job after the job obtains the updated data from the table. This does not affect the content of the database table.
