# 解析Java报错日志 
在大数据、高并发场景下的Java应用中，通过有效方式分析Java报错日志并提供运维指导，能有效减轻产品运营维护成本。日志服务支持采集各云产品的Java报错日志，通过数据SPL解析Java错误日志。

## 前提条件
已采集各SLS、OSS、SLB、RDS的Java错误日志到cloud_product_error_log的Logstore。具体操作，请参见[Logtail采集日志](https://help.aliyun.com/document_detail/28967.htm?spm=a2c4g.11186623.0.0.400479bbieWP04#concept-ed1-fbc-wdb)。
## 场景描述
某企业基于阿里云OSS、SLS等产品开发Java应用A过程中，在华东1（杭州）地域创建了名为cloud_product_erro_log的Logstore，用于存储调用各云产品接口发生的Java报错日志。该企业需要使用日志服务定期分析调用接口发生的Java报错日志，便于制定Java报错处理措施。
为实现以上需求，您需要解析日志中的时间、错误码、状态码、产品信息、错误码信息、请求方法和出错行号，存储到各产品的Logstore中，用于错误日志分析。
原始日志样例如下：
```
[
{"__source__":"192.0.2.10",
"__tag__:__client_ip__":"203.0.113.10",
"__tag__:__receive_time__":"1591957901",
"__topic__":"",
"message": "2021-05-15 16:43:35 ParameterInvalid 400\ncom.aliyun.openservices.log.exception.LogException:The body is not valid json string.\nat com.aliyun.openservices.log.Client.ErrorCheck(Client.java:2161)\nat com.aliyun.openservices.log.Client.SendData(Client.java:2312)\nat com.aliyun.openservices.log.Client.PullLogsk(Client.java:1397)\nat com.aliyun.openservices.log.Client.SendData(Client.java:2265)\nat com.aliyun.openservices.log.Client.GetCursor(Client.java:1123)\nat com.aliyun.openservices.log.Client.PullLogs(Client.java:2161)\nat com.aliyun.openservices.log.Client.ErrorCheck(Client.java:2426)\nat transformEvent.main(transformEvent.java:2559)"
},
{"__source__":"192.0.2.10",
"__tag__:__client_ip__":"203.0.113.11",
"__tag__:__receive_time__":"1591957988",
"__topic__":"",
"message": "2020-05-16 18:30:06 com.aliyun.oss.OSSException:You are forbidden to list buckets.\n[ErrorCode]:  AccessDenied\n[RequestId]: YGYLQJLSLNUS2US1131DSQKW\n[HostId]:  wwduhdw-cn-hangzhou.aliyuncs.com\ncom.aliyun.oss.OSSClient.getBucket\ntransformEvent.main(transformEvent.java:399)"}
]
```
## 总体流程
通过Logtail采集应用A的报错日志到名称为cloud_product_error_log的Logstore中，然后再经过SPL后投递到各自产品的Logstore中，最后对各个产品的错误日志做分析。总体流程如下：
1. 设计数据SPL语句：SPL分析，编写SPL语句。
2. 创建SPL任务：根据产品不同，将日志分发至不同产品的错误分析Logstore。
3. 查询和分析数据：在各产品的错误分析Logstore中进行日志分析。
## 设计SPL语句
### SPL流程
为便于错误日志分析，需要：
1. 提取message字段中的时间、错误码、状态码、产品信息、错误码信息、请求方法和出错行号。
2. 将错误日志存储到各产品的Logstore。
### SPL逻辑分析
分析原始日志字段中的时间、错误码、状态码、产品信息、错误码信息、请求方法和出错行号，为提取每种字段设计正则表达式。
### 语法详解
1. 使用regexp_like函数匹配出此条日志中是否有LogException。更多信息，请参见[parse-regexp](https://help.aliyun.com/zh/sls/user-guide/spl-instruction?spm=a2c4g.11186623.0.0.69b35b99wLiJ3X#40efb04f8aa2f)。
2. 如果匹配上则按照解析SLS错误日志的规则进行处理；
   如果匹配上OSSException则按照解析OSS错误日志的规则进行处理。更多信息，请参见[where](https://help.aliyun.com/zh/sls/user-guide/spl-instruction?spm=a2c4g.11186623.0.0.3c6e72dbEd2qMS#8a48b8c0474sx)。
3. 使用parse_regexp正则解析函数解析相应的错误日志。更多信息，请参见[parse-regexp](https://help.aliyun.com/zh/sls/user-guide/spl-instruction?spm=a2c4g.11186623.0.0.69b35b99wLiJ3X#40efb04f8aa2f)。
4. 使用project-away删除原字段message信息。更多信息，请参见[project-away](https://help.aliyun.com/zh/sls/user-guide/spl-instruction?spm=a2c4g.11186623.0.0.3c6e72dbEd2qMS#307f0407a8m69)。
SPL语法分析
以使用正则表达式解析SLS错误日志为例，具体如下：
```python
.let a = * | where regexp_like(message, '.*LogException.*') | parse-regexp message,'(\S+\s\S+)\s([a-zA-Z]+)\s([0-9]+)\scom\.aliyun\.openservices\.log\.exception\.([a-zA-Z]+)\:([a-zA-Z0-9:,\-\s]+)\.\s+(\S+\s+\S+\s+){6}\S+\s+com\.aliyun\.openservices\.log\.Client\.([a-zA-Z]+)\S+\s+\S+\s+transformEvent\.main\(transformEvent\.java\:([0-9]+)\)' as data_time,error_code,status,product_exception,error_message,temp,method,error_line | project-away message,temp;
.let b = * | where regexp_like(message, '.*OSSException.*') 
 | parse-regexp message,'(\S+\s\S+)\s+com\.aliyun\.oss\.([a-zA-Z]+)\:([a-zA-Z0-9,\s]+)\.\s+\[ErrorCode\]\:\s+([a-zA-Z]+)\s+\[RequestId\]\:\s([a-zA-Z0-9]+)\s+\[HostId\]\:\s+(\S+)\s+com\.aliyun\.oss\.OSSClient\.([a-zA-Z]+)\s+transformEvent\.main\(transformEvent\.java:([0-9]+)\)' as data_time,product_exception,error_message,error_code,request_id,host_id,method,error_line| project-away message;
$a;
$b;
```
处理后结果示例：
```
__source__:192.0.2.10
__tag__:__client_ip__:203.0.113.10
__tag__:__receive_time__:1591957901
__topic__:
data_time:2021-05-15 16:43:35
error_code:ParameterInvalid
error_line:2559
error_message:The body is not valid json string
method:ErrorCheck
product_exception:LogException
status:400

__source__:192.0.2.10
__tag__:__client_ip__:203.0.113.11
__tag__:__receive_time__:1591957988
__topic__:
data_time:2020-05-16 18:30:06
error_code:AccessDenied
error_line:399
error_message:You are forbidden to list buckets
host_id:wwduhdw-cn-hangzhou.aliyuncs.com
method:getBucket
product_exception:OSSException
request_id:YGYLQJLSLNUS2US1131DSQKW
```
## 创建数据加工任务
1. 进入数据加工页面。 
   a. 在Project列表区域，单击目标Project。 
   b. 在日志存储 > 日志库 页签中，单击目标Logstore。 
   c. 在查询和分析页面，单击数据加工。
2. 在页面右上角，选择数据的时间范围。 请确保在原始日志页签中有Log。
3. 在新版加工编辑框中，输入数据加工语句。
    ```python
    .let a = * | where regexp_like(message, '.*LogException.*') | parse-regexp message,'(\S+\s\S+)\s([a-zA-Z]+)\s([0-9]+)\scom\.aliyun\.openservices\.log\.exception\.([a-zA-Z]+)\:([a-zA-Z0-9:,\-\s]+)\.\s+(\S+\s+\S+\s+){6}\S+\s+com\.aliyun\.openservices\.log\.Client\.([a-zA-Z]+)\S+\s+\S+\s+transformEvent\.main\(transformEvent\.java\:([0-9]+)\)' as data_time,error_code,status,product_exception,error_message,temp,method,error_line | project-away message,temp;
    .let b = * | where regexp_like(message, '.*OSSException.*') 
    | parse-regexp message,'(\S+\s\S+)\s+com\.aliyun\.oss\.([a-zA-Z]+)\:([a-zA-Z0-9,\s]+)\.\s+\[ErrorCode\]\:\s+([a-zA-Z]+)\s+\[RequestId\]\:\s([a-zA-Z0-9]+)\s+\[HostId\]\:\s+(\S+)\s+com\.aliyun\.oss\.OSSClient\.([a-zA-Z]+)\s+transformEvent\.main\(transformEvent\.java:([0-9]+)\)' as data_time,product_exception,error_message,error_code,request_id,host_id,method,error_line| project-away message;
    $a;
    $b;
    ```
  4. 单击预览数据。
      ```
      __source__:192.0.2.10
      __tag__:__client_ip__:203.0.113.10
      __tag__:__receive_time__:1591957901
      __topic__:
      data_time:2021-05-15 16:43:35
      error_code:ParameterInvalid
      error_line:2559
      error_message:The body is not valid json string
      method:ErrorCheck
      product_exception:LogException
      status:400
      ```
  5. 创建数据加工任务。 
    a. 单击保存数据加工。 
    b. 在创建数据加工规则面板，配置如下信息，然后单击确定。
  
      | 参数| 说明 |
      | -------| --------- |
      | **规则名称** | 数据加工规则的名称。例如test。 |
      | **授权方式** | 选择**默认角色**读取源Logstore数据。 |
      | **存储目标** |
      | **目标名称** | 存储目标的名称。例如sls-error和oss-error。 |
      | **目标Region** | 选择目标Project所在地域。例如华东1（杭州）。 |
      | **目标Project** | 用于存储数据加工结果的目标Project名称。 |
      | **目标库** | 用于存储数据加工结果的目标Logstore名称。例如sls-error和oss-error。 |
      | **授权方式** | 选择**默认角色**将数据加工结果写入目标日志库。 |
      | **写入字符集** |  如果保存到sls-error日志库，选择字符集a；如果保存到oss-error日志库，选择字符串集b。|
      | **加工范围** |
      | **时间范围** | 时间范围选择**所有**。 |