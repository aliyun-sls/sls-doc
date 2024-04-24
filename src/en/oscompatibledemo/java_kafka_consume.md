## [Compatibility with Kafka consumers and usage notes](./overview.md)

## Java parameters

| parameter                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| bootstrap.servers                                                                             | The cluster address for initial connection, in the format of **Project.Endpoint:Port**. Configure this parameter based on the endpoint of the project. For more information, see [View endpoints](https://www.alibabacloud.com/help/en/doc-detail/29008.htm#reference-wgx-pwq-zdb)。<br/>- Alibaba Cloud internal network: The port number is 10011. Example: **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/>- Internet: The port number is 10012. Example: **project.cn-hangzhou.log.aliyuncs.com:10012** |
| security.protocol                                                                             | To ensure the data transmission security，Set the value to SASL_SSL                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| topic                                                                                         | The name of the Simple Log Service The name of the Simple Log Service Logstore.。                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| username                                                                                      | The name of the Simple Log Service project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| password                                                                                      | The AccessKey pair of your Alibaba Cloud account, in the **{access-key-id}#{access-key-secret** format. Replace **{access-key-id** with your AccessKey ID and **{access-key-secret}** with your AccessKey secret. We recommend that you use the AccessKey pair of a Resource Access Management (RAM) user. For more information, see [Create a RAM user and authorize the RAM user to access Simple Log Service](https://www.alibabacloud.com/help/en/doc-detail/47664.htm#task-xsk-ttc-ry)                              |
| enable.auto.commit                                                                            | Specifies whether to automatically commit offsets. Recommended value: true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| auto.commit.interval.ms                                                                       | The interval at which offsets are automatically committed. Recommend value: 30000MS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| max.poll.interval.ms                                                                          | The time range during which a consumer group waits for all consumers to join the group after a consumer initiates a request to join the group. Consumers that join the consumer group within this time range become members of the consumer group and are allocated partitions. Each consumer consumes only data in the allocated partitions. If consumers do not join the consumer group within this time range, rebalancing is triggered within the consumer group. In the rebalancing process, no data is consumed, which causes consumption latency. **Recommended value: 130000. Unit: ms.** This value allows for sufficient time for consumers to join a consumer group. If you use confluent-kafka-go to consume data, you must set the max.poll.interval.ms parameter to a value that is greater than the value of the session.timeout.ms parameter.                                                                                                                                                                           |
| session.timeout.ms                                                                            | The heartbeat timeout period. If a consumer does not send a heartbeat request within the timeout period, the consumer is considered abnormal, and rebalancing is triggered within the consumer group. Recommended value:130000MS                                                                                                                                                                                                                                                                                                                              |
| auto.offset.reset                                                                             | auto.offset.reset The start position of consumption. Common values: Earliest and Latest.default latest                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| earliest If an offset is committed, a consumer starts to read data from the committed offset. If no offset is committed, a consumer starts to read data from the beginning.   |
| If an offset is committed, a consumer starts to read data from the committed offset. If no offset is committed, a consumer starts to read data from the latest message. |

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
