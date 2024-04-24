# Parse high-precision timestamps from raw logs when you use Logtail to collect logs

This topic describes how to parse timestamps that are accurate to milliseconds from raw logs when you use Logtail to collect logs.

## Architecture

Logtail is a log collection agent provided by Simple Log Service. It is used to collect logs from servers such as Alibaba Cloud Elastic Compute Service (ECS) instances, servers in self-managed data centers, and servers of other cloud service vendors.You can collect text logs in the following two modes:

> . Single text mode: provides a capability to collect text logs of a single type, including simple mode, full regex mode, delimiter mode, and JSON mode.The core of the mode consists of the splitter and parser. Based on the log collection mode that you select, the read file content is split into log entries. For example, a single line is split based on line breaks and multiple lines are split based on the regular expressions that are used to match the beginning of the first line of a log. Then, the log entries are parsed to extract fields from a single log entry.Therefore, the log collection mode determines the action to process logs. For example, the full regex mode requires that the logs must completely match the set regular expressions. Otherwise, an error is reported.

![image.png](./img/8.1.png)

> .Plug-in-based mode: In actual business scenarios, logs may consist of multiple parts such as JSON data and delimiters.Logtail supports the plug-in-based mode. On the one hand, this mode uses the comprehensive event mechanism of Logtail to ensure the reliability during the data reading phase. On the other hand, this mode relies on various plug-ins of the plug-in system to enhance the processing capability of Logtail for complex logs.In this mode, a specific amount of performance and computing resources is consumed to improve flexibility.The following figure shows that Logtail directly submits the log splitting result to the plug-in for processing. During the log processing phase, you can combine multiple plug-ins to meet your business requirements.

![image.png](./img/8.2.png)

The preceding two log collection modes have different collection configurations due to differences in implementation mechanisms.

- .Single text mode

> .Configuration parameters: Advanced parameters are used to extend the feature.
> .Time conversion format: Time is converted only in C++. The single text mode does not completely support the millisecond, microsecond, or nanosecond-precision timestamp parsing. You can set the time conversion format to seconds.
> %Y-%m-%d %H:%M:%S。

- .Plug-in-based mode

> .Configuration parameters: The plug-in-based mode provides higher performance. You can use the processor_strptime plug-in to parse high-precision timestamps.
> .Time conversion format: Time is converted in Golang. The plug-in-based mode supports high-precision timestamp parsing. You can use %f to parse high-precision timestamps.For more information about the timestamp parsing format, see the relevant link.
> You can use the following method to distinguish the two modes: In the text log collection scenario, if you turn on Enable Plug-in Processing for the collection configuration, the plug-in-based mode is used. Otherwise, the single text mode is used.

Configuration parameters: The plug-in-based mode provides higher performance. You can use the processor_strptime plug-in to parse high-precision timestamps.

Time conversion format: Time is converted in Golang. The plug-in-based mode supports high-precision timestamp parsing. You can use %f to parse high-precision timestamps.For example, you can set the time conversion format to %Y-%m-%d %H:%M:%S.%f. %f indicates the fractional part of the second. The highest precision that is supported by the plug-in is the nanosecond.

You can use the following method to distinguish the two modes: In the text log collection scenario, if you turn on Enable Plug-in Processing for the collection configuration, the plug-in-based mode is used. Otherwise, the single text mode is used.

![image.png](./img/8.4.png)

## Solution implementation

This section describes how to parse timestamps in JSON mode.

### Log parsing results

The raw logs are in the following format. The t1 field indicates the timestamp of the raw log. The timestamp contains a higher-precision time.

```json
{
  "t1": "2022-06-01 22:04:56.344754012",
  "t2": "2022-06-01 22:04:56",
  "a": "b",
  "c": 2,
  "d": 1,
  "seq": 11
}
```

The following figure shows the parsing results.The time displayed in the following figure is the timestamp of Simep Log Service, which is accurate to the seconds. The value of the precise_timestamp parameter indicates the millisecond-precision timestamp that is parsed from the t1 field.

![image.png](./img/8.5.png)

## Prerequisites

Logtail is installed on a server and a machine group that contains the server is created.
The high-precision timestamp parsing feature requires Linux Logtail 1.0.32 or later or Windows Logtail 1.0.0.32 or later.

### Scenario 1： Parse timestamps in single text mode

### Step 1： Create a log collection configuration in JSON mode

In the Logtail Configuration step, set the Mode parameter to JSON Mode, turn off Use Sytem Time, and set the Ket Name of Time Field field to t1 and the Time Conversion Format field to %Y-%m-%d %H:%M:%S.The time conversion format must be consistent with the time format in raw logs. For more information, see the [Commonly used time formats in logs] section of the "Time formats" topic. The single text mode only supports second-precision timestamp parsing. Therefore, you need to set the time conversion format only to seconds instead of milliseconds or microseconds.

![image.png](./img/8.6.png)

### Step 2：Configure advanced parameters for the log collection configuration

Set the enable_precise_timestamp parameter to true in the advanced configurations."enable_precise_timestamp": true。

![image.png](./img/8.7.png)

### Step 3：Modify the name of the high-precision timestamp field or time precision (optional)

If the default name of the high-precision timestamp field and the precision in milliseconds cannot meet your business requirements, you can use the precise_timestamp_key parameter to customize the name of the high-precision timestamp field and use the precise_timestamp_unit parameter to adjust the time precision of high-precision timestamps.

![image.png](./img/8.8.png)

For example, you can use the following configuration to parse microsecond-precision timestamps and store the results to the precise_timestamp_new field.

```json
{
  "enable_precise_timestamp": true,
  "precise_timestamp_key": "precise_timestamp_new",
  "precise_timestamp_unit": "us"
}
```

### Scenario 2：Parse timestamps in plug-in-based mode

### Step 1： Create a log collection configuration in JSON mode

This step is the same as Step 1 in Scenario 1.

### Step 2：Enable plug-in processing

After plug-in processing is enabled, Simple Log Service automatically generates the corresponding plug-in configuration in the frontend. The processor_strptime plug-in is the processor that parses timestamps of logs.
Specify parameters for the plug-in and enable the high-precision timestamp parsing feature. The following sample code provides an example on the parameter settings. Specify the Format parameter based on the actual time format.

```json
{
  "detail": {
    "SourceKey": "t1",
    "Format": "%Y-%m-%d %H:%M:%S.%f",
    "EnablePreciseTimestamp": true
  },
  "type": "processor_strptime"
}
```

### Step 3：Modify the name of the high-precision timestamp field or time precision (optional)

If the default name of the high-precision timestamp field and the precision in milliseconds cannot meet your business requirements, you can configure optional parameters to modify the name of the high-precision timestamp field and the precision. For more information, see the [Time format supported by strptime](https://www.alibabacloud.com/help/en/doc-detail/196161.html?spm=a2c4g.26937906.0.0.6c923b52v9rEdh#section-r4r-ukg-8b1) section of the "Extract log time" topic.

### Solution verification

After the preceding log collection configuration is complete, check whether the high-precision timestamp is stored in the precise_timestamp field on the Logstore page.

After you create an index on the precise_timestamp field, you can implement features such as filtering, size comparison, and sorting.
![image.png](./img/8.10.png)

## FAQ

### Question 1

Cause: The single text mode does not support %f.
Logs are not parsed as expected.

> .Logs are not parsed as expected.
> ![image.png](./img/8.12.png)

> .You can click the Diagnose icon below the name of the Logstore for analysis.An error "PARSE_TIME_FAIL_ALARM" is reported, which indicates that the time conversion format is abnormal. This is because %f is not supported in the single text mode. The single text mode only supports the precision that is accurate to seconds.For more information, see the [Commonly used time formats in logs] section of the "Time formats" topic.
> ![image.png](./img/8.13.png)

### Question 2

Cause: The plug-in-based mode supports %f. However, the formats of the parsed timestamps must be consistent with the time format of the log.
Otherwise, the high-precision timestamps are not parsed as expected.
![image.png](./img/8.14.png)

> .Log on to the server on which Logtail is installed and view the logs. An error "STRPTIME_PARSE_ALARM" is reported for a large number of abnormal logs.

```
tail -f /usr/local/ilogtail/logtail_plugin.LOG
2022-04-30 08:10:45 [WRN] [strptime.go:163] [processLog] [##1.0##yemo-test-hongkong$bigdata-config,ecs-test-file-logstore] AlarmType:STRPTIME_PARSE_ALARM strptime(2022-04-30 08:10:45,873, %Y-%m-%d %H:%M:%S %f) failed: 0001-01-01 00:00:00 +0000 UTC, <nil>
```

Raw log: 2022-04-30 08:10:45,873. The delimiter between seconds and milliseconds is a comma (,).
Time conversion format: %Y-%m-%d %H:%M:%S %f. The delimiter between seconds and milliseconds is a space.
To resolve this issue, change the time conversion format to %Y-%m-%d %H:%M:%S,%f for the Logtail configuration.
