<a name="df368884"></a>
## 前言

SLS已经兼容Kafka消费组协议，您可以使用原生Kafka客户端对SLS进行读操作。

<a name="d573406f"></a>
## 概念映射
| Kafka | SLS | 描述 |
| --- | --- | --- |
| Topic | Logstore | Topic，Kafka用来区分不同类型信息的主题，Logstore是SLS中日志数据的采集、存储和查询单元 |
| Partition | Shard | 数据存储分区Partition是连续的，只增不减。SLS的Shard可以分裂/合并/过期 |
| Offset | Cursor | Offset代表Partition中的消息的顺序ID；Cursor，SLS日志的相对偏移量，通过Cursor可以获得一组相对位置的日志 |


<a name="ca2b3ff9"></a>
## 阿里云账号权限配置

- 赋予账号只读访问日志服务(Log)的权限（AliyunLogReadOnlyAccess)
- 如果有更精细的账号权限要求，可采用自定义权限策略，参考文档[https://help.aliyun.com/document_detail/93733.htm?spm=a2c4g.11186623.0.0.61644a81pujSOA#task-2149286](https://help.aliyun.com/document_detail/93733.htm?spm=a2c4g.11186623.0.0.61644a81pujSOA#task-2149286)，脚本编辑模式配置示例如下

```
{
    "Version": "1",
    "Statement": [
        {
            "Action": "log:GetProject",
            "Resource": "acs:log:*:*:project/project名称",
            "Effect": "Allow"
        },
        {
            "Action": [
                "log:GetLogStore",
                "log:ListShards",
                "log:GetCursorOrData"
            ],
            "Resource": "acs:log:*:*:project/project名称/logstore/*",
            "Effect": "Allow"
        }
    ]
}
```

<a name="e5e9ba87"></a>
## Java消费配置参数
| 参数 | 描述 |
| --- | --- |
| bootstrap.servers | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)<br />。- 阿里云内网：端口号为10011，例如project.cn-hangzhou-intranet.log.aliyuncs.com:10011。- 公网：端口号为10012，例如project.cn-hangzhou.log.aliyuncs.com:10012 |
| security.protocol | 为了保证数据传输的安全性，必须使用SASL_SSL |
| topic | 配置为日志服务Logstore名称。 |
| username | 配置为日志服务Project名称。 |
| password | 配置为阿里云AK，格式为![](https://g.yuque.com/gr/latex?%7Baccess-key-id%7D%23#card=math&code=%7Baccess-key-id%7D%23&id=OyGMW)**{access-key-secret}**。请根据实际情况，将![](https://g.yuque.com/gr/latex?%7Baccess-key-id%7D**%E6%9B%BF%E6%8D%A2%E4%B8%BA%E6%82%A8%E7%9A%84AccessKey%20ID%EF%BC%8C%E5%B0%86**#card=math&code=%7Baccess-key-id%7D%2A%2A%E6%9B%BF%E6%8D%A2%E4%B8%BA%E6%82%A8%E7%9A%84AccessKey%20ID%EF%BC%8C%E5%B0%86%2A%2A&id=Ve2hz)**{access-key-secret}**替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)<br />。 |
| enable.auto.commit | 是否自动提交消费点位，建议设为true |
| auto.commit.interval.ms | 自动提交消费点位的间隔时间，建议30000MS |
| max.poll.interval.ms | 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，建议max.poll.interval.ms为120000MS，保证所有消费者都能加入消费组 |
| session.timeout.ms | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，需要保证session.timeout.ms值大于max.poll.interval.ms，session.timeout.ms为130000MS |
| auto.offset.reset | auto.offset.reset 消费起始点位 常用的二个值是latest和earliest，默认是latest |


earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费<br />latest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的数据 |

<a name="ec1e9669"></a>
## Java消费代码示例

```
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class KafkaConsumerGroupTest {

    public static void consume() {
        Properties props = new Properties();
        String project = "project";
        String logstore = "logtore";
        String accessKeyID = "access-key-id";
        String accessKeySecret = "access-key-secret";
        String groupId = "kafka-test";
        String endpoint = "cn-hangzhou.log.aliyuncs.com";
        String port = "10012";
        String hosts = project + "." + endpoint + ":" + port;
        props.put("bootstrap.servers", hosts);
        props.put("security.protocol", "sasl_ssl");
        props.put("sasl.mechanism", "PLAIN");
        props.put("sasl.jaas.config",
                "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"" +
                        project + "\" password=\"" + accessKeyID + "#" + accessKeySecret + "\";");

        //consumer
        props.put("group.id", groupId);
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "30000");
        props.put("session.timeout.ms", "130000");
        props.put("auto.offset.reset", "earliest"); //earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费
        props.put("max.poll.interval.ms", "120000");
        props.put("heartbeat.interval.ms", "5000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

        KafkaConsumer<String,String> consumer =  new KafkaConsumer<>(props);
        consumer.subscribe(Collections.singletonList(logstore));
        while(true) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(10000));
            for (ConsumerRecord<String, String> record : records) {
                System.out.println("Received message: (" + record.key() + ", " + record.value() + ") at offset " + record.offset());
            }
        }
    }
    public static void main(String[] args){
       consume();
}
```



<a name="7983c82a"></a>
## Confluent-kafka-go消费配置参数
| 参数 | 描述 |
| --- | --- |
| bootstrap.servers | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)<br />。<br />**- 阿里云内网：端口号为10011，例如project.cn-hangzhou-intranet.log.aliyuncs.com:10011。- 公网：端口号为10012，例如project.cn-hangzhou.log.aliyuncs.com:10012** |
| sasl.mechanism | 建议使用"PLAIN" |
| security.protocol | 为了保证数据传输的安全性，**必须使用SASL_SSL** |
| sasl.username | 配置为日志服务Logstore名称 |
| sasl.password | 配置为阿里云AK，格式为**{access-key-id}#{access-key-secret}**。请根据实际情况，将{access-key-id}替换为您的AccessKey ID，将{access-key-secret}替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)<br />。 |
| group.id | 消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过group.id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如**"kafka-test"** |
| enable.auto.commit | 是否自动提交消费点位，建议设为**true** |
| auto.commit.interval.ms | 自动提交消费点位的间隔时间，建议**30000MS** |
| max.poll.interval.ms | 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，**建议max.poll.interval.ms为130000MS**，保证所有消费者都能加入消费组 . **使用confluent这个库时需要保证max.poll.interval.ms值大于session.timeout.ms,否则无法正常消费** |
| session.timeout.ms | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，**session.timeout.ms为120000MS** |
| heartbeat.interval.ms | 规定客户端和服务端之间心跳检测间隔时间,heartbeat.interval.ms 越小,客户端和服务端之间的心跳检测越频繁,但也会导致更多的网络流量.建议**5000MS** |
| auto.offset.reset | auto.offset.reset 消费起始点位 常用的二个值是latest和earliest，默认是latest |
| earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费 |  |
| latest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的数据 |  |



<a name="b3696f62"></a>
## Confluent-kafka-go消费代码示例

```go
package main

import (
	"fmt"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	endpoint := "cn-hangzhou.log.aliyuncs.com"
	accessKeyID := "access-key-id"
	accessKeySecret := "access-key-secret"
	project := "project"
	logstore := "logstore"
	port := "10012"

	consumer := getKafkaConsumer(project, endpoint, port, accessKeyID, accessKeySecret)
	consumer.SubscribeTopics([]string{logstore}, nil)
	for {
		msg, err := consumer.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
		} else {
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
	consumer.Close()
}

func getKafkaConsumer(project string, endpoint string, port string, accessKeyID string, accessKeySecret string) *kafka.Consumer {
	var kafkaConf = &kafka.ConfigMap{
		"bootstrap.servers":       fmt.Sprintf("%v.%v:%v", project, endpoint, port),
		"sasl.mechanism":          "PLAIN",
		"security.protocol":       "sasl_ssl",
		"sasl.username":           project,
		"sasl.password":           fmt.Sprintf("%v#%v", accessKeyID, accessKeySecret),
		"group.id":                "kafka-test",
		"enable.auto.commit":      "true",
		"auto.commit.interval.ms": 30000,
		"session.timeout.ms":      120000,
		"auto.offset.reset":       "earliest",
		"max.poll.interval.ms":    130000,
		"heartbeat.interval.ms":   5000,
	}
	consumer, err := kafka.NewConsumer(kafkaConf)
	if err != nil {
		panic(err)
	}
	fmt.Print("init kafka consumer success\n")
	return consumer
}
```



<a name="77099cbc"></a>
## Franz-go消费配置参数
| 参数 | 描述 |
| --- | --- |
| kgo.SeedBrokers | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)<br />。<br />**- 阿里云内网：端口号为10011，例如project.cn-hangzhou-intranet.log.aliyuncs.com:10011。- 公网：端口号为10012，例如project.cn-hangzhou.log.aliyuncs.com:10012** |
| kgo.ConsumerGroup | 配置消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过group.id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如**"kafka-test"** |
| kgo.ConsumeTopics | 填写日志服务**Logstore**名称 |
| kgo.SASL | 为了保证数据传输的安全性，**必须使用SASL_SSL** |
| User | 填写日志服务**Project**名称 |
| Pass | 配置为阿里云AK，格式为**{access-key-id}#{access-key-secret}**。请根据实际情况，将{access-key-id}替换为您的AccessKey ID，将{access-key-secret}替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)<br />。 |
| kgo.Dialer | 使用sasl必须设置这个参数,否则无法正常消费.详见[franz-go github 案例](https://github.com/twmb/franz-go/blob/master/examples/sasl/sasl_ssl_plain/sasl_ssl_plain.go) |


<a name="d2101e0c"></a>
## Franz-go消费代码示例

```go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"github.com/twmb/franz-go/pkg/kgo"
	"github.com/twmb/franz-go/pkg/sasl/plain"
	"net"
	"time"
)

var (
	project         = "project"
	accessKeyID     = "access-key-id"
	accessKeySecret = "access-key-secret"
	endpoint        = "cn-hangzhou.log.aliyuncs.com"
	logstore        = "logstore"
	port            = "10012"
	groupId         = "kafka-test"
)

func main() {
	//using sasl we must add tisDialer
	tlsDialer := &tls.Dialer{NetDialer: &net.Dialer{Timeout: 10 * time.Second}}
	seeds := []string{fmt.Sprintf("%v.%v:%v", project, endpoint, port)}

	//get Kgo client
	client, err := kgo.NewClient(
		kgo.SeedBrokers(seeds...),
		kgo.ConsumerGroup(groupId),
		kgo.ConsumeTopics(logstore),
		kgo.SASL(plain.Auth{
			User: project,
			Pass: fmt.Sprintf("%v#%v", accessKeyID, accessKeySecret),
		}.AsMechanism()),
		kgo.Dialer(tlsDialer.DialContext),
	)

	if err != nil {
		panic(err)
	}
	defer client.Close()
	ctx := context.Background()

	for {
		fetches := client.PollFetches(ctx)
		if errs := fetches.Errors(); len(errs) > 0 {
			panic(fmt.Sprint(errs))
		}

		iter := fetches.RecordIter()
		for !iter.Done() {
			record := iter.Next()
			fmt.Println(string(record.Value), "from an iterator!")
		}
	}
}
```



<a name="54223ed0"></a>
## Franz-go与Confluent-kafka-go简单对比:

Franz-kafka-go 目前github star数为857 ,Confluent-kafka-go目前github star数为3.7k , 实际使用过程中franz-kafka-go 如果参数配置有误,能返回的报错信息相比后者少很多,甚至完全不报错,此时排查起来有较大的难度,建议使用confluent-kafka-go

<a name="03807354"></a>
## Python消费配置参数
| 参数 | 描述 |
| --- | --- |
| bootstrap_servers | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)<br />。<br />**- 阿里云内网：端口号为10011，例如project.cn-hangzhou-intranet.log.aliyuncs.com:10011。- 公网：端口号为10012，例如project.cn-hangzhou.log.aliyuncs.com:10012** |
| group_id | 消费组id, 是用于指定消费者组的标识符,用于将消费组内的消费者分组,通过group.id,可以实现消费者组内的负载均衡,实现数据的处理和分发.例如**"kafka-test"** |
| security_protocol | 为了保证数据传输的安全性，**必须使用SASL_SSL** |
| sasl_plain_username | 配置为日志服务Logstore名称 |
| sasl_plain_password | 配置为阿里云AK，格式为**{access-key-id}#{access-key-secret}**。请根据实际情况，将{access-key-id}替换为您的AccessKey ID，将{access-key-secret}替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)<br />。 |
| sasl_mechanism | 建议使用"PLAIN" |
| max_poll_interval_ms | 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，**建议max.poll.interval.ms为130000MS**，保证所有消费者都能加入消费组 . |
| session_timeout_ms | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，**session.timeout.ms为120000MS** |
| auto_offset_reset | auto.offset.reset 消费起始点位 常用的二个值是latest和earliest，默认是latest |
| earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费 |  |
| latest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的数据 |  |

<a name="16c7e8ca"></a>
## Python消费代码示例

```python
import time

from kafka import KafkaConsumer

endpoint = "cn-hangzhou.log.aliyuncs.com"
accessKeyId = "access-key-id"
accessKeySecret = "access-key-secret"
project = "project"
logstore = "logstore"
port = "10012"
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

<a name="cea3c4fa"></a>
## 限制说明

- kafka消费协议目前支持到2.2
- kafka client需要2.x版本(2.0以上)
- 一个消费组支持消费50个logstore，不支持通配符匹配，只支持直接指定logstore名称
- 一个logstore最多支持被15个消费组消费（跟SLS现有消费组限制无关联）
- 为保证日志传输安全性，目前仅支持SASL_SSL连接协议。
- 只支持顺序消费，不支持区间消费
- 在消费逻辑中不要基于offset做延迟判断（offset会出现跳跃情况）
- 一个loggroup中log数目不能超过10W，超过部分会被自动截断
- 删除logstore的同时，目前需要用户通过代码调用删除关联的消费组，代码示例如下：

```

        props.put("bootstrap.servers", "cn-hangzhou-intranet.log.aliyuncs.com:10011");
        props.put("security.protocol", "sasl_ssl");
        props.put("sasl.mechanism", "PLAIN");
        props.put("sasl.jaas.config",
                "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"projectName\" password=\"access-key-id#access-key-secret\";");

        String topic = "logstore";

        AdminClient client = KafkaAdminClient.create(props);

        try {
            ListConsumerGroupsResult listConsumerGroupsResult = client.listConsumerGroups();
            Collection<ConsumerGroupListing> groups = listConsumerGroupsResult.all().get(10, TimeUnit.SECONDS);

            Collection<String> groupIds = new ArrayList<>();
            groups.forEach( group -> {
                System.out.println(group.groupId());
                groupIds.add(group.groupId());
            });

            DescribeConsumerGroupsResult describeConsumerGroupsResult = client.describeConsumerGroups(groupIds);
            Map<String, ConsumerGroupDescription> groupMetas = describeConsumerGroupsResult.all().get(10, TimeUnit.SECONDS);
            List<String> deleteGroupId = new ArrayList<>();
            for (Map.Entry<String, ConsumerGroupDescription> entry : groupMetas.entrySet())
            {
                Set<String> logstores = new HashSet<>();
                Iterator<MemberDescription> it = entry.getValue().members().iterator();
                while(it.hasNext())
                {
                    MemberDescription member = it.next();
                    Iterator<TopicPartition> tit = member.assignment().topicPartitions().iterator();
                    while (tit.hasNext())
                    {
                        TopicPartition tp = tit.next();
                        if(!logstores.contains(tp.topic()))
                            logstores.add(tp.topic());
                    }
                }
               
                if (logstores.contains(topic))
                    deleteGroupId.add(entry.getKey());
            }

            DeleteConsumerGroupsResult deleteConsumerGroupsResult =  client.deleteConsumerGroups(deleteGroupId);
            deleteConsumerGroupsResult.all().get(10, TimeUnit.SECONDS);


        } catch (final InterruptedException | ExecutionException | java.util.concurrent.TimeoutException e) {
            e.printStackTrace();
        }
```

<a name="34062b25"></a>
## 最佳实践

<a name="aa67d568"></a>
### shard读写能力

- 写入：5 MB/s或500次/s
- 读取：10 MB/s或100次/s
- 需要根据写入数据量和读取量分配合适的shard
- <br />

<a name="19444e70"></a>
## 建议

- 建议在消费前将要消费的shard数量分裂到当前logstore写入峰值时需要的最大shard数，避免在消费时出现消费空洞shard。 kafka的partition是连续递增的，不会减少，SLS的shard会分裂、合并、过期，kafka client端的消费逻辑有校验partition是否连续递增，SLS在消费协议兼容对shard和partition的做了映射关系，如果在消费中出现shard分裂合并，会导致部分消费者消费空洞shard（当shard分裂或者合并时，原shard状态转化为readonly，超过数据保存时间后被自动回收，从而产生空洞），出现消费不均衡
