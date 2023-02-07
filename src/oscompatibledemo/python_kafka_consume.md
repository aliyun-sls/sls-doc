## [Kafka 消费兼容概述和注意事项](./overview.md)

## Python消费配置参数

| 参数                                                       | 描述                                                                                                                                                                                                                                                                                                               |
|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| bootstrap_servers                                        | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)<br/> - 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/>- 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| group_id                                                 | 消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过配置消费组id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如 **"kafka-test"**                                                                                                                                                                                                                       |
| security_protocol                                        | 为了保证数据传输的安全性，**必须使用SASL_SSL**                                                                                                                                                                                                                                                                                    |
| sasl_plain_username                                      | 配置为日志服务Project名称                                                                                                                                                                                                                                                                                                |
| sasl_plain_password                                      | 配置为阿里云AK，格式为 **{access-key-id}#{access-key-secret}**。请根据实际情况，将 **{access-key-id}** 替换为您的AccessKey ID，将 **{access-key-secret}** 替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)                                                                |
| sasl_mechanism                                           | 建议使用"PLAIN"                                                                                                                                                                                                                                                                                                      |
| max_poll_interval_ms                                     | 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，**建议max.poll.interval.ms为130000MS**，保证所有消费者都能加入消费组                                                                                                                          |
| session_timeout_ms                                       | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，**session.timeout.ms为120000MS**                                                                                                                                                                                                                                |
| auto_offset_reset                                        | auto.offset.reset 消费起始点位 常用的二个值是latest和earliest，默认是latest                                                                                                                                                                                                                                                        |
| earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费 |                                                                                                                                                                                                                                                                                                                  |
| latest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的数据 |                                                                                                                                                                                                                                                                                                                  |

## Python消费代码示例

```python
import time

from kafka import KafkaConsumer

accessKeyId = "access-key-id"
accessKeySecret = "access-key-secret"
project = "project"
logstore = "logstore"
endpoint = "cn-hangzhou.log.aliyuncs.com"
port = "10012"
#内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb
#endpoint = "cn-hangzhou-intranet.log.aliyuncs.com"
#port = "10011"
groupId = "kafka-test"
kafkaEndpoint = "{}.{}:{}".format(project, endpoint, port)


def getKafkaConsumer():
    consumer = KafkaConsumer(logstore,
                             bootstrap_servers=kafkaEndpoint,
                             sasl_plain_username=project,
                             group_id=groupId,
                             auto_offset_reset='earliest',
                             sasl_plain_password="{}#{}".format(accessKeyId, accessKeySecret),
                             sasl_mechanism="PLAIN",
                             max_poll_interval_ms=130000,
                             session_timeout_ms=120000,
                             api_version=(2, 1, 0),
                             security_protocol="SASL_SSL")
    return consumer


def main():
    consumer = getKafkaConsumer()
    consumer.subscribe(logstore)
    for message in consumer:
        print(message.topic, message.offset, message.key, message.value, message.value, message.partition)


if __name__ == '__main__':
    main()
```
