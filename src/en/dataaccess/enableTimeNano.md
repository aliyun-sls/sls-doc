# Logtail Parse nanosecond-precision timestamps from raw logs when you use Logtail to collect logs

This topic describes how to parse nanosecond-precision timestamps from raw logs when you use Logtail to collect logs.

## Prerequisites

Logtail is installed on your server and a machine group that contains the server is created.

> Note: To parse nanosecond-precision timestamps, Linux Logtail 1.8.0 or later is required.

## File collection scenarios

| Scenario                                                                                                                                                                                                                                            | Parsing method                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Scenario 1: Parse delimiter logs <br />Sample Log:<br /> 2023.11.06-15.12.12.123456,10.10.\*.\*,"POST /PutData?Category=a a s d f&AccessKeyId=\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*&Date=123&Topic=raw&Signature=123 HTTP/1.1",200,18204,aliyun-sdk-java | Use the delimiter parsing plug-in to parse delimiter logs and extract high-precision timestamps.`2023.11.06-15.12.12.123456`                                                               |
| Scenario 2: Use the extended processor to process JSON data and parse timestamps in the time format supported by strptime                                                                                                                           | Use the extended processor to process JSON data and parse timestamps in the time format supported by strptime. For example, you can use the processor_json plug-in to process JSON fields. |
| Scenario 3: Use the extended processor to process JSON data and parse timestamps in the time format supported by Go                                                                                                                                 | Use the extended processor to process JSON data and parse timestamps in the time format supported by Go. For example, you can use the processor_json plug-in to process JSON fields.       |

### Scenario 1: Parse delimiter logs

#### Log parsing results

Test log

```text
2023.11.06-15.12.12.123456,10.10.*.*,"POST /PutData?Category=YunOsAccountOpLog&AccessKeyId=****************&Date=Fri%2C%2028%20Jun%202013%2006%3A53%3A30%20GMT&Topic=raw&Signature=******************************** HTTP/1.1",200,18204,aliyun-sdk-java
```

Parsing results

![Parsing results](./img/enableTimeNano/1.png)

#### Step 1: Configure advanced parameters for the log collection configuration

Set the EnableTimestampNanosecond parameter to true in the advanced parameters.`"EnableTimestampNanosecond":true`。

![image](./img/enableTimeNano/2.png)

```json
{
  "EnableTimestampNanosecond": true
}
```

#### Step 2: Use the delimiter parsing plug-in to parse delimiters

Configure a configuration to parse logs in delimiter mode.（processor_parse_delimiter_native）,For more information, see [Parsing in delimiter mode](https://help.aliyun.com/zh/sls/user-guide/separator-pattern-resolution)

![image](./img/enableTimeNano/3.png)

![image](./img/enableTimeNano/4.png)

#### Step 3: Use the timestamp parsing plug-in to parse timestamps

You must configure a time format for the timestamp parsing plug-in. For example, if the time field parsed by the delimiter parsing plug-in is 2023.10.26-20.58.12.123456, the time conversion format must be set to
%Y.%m.%d-%H.%M.%S.%f.`%f`
%f indicates the fractional part of the second. The highest precision that is supported by the plug-in is the nanosecond.The time conversion format must be consistent with the format of timestamps in the raw logs. For more information, see the [Commonly used time formats in logs](https://www.alibabacloud.com/help/en/doc-detail/28980.html) section of the "Time formats" topic.
For more information about the configuration of the plug-in, see [Time parsing](https://help.aliyun.com/zh/sls/user-guide/time-parsing).

![image](./img/enableTimeNano/5.png)

### Scenario 2: Use the extended processor to process JSON data and parse timestamps in the time format supported by strptime

#### Log parsing results

Raw logs:

```json
{
  "asctime": "2023-10-25 23:51:10,199999999",
  "filename": "generate_data.py",
  "levelname": "INFO",
  "lineno": 51,
  "module": "generate_data",
  "message": "{\"no\": 14, \"inner_loop\": 166, \"loop\": 27451, \"uuid\": \"9be98c29-22c7-40a1-b7ed-29ae6c8367af\"}",
  "threadName": "MainThread"
}
```

Test log

![Test log](./img/enableTimeNano/6.png)

#### Step 1: Configure advanced parameters for the log collection configuration

Set the EnableTimestampNanosecond parameter to true in the advanced parameters.

#### Step 2: Use the processor_json plug-in to process JSON fields

Configure a configuration to process JSON data. For more information, see [Expand JSON fields](https://help.aliyun.com/zh/sls/user-guide/expand-json-fields).

![image](./img/enableTimeNano/7.png)

![image](./img/enableTimeNano/8.png)

#### Step 3: Use the timestamp parsing plug-in to parse timestamps in the time format supported by strptime

You must configure a time format for the timestamp parsing plug-in. For example, if the asctime field in the raw logs is 2022-04-29 21:37:40,251, the time conversion format must be set to %Y-%m-%d %H:%M:%S,%f.
%f indicates the fractional part of the second. The highest precision that is supported by the plug-in is the nanosecond.The time conversion format must be consistent with the format of timestamps in the raw logs. For more information, see the [Commonly used time formats in logs](https://www.alibabacloud.com/help/en/doc-detail/28980.html) section of the "Time formats" topic.
For more information about the configuration of the plug-in, see the [Time format supported by strptime](https://help.aliyun.com/zh/sls/user-guide/extract-log-time#section-3sq-fik-1b7) section of the "Extract log time" topic.

![image](./img/enableTimeNano/9.png)

### Scenario 3: Use the extended processor to process JSON data and parse timestamps in the time format supported by Go

#### Log parsing results

```json
{
  "asctime": "2023-10-26 00:15:10,199999999",
  "filename": "generate_data.py",
  "levelname": "INFO",
  "lineno": 51,
  "module": "generate_data",
  "message": "{\"no\": 14, \"inner_loop\": 166, \"loop\": 27451, \"uuid\": \"9be98c29-22c7-40a1-b7ed-29ae6c8367af\"}",
  "threadName": "MainThread"
}
```

![image](./img/enableTimeNano/10.png)

#### Step 1: Configure advanced parameters for the log collection configuration

Set the EnableTimestampNanosecond parameter to true in the advanced parameters.

#### Step 2: Use the processor_json plug-in to process JSON fields

Configure a configuration to process JSON data. For more information, see [Expand JSON fields].

#### Step 3: Use the timestamp parsing plug-in to parse timestamps in the time format supported by Go

The time format of the plug-in must be configured based on the time format specification of Golang.The timestamps are not parsed in the %Y-%m-%d %H:%M:%S format.The timestamps are parsed in the format that is consistent with the time when Go was created, which is 2006-01-02 15:04:05 -0700 MST.

For example, 2023-10-25 01:36:10,199999999 is parsed in the format of 2006-01-02 15:04:05,999999999.

The following sample code provides examples of the time formats supported by Golang:

```go
const (
    Layout      = "01/02 03:04:05PM '06 -0700" // The reference time, in numerical order.
    ANSIC       = "Mon Jan _2 15:04:05 2006"
    UnixDate    = "Mon Jan _2 15:04:05 MST 2006"
    RubyDate    = "Mon Jan 02 15:04:05 -0700 2006"
    RFC822      = "02 Jan 06 15:04 MST"
    RFC822Z     = "02 Jan 06 15:04 -0700" // RFC822 with numeric zone
    RFC850      = "Monday, 02-Jan-06 15:04:05 MST"
    RFC1123     = "Mon, 02 Jan 2006 15:04:05 MST"
    RFC1123Z    = "Mon, 02 Jan 2006 15:04:05 -0700" // RFC1123 with numeric zone
    RFC3339     = "2006-01-02T15:04:05Z07:00"
    RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00"
    Kitchen     = "3:04PM"
    // Handy time stamps.
    Stamp      = "Jan _2 15:04:05"
    StampMilli = "Jan _2 15:04:05.000"
    StampMicro = "Jan _2 15:04:05.000000"
    StampNano  = "Jan _2 15:04:05.000000000"
)
```

For more information about the configuration of the plug-in, see the [Time format supported by Go](https://help.aliyun.com/zh/sls/user-guide/extract-log-time#section-xxl-q69-w5q) section of the "Extract log time" topic.

![image](./img/enableTimeNano/11.png)

## Stdout and Stderr Collection

This section describes how to parse timestamps in Stdout and Stderr Collection

### Scenario 1: Parse the nanosecond-precision timestamps of standard output logs that are collected from containers

#### Log parsing results

![image](./img/enableTimeNano/12.png)

#### Step 1: Create a collection configuration to collect standard output logs from a Docker container

![image](./img/enableTimeNano/13.png)

#### Step 2: Configure advanced parameters for the log collection configuration

Set the enable_precise_timestamp parameter to true in the advanced configurations. `"enable_timestamp_nanosecond": true`。

```json
{
  "enable_timestamp_nanosecond": true
}
```

![image](./img/enableTimeNano/14.png)

#### Step 3: Use the timestamp parsing plug-in to parse timestamps in the time format supported by Go

![image](./img/enableTimeNano/15.png)

### Scenario 2: Parse the nanosecond-precision timestamps of the JSON fields as log timestamps

#### Log parsing results

```json
{
  "asctime": "2023-10-25 01:36:10,199999999",
  "filename": "generate_data.py",
  "levelname": "INFO",
  "lineno": 51,
  "module": "generate_data",
  "message": "{\"no\": 14, \"inner_loop\": 166, \"loop\": 27451, \"uuid\": \"9be98c29-22c7-40a1-b7ed-29ae6c8367af\"}",
  "threadName": "MainThread"
}
```

The value of the asctime field is consistent with the log timestamp.

![image](./img/enableTimeNano/16.png)

#### Step 1: Create a collection configuration to collect standard output logs from a Docker container

The configuration is the same as that in Step 1 of Scenario 1.

#### Step 2: Configure advanced parameters for the log collection configuration

The configuration is the same as that in Step 2 of Scenario 1.

#### Step 3: Use the processor_json plug-in to parse JSON data.

![image](./img/enableTimeNano/17.png)

#### Step 4: Use the timestamp parsing plug-in to parse timestamps in the time format supported by strptime

![image](./img/enableTimeNano/18.png)
