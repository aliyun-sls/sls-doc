# Replicate data from a Logstore

Simple Log Service allows you to replicate data from a source Logstore to a destination Logstore. To replicate the data, you can create a data transformation job for the source Logstore.This topic describes how to replicate data from a source Logstore to a destination Logstore in a typical scenario.

## Procedure

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com).
2. In the **Projects** section, click project-a.

3. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click logstore-a.

4. In the upper-right corner of the query and analysis page, click **Data Transformation**.

5. Click **Save as Transformation Job**.

6. In the **Create Data Transformation Job** panel, configure the following parameters.

   | parameters           | Note                                                                                                                                                                |
   | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Job Name             | The name of the data transformation job.Example: test.                                                                                                              |
   | Authorization Method | Authorizes Simple Log Service to read data from the logstore-a Logstore.Example: Default Role.                                                                      |
   | Destination Name     | The name of the storage destination.Example: test.                                                                                                                  |
   | Destination Region   | The region in which the destination project resides.In this example, the China (Hangzhou) region is used.                                                           |
   | Destination Project  | logstore-b The name of the destination project.Example:project-b。                                                                                                  |
   | Target Store         | logstore-b name Examplelogstore-b。                                                                                                                                 |
   | Authorization Method | The method that is used to authorize Simple Log Service to read data from and write data to the logstore-a Logstore of the target-a project. Example: Default Role. |
   | Time Range           | The time range for data transformation. All: transforms data in the source Logstore from the first log entry until the data transformation job is manually stopped. |

For more information about parameter configurations, see [Create a data transformation job](https://www.alibabacloud.com/help/en/doc-detail/125615.htm?spm=a2c4g.11186623.2.9.ec9b1353uPmG8o#task-1181217).

7. Click **OK**.

## Result

In the Projects section, click the project-b project. In the left-side navigation pane, click **Log Storage**. On the Logstores page, select the logstore-b Logstore. You can view the data that is replicated from the logstore-a Logstore.![Sample picture](/img/dataprocessdemo/p226660.png)
