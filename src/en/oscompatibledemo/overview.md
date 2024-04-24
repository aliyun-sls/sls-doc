## 前言

SLS 已经兼容 Kafka 消费组协议，您可以使用原生 Kafka 客户端对 SLS 进行读操作。

## 概念映射

| Kafka     | SLS      | Description                                                                                                   |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| Topic     | Logstore | Topic，Kafka 用来区分不同类型信息的主题，Logstore 是 SLS 中日志数据的采集、存储和查询单元                     |
| Partition | Shard    | 数据存储分区 Partition 是连续的，只增不减。SLS 的 Shard 可以分裂/合并/过期                                    |
| Offset    | Cursor   | Offset 代表 Partition 中的消息的顺序 ID；Cursor，SLS 日志的相对偏移量，通过 Cursor 可以获得一组相对位置的日志 |

## 阿里云账号权限配置

- 赋予账号只读访问日志服务(Log)的权限（AliyunLogReadOnlyAccess)

如果有更精细的账号权限要求，可采用自定义权限策略，[参考文档](https://www.alibabacloud.com/help/en/doc-detail/93733.htm)
脚本编辑模式配置示例如下:

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

## 限制说明

- kafka 消费协议目前支持到 2.2
- kafka client 需要 2.x 版本(2.0 以上)
- 一个消费组支持消费 50 个 logstore，不支持通配符匹配，只支持直接指定 logstore 名称
- 一个 logstore 最多支持被 15 个消费组消费（跟 SLS 现有消费组限制无关联）
- 为保证日志传输安全性，目前仅支持 SASL_SSL 连接协议。
- 只支持顺序消费，不支持区间消费
- 在消费逻辑中不要基于 offset 做延迟判断（offset 会出现跳跃情况）
- 一个 loggroup 中 log 数目不能超过 10W，超过部分会被自动截断
- 删除 logstore 的同时，目前需要用户通过代码调用删除关联的消费组，代码示例如下：

```java
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

## 消费组延迟监控

您可以通过日志服务控制台查看日志消费的状态并设置告警,详见[链接](https://www.alibabacloud.com/help/en/doc-detail/55912.html)

## 最佳实践

### shard 读写能力

- 写入：5 MB/s 或 500 次/s
- 读取：10 MB/s 或 100 次/s
- 需要根据写入数据量和读取量分配合适的 shard，建议 **消费者的数量和消费的 shard 的数目**比例为 **1：5**
  ，并观察消费延迟情况，如果延迟过大请增加消费者的数量

### 建议

- 建议在消费前将要消费的 shard 数量分裂到当前 logstore 写入峰值时需要的最大 shard 数，避免在消费时出现消费空洞 shard。
  kafka 的 partition 是连续递增的，不会减少，SLS 的 shard 会分裂、合并、过期，kafka
  client 端的消费逻辑有校验 partition 是否连续递增，SLS 在消费协议兼容对 shard 和 partition 的做了映射关系，如果在消费中出现 shard 分裂合并，会导致部分消费者消费空洞 shard（当 shard 分裂或者合并时，原 shard 状态转化为 readonly，超过数据保存时间后被自动回收，从而产生空洞），出现消费不均衡
