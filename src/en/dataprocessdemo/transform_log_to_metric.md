# Convert logs to metrics

<table><tr><td bgcolor="#f8e5c5">This topic provides important information about necessary usage notes. We recommend that you read this topic carefully before you delete an Alibaba Cloud account.</td></tr></table>

If you want to monitor the metric change trend of a log field, you can use the e_to_metric function to convert the log field to a metric. Then, you can view the change trend of the metric in a Metricstore.

## Scenarios

For example, you have created a Logstore named nginx-demo in the China (Hangzhou) region to store NGINX access logs.

You need to monitor the changes of the request time (request_time) and response time (upstream_response_time) of each backend server (host), and then visualize the change trend on a dashboard.

```
body_bytes_sent:1750
host:www.example.com
http_referer:www.guide.example.com
http_user_agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; it-it) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27
http_x_forwarded_for:203.0.113.10
remote_addr:203.0.113.10
remote_user:p288
request_length:13741
request_method:GET
request_time:71
request_uri:/request/path-1/file-1
status:200
time_local:11/Aug/2021:06:52:27
upstream_response_time:0.66
```

To meet the preceding requirements, you must convert the request_time and upstream_response_time fields in logs to metrics, and then add the host label to the metrics.

## Step 1: Create a Metricstore

Create a Metricstore named service-metric to store the time series data that is returned during data transformation.

1. Log on to the [Simple Log Service console](https://sls.console.aliyun.com/lognext/profile).
2. In the Projects section, click the desired project.
3. In the left-side navigation pane, click **Metric Storage**. On the Metricstores tab, click the + icon.
4. In the **Create Metricstore** panel, configure the following parameters and click **OK**.

| **parameter**             | **Note**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MetricStore name**      | The name of the Metricstore. The name must be unique in the project to which the Metricstore belongs. After the Metricstore is created, you cannot change its name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Permanent Storage**     | If you select **Permanent Storage**, Simple Log Service permanently stores the collected metrics.<br><table><tr><td bgcolor="#d6e7f8">**Note** If you query the data retention period by calling an SDK and the returned result is 3650, metrics are permanently stored.</td></tr></table>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Data Retention Period** | The retention period of metrics in the Metricstore. Valid values: 15 to 3000. Unit: days.Metrics are automatically deleted after the specified retention period ends.<br><table><tr><td bgcolor="#f6d8d0">**Warning** If the retention period of a log reaches the data retention period that you specified for the Logstore, the log is deleted.</td></tr></table>You can configure the **Data Retention Period** parameter only if you do not select **Permanent Storage**.<table><tr><td bgcolor="#f8e5c5">**Important** If you shorten the data retention period, Simple Log Service deletes all expired metrics within 1 hour.The data volume that is displayed for **Storage Size(Log)** on the homepage of the Simple Log Service console is updated the next day.For example, if you change the value of the Data Retention Period parameter from 5 to 1, Simple Log Service deletes the metrics of the previous four days within 1 hour.</td></tr></table> |

| **Shards** | The number of shards. Simple Log Service provides shards that allow you to read and write data.Each shard supports a write capacity of 5 MB/s and 500 writes/s and a read capacity of 10 MB/s and 100 reads/s.You can create up to 10 shards in each Metricstore. You can create up to 200 shards in each project.For more information, see [Shard](https://www.alibabacloud.com/help/en/doc-detail/28976.htm?spm=a2c4g.11186623.0.0.1b424c78manSeS#concept-wnn-rqn-vdb) |

## Step 2: Create a data transformation job

Use the e_to_metric function to create a data transformation job and store transformed data in the service-metric Metricstore that you created in Step 1.

1. Go to the data transformation page.
   a. In the Projects section, click the desired project.
   b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
   c. On the query and analysis page, click **Data Transformation**.
2. In the upper-right corner of the page, specify a time range for the required log data.
   Make sure that log data exists on the **Raw Logs** tab.
3. In the code editor, enter the following data transformation statement.
   Change the name of the request_time field to RequestTime, change the name of the upstream_response_time field to ResponseTime, and then add the host label.
   `python
e_to_metric(
    names=[("request_time", "RequestTime"), ("upstream_response_time", "ResponseTime")],
    labels=[("host", "hostname")],
)
`
   For more information, see[e_to_metric](https://www.alibabacloud.com/help/en/doc-detail/125484.htm?spm=a2c4g.11186623.0.0.1b421283FwBl0i#section-u7i-ymg-jzp)。
4. Click **Preview Data**.

5. Create a data transformation job
   a. Click **Save as Transformation Job**.
   b. In the **Create Data Transformation Job** panel, configure the parameters and click **OK**. The following table describes the parameters.

   | parameter                              | Note                                                                                                 |
   | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
   | **Job Name**                           | The name of the data transformation job.Example:log2mectric。                                        |
   | **Authorization Method**               | Select **Default Role** to read data from the source Logstore.                                       |
   | **Storage Destination**                |
   | **Destination Name**                   | The name of the storage destination. log2mectric。                                                   |
   | **Destination Region**                 | The region in which the destination project resides.。                                               |
   | **Destination Project**                | The name of the project to which the destination Logstore belongs.                                   |
   | **Target Store**                       | The name of the destination Metricstore to which transformed data is saved.Example: service-metric。 |
   | **Authorization Method**               | Select **Default Role** to write transformed data to the destination service-metric Metricstore.     |
   | **Time Range for Data Transformation** |
   | **Time Range**                         | Select **All**.\*\*。                                                                                |

   c. In the **Result** dialog box, click **Confirm**.

After you perform the preceding steps, Simple Log Service transforms the log data in the source Logstore and writes transformed data to the destination Metricstore.

## Step 3: Query time series data

1. In the left-side navigation pane, click **Metric Storage**. The Metricstores page appears.
2. On the Metricstore tab, select the destination Metricstore: service-metric
3. In the upper-right corner of the page, click 15 Minutes(Relative) to specify a time range for the query and analysis.
   You can select a relative time range or a time frame. You can also specify a custom time range.
   **Note** The query and analysis results may contain time series data that is generated 1 minute earlier or later than the specified time range.
4. On the **Query Statements** tab, select the RequestTime metric or the ReponseTime metric from the **Metrics** drop-down list and click **Preview**.
   - The following figure shows the change trend of the RequestTime metric for each host.
   - The following figure shows the change trend of the ReponseTime metric for each host.
     
