### 原理

在虚拟Topic中添加SPL语句后，当Kafka消费兼容接口接收到虚拟Topic时，会使用虚拟Topic中已添加的SPL语句处理数据，最终KafkaConsumer获取经过SPL处理过的数据。

```
kafkaConsumer -> [虚拟Topic] -> 真实Logstore
```

### 已知限制, 请特别注意
1. **使用SPL下推消费的时候，请使用官方Kafka SDK库（Java SDK和基于librdkafka的库**

已知第三方库python-kafka在基于SPL进行Kafka消费时存在问题。如果您要使用Python消费，请使用Kafka官方的Python库confluent_kafka。


2. **消费的时候, 请设置offset自动commit**，即 ```auto.offset.reset: true```

### 创建虚拟Topic

1. 编辑config.json文件。

```
{
    "Project" : "Project",
    "Endpoint" : "Endpoint",
    "Port" : 10012,
    "AccessKeyId" : "",
    "AccessKeySecret" : "",
    "Topic" : "logstore.0",
    "Query" : "SPL语句"
}
```

| 参数                                          | 说明                                        |
|--------------------------------------------------|--------------------------------------------|
| Project                |  待消费的数据所在的Project。  |
| Endpoint                |  日志服务的服务入口, 参考  [服务入口](https://help.aliyun.com/zh/sls/developer-reference/service-entrance)|
| Port                    | 端口号，阿里云内网：10011。公网：10012。 |
| AccessKeyId | 阿里云账号AccessKey ID。 |
| AccessKeySecret | 阿里云账号AccessKey Secret。 |
| Topic | 设置为${logstore}.标识符 ，其中标识符只能为0~31的数字。|
| Query | 设置为SPL语句。 参考 [SPL通用参考](https://help.aliyun.com/zh/sls/user-guide/spl-general-reference) |


2. 下载kafka_admin_tool。

```
# 仅支持在linux x86_64下执行 md5为 6c5535804de3963122269fa9265982e5
wget https://sls-resource.oss-cn-shanghai.aliyuncs.com/tools/kafka_admin_tool
```
* kafka_admin_tool 源码位置为 https://github.com/aliyun-sls/sls-doc/tree/main/src/oscompatibledemo/kafka-admin-tool

3. 创建虚拟Topic
```
./kafka_admin_tool create_virtual_topic -f config.json
```

### 查看虚拟Topic

您可以使用如下命令查看虚拟Topic。

```
./kafka_admin_tool info_virtual_topic -f config.json
```


### 常见问题

1. 如何更新虚拟Topic的SPL语句？
目前，您需要先删除再创建Topic来完成SPL语句的更新。操作步骤如下：

* 停止虚拟Topic的消费者。

* 删除虚拟Topic。
```
./kafka_admin_tool delete_virtual_topic -f config.json
```

* 更新config.json文件中的SPL语句

* 创建虚拟Topic。 (重新创建虚拟Topic后，需等待10分钟，SPL语句才生效。)
```
./kafka_admin_tool create_virtual_topic -f config.json
```
