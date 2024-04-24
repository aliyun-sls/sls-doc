#  Process and store data from a Metricstore to another Metricstore
## Target
In this example, the source Metricstore log2metric contains multiple metric columns, including http_status, request_count, request_size, response_size, and response_time. A Scheduled SQL job is created to query the response_time metric of the bucket00788 bucket in the source Metricstore log2metric and store the queried data to the destination Metricstore metric2metric.

### Raw Log  
[Source Metricstore](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/metric/log2metric_metricstore)
<!-- ![image.png](/img/src/scheduledsql/metric2metric/9d85c3bd3d21c688b03d8db27a9c4b44d7fe81f7c9502d44ddb88c4a344234be.png) -->

### Processed logs 
[Destination Metricstore](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/metric/metirc2metric)
<!-- ![image.png](/img/src/scheduledsql/metric2metric/a6625915b5b8a4b43a821b7cb190cb8dfda373143ff0c7f9130d9b9c14eb4917.png) -->

### SQL
Query the response_time metric of the bucket00788 bucket.
```sql

* | select promql_query_range('response_time{bucket="bucket00788"}') from metrics limit 1000
```
## Calculation configurations 
[Modify a Scheduled SQL job](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690515709-728271)
 Click Edit Configurations. In the Modify Scheduled SQL panel, configure the parameters.
<!-- ![image.png](/img/src/scheduledsql/metric2metric/89407a9066246ad04ce56845b5ea7027e22adc989f93876ea73f7c4828334b62.png) -->

![image-60.png](/img/src/scheduledsql/metric2metric/42531ce5f7844f388927c75967d0ab81d0591143e94933f625a9ca570281d0bb.png)

| Configuration item  | Description |
| --- | --- |
| Write Mode | If the source is a Logstore, you can select Import Data from Logstore to Logstore or Import Data from Logstore to Metricstore. In this example, the source is a Metricstore and Import Data from Metricstore to Metricstore is selected. |
| SQL code | Write code to query the response_time metric of the bucket00788 bucket. |

```sql

* | select promql_query_range('response_time{bucket="bucket00788"}') from metrics limit 1000
```
### Result metric name
If you select Import Data from Metricstore to Metricstore as Write Mode, we recommend that you specify the name of the result metric when only one metric is involved. If multiple metrics are involved, the specified metric names are renamed.

### Hash column
You can enable hashing to write data that has the same tag value to the same shard. This enhances the locality and improves the query efficiency.

## Scheduling configurations
![picture 1](/img/src/scheduledsql/metric2metric/d6d973c2dfdf672f8909a56888a55e11d13e7767de511029e0fa50a111ae436b.png)

| Configuration item  | Description |
| --- | --- |
| Scheduling Interval | he interval at which the SQL code is run. In this example, the interval is 5 minute.  |
| Scheduling Time Range | The time window of logs that are analyzed when the SQL code is run. A value of [@m-5m,@m) specifies that only data within 5 minute is analyzed.|
| SQL Timeout | The timeout period and the maximum number of retries of the SQL code. For example, the timeout period is 600 seconds and the maximum number of retries is 20. |


Attention:

1. If data is written to the source Logstore at a latency, we recommend that you set the Delay Task parameter to a greater value to ensure the integrity of the source data.
2. If the maximum number of retries is reached or the timeout period expires, the current instance of the Scheduled SQL job fails and the next instance is scheduled.

For more information about the calculation and scheduling configurations of a Scheduled SQL job, see [Process and save data from a Logstore to another Logstore](https://help.aliyun.com/zh/sls/user-guide/process-and-save-data-from-a-logstore-to-another-logstore?spm=a2c4g.11186623.0.0.2c263cb3fUoe0I) 

## Use an SDK to create a Scheduled SQL job
For more information about how to use an SDK to create a Scheduled SQL job, see [Use Simple Log Service SDK for Java to create a Scheduled SQL job](https://help.aliyun.com/zh/sls/developer-reference/use-log-service-sdk-for-java-to-create-a-scheduled-sql-task?spm=a2c4g.11186623.0.0.23883cb3qpNgsY#task-2218965)  
## Job Management
[Go to the Job Management page](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690515709-728271)
You can view the created Scheduled SQL jobs in the Simple Log Service console.
![image-51.png](/img/src/scheduledsql/metric2metric/afe3c96717b14b387b7a857f297eae08636c2e6d0ef9c9dc206b1080ea82ba8f.png)
On the details page of a Scheduled SQL job, you can view the instances of the job.
![image-61.png](/img/src/scheduledsql/metric2metric/58032d3b03fdc7e77d873a27564b6ca7b616985a340ba536e6667d886dd2bb9f.png)
The information about each instance includes the SQL query range. If an instance fails due to reasons such as insufficient permissions or invalid SQL syntax, or the number of processed rows in the Processed Data Size column is 0, you can retry the instance. If the number of processed rows is 0, the source data is delayed or no data exists.
## Verify effects
### Compare the amount of logs
```
avg(response_time) by (bucket)
```

![image-59.png](/img/src/scheduledsql/metric2metric/8d050d6df98a9828391fb14f5aeb5b69d86d175e6a1983a742d306b638f01f7c.png)

