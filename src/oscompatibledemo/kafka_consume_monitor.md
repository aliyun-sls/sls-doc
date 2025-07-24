## 使用SLS CloudLens 查看Kafka消费延迟

目前Kafka消费组没有办法在logstore下的`数据消费`中看到。

Kafka消费的延迟情况只能通过SLS CloudLens进行查看。

SLS CloudLens访问地址 [链接](https://sls.console.aliyun.com/lognext/app/lens/sls)


进入 `CloudLens for SLS` 后点击 `访问监控`, 选择对应的Project，选择 `消费组监控`
即可看到kafka消费组的延迟监控



![](/img/oscompatibledemo/kafka_consume_delay.jpg)