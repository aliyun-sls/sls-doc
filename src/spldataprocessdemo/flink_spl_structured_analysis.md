# 阿里云Flink SQL基于SPL实现弱结构化分析
## 背景
日志服务SLS是云原生观测与分析平台，为Log、Metric、Trace等数据提供大规模、低成本、实时的平台化服务，基于日志服务的便捷的数据接入能力，可以将系统日志、业务日志等接入SLS进行存储、分析；阿里云Flink是阿里云基于Apache Flink构建的大数据分析平台，在实时数据分析、风控检测等场景应用广泛。阿里云Flink原生支持阿里云日志服务SLS的Connector，用户可以在阿里云Flink平台将SLS作为源表或者结果表使用。

阿里云Flink SLS Connector对于结构化的日志非常直接，通过配置，SLS的日志字段可以与Flink SQL的Table字段列一一映射；然后仍有大量的业务日志并非完全的结构化，例如会将所有日志内容写入一个字段中，需要正则提前、分隔符拆分等手段才可以提取出结构化的字段，基于这个场景，本文介绍一种使用SLS SPL配置SLS Connector完成数据结构化的方案，覆盖日志清洗与格式规整场景。
### 弱结构化日志数据
下面是一条日志示例，日志格式较为复杂，既有JSON字符串，又有字符串与JSON混合的场景。其中：
* Payload为JSON字符串，其中schedule字段的内容也是一段JSON结构。
* requestURL为一段标准的URL Path路径。
* error字段是前半部分包含CouldNotExecuteQuery：字符串，后半部分是一段JSON结构。
* \_\_tag\_\_:\_\_path\_\_包含日志文件的路径，其中service_a可能是业务名称。
* caller中包含文件名与文件行数。
  ```
  {
    "Payload": "{\"lastNotified\": 1705030483, \"serverUri\": \"http://test.alert.com/alert-api/tasks\", \"jobID\": \"44d6ce47bb4995ef0c8052a9a30ed6d8\", \"alertName\": \"alert-12345678-123456\", \"project\": \"test-sls-project\", \"projectId\": 123, \"aliuid\": \"1234567890\", \"alertDisplayName\": \"\\u6d4b\\u8bd5\\u963f\\u91cc\\u4e91\\u544a\\u8b66\", \"checkJobUri\": \"http://test.alert.com/alert-api/task_check\", \"schedule\": {\"timeZone\": \"\", \"delay\": 0, \"runImmediately\": false, \"type\": \"FixedRate\", \"interval\": \"1m\"}, \"jobRunID\": \"bf86aa5e67a6891d-61016da98c79b-5071a6b\", \"firedNotNotified\": 25161}",
    "TaskID": "bf86aa5e67a6891d-61016da98c79b-5071a6b-334f81a-5c38aaa1-9354-43ec-8369-4f41a7c23887",
    "TaskType": "ALERT",
    "__source__": "11.199.97.112",
    "__tag__:__hostname__": "iabcde12345.cloud.abc121",
    "__tag__:__path__": "/var/log/service_a.LOG",
    "caller": "executor/pool.go:64",
    "error": "CouldNotExecuteQuery : {\n    \"httpCode\": 404,\n    \"errorCode\": \"LogStoreNotExist\",\n    \"errorMessage\": \"logstore k8s-event does not exist\",\n    \"requestID\": \"65B7C10AB43D9895A8C3DB6A\"\n}",
    "requestURL": "/apis/autoscaling/v2beta1/namespaces/python-etl/horizontalpodautoscalers/cn-shenzhen-56492-1234567890123?timeout=30s",
    "ts": "2024-01-29 22:57:13"
  }
  ```
### 结构化数据处理需求
对于这样的日志提取出更有价值的信息需要进行数据清洗，首先需要提取重要的字段，然后对这些字段进行数据分析；本篇关注重要字段的提取，分析仍然可以在Flink中进行。
假设提取字段具体需求如下：
* 提取**error**中的**httpCode**、**errorCode**、**errorMessage**、**requestID**
* 提取 **\_\_tag\_\_:\_\_path\_\_** 中的**service_a**作为**serviceName**
* 提取**caller**中的**pool.go**作为**fileName**，**64**作为**fileNo**
* 提取**Payload**中的**project**；提取**Payload**下面的**schedule**中的**type**为**scheuleType**
* 重命名 __\_\_source\_\___ 为**serviceIP**
* 其余字段舍弃
最终需要的字段列表如下，基于这样一个表格模型，我们可以便捷的使用Flink SQL进行数据分析。
![图1](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis1.png)
## 解决方案
实现这样的数据清洗，有很多种方法，这里列举几种基于SLS与Flink的方案，不同方案之间没有绝对的优劣，需要根据不同的场景选择不同的方案。

* 数据加工方案：在SLS控制台创建目标Logstore，通过创建数据加工任务，完成对数据的清洗。
![图2](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis2.png)

* Flink方案：将error和payload指定为源表字段，通过SQL 正则函数、JSON函数对字段进行解析，解析后的字段写入临时表，然后对临时表进行分析。
![图3](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis3.png)

* SPL方案：在Flink SLS Connector中配置SPL语句，对数据进行清洗，Flink中源表字段定义为清洗后的数据结构。
![图4](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis4.png)

从上述三种方案的原理不难看出，在需要数据清洗的场景中，在SLS Connector 中 配置SPL是一种更轻量化的方案，具有轻量化、易维护、易扩展的特点。
在日志数据弱结构化的场景中，SPL方案既避免了方案一中创建临时中间Logstore，也避免了方案二中在Flink中创建临时表，在离数据源更近的位置进行数据清洗，在计算平台关注业务逻辑，职责分离更加清晰。

## 如何在Flink中使用SPL
接下来以一个一段弱结构化日志为例，来介绍基于SLS SPL的能力来使用Flink。为了便于演示，这里在Flink控制台配置SLS的源表，然后开启一个连续查询以观察效果。在实际使用过程中，仅需修改SLS源表配置，即可完成数据清洗与字段规整。
### SLS准备数据
* 开通SLS，在SLS创建Project，Logstore，并创建具有消费Logstore的权限的账号AK/SK。
* 当前Logstore数据使用SLS SDK写入模拟数据，格式使用上述日志片段，其中包含JSON、复杂字符串等弱结构化字段。
![图5](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis5.png)


### 预览SPL效果
在Logstore可以可以开启[扫描模式](https://help.aliyun.com/zh/sls/user-guide/scan-based-query-overview?spm=a2c4g.11186623.0.i6)，类似Unix管道，SLS SPL管道式语法使用 **|** 分隔符分割不同的指令，每次输入一个指令可以即时查看结果，然后在增加管道数，渐进式、探索式获取最终结果。
![图6](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis6.png)


对上图中的SPL进行简单描述
```python
* | project Payload, error, "__tag__:__path__", "__tag__:__hostname__", caller 
 | parse-json Payload 
 | project-away Payload 
 | parse-regexp error, 'CouldNotExecuteQuery : ({[\w":\s,\-}]+)' as errorJson 
 | parse-json errorJson 
 | parse-regexp "__tag__:__path__", '\/var\/log\/([\w\_]+).LOG' as serviceName 
 | parse-regexp caller, '\w+/([\w\.]+):(\d+)' as fileName, fileNo 
 | project-rename serviceHost="__tag__:__hostname__" 
 | extend scheduleType = json_extract_scalar(schedule, '$.type') 
 | project httpCode, errorCode,errorMessage,requestID,fileName, fileNo, serviceHost,scheduleType, project
 ```
* 1行：**project**指令：从原始结果中保留Payload、error、__tag__:__path__、caller字段，舍弃其他字段，这些字段用于后续解析
* 2行：**parse-json**指令：将Payload字符串展开为JSON，第一层字段出现在结果中，包括lastNotified、serviceUri、jobID等
* 3行：**project-away**指令：去除原始Payload字段
* 4行：**parse-regexp**指令：按照error字段中的内容，解析其中的部分JSON内容，置于errorJson字段
* 5行：**parse-json**指令：展开errorJson字段，得到httpCode、errorCode、errorMessage等字段
* 6行：**parse-regexp**指令：通过正则表达式解析出__tag__:__path__种的文件名，并命名为serviceName
* 7行：**parse-regexp**指令：通过正则表达式捕获组解析出caller种的文件名与行数，并置于fileName、fileNo字段
* 8行：**project-rename**指令：将__tag__:__hostname__字段重命名为serviceHost
* 9行：**extend**指令：使用json_extract_scalar函数，提取schedule中的type字段，并命名为scheduleType
* 10行：**project**指令：保留需要的字段列表，其中project字段来自于Payload

### 创建SQL作业
在阿里云Flink控制台创建一个空白的SQL的流作业草稿，点击下一步，进入作业编写
![图7](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis7.png)

在作业草稿中输入如下创建临时表的语句：
```sql
CREATE TEMPORARY TABLE sls_input_complex (
  errorCode STRING,
  errorMessage STRING,
  fileName STRING,
  fileNo STRING,
  httpCode STRING,
  requestID STRING,
  scheduleType STRING,
  serviceHost STRING,
  project STRING,
  proctime as PROCTIME()
) WITH (
  'connector' = 'sls',
  'endpoint' ='cn-beijing-intranet.log.aliyuncs.com',
  'accessId' = '${ak}',
  'accessKey' = '${sk}',
  'starttime' = '2024-02-01 10:30:00',
  'project' ='${project}',
  'logstore' ='${logtore}',
  'query' = '* | project Payload, error, "__tag__:__path__", "__tag__:__hostname__", caller | parse-json Payload | project-away Payload | parse-regexp error, ''CouldNotExecuteQuery : ({[\w":\s,\-}]+)'' as errorJson | parse-json errorJson | parse-regexp "__tag__:__path__", ''\/var\/log\/([\w\_]+).LOG'' as serviceName | parse-regexp caller, ''\w+/([\w\.]+):(\d+)'' as fileName, fileNo | project-rename serviceHost="__tag__:__hostname__" | extend scheduleType = json_extract_scalar(schedule, ''$.type'') | project httpCode, errorCode,errorMessage,requestID,fileName, fileNo, serviceHost,scheduleType,project'
  );
```
* 其中${ak},${sk},${project},${logstore}需要替换为有消费权限的AK账号。
* query字段，替换为上述SPL，注意在阿里云Flink控制台需要对单引号使用单引号转义，并且消除换行符。
* SPL最终得到的字段列表与TABLE中字段对应。
### 连续查询及效果
在作业中输入分析语句，查看结果数据
```sql
SELECT * FROM sls_input_complex
```
点击右上角调试按钮，进行调试，可以看到TABLE中每一列的值，对应SPL处理后的结果。
![图8](/src/public/img/sqldataprocessdemo/flink_spl_structured_analysis8.png)


