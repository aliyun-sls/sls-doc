SLS已经兼容Kafka消费组协议，您可以使用原生Kafka客户端对SLS进行读操作。
### 概念映射
| Kafka | SLS | 描述 |
| --- | --- | --- |
| Topic | Logstore | Topic，Kafka用来区分不同类型信息的主题
Logstore是SLS中日志数据的采集、存储和查询单元 |
| Partition | Shard | 数据存储分区
Partition是连续的，只增不减
SLS的Shard可以分裂/合并/过期 |
| Offset | Cursor | Offset，代表Partition中的消息的顺序ID
Cursor，SLS日志的相对偏移量，通过Cursor可以获得一组相对位置的日志 |

### 账号权限配置

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
### 配置参数

| 参数 | 描述 |
| --- | --- |
| bootstrap.servers | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)。- 阿里云内网：端口号为10011，例如project.cn-hangzhou-intranet.log.aliyuncs.com:10011。- 公网：端口号为10012，例如project.cn-hangzhou.log.aliyuncs.com:10012|
| security.protocol | 为了保证数据传输的安全性，必须使用SASL_SSL |
| topic | 配置为日志服务Logstore名称。 |
| username | 配置为日志服务Project名称。 |
| password | 配置为阿里云AK，格式为**${access-key-id}#${access-key-secret}**。请根据实际情况，将**${access-key-id}**替换为您的AccessKey ID，将**${access-key-secret}**替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)。 |
| enable.auto.commit | 是否自动提交消费点位，建议设为true |
| auto.commit.interval.ms | 自动提交消费点位的间隔时间，建议30000MS |
| max.poll.interval.ms |  消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，建议max.poll.interval.ms为120000MS，保证所有消费者都能加入消费组 |
| session.timeout.ms | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，需要保证session.timeout.ms值大于max.poll.interval.ms，session.timeout.ms为130000MS |
| auto.offset.reset | auto.offset.reset 消费起始点位 常用的二个值是latest和earliest，默认是latest
earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费
latest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的数据 |

- 代码示例：
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
}

```
### 相关限制

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
### 最佳实践
#### shard读写能力

- 写入：5 MB/s或500次/s
- 读取：10 MB/s或100次/s
- 需要根据写入数据量和读取量分配合适的shard
#### 建议

- 建议在消费前将要消费的shard数量分裂到当前logstore写入峰值时需要的最大shard数，避免在消费时出现消费空洞shard。 kafka的partition是连续递增的，不会减少，SLS的shard会分裂、合并、过期，kafka client端的消费逻辑有校验partition是否连续递增，SLS在消费协议兼容对shard和partition的做了映射关系，如果在消费中出现shard分裂合并，会导致部分消费者消费空洞shard（当shard分裂或者合并时，原shard状态转化为readonly，超过数据保存时间后被自动回收，从而产生空洞），出现消费不均衡