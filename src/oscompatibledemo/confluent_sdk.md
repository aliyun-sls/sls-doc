## 配置项说明

基本配置项
| 参数| 描述|
|------|------------|
| bootstrap.servers                                        | 初始连接的集群地址，格式为**Project.Endpoint:Port**，请根据Project所在的Endpoint进行配置。更多信息，请参见[服务入口](https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb) <br/> - 阿里云内网：端口号为10011，例如 **project.cn-hangzhou-intranet.log.aliyuncs.com:10011** <br/> - 公网：端口号为10012，例如 **project.cn-hangzhou.log.aliyuncs.com:10012** |
| sasl.mechanism                                           | 必须使用"PLAIN" |
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

## Kafka Java SDK 示例
```java
/** 使用标准Kafka SDK消费SLS的日志数据 */
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class KafkaConsumerGroupTest {

    public static void consume() {
        Properties props = new Properties();
        String project = "etl-dev";
        String logstore = "test";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        // 此处以把AccessKey 和 AccessKeySecret 保存在环境变量为例说明。您可以根据业务需要，保存到配置文件里。
        // 强烈建议不要把 AccessKey 和 AccessKeySecret 保存到代码里，会存在密钥泄漏风险
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

        // Kafka消费者配置
        props.put("group.id", groupId);
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "30000");
        props.put("session.timeout.ms", "130000");
        props.put("auto.offset.reset", "latest");
        props.put("max.poll.interval.ms", "120000");
        props.put("heartbeat.interval.ms", "5000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

          // 创建Kafka消费者实例
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


## Confluent-kafka-go消费代码示例

```go
package main

import (
	"fmt"
        "os"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	endpoint := "cn-hangzhou.log.aliyuncs.com"
	accessKeyID := os.Getenv("SLS_ACCESS_KEY_ID")
	accessKeySecret := os.Getenv("SLS_ACCESS_KEY_SECRET")
	project := "project"
	logstore := "logstore"
	port := "10012"
	//内网endpoint和对应port，可以通过阿里云内部网络访问日志服务，相比公网有更好的链路质量和安全性，详见文档 https://help.aliyun.com/document_detail/29008.htm#reference-wgx-pwq-zdb
	//endpoint := "cn-hangzhou-intranet.log.aliyuncs.com"
	//port    := "10011"

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
		"bootstrap.servers":       fmt.Sprintf("%s.%s:%s", project, endpoint, port),
		"sasl.mechanism":          "PLAIN",
		"security.protocol":       "sasl_ssl",
		"sasl.username":           project,
		"sasl.password":           fmt.Sprintf("%s#%s", accessKeyID, accessKeySecret),
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
