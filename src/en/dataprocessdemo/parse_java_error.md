# Parse Java error logs

In big data scenarios that require high concurrency, effective analysis of Java error logs can reduce the O&M costs of Java applications.You can use Simple Log Service to collect Java error logs from Alibaba Cloud services and use the data transformation feature to parse the collected logs.

## The procedure consists of the following steps:

The error logs of Application A are collected by using Logtail and are stored in the cloud_product_error_log Logstore. Then, the error logs are transformed and the transformed logs are sent to the Logstore of each cloud service for error analysis.The procedure consists of the following steps:

1. Design a data transformation statement: In this step, analyze the transformation logic and write a transformation statement.
2. Create a data transformation job: In this step, send logs to different Logstores of cloud services for error analysis.
   3.Query and analyze data: In this step, analyze error logs in the Logstore of each cloud service.

## Step 1: Design a data transformation statement

### Transformation procedure

To analyze error logs in a convenient manner, you must complete the following operations:

1. Extract the log time, error code, status code, service name, error message, request method, and error line number from the message field.
2. Send error logs to the Logstore of each cloud service.
   

### Transformation logic

In this case, you must analyze the log time, error code, status code, service name, error message, request method, and error line number in the raw log field, and then design regular expressions for each field that you want to extract.


### Grammar Explanation

1. Use the regex_match function to match logs that contain LogException.For more information, see [regex_match](https://www.alibabacloud.com/help/en/doc-detail/125411.htm?spm=a2c4g.11186623.0.0.400463baujwkqV#section-p5o-wsv-w8a).
2. If a log contains LogException, the log is transformed based on the transformation rule of Simple Log Service error logs. If a log contains OSSException, the log is transformed based on the transformation rule of OSS error logs.For more information, see[e_switch](https://www.alibabacloud.com/help/en/doc-detail/129393.htm?spm=a2c4g.11186623.0.0.400450eeasy38j#section-f1t-ukb-ilk)。
3. Use the e_regex function to parse error logs for each cloud service.For more information, see[e_regex](https://www.alibabacloud.com/help/en/doc-detail/125488.htm?spm=a2c4g.11186623.0.0.40046327TTEjv8#section-1rn-crw-ur9)。
4. Delete the message field and send error logs to the Logstore of the corresponding cloud service.For more information, see[e_drop_fields](https://www.alibabacloud.com/help/en/doc-detail/125485.htm?spm=a2c4g.11186623.0.0.4004ac3aWDwCuN#section-q8m-zn8-uvj)和[e_output、e_coutput](https://www.alibabacloud.com/help/en/doc-detail/125484.htm?spm=a2c4g.11186623.0.0.40044358BWfUrK#section-zi7-wtp-30c).
5. For more information, see the [Group section in Regular expressions](https://www.alibabacloud.com/help/en/doc-detail/129386.htm?spm=a2c4g.11186623.0.0.4004176fAP7mNI#section-r6z-2z2-97g).

### Transformation statement syntax

The following figure shows how to use regular expressions to parse a Simple Log Service error log.

The following example shows the specific syntax of a data transformation statement:：

```python
e_switch(
    regex_match(v("message"), r"LogException"),
    e_compose(
        e_regex(
            "message",
            "(?P<data_time>\S+\s\S+)\s(?P<error_code>[a-zA-Z]+)\s(?P<status>[0-9]+)\scom\.aliyun\.openservices\.log\.exception\.(?P<product_exception>[a-zA-Z]+)\:(?P<error_message>[a-zA-Z0-9:,\-\s]+)\.(\s+\S+\s\S+){5}\s+\S+\scom\.aliyun\.openservices\.log\.Client\.(?P<method>[a-zA-Z]+)\S+\s+\S+\stransformEvent\.main\(transformEvent\.java\:(?P<error_line>[0-9]+)\)",
        ),
        e_drop_fields("message"),
        e_output("sls-error"),
    ),
    regex_match(v("message"), r"OSSException"),
    e_compose(
        e_regex(
            "message",
            "(?P<data_time>\S+\s\S+)\scom\.aliyun\.oss\.(?P<product_exception>[a-zA-Z]+)\:(?P<error_message>[a-zA-Z0-9,\s]+)\.\n\[ErrorCode\]\:\s(?P<error_code>[a-zA-Z]+)\n\[RequestId\]\:\s(?P<request_id>[a-zA-Z0-9]+)\n\[HostId\]\:\s(?P<host_id>[a-zA-Z-.]+)\n\S+\n\S+(\s\S+){3}\n\s+\S+\s+(.+)(\s+\S+){24}\scom\.aliyun\.oss\.OSSClient\.(?P<method>[a-zA-Z]+)\S+\s+\S+\stransformEvent\.main\(transformEvent\.java:(?P<error_line>[0-9]+)\)",
        ),
        e_drop_fields("message"),
        e_output("oss-error"),
    ),
)
```

## Step 2: Create a data transformation job

1. Go to the data transformation page.
   a. In the Projects section, click the desired project.
   b. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
   c. On the query and analysis page, click **Data Transformation**.
2. In the upper-right corner of the page, specify a time range for the required log data.
   Make sure that log data exists on the **Raw Logs** tab.
3. In the code editor, enter the following data transformation statement.
   ```python
   e_switch(
       regex_match(v("message"), r"LogException"),
       e_compose(
           e_regex(
               "message",
               "(?P<data_time>\S+\s\S+)\s(?P<error_code>[a-zA-Z]+)\s(?P<status>[0-9]+)\scom\.aliyun\.openservices\.log\.exception\.(?P<product_exception>[a-zA-Z]+)\:(?P<error_message>[a-zA-Z0-9:,\-\s]+)\.(\s+\S+\s\S+){5}\s+\S+\scom\.aliyun\.openservices\.log\.Client\.(?P<method>[a-zA-Z]+)\S+\s+\S+\stransformEvent\.main\(transformEvent\.java\:(?P<error_line>[0-9]+)\)",
           ),
           e_drop_fields("message"),
           e_output("sls-error"),
       ),
       regex_match(v("message"), r"OSSException"),
       e_compose(
           e_regex(
               "message",
               "(?P<data_time>\S+\s\S+)\scom\.aliyun\.oss\.(?P<product_exception>[a-zA-Z]+)\:(?P<error_message>[a-zA-Z0-9,\s]+)\.\n\[ErrorCode\]\:\s(?P<error_code>[a-zA-Z]+)\n\[RequestId\]\:\s(?P<request_id>[a-zA-Z0-9]+)\n\[HostId\]\:\s(?P<host_id>[a-zA-Z-.]+)\n\S+\n\S+(\s\S+){3}\n\s+\S+\s+(.+)(\s+\S+){24}\scom\.aliyun\.oss\.OSSClient\.(?P<method>[a-zA-Z]+)\S+\s+\S+\stransformEvent\.main\(transformEvent\.java:(?P<error_line>[0-9]+)\)",
           ),
           e_drop_fields("message"),
           e_output("oss-error"),
       ),
   )
   ```
4. Click **Preview Data**.
   
5. Create a data transformation job
   a. Click **Save as Transformation Job**.
   b.In the **Create Data Transformation Job** panel, configure the parameters and click **OK**. The following table describes the parameters.
   | parameter| Note |
   | -------| --------- |
   | **Job Name** | The name of the data transformation job.Example test。 |
   | **Authorization Method** | Select **Default Role** to read data from the source Logstore. |
   | **Storage Destination** |
   | **Destination Name** | The name of the storage destination.Example sls-error and oss-error. |
   | **Destination Region** | The region in which the destination project resides. |
   | **Destination Project** | The name of the project to which the destination Logstore belongs. |
   | **Target Store** | The name of the destination Logstore. |
   | **Authorization Method** | Select **Default Role** to write transformation results to the destination Logstore. |
   | **Time Range for Data Transformation** |
   | **Time Range** | Select **All**. |

After you create a data transformation job, Simple Log Service creates a dashboard for the job by default. You can view the metrics of the job on the dashboard.

On the **Exception detail** chart, you can view the logs that failed to be parsed, and then modify the regular expression.

- If a log fails to be parsed, you can specify the severity of the log as WARNING to report the log.
- The data transformation job continues running.In this case, you must identify the cause of the error and modify the regular expression until the data transformation job can parse all required types of error logs.

## Step 3：Step 3: Analyze error logs

After raw error logs are transformed, you can analyze the error logs.In this example, only the Java error logs of Simple Log Service are analyzed.

1. In the Projects section, click the desired project.
2. In the left-side navigation pane, click **Log Storage**. On the Logstores page, click the desired Logstore.
3. Enter a query statement in the search box.
   - To calculate the number of errors for each request method, execute the following query statement:
     ```
     * | SELECT COUNT(method) as m_ct, method GROUP BY method
     ```
   - To calculate the number of occurrences of each error message for the PutLogs API operation, execute the following query statement:
     ```
     * | SELECT error_message,COUNT(error_message) as ct_msg, method WHERE method LIKE 'PutLogs' GROUP BY error_message,method
     ```
   - To calculate the number of occurrences for each error code, execute the following query statement:
     ```
     * | SELECT error_code,COUNT(error_code) as count_code GROUP BY error_code
     ```
   - To query the error information of each request method by log time, execute the following query statement:
     ```
     * | SELECT date_format(data_time, '%Y-%m-%d %H:%m:%s') as date_time,status,product_exception,error_line, error_message,method ORDER BY date_time desc
     ```
4. Click **15 Minutes(Relative)** to specify a time range.
You can select a relative time range or a time frame. You can also specify a custom time range.
<table><tr><td bgcolor="#d6e7f8"><b>Note</b> The query results may contain logs that are generated 1 minute earlier or later than the specified time range.</td></tr></table>

5. Click **Search & Analyze** to view the query and analysis results.
