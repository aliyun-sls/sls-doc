## 配置项说明

基本配置项
| 参数| 描述|
|------|------------|
| bootstrap.servers                                        | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb) <br/> - 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| sasl.mechanism                                           | 必须使用 **PLAIN** |
| security.protocol                                        | 为了保证数据传输的安全性，**必须使用SASL_SSL**|
| sasl.username                                            | 配置为日志服务Project名称|
| sasl.password                                            | 配置为阿里云AK，格式为 **{access-key-id}#{access-key-secret**。请根据实际情况，将 **{access-key-id** 替换为您的AccessKey ID，将 **{access-key-secret}** 替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)                                                                    |

使用Kafka消费时，需要额外设置如下参数
| 参数| 描述|
|------|------------|
| group.id| 消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过配置消费组id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如 **"kafka-test"**|
| enable.auto.commit| 是否自动提交消费点位，建议设为**true**|
| auto.commit.interval.ms| 自动提交消费点位的间隔时间，建议**30000ms**|
| max.poll.interval.ms| 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，**建议max.poll.interval.ms为130000ms**，保证所有消费者都能加入消费组 . **使用confluent这个库时需要保证max.poll.interval.ms值大于session.timeout.ms,否则无法正常消费**|
| session.timeout.ms| 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，**session.timeout.ms为120000ms**|
| heartbeat.interval.ms | 规定客户端和服务端之间心跳检测间隔时间,heartbeat.interval.ms 越小,**客户端和服务端之间的心跳检测越频繁**,但也会导致更多的网络流量.建议**5000ms**|
| auto.offset.reset| auto.offset.reset 消费起始点位 常用的二个值是**latest** 和**earliest**，其中earliest 从历史最早点位开始消费，latest从最新点位开始消费，默认是**latest**|

### 依赖说明
```shell
pip install confluent-kafka
```

## 消费示例

```python
import sys
import os

from confluent_kafka import Consumer, KafkaError, KafkaException

endpoint = "cn-huhehaote.log.aliyuncs.com"
"""
阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
此处以把AccessKey和AccessKeySecret保存在环境变量为例说明。您可以根据业务需要，保存到配置文件里。
强烈建议不要把AccessKey和AccessKeySecret保存到代码里，会存在密钥泄漏风险。
"""
accessKeyId = os.getenv("SLS_ACCESS_KEY_ID")
accessKeySecret = os.getenv("SLS_ACCESS_KEY_SECRET")
project = "etl-dev"
logstore = "test"
port = "10012"
groupId = "kafka-test"

kafkaEndpoint = "{}.{}:{}".format(project, endpoint, port)

groupId = "kafka-test2112"

c = Consumer({
        "bootstrap.servers":       kafkaEndpoint,
                "sasl.mechanism":          "PLAIN",
                "security.protocol":       "sasl_ssl",
                "sasl.username":           project,
                "sasl.password":           "%s#%s" % (accessKeyId, accessKeySecret),
                "group.id":                groupId,
                "enable.auto.commit":      "true",
                "auto.commit.interval.ms": 30000,
                "session.timeout.ms":      120000,
                "auto.offset.reset":       "latest",
                "max.poll.interval.ms":    130000,
                "heartbeat.interval.ms":   5000,
})


c.subscribe([logstore])

while True:
    msg = c.poll(1.0)

    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue

    print('Received message: {}'.format(msg.value().decode('utf-8')))

c.close()
```
