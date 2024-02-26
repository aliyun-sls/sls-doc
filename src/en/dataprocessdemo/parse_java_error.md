# 解析 Java 报错日志

在大数据、高并发场景下的 Java 应用中，通过有效方式分析 Java 报错日志并提供运维指导，能有效减轻产品运营维护成本。日志服务支持采集各云产品的 Java 报错日志，通过数据加工解析 Java 错误日志。

## 总体流程

通过 Logtail 采集应用 A 的报错日志到名称为 cloud_product_error_log 的 Logstore 中，然后再经过数据加工后投递到各自产品的 Logstore 中，最后对各个产品的错误日志做分析。总体流程如下：
![总体流程1](/img/dataprocessdemo/文本解析/总体流程1.png)

1. 设计数据加工语句：数据加工分析，编写数据加工语句。
2. 创建数据加工任务：根据产品不同，将日志分发至不同产品的错误分析 Logstore。
3. 查询和分析数据：在各产品的错误分析 Logstore 中进行日志分析。

## 步骤一：设计数据加工语句

### 加工流程

为便于错误日志分析，需要：

1. 提取 message 字段中的时间、错误码、状态码、产品信息、错误码信息、请求方法和出错行号。
2. 将错误日志存储到各产品的 Logstore。
   ![加工流程1](/img/dataprocessdemo/文本解析/加工流程1.png)

### 加工逻辑分析

分析原始日志字段中的时间、错误码、状态码、产品信息、错误码信息、请求方法和出错行号，为提取每种字段设计正则表达式。
![加工逻辑分析](/img/dataprocessdemo/文本解析/加工逻辑分析.png)

### 语法详解

1. 使用 regex_match 函数匹配出此条日志中是否有 LogException。更多信息，请参见[regex_match](https://help.aliyun.com/document_detail/125411.htm?spm=a2c4g.11186623.0.0.400463baujwkqV#section-p5o-wsv-w8a)。
2. 如果匹配上则按照解析 SLS 错误日志的规则进行处理；如果匹配上 OSSException 则按照解析 OSS 错误日志的规则进行处理。更多信息，请参见[e_switch](https://help.aliyun.com/document_detail/129393.htm?spm=a2c4g.11186623.0.0.400450eeasy38j#section-f1t-ukb-ilk)。
3. 使用 e_regex 正则解析函数解析相应的错误日志。更多信息，请参见[e_regex](https://help.aliyun.com/document_detail/125488.htm?spm=a2c4g.11186623.0.0.40046327TTEjv8#section-1rn-crw-ur9)。
4. 删除原字段 message 信息，并投递到相应产品的 Logstore。更多信息，请参见[e_drop_fields](https://help.aliyun.com/document_detail/125485.htm?spm=a2c4g.11186623.0.0.4004ac3aWDwCuN#section-q8m-zn8-uvj)和[e_output、e_coutput](https://help.aliyun.com/document_detail/125484.htm?spm=a2c4g.11186623.0.0.40044358BWfUrK#section-zi7-wtp-30c)。
5. 更多信息，请参见[正则表达式-分组](https://help.aliyun.com/document_detail/129386.htm?spm=a2c4g.11186623.0.0.4004176fAP7mNI#section-r6z-2z2-97g)。

### 加工语法分析

以使用正则表达式解析 SLS 错误日志为例，具体如下：
![语法解析](/img/dataprocessdemo/文本解析/语法解析.png)
具体的加工语法为：

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

## 步骤二：创建数据加工任务

1. 进入数据加工页面。
   a. 在 Project 列表区域，单击目标 Project。
   b. 在**日志存储 > 日志库** 页签中，单击目标 Logstore。
   c. 在查询和分析页面，单击**数据加工**。
2. 在页面右上角，选择数据的时间范围。
   请确保在**原始日志**页签中有 Log。
3. 在编辑框中，输入数据加工语句。
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
4. 单击**预览数据**。
   ![预览数据](/img/dataprocessdemo/文本解析/预览数据.png)
5. 创建数据加工任务。
   a. 单击**保存数据加工**。
   b. 在**创建数据加工规则**面板，配置如下信息，然后单击**确定**。
   | 参数| 说明 |
   | -------| --------- |
   | **规则名称** | 数据加工规则的名称。例如 test。 |
   | **授权方式** | 选择**默认角色**读取源 Logstore 数据。 |
   | **存储目标** |
   | **目标名称** | 存储目标的名称。例如 sls-error 和 oss-error。 |
   | **目标 Region** | 选择目标 Project 所在地域。 |
   | **目标 Project** | 用于存储数据加工结果的目标 Project 名称。 |
   | **目标库** | 用于存储数据加工结果的目标 Logstore 名称。例如 sls-error 和 oss-error。 |
   | **授权方式** | 选择**默认角色**将数据加工结果写入目标日志库。 |
   | **加工范围** |
   | **时间范围** | 时间范围选择**所有**。 |

   创建数据加工规则后，日志服务默认为每个加工任务创建一个仪表盘，您可以在仪表盘中查看数据加工任务运行指标。
   ![运行指标](/img/dataprocessdemo/文本解析/运行指标.png)
   通过**异常详情**图表，可以查到具体哪一条日志没有解析出来，然后再调整正则表达式。

   - 如果解析 Log 失败，上报 WARNING 级别日志。该类报错不会影响到整个加工任务继续执行。
   - 如果上报 ERROR 级别日志，则会影响到整个加工任务的继续执行。需要逐步查找定位问题，并修改正则表达式，直到加工任务能够成功解析各个不同类型的错误日志。

## 步骤三：分析错误日志数据

基于加工后的错误日志，可以进行错误日志数据分析。本文只对日志服务的 Java 错误日志做分析。

1. 在 Project 列表区域，单击目标 Project。
2. 在**日志存储 > 日志库**页签中，单击目标 Logstore。
3. 在搜索框中输入查询和分析语句。
   - 统计每个调用方法出现错误的数量。
     ```
     * | SELECT COUNT(method) as m_ct, method GROUP BY method
     ```
   - 统计 PutLogs 中哪一类的错误信息占比最大。
     ```
     * | SELECT error_message,COUNT(error_message) as ct_msg, method WHERE method LIKE 'PutLogs' GROUP BY error_message,method
     ```
   - 统计各个错误码出现的错误次数。
     ```
     * | SELECT error_code,COUNT(error_code) as count_code GROUP BY error_code
     ```
   - 设置报错时间轴，实时查看调用接口错误信息。
     ```
     * | SELECT date_format(data_time, '%Y-%m-%d %H:%m:%s') as date_time,status,product_exception,error_line, error_message,method ORDER BY date_time desc
     ```
4. 单击**15 分钟（相对）**，设置查询分析的时间范围。
您可以设置相对时间、整点时间和自定义时间。
<table><tr><td bgcolor="#d6e7f8"><b>说明</b> 查询结果有1 min以内的误差。</td></tr></table>

5. 单击**查询/分析**，查看查询分析结果。
