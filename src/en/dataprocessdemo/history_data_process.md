# Best practices for transforming historical data

## How to transform historical data

If your data has been imported to a Logstore named data_collection and you want to transform the historical data, you need to only configure parameters in the Time Range for Data Transformation section of the Create Data Transformation Job panel.To transform historical data, perform the following steps:

1. In the data_collection panel, click **Data Transformation**.
2. In the code editor of the data transformation page, enter a data transformation statement.
3. Click **Save as Transformation Job**. In the Create Data Transformation Job panel, configure Job Name, Authorization Method, and Storage Destination.
4. In the Time Range for Data Transformation section, set the Time Range parameter to **All**, **From Specific Time**, or **Specific Time Range**.

![](/img/dataprocessdemo/其他/加工范围.png)

Time Range for Data Transformation Note

| option              | Note                                                                                                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All                 | Transforms data in the source Logstore from the first log until the job is manually stopped.                                                                                                    |
| From Specific Time  | Transforms data in the source Logstore from the log that is received at the specified start time until the job is manually stopped.                                                             |
| Specific Time Range | Transforms data in the source Logstore from the log that is received at the specified start time to the log that is received at the specified end time. Then, the job is automatically stopped. |

## View the results of the data transformation job

You can view the transformed data in the destination Logstore.Assume that you distribute data transformation results to the Logstore named target. If no data exists in the destination Logstore, you can use the following solutions.

### Increase the query time range of data

If you do not specify the **time** field in the data transformation statement, the time of a log in the source Logstore is used in the destination Logstore. If you retain the default query time range when you query transformation results in the destination Logstore, you may fail to obtain the log. The default query time range is 15 minutes.In this case, you can specify the query time range by using the time selector next to the search box.

![](/img/dataprocessdemo/其他/时间选择.png)

### Create indexes

An index is an inverted storage structure that consists of keywords and logical pointers. The logical pointers can be used to refer to actual data. You can use an index to quickly locate data rows based on keywords. An index is similar to a data catalog.For more information, see [Create indexes](https://www.alibabacloud.com/help/en/doc-detail/90732.html).

![](/img/dataprocessdemo/其他/未建索引报错.png)

### Reindex logs for a Logstore

A new index of the destination Logstore takes effect only on data that is written to the Logstore after the index is created. If you create indexes for the destination Logstore after you create the data transformation job, you cannot query data that is written to the Logstore by the job before the indexes are created. In this case, you can reindex the data that has been written to the destination Logstore.For more information, see [Reindex logs for a Logstore](https://www.alibabacloud.com/help/en/doc-detail/154965.htm?spm=a2c4g.11186623.0.0.3e0756097AnQYK#task-2424026).

## Improve the efficiency of historical data transformation

If you have a large amount of historical log data and want to concurrently transform historical data and real-time data for later data consumption, the requirements for real-time transformation are difficult to meet. This is due to the efficiency limit of a single data transformation job.In this case, you can create one or more data transformation jobs for historical data, and create a separate data transformation job for real-time data.For example,a large amount of historical log data is saved in a Logstore, and a large amount of data will be imported at any time. If you want to transform the historical data of the last week and the data imported later by creating only one data transformation job, high latency may exist and cannot be reduced.In this case, you can use multiple data transformation jobs to transform the historical data in different time ranges, and use a separate data transformation job to transform the newly imported data.
You need to create a data transformation job on 2023-01-16 to transform data that is written to the source Logstore on and after 2023-01-01 00:00:00. To improve efficiency, you can classify historical data in the time range from 2023-01-01 00:00:00 to 2023-01-15 23:59:59 into three groups, create a data transformation job for each group of data, and then create a data transformation job for data that is written after 2023-01-16 00:00:00. The following figure shows the jobs.

![](/img/dataprocessdemo/其他/任务分割图示.png)

The preceding configurations prevent the historical data from being transformed all the time and prevent high data latency.
