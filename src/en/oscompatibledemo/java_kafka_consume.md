## [Compatibility with Kafka consumers and usage notes](./overview.md)

## Java parameters

| parameter                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| bootstrap.servers                                                                             | The cluster address for initial connection, in the format of **Project.Endpoint:Port**. Configure this parameter based on the endpoint of the project. For more information, see [View endpoints](https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb)。<br/>- Alibaba Cloud internal network: The port number is 10011. Example: **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/>- Internet: The port number is 10012. Example: **project.cn-hangzhou.log.aliyuncs.com:10012** |
| security.protocol                                                                             | To ensure the data transmission security，Set the value to SASL_SSL                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| topic                                                                                         | The name of the Simple Log Service The name of the Simple Log Service Logstore.。                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| username                                                                                      | 配置为日志服务 Project 名称。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| password                                                                                      | The AccessKey pair of your Alibaba Cloud account, in the **{access-key-id}#{access-key-secret** format. Replace **{access-key-id** with your AccessKey ID and **{access-key-secret}** with your AccessKey secret. We recommend that you use the AccessKey pair of a Resource Access Management (RAM) user. For more information, see [Create a RAM user and authorize the RAM user to access Simple Log Service](https://www.alibabacloud.com/help/en/doc-detail/47664.htm#task-xsk-ttc-ry)                              |
| enable.auto.commit                                                                            | 是否自动提交消费点位，建议设为 true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| auto.commit.interval.ms                                                                       | 自动提交消费点位的间隔时间，建议 30000MS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| max.poll.interval.ms                                                                          | 消费组在消费者发起加入组请求后，等待所有消费者加入的时间间隔，在这个时间间隔内加入组的消费者为消费组的成员，进行分区分配，各个消费者按分配的分区开发消费数据，如果在这个时间内还有消费者没有加入消费组，则会触发消费组再平衡操作，再平衡期间不会消费数据，会导致消费延迟，建议 max.poll.interval.ms 为 120000MS，保证所有消费者都能加入消费组                                                                                                                                                                            |
| session.timeout.ms                                                                            | 心跳最大超时时间，在该时间如果消费者没有发送心跳请求，则视为该消费者发生异常，触发消费组再平衡操作，需要保证 session.timeout.ms 值大于 max.poll.interval.ms，session.timeout.ms 为 130000MS                                                                                                                                                                                                                                                                                                                              |
| auto.offset.reset                                                                             | auto.offset.reset 消费起始点位 常用的二个值是 latest 和 earliest，默认是 latest                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| earliest 当有已提交的 offset 时，从提交的 offset 开始消费；无提交的 offset 时，从头开始消费   |
| latest 当有已提交的 offset 时，从提交的 offset 开始消费；无提交的 offset 时，消费新产生的数据 |

## Java sample code

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
        // 从环境变量获取AccessKeyId和AccessKeySecret
        String accessKeyID = System.getenv("SLS_ACCESS_KEY_ID");
        String accessKeySecret = System.getenv("SLS_ACCESS_KEY_SECRET");
        String groupId = "kafka-test";
        String endpoint = "cn-hangzhou.log.aliyuncs.com";
        String port = "10012";
        //内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb
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
