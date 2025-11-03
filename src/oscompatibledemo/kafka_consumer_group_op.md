## 通过使用kafka官方的cp-kafka容器操作消费组

### 环境要求
* Docker （版本>=1.18）

### 配置文件准备
提前准备好配置文件, 文件名为 `kafka_client.properties`

```
security.protocol=SASL_SSL
sasl.mechanism=PLAIN
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="SLS_PROJECT" password="SLS_ACCESS_KEY_ID#SLS_ACCESS_KEY_SECRET";
```


## 重置消费点位

1. 先把消费程序停止，停止后几分钟做reset，不然会报错

```
Error: Assignments can only be reset if the group 'xxxx' is inactive, but the current state is Stable.
```


2. 在`kafka_client.properties` 配置文件所在目录，执行下面docker命令，进行重置
其中SLS_KAFKA_ENDPOINT（注意在sls endpiont前加上project前缀）、SLS_KAFKA_CONSUMER_GROUP_NAME 替换为真实值

2024-07-13T06:00:00.000替换为想重置的时间,注意这个是0时区时间，和中国时区相差8小时。如果要重置为2024-07-13T14:00:00.000点的话，那么要减去8小时

```
docker run -ti -v ./kafka_client.properties:/etc/kafka_client.properties \
        sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/cp-kafka:latest \
        kafka-consumer-groups \
        --bootstrap-server SLS_KAFKA_ENDPOINT:10012 \
        --command-config /etc/kafka_client.properties \
        --group SLS_KAFKA_CONSUMER_GROUP_NAME \
        --all-topics \
        --reset-offsets --to-datetime 2024-07-13T06:00:00.000  \
        -execute
```

执行成功的可以看到下面类似输出

```
GROUP                          TOPIC                          PARTITION  NEW-OFFSET
kafka-test                     internal-diagnostic_log        0          6717046784
kafka-test                     internal-diagnostic_log        1          6077415424
```

如果遇到下面的报错，则表示消费程序可能还在跑（或者刚停止消费程序，消费组停止的感知有一定的超时时间，等待一会儿就好）

```
Error: Assignments can only be reset if the group 'xxxx' is inactive, but the current state is Stable.
```

如何验证kafka partition中的offset的时间？

可以用kafka-console-consumer 消费topic中某条partition中数据的时间来确定，执行如下命令
```
docker run -ti -v ./kafka_client.properties:/etc/kafka_client.properties \
        sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/cp-kafka:latest \
        kafka-console-consumer \
        --bootstrap-server SLS_KAFKA_ENDPOINT:10012 \
        --consumer.config /etc/kafka_client.properties \
        --topic <Topic>  \
        --partition <PartitionId> \
        --offset <Offset值> \
        --max-messages 1 \
        --property print.timestamp=true \
        --property print.key=true \
        --property print.value=false   # 可以暂时不打印value
```
注意替换一下 `<Topic>` `PartitionId` `Offset`， SLS_KAFKA_ENDPOINT 写带上project名字的endpoint

获得输出
```
CreateTime:1760335245000        null
Processed a total of 1 messages
```

输出结果中的CreateTime 基本上就是对应的日志时间。
通过date命令转换CreateTime中显示的1760335245000为具体的时间
```
date -d @$((1760335245000/1000)) "+%Y-%m-%d %H:%M:%S"
```

## 查看消费组列表

在`kafka_client.properties` 配置文件所在目录，执行下面docker命令，进行重置
其中SLS_KAFKA_ENDPOINT（注意在sls endpiont前加上project前缀） 替换为真实值

```
docker run -ti -v ./kafka_client.properties:/etc/kafka_client.properties \
        sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/cp-kafka:latest \
        kafka-consumer-groups \
        --bootstrap-server SLS_KAFKA_ENDPOINT:10012 \
        --command-config /etc/kafka_client.properties \
        --list
```


## 删除消费组

在`kafka_client.properties` 配置文件所在目录，执行下面docker命令，进行重置
其中SLS_KAFKA_ENDPOINT（注意在sls endpiont前加上project前缀） 和 SLS_KAFKA_CONSUMER_GROUP_NAME 替换为真实值

```
docker run -ti -v ./kafka_client.properties:/etc/kafka_client.properties \
        sls-registry.cn-hangzhou.cr.aliyuncs.com/kproxy/cp-kafka:latest \
        kafka-consumer-groups \
        --bootstrap-server SLS_KAFKA_ENDPOINT:10012 \
        --command-config /etc/kafka_client.properties \
        --delete --group SLS_KAFKA_CONSUMER_GROUP_NAME
```

成功即返回如下信息

```
Deletion of requested consumer groups ('xxx') was successful.
```