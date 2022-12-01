### 前言
SLS 兼容 Kafka 协议，本文介绍如何通过原生Kafka客户端对SLS写操作，简化日志分析场景。
### 功能简介
以前用Kafka协议上传的日志，其日志内容存储在**content**字段中，需要对日志进行二次加工，才能实现字段的展开，分析场景使用不友好。现在，通过Kafka生产者（produce）或Beats系列软件上传json格式日志时，设置**topic**或**headers**，即可实现json格式的日志自动展开。
SLS支持使用Kafka协议上传日志时，自定义设置日志中的__time__字段。
### 通过Kafka生产者（produce）上传日志
#### 字段提取
通过Kafka生产者（produce）上传日志到日志服务时，在程序中设置**topic**或**headers**，即可实现JSON日志自动展开。选择下面任意一个设置即可：

1. 设置topic，将topic字段设置为topic.json
2. 设置headers，在record的headers增加键值对 key(data-parse-format)-value(json）

代码示例：
```
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.header.internals.RecordHeader;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class ProduceTest {
    public static void produce(){
        //配置信息
        Properties props = new Properties();
        //生产kafka服务器地址
        String project = "test-project-1";
        String topic = "test-logstore-1.json";
        props.put("bootstrap.servers", "test-project-1.cn-hangzhou.log.aliyuncs.com:10012");
        props.put("security.protocol", "sasl_ssl");
        props.put("sasl.mechanism", "PLAIN");
        props.put("sasl.jaas.config",
                "org.apache.kafka.common.security.plain.PlainLoginModule required username=\""+ project +"\" password=\"access-key-id#access-key-secret\";");

        //设置数据key和value的序列化处理类
        props.put("key.serializer", StringSerializer.class);
        props.put("value.serializer", StringSerializer.class);

        //创建生产者实例
        KafkaProducer<String,String> producer = new KafkaProducer<>(props);

        //发送记录
        for(int i=0;i<1;i++){
            ProducerRecord record = new ProducerRecord<String, String>(topic, "{\"logName\": \"error4\"}");
            record.headers().add(new RecordHeader("data-parse-format","json".getBytes()));
            producer.send(record);
        }
        producer.close();
    }

    public static void main(String[] args) {
        produce();
    }
}

```
#### 设置__time__
通过Kafka生产者（produce）上传日志到日志服务时，设置record中的timestamp字段，程序会自动将其映射为日志中的__time__字段
代码示例：
```
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.header.internals.RecordHeader;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

public class ProduceTest {
    public static void produce(){
        //配置信息
        Properties props = new Properties();
        //生产kafka服务器地址
        String project = "test-project-1";
        String topic = "test-logstore-1";
        props.put("bootstrap.servers", "test-project-1.cn-hangzhou.log.aliyuncs.com:10012");
        props.put("security.protocol", "sasl_ssl");
        props.put("sasl.mechanism", "PLAIN");
        props.put("sasl.jaas.config",
                "org.apache.kafka.common.security.plain.PlainLoginModule required username=\""+ project +"\" password=\"access-key-id#access-key-secret\";");

        //设置数据key和value的序列化处理类
        props.put("key.serializer", StringSerializer.class);
        props.put("value.serializer", StringSerializer.class);

        //创建生产者实例
        KafkaProducer<String,String> producer = new KafkaProducer<>(props);

        //发送记录
        for(int i=0;i<1;i++){
            Long testTime = new Long(1667618312000L);//timestamp =>  SLS __time__
            ProducerRecord record = new ProducerRecord<String, String>(topic, 0, testTime,null,"{\"logName\": \"error6\"}");
            producer.send(record);
        }
        producer.close();
    }

    public static void main(String[] args) {
        produce();
    }
}

```
### 通过Beats系列软件上传日志
Beats系列软件（MetricBeat、PacketBeat、Winlogbeat、Auditbeat、Filebeat、Heartbeat等）采集到日志后，支持通过Kafka协议将日志上传到日志服务，在配置设置**topic**或**headers**，实现JSON日志自动展开。
#### 配置示例1：topic字段设置为topic.json
```
output.kafka:
  enabled: true
  hosts: ["cn-hangzhou-intranet.log.aliyuncs.com:10011"]
  username: "test-project-1"
  password: "access-key-id#access-key-secret"
  ssl.certificate_authorities:
  topic: 'test-logstore-1.json'
  partition.hash:
    reachable_only: false
```
#### 配置示例2：headers增加键值对 key(data-parse-format)-value(json）
```
output.kafka:
  enabled: true
  hosts: ["cn-hangzhou-intranet.log.aliyuncs.com:10011"]
  username: "test-project-1"
  password: "access-key-id#access-key-secret"
  ssl.certificate_authorities:
  topic: 'test-logstore-1'
  headers:
    - key: "data-parse-format"
      value: "json"
  partition.hash:
    reachable_only: false
```
### 日志样例

- 原始日志
```
{"key1": "value1", "key2": "value2", "key3": "value3", "key4": "value4"}
```

- 解析后日志内容

![image.png](/img/src/product/SLS使用Kafka协议上传日志/b30046a2dd2d8d875eaa171c258bc7890123bae2f8eccf4b794c8a14ba357974.png)
