
## Java消费配置参数

| 参数                                                       | 描述                                                                                                                                                                                                                                                                                                                |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| bootstrap.servers                                        | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb)。<br/>- 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011**  <br/>- 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| security.protocol                                        | 为了保证数据传输的安全性，必须使用SASL_SSL                                                                                                                                                                                                                                                                                         |
| topic                                                    | 配置为日志服务Logstore名称。                                                                                                                                                                                                                                                                                                |
| username                                                 | 配置为日志服务Project名称。                                                                                                                                                                                                                                                                                                 |
| password                                                 | 配置为阿里云AK，格式为 **{access-key-id}#{access-key-secret}**。请根据实际情况，将 **{access-key-id}** 替换为您的AccessKey ID，将 **{access-key-secret}** 替换为您的AccessKey Secret。建议使用RAM用户的AK。更多信息，请参见[授权](https://help.aliyun.com/document_detail/47664.htm#task-xsk-ttc-ry)                                                                 |
| enable.auto.commit                                       | 是否自动提交消费点位，建议设为true                                                                                                                                                                                                                                                                                               |
| auto.commit.interval.ms                                  | 自动提交消费点位的间隔时间，建议30000MS                                                                                                                                                                                                                                                                                           |
| max.poll.interval.ms                                     | 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，建议max.poll.interval.ms为120000MS，保证所有消费者都能加入消费组                                                                                                                               |
| session.timeout.ms                                       | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，需要保证session.timeout.ms值大于max.poll.interval.ms，session.timeout.ms为130000MS                                                                                                                                                                                       |
| auto.offset.reset                                        | auto.offset.reset 消费起始点位 常用的二个值是latest和earliest，默认是latest                                                                                                                                                                                                                                                         |
| earliest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费 |
| latest 当有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的数据 |

## Java消费代码示例

```java
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
        //内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb
        //String endpoint = "cn-hangzhou-intranet.log.aliyuncs.com";
        //String port = "10011";
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
