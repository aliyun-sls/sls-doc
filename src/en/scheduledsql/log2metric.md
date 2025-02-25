# Process and store data from a Logstore to a Metricstore

## Target
In this example, a Scheduled SQL job is created to calculate the amount of OSS response data (response_size) per minute and store the processed data from the source Logstore to the destination Metricstore.
After the raw log data is processed, the aggregated data is smaller in size. This allows you to focus on information that requires more attention.
### Raw Log  
[Source Logstore oss_source](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/logsearch/oss_source)
<!-- ![image.png](/img/src/en/scheduledsql/log2log/b8845881b27e8d7e37088c0ee2332482fa8b19917a60275905398017bbc68624.png) -->
 Raw logs generated at scattered points in time contain many fields and are large in size.

### Processed logs
[Destination Metricstore log2metric_metricstore](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/logsearch/log2log) 
<!-- ![image.png](/img/src/en/scheduledsql/log2log/150032d15bb53c7eb22f2293850fe2551d7a7fd1d3b0c13b4ec61e3263ceeee9.png) -->
 The raw log data is processed to calculate the amount of OSS response data (response_size) per minute. The time is rounded by minute. The aggregated data is smaller in size.

### SQL
Calculate the amount of OSS response data (response_size) per minute and round the time by minute.
```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as __time__ , sum(content_length_out) as response_size from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, __time__
```

## Calculation configurations 
[Modify a Scheduled SQL job](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/scheduledsql/sql-1690513925-248017)
 Click Edit Configurations. In the Modify Scheduled SQL panel, configure the parameters.
<!-- ![image.png](/img/src/en/scheduledsql/log2log/e9a6533d91862de264157b9550f60857feef2ac81b8b115f5f40f179b0e9aa41.png) -->

![image-47.png](/img/src/en/scheduledsql/log2log/log2log01.png)

<!-- ![image.png](/img/src/en/scheduledsql/log2log/89ad62a7d547be4b591a4537ef189b59adbdecaf42efdb6ca15e48f603594fcc.png) -->
Write Mode: If the source is a Logstore, you can select Import Data from Logstore to Logstore or Import Data from Logstore to Metricstore. In this example, Import Data from Logstore to Metricstore is selected.
SQL Code: Write code to calculate the amount of OSS response data (response_size) per minute and round the time by minute.
```sql

*|select bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, (__time__ - __time__ % 60) as __time__ , sum(content_length_out) as response_size from log group by bucket, bucket_location, bucket_storage_type, http_method, http_status, object, operation, __time__
```
| Configuration item  | Description |
| --- | --- |
| Source Project/Logstore | The name of the source Logstore, which is also the data source of the SQL code. |
| Destination Region | The region where the target is located   |
| Destination Project | The name of the project in which the destination Logstore resides. |
| Destination Logstore | The name of the destination Logstore.|
| Write Authorization  | The Alibaba Cloud Resource Name (ARN) of the role that has the write permissions on the destination Logstore. |
| Execute SQL authorization | ARN for roles with SQL execution permissions |

For more information, see [Access data by using a custom role](https://help.aliyun.com/zh/sls/user-guide/access-data-by-using-a-custom-role#title-a8m-xdm-yrw)

Click Next to go to the Scheduling Settings step.
## Scheduling configurations

| Configuration item | Description |
| --- | --- |
| Scheduling Interval | The interval at which the SQL code is run. In this example, the interval is 1 minute. |
| Scheduling Time Range | The time range during which the SQL code is run.     |
| SQL Time Window| The time window of logs that are analyzed when the SQL code is run. A value of [@m-1m,@m) specifies that only data within 1 minute is analyzed.|
| SQL Timeout  | The timeout period and the maximum number of retries of the SQL code. For example, the timeout period is 600 seconds and the maximum number of retries is 20. |


Attention:

1. If data is written to the source Logstore at a latency, we recommend that you set the Delay Task parameter to a greater value to ensure the integrity of the source data.
2. If the maximum number of retries is reached or the timeout period expires, the current instance of the Scheduled SQL job fails and the next instance is scheduled.

For more information about the calculation and scheduling configurations of a Scheduled SQL job, see [Process and save data from a Logstore to another Logstore](https://help.aliyun.com/zh/sls/user-guide/process-and-save-data-from-a-logstore-to-another-logstore?spm=a2c4g.11186623.0.0.2c263cb3fUoe0I) 

## Use an SDK to create a Scheduled SQL job
For more information about how to use an SDK to create a Scheduled SQL job, see [Use Simple Log Service SDK for Java to create a Scheduled SQL job](https://help.aliyun.com/zh/sls/developer-reference/use-log-service-sdk-for-java-to-create-a-scheduled-sql-task?spm=a2c4g.11186623.0.0.23883cb3qpNgsY#task-2218965)  

## Job Management
[Go to the Job Management page](https://sls.aliyun.com/doc/en/playground/demo.html?dest=/lognext/project/scheduled-sql-demo/overview)
You can view the created Scheduled SQL jobs in the Simple Log Service console.

On the details page of a Scheduled SQL job, you can view the instances of the job.

The information about each instance includes the SQL query range. If an instance fails due to reasons such as insufficient permissions or invalid SQL syntax, or the number of processed rows in the Processed Data Size column is 0, you can retry the instance. If the number of processed rows is 0, the source data is delayed or no data exists.
## Verify effects

### Compare the amount of logs
<!-- ![image.png](/img/src/en/scheduledsql/log2log/d03f7f36c287c4cec6bea0ed943d6f19fe4f2c3daa9ead57bfde46023246ad53.png)
![image.png](/img/src/en/scheduledsql/log2log/0d76e78dabfb7c1511642261456eb29a3c468c724cc5633145b5ac4114a1a88c.png) -->
The source Logstore processes 18,241 log entries per hour, which are 17.27MB in size.

<!-- ![image.png](/img/src/en/scheduledsql/log2log/1487168ab72bf4bb31934cc2316bb3b66111c4c2342291a03e7db70a68a1cb88.png)
![image.png](/img/src/en/scheduledsql/log2log/d3c80b92bf29c5c983aca0b20cde3c6494535de13d46c6a374838dd07c415183.png) -->
The destination Logstore processes 5,752 log entries per hour, which are 1.62 MB in size.
### Query the changes in the amount of OSS response data (response_size) in a bucket over time
```sql

* | select bucket,bucket_location ,bucket_storage_type ,http_method ,response_size,DATE_FORMAT(FROM_UNIXTIME(__time__), '%Y-%m-%d %H:%i:%s') AS datetime where bucket ='bucket6877'and bucket_storage_type = 'archive' order by datetime
```

In the destination Logstore log2log of the Scheduled SQL job, query the data of the bucket6877 bucket whose storage class is Archive in the previous 15 minutes, sort the queried data by time, and then display the changes in the amount of OSS response data (response_size) over time in a chart.

