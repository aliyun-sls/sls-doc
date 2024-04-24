# Parse Syslog messages in standard formats

Syslog is an industry-standard protocol that can be used to record device logs.Syslog is commonly used in network management tools, security management systems, and log audit systems.This topic describes how to use the Grok function in the domain-specific language (DSL) of Simple Log Service to parse Syslog messages in different formats.

## Overview

Syslog is widely used for message logging in UNIX-like operating systems.Syslog messages can be recorded in local files or sent to Syslog servers over the Internet.Each server can store and parse Syslog messages of multiple devices.

## Syslog protocols

Two Syslog protocols are commonly used in the industry: RFC 5424 issued in 2009 and RFC 3164 issued in 2001.This section describes the differences between the two protocols to help you better use the Grok function to parse Syslog messages.

- RFC5424 protocol
  The protocol includes the following field information RFC5424 ,For more information rules, see [Official agreement](https://www.rfc-editor.org/rfc/rfc5424?spm=a2c4g.11186623.0.0.6b54dc81IfCxmG)。
  ```
  PRI VERSION SP TIMESTAMP SP HOSTNAME SP APP-NAME SP PROCID SP MSGID
  ```
  The following examples describe these fields:
  ```
  """
  Example1:
  <34>1 2019-07-11T22:14:15.003Z aliyun.example.com ali - ID47 - BOM'su root' failed for lonvick on /dev/pts/8
  """
  PRI -- 34
  VERSION -- 1
  TIMESTAMP -- 2019-07-11T22:14:15.003Z
  HOSTNAME -- aliyun.example.com
  APP-NAME -- ali
  PROCID -- 无
  MSGID -- ID47
  MESSAGE -- 'su root' failed for lonvick on /dev/pts/8
  """
  Example2:
  <165>1 2019-07-11T22:14:15.000003-07:00 192.0.2.1 myproc 8710 - - %% It's time to make the do-nuts.
  """
  PRI -- 165
  VERSION -- 1
  TIMESTAMP -- 2019-07-11T05:14:15.000003-07:00
  HOSTNAME -- 192.0.2.1
  APP-NAME -- myproc
  PROCID -- 8710
  STRUCTURED-DATA -- “-”
  MSGID -- “-”
  MESSAGE -- "%% It's time to make the do-nuts."
  """
  Example3: - with STRUCTURED-DATA
  <165>1 2019-07-11T22:14:15.003Z aliyun.example.com
            evntslog - ID47 [exampleSDID@32473 iut="3" eventSource=
            "Application" eventID="1011"] BOMAn application
            event log entry...
  """
  PRI -- 165
  VERSION -- 1
  TIMESTAMP -- 2019-07-11T22:14:15.003Z
  HOSTNAME -- aliyun.example.com
  APP-NAME -- evntslog
  PROCID -- "-"
  MSGID -- ID47
  STRUCTURED-DATA -- [exampleSDID@32473 iut="3" eventSource="Application" eventID="1011"]
  MESSAGE -- An application event log entry...
  ```
- RFC3164 protocol

  ```
  PRI HEADER[TIME HOSTNAME] MSG
  ```

The following examples describe these fields:

```
"""
<30>Oct 9 22:33:20 hlfedora auditd[1787]: The audit daemon is exiting.
"""
PRI -- 30
HEADER
- TIME -- Oct 9 22:33:20
- HOSTNAME -- hlfedora
MSG
- TAG -- auditd[1787]
- Content --The audit daemon is exiting.
```

## Parse Syslog messages in common formats by using the Grok function

This section describes how to use the Grok function to parse Syslog messages in common formats.For more information about Grok rules, see [Grok patterns](https://www.alibabacloud.com/help/en/doc-detail/129387.htm?spm=a2c4g.11186623.0.0.6b54dc81IfCxmG#concept-1597616).

- TraditionalFormat
  - Raw log entries
    ```
    receive_time: 1558663265
    __topic__:
    content: May  5 10:20:57 iZbp1a65x3r1vhpe94fi2qZ systemd: Started System Logging Service.
    ```
  - SLS DSL rule
    ```python
    e_regex(
    	'content',
    	grok('%{SYSLOGBASE} %{GREEDYDATA:message}')
    )
    ```
  - Transformation result
    ```
    receive_time: 1558663265
    __topic__:
    content: May  5 10:20:57 iZbp1a65x3r1vhpe94fi2qZ systemd: Started System Logging Service.
    timestamp: May  5 10:20:57
    logsource: iZbp1a65x3r1vhpe94fi2qZ
    program: systemd
    message: Started System Logging Service.
    ```
- FileFormat
  - Raw log entries
    ```
    receive_time: 1558663265
    __topic__:
    content: 2019-05-06T09:26:07.874593+08:00 iZbp1a65x3r1vhpe94fi2qZ root: 834753
    ```
  - SLS DSL rule
    ```python
    e_regex(
    'content',
    grok('%{TIMESTAMP_ISO8601:timestamp} %{SYSLOGHOST:hostname} %{SYSLOGPROG} %{GREEDYDATA:message}')
    )
    ```
  - Transformation result
    ```
    receive_time: 1558663265
    __topic__:
    content: 2019-05-06T09:26:07.874593+08:00 iZbp1a65x3r1vhpe94fi2qZ root: 834753
    timestamp: 2019-05-06T09:26:07.874593+08:00
    hostname: iZbp1a65x3r1vhpe94fi2qZ
    program: root
    message: 834753
    ```
- 解析 RSYSLOG_SyslogProtocol23Format 格式
  - Raw log entries
    ```
    receive_time: 1558663265
    __topic__:
    content: <13>1 2019-05-06T11:50:16.015554+08:00 iZbp1a65x3r1vhpe94fi2qZ root - - - twish
    ```
  - SLS DSL rule
    ```python
    e_regex(
    	'content',
    	grok('%{POSINT:priority}>%{NUMBER:version} %{TIMESTAMP_ISO8601:timestamp} %{syslogHOST:hostname} %{PROG:program} - - - %{GREEDYDATA:message}')
    )
    ```
  - Transformation result
    ```
    receive_time: 1558663265
    __topic__:
    content: <13>1 2019-05-06T11:50:16.015554+08:00 iZbp1a65x3r1vhpe94fi2qZ root - - - twish
    priority: 13
    version: 1
    timestamp: 2019-05-06T11:50:16.015554+08:00
    hostname: iZbp1a65x3r1vhpe94fi2qZ
    program: root
    message: twish
    ```
- RSYSLOG_DebugFormat
  - Log content
    ```
    receive_time: 1558663265
    __topic__:
    content: 2019-05-06T14:29:37.558854+08:00 iZbp1a65x3r1vhpe94fi2qZ root: environment
    ```
  - SLS SL rule
    ```python
    e_regex(
    	'content',
    	grok('%{TIMESTAMP_ISO8601:timestamp} %{SYSLOGHOST:hostname} %{SYSLOGPROG} %{GREEDYDATA:message}')
    )
    ```
  - Transformation result
    ```
    receive_time: 1558663265
    __topic__:
    content: 2019-05-06T14:29:37.558854+08:00 iZbp1a65x3r1vhpe94fi2qZ root: environment
    timestamp: 2019-05-06T14:29:37.558854+08:00
    hostname: iZbp1a65x3r1vhpe94fi2qZ
    program: root
    message: environment
    ```

## Parse Syslog messages in uncommon formats by using the Grok function

This section describes how to use the Grok function to parse Syslog messages in two uncommon formats: FluentRFC5424 and FluentRFC3164. These messages are collected by using the Ansys Fluent software.

- FluentRFC5424
  - Log content
    ```
    receive_time: 1558663265
    __topic__:
    content: <16>1 2019-02-28T12:00:00.003Z 192.168.0.1 aliyun 11111 ID24224 [exampleSDID@20224 iut='3' eventSource='Application' eventID='11211] Hi, from Fluentd!
    ```
  - SLS DSL rule
    ```python
    e_regex(
    	'content',
    	grok('%{POSINT:priority}>%{NUMBER:version} %{TIMESTAMP_ISO8601:timestamp} %{SYSLOGHOST:hostname} %{WORD:ident} %{USER:pid} %{USERNAME:msgid} (?P<extradata>(\[(.*)\]|[^ ])) %{GREEDYDATA:message}')
    )
    ```
  - Transformation result
    ```
    receive_time: 1558663265
    __topic__:
    content: <16>1 2019-02-28T12:00:00.003Z 192.168.0.1 aliyun 11111 ID24224 [exampleSDID@20224 iut='3' eventSource='Application' eventID='11211] Hi, from aliyun!
    priority: 16
    version: 1
    timestamp: 2019-02-28T12:00:00.003Z
    hostname: 192.168.0.1
    ident: aliyun
    pid: 1111
    msgid: ID24224
    extradata: [exampleSDID@20224 iut='3' eventSource='Application' eventID='11211]
    message: Hi, from aliyun!
    ```
- FluentRFC3164
  - Log content
    ```
    receive_time: 1558663265
    __topic__:
    content: <6>Feb 28 12:00:00 192.168.0.1 aliyun[11111]: [error] Syslog test
    ```
  - SLS DSL rule
    ```python
    e_regex(
    	'content',
    	grok('%{POSINT:priority}>%{SYSLOGTIMESTAMP:timestamp} %{SYSLOGHOST:hostname} %{WORD:ident}(?P<pid>(\[[a-zA-Z0-9._-]+\]|[^:])): (?P<level>(\[(\w+)\]|[^ ])) %{GREEDYDATA:message}')
    )
    ```
  - Transformation result
    ```
    receive_time: 1558663265
      __topic__:
      content: <6>Feb 28 12:00:00 192.168.0.1 aliyun[11111]: [error] Syslog test
      priority: 6
      timestamp: Feb 28 12:00:00
      hostname: 192.168.0.1
      ident: aliyun
      pid: [1111]
      level: [error]
      message: Syslog test
    ```
- Expansion analysis priority
  For more information, see[e_syslogrfc](https://www.alibabacloud.com/help/en/doc-detail/125488.htm?spm=a2c4g.11186623.0.0.492d264cbWaYtB#section-fsa-oy2-ye3)。Example：
  - Raw log entries
    ```
    receive_time: 1558663265
    __topic__:
    content: <13>1 2019-05-06T11:50:16.015554+08:00 iZbp1a65x3r1vhpe94fi2qZ root - - - twish
    priority: 13
    version: 1
    timestamp: 2019-05-06T11:50:16.015554+08:00
    hostname: iZbp1a65x3r1vhpe94fi2qZ
    program: root
    message: twish
    ```
  - SLS DSL rule
    ```python
    e_syslogrfc("priority","SYSLOGRFC5424")
    ```
  - Transformation result
    ```
    receive_time: 1558663265
    __topic__:
    content: <13>1 2019-05-06T11:50:16.015554+08:00 iZbp1a65x3r1vhpe94fi2qZ root - - - twish
    priority: 13
    version: 1
    timestamp: 2019-05-06T11:50:16.015554+08:00
    hostname: iZbp1a65x3r1vhpe94fi2qZ
    program: root
    message: twish
    _facility_: 1
    _severity_: 5
    _severitylabel_: Notice: normal but significant condition
    _facilitylabel_: user-level messages
    ```
