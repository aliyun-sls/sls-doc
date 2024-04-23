# 解析 Syslog 标准格式数据

Syslog 是一种行业标准的协议，可用来记录设备的日志。常见的应用 Scenario 是网络管理工具、安全管理系统、日志审计系统。本文档介绍如何使用 SLS DSL 中的 GROK 函数高效快捷的解析不同格式的 Syslog 日志。

## 概况

在 Unix 类操作系统上，Syslog 广泛应用于系统日志。Syslog 日志消息既可以记录在本地文件中，也可以通过网络发送到接收 Syslog 的服务器。服务器可以对多个设备的 Syslog 消息进行统一的存储，或者解析其中的内容做相应的处理。

## 问题

长期以来，没有一个标准来规范 Syslog 的格式，导致 Syslog 的格式非常随意。甚至有些情况下没有任何格式，导致程序不能对 Syslog 消息进行解析，只能将它看作是一个字符串。所以如何解析不同格式的 Syslog 日志就变的非常重要。

## Syslog 协议标准简介

目前业界存在常见两种 Syslog 日志协议，一个是 2009 年的 RFC5424 协议，另外一个是 2001 年的 RFC3164 协议。以下介绍这两种协议的不同之处，以便在后续实践中能够灵活应用 GROK 解析 Syslog 日志。

- RFC5424 协议
  RFC5424 协议包含以下字段信息，具体信息请参见[官方协议](https://www.rfc-editor.org/rfc/rfc5424?spm=a2c4g.11186623.0.0.6b54dc81IfCxmG)。
  ```
  PRI VERSION SP TIMESTAMP SP HOSTNAME SP APP-NAME SP PROCID SP MSGID
  ```
  通过以下示例来对以上字段进行 Note：
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
- RFC3164 协议
  RFC3164 协议包含以下字段信息，具体信息请参见[官方协议](https://www.rfc-editor.org/rfc/rfc3164?spm=a2c4g.11186623.0.0.6b54dc81IfCxmG)。
  ```
  PRI HEADER[TIME HOSTNAME] MSG
  ```
  通过以下示例来对以上字段进行 Note：
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

## 使用 GROK 解析 Syslog 常见格式

使用 GROK 对几种常用格式的 Syslog 进行解析。具体的 GROK 规则请参见[GROK 模式参考](https://help.aliyun.com/document_detail/129387.htm?spm=a2c4g.11186623.0.0.6b54dc81IfCxmG#concept-1597616)。

- 解析 TraditionalFormat 格式
  - Raw log entries
    ```
    receive_time: 1558663265
    __topic__:
    content: May  5 10:20:57 iZbp1a65x3r1vhpe94fi2qZ systemd: Started System Logging Service.
    ```
  - SLS DSL 规则
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
- 解析 FileFormat 格式
  - Raw log entries
    ```
    receive_time: 1558663265
    __topic__:
    content: 2019-05-06T09:26:07.874593+08:00 iZbp1a65x3r1vhpe94fi2qZ root: 834753
    ```
  - SLS DSL 规则
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
  - SLS DSL 规则
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
- 解析 RSYSLOG_DebugFormat 格式
  - 日志内容
    ```
    receive_time: 1558663265
    __topic__:
    content: 2019-05-06T14:29:37.558854+08:00 iZbp1a65x3r1vhpe94fi2qZ root: environment
    ```
  - SLS SL 规则
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

## 使用 GROK 解析 Syslog 非常见日志格式

使用 GROK 解析不常见的两种 Syslog 日志格式，即 fluent 软件采用的 FluentRFC5424 格式和 FluentRFC3164 格式。

- FluentRFC5424 格式
  - 日志内容
    ```
    receive_time: 1558663265
    __topic__:
    content: <16>1 2019-02-28T12:00:00.003Z 192.168.0.1 aliyun 11111 ID24224 [exampleSDID@20224 iut='3' eventSource='Application' eventID='11211] Hi, from Fluentd!
    ```
  - SLS DSL 规则
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
- FluentRFC3164 格式
  - 日志内容
    ```
    receive_time: 1558663265
    __topic__:
    content: <6>Feb 28 12:00:00 192.168.0.1 aliyun[11111]: [error] Syslog test
    ```
  - SLS DSL 规则
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
- 拓展解析 priority
  解析 FluentRFC5424 格式和 FluentRFC3164 格式的 Syslog 过后的日志内容，还可以对 priority 进一步解析，并且匹配解析出来的 facility 和 serverity 信息，关于使用 RFC5424 协议更多内容请参见[e_syslogrfc](https://help.aliyun.com/document_detail/125488.htm?spm=a2c4g.11186623.0.0.492d264cbWaYtB#section-fsa-oy2-ye3)。示例如下：
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
  - SLS DSL 规则
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
