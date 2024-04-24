# Parse logs by using iLogtail that uses the Grok syntax

## Terms

### iLogtail

iLogtail is a log collection agent provided by Simple Log Service. It is used to collect logs from servers such as Alibaba Cloud Elastic Compute Service (ECS) instances, servers in self-managed data centers, and servers of other cloud service vendors.

## Grok syntax

Grok matches a row to a regular expression, maps a specific part of the row to a dedicated field, and performs operations based on the mapping. The syntax for a Grok pattern is %{SYNTAX:SEMANTIC}.

```
%{SYNTAX:SEMANTIC}
```

The SEMANTIC is the identifier that you provide for the text to be matched.For example, 3.14 may be the duration of an event and a string of 127.0.0.1 may be the IP address from which a request is sent. In this case, you can set the identifiers to duration and client.These two examples can be expressed in Grok in the following format:

```
%{NUMBER:duration} %{IP:client}
```

Grok is implemented based on regular expressions. Therefore, all regular expressions are valid in Grok.Each matching rule corresponds to a Grok expression or a regular expression. For example, the preceding NUMBER and IP address patterns are defined in the following format:

```
NUMBER (?:%{BASE10NUM})
IP (?:%{IPV6}|%{IPV4})
```

The BASE10NUM and IPv4 patterns are defined in the following format:

```
BASE10NUM (?<![0-9.+-])(?>[+-]?(?:(?:[0-9]+(?:\.[0-9]+)?)|(?:\.[0-9]+)))
IPV4 (?<![0-9])(?:(?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])[.](?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])[.](?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])[.](?:[0-1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5]))(?![0-9])
```

## Solution implementation

### Prerequisites

> Alibaba Cloud Simple Log Service is activated.

### Example

In this example, file logs are collected.The logs are stored in the /home/test-ilogtail/test-log/processor-grok.log path on the server, and each row of the logs indicates a data entry. Each data entry contains a date and a sentence.In this example, each data row is parsed into four fields: year, month, day and motto.

> .Sample input

```
2022 Nov 1 "Hello World"
```

> .Expected output

```json
{
  "month": "Nov",
  "year": "2022",
  "motto": "\"Hello World\"",
  "day": "1"
}
```

## Basic usage

### Step 1: Create a project and a Logstore

1. Log on to the Simple Log Service console. In the Projects section, select an existing project or create a new project.
2. On the Logstore tab, select an existing Logstore or click the + icon to create a Logstore.

### Step 2: Create or select a machine group

1. After you select a machine group, choose Data Collection > Logtail Configurations and click the + icon to collect data.

2. In the Quick Data Import dialog box, select Single Line - Text Log.


3. Create or select a machine group.
   > .If a machine group is available, click Use Existing Machine Groups in the Create Machine Group step.
   > .If no machine groups are available, perform the following steps to create a machine group. In this example, an ECS instance is used.On the ECS Instance tab, select an ECS instance and click Execute Now.

- After the installation is complete, click Complete Installation.

  > .Simple Log Service allows you to create IP address-based machine groups and custom identifier-based machine groups.
 

  > .In the Create Machine Group step, specify a name for the machine group and click Next.

### Step 3: Create a Grok collection configuration

Modify the collection configuration file based on the requirements of the example.
The Grok plug-in supports a variety of configuration items. For more information, see the [Grok mode](https://www.alibabacloud.com/help/en/doc-detail/196154.html?spm=a2c4g.26937906.0.0.615f12c9SsVo9e#section-ucx-pqc-4wh){target="_blank"} section of the "Extract content from log fields" topic.

```json
{
  "processors": [
    {
      "detail": {
        "SplitKey": "content"
      },
      "type": "processor_split_log_string"
    },
    {
      "detail": {
        "SourceKey": "content",
        "IgnoreParseFailure": false,
        "KeepSource": false,
        "Match": ["%{YEAR:year} %{MONTH:month} %{MONTHDAY:day} %{QUOTEDSTRING:motto}"]
      },
      "type": "processor_grok"
    }
  ]
}
```

Click Next to query logs.

### Step 4: Query the collected logs

1. Write logs.
   Write log files to the ECS instance.

```
echo '2022 Nov 1 "Hello World"' >> /home/test-ilogtail/test-log/processor-grok.log
```

2. Log on to the Simple Log Service console.
3. Select the project and the Logstore. On the Logstore tab, click the Search & Analysis icon to query the collected logs.A log entry is parsed into different fields.

## Advanced usage

### Customize matching rules

Grok supports two methods to customize matching rules.
Direct configuration: Configure the CustomPatterns parameter in the configuration file of the Grok plug-in. You can configure multiple parameters.In this mode, hot load takes effect after the matching mode is modified.
File import: Create a matching rule file in advance and import the file by using the CustomPatternDir parameter in the configuration file of the Grok plug-in.If you modify the matching rule file in this mode, you must restart iLogtail to make the matching rule take effect because the configuration file cannot be updated.

By default, the Grok plug-in provides preset matching rules. The plug-in also provides other commonly used matching rules. You need to import the matching rule files.If a name conflict occurs between matching rules that are defined by using different methods, Grok uses matching rules based on the following priority: Matching rules defined by the CustomPatterns parameter > Matching rules defined by the CustomPatternDir parameter > Default matching rules.

### Optimize the match failure period

### Maximize the match between expressions and data

Add anchor points such as ^ and $ in Grok expressions to reduce unnecessary matches.
Configure the TimeoutMilliSeconds parameter in the configuration parameters to specify the timeout period.

### Optimize multi-item matching

When you use the multi-item matching feature, match failures may occur because expressions are matched one by one.If possible, we recommend that you do not use the multi-item matching feature, or you reduce duplicate matches.The following example shows how to use a tiered policy to reduce duplicate matches.

> . Sample input
> Enter three data entries.

```
'8.8.8.8 process-name[666]: a b 1 2 a lot of text at the end'
'8.8.8.8 process-name[667]: a 1 2 3 a lot of text near the end;4'
'8.8.8.8 process-name[421]: a completely different format | 1111'
```

> . Regular configurations

The expressions are matched one by one, which is a standard multi-item match.

```
processors:
  - Type: processor_grok
    SourceKey: content
    Match:
      - '%{IPORHOST:clientip} %{DATA:process_name}\[%{NUMBER:process_id}\]: %{WORD:word_1} %{WORD:word_2} %{NUMBER:number_1} %{NUMBER:number_2} %{DATA:data}'
      - '%{IPORHOST:clientip} %{DATA:process_name}\[%{NUMBER:process_id}\]: %{WORD:word_1} %{NUMBER:number_1} %{NUMBER:number_2} %{NUMBER:number_3} %{DATA:data};%{NUMBER:number_4}'
      - '%{IPORHOST:clientip} %{DATA:process_name}\[%{NUMBER:process_id}\]: %{DATA:data} \| %{NUMBER:number}'

```

> . Configuration optimization
> Process the front half of each data entry and then process the latter half of each data entry.

```
processors:
  - Type: processor_grok
    SourceKey: content
    Match:
      - '%{IPORHOST:clientip} %{DATA:process_name}\[%{NUMBER:process_id}\]: %{GREEDYDATA:content_2}'
    KeepSource: false
  - Type: processor_grok
    SourceKey: content_2
    Match:
      - '%{WORD:word_1} %{WORD:word_2} %{NUMBER:number_1} %{NUMBER:number_2} %{GREEDYDATA:data}'
      - '%{WORD:word_1} %{NUMBER:number_1} %{NUMBER:number_2} %{NUMBER:number_3} %{DATA:data};%{NUMBER:number_4}'
      - '%{DATA:data} \| %{NUMBER:number}'
    KeepSource: false
```

## Configure the Grok plug-in

The following example shows how to use the Grok plug-in.In this example, logs of the following types are provided:

```
# LOGA: regular run logs
# 'tag=run | 2022-11-24 16:22:37 | 0.0.0.0 | 12345 | "some info"'
tag=run | time | ip | process_id | content

# LOGB: success logs
# 'tag=succses | 2022-11-24 16:23:02 | 0.0.0.0 | 12345 | "some info" | 114 | "some result"'
tag=success | time | ip | process_id | content | interval | result

# LOGC: failure logs
# 'tag=succses | 2022-11-24 16:23:02 | 0.0.0.0 | 12345 | 1000 | "type" | "some msg"'
tag=fail | time | ip | process_id | interval | err_type | err_msg
```

The three types of logs need to be processed at the same time and separately parsed.To process logs based on such a requirement,you need to use the multi-item matching feature.You need to define only three custom matching rules based on LOGA, LOGB, and LOGC. Therefore, you can directly define the custom matching rules in the CustomPatterns parameter.

```
processors:
  - Type: processor_grok
    SourceKey: content
    CustomPatterns:
      LOGA: ''
      LOGB: ''
      LOGC: ''
    Match:
      -	'%{LOGA}'
      - '%{LOGB}'
      - '%{LOGC}'
    KeepSource: false
```

To define these three custom matching rules,you must analyze the types of data that is contained in each type of log.In this example, LOGB is analyzed. LOGB contains the following types of data:

> .tag：The value is in the format of tag=success.
> .time：The value is a date in the timestamp format.
> .ip：The value is an IPv4 address.
> .process_id、interval：The value is a positive integer.
> .content、result：The value is a string.

The Grok plug-in provides preset matching rules by default. You can process the tags in the preceding format. For example, you can use the Grok expression %{TIMESTAMP_ISO8601:time} to parse the value in the log to the time field.The Grok syntax is implemented based on regular expressions. To process the tag and vetical bar (|), you can directly use a regular expression to customize a tag matching rule, such as TAG tag=%{WORD:tag}, and write the vetical bar (|) in the expression.The following Grok plug-in is configured:

```
processors:
  - Type: processor_grok
    SourceKey: content
    CustomPatterns:
      TAG: 'tag=%{WORD:tag}'
      LOGA: '%{TAG} \| %{TIMESTAMP_ISO8601:time} \| %{IP:ip} \| %{NUMBER:process_id} \| %{QUOTEDSTRING:content}'
      LOGB: '%{TAG} \| %{TIMESTAMP_ISO8601:time} \| %{IP:ip} \| %{NUMBER:process_id} \| %{QUOTEDSTRING:content} \| %{NUMBER:interval} \| %{QUOTEDSTRING:result}'
      LOGC: '%{TAG} \| %{TIMESTAMP_ISO8601:time} \| %{IP:ip} \| %{NUMBER:process_id} \| %{NUMBER:interval} \| %{QUOTEDSTRING:err_type} \| %{QUOTEDSTRING:err_msg}'
    Match:
      -	'%{LOGA}'
      - '%{LOGB}'
      - '%{LOGC}'
    KeepSource: false
```

Such a plug-in is already available, but it can be optimized.The beginning of the three types of logs is similar and match failures may occur.To resolve the issue, you can use a tiered policy to optimize the multi-item matching configurations.Alternatively, you can optimize the multi-item matching configurations in an easier way.The three types of logs can be distinguished directly by the beginning.Therefore, you can write tags directly with regular expressions and add anchor points in front of the tags to reduce match failures.Only three expressions to be matched exist in the CustomPatterns parameter. Directly write the expressions in the Match parameter.The following Grok plug-in is configured:

```
processors:
  - Type: processor_grok
    SourceKey: content
    Match:
      -	'^tag=(?P<tag>run) \| %{TIMESTAMP_ISO8601:time} \| %{IP:ip} \| %{NUMBER:process_id} \| %{QUOTEDSTRING:content}'
      - '^tag=(?P<tag>success) \| %{TIMESTAMP_ISO8601:time} \| %{IP:ip} \| %{NUMBER:process_id} \| %{QUOTEDSTRING:content} \| %{NUMBER:interval} \| %{QUOTEDSTRING:result}'
      - '^tag=(?P<tag>fail) \| %{TIMESTAMP_ISO8601:time} \| %{IP:ip} \| %{NUMBER:process_id} \| %{NUMBER:interval} \| %{QUOTEDSTRING:err_type} \| %{QUOTEDSTRING:err_msg}'
    KeepSource: false

```

A simple and efficient Grok plug-in is configured.

## About iLogtail

iLogtail is an observable data collector provided by Alibaba Cloud Simple Log Service. It can run in a variety of environments, such as servers, containers, Kubernetes clusters, and embedded systems. It can collect hundreds of types of observable data such as logs, monitoring data, traces, and events. It has been installed tens of millions of times.iLogtail has been officially open source. Welcome to use iLogtail and make contribution to iLogtail.
