function getSidebar() {
    return [
        {
            text: '开源兼容总览',
            items: [{text: '总览', link: '/oscompatibledemo/index'}],
        },
        {
            text: 'Kafka 兼容',
            items: [{text: 'Java 消费示例', link: '/oscompatibledemo/java_kafka_consume'},
                    {text: 'Confluent-Kafka-Go 消费示例', link: '/oscompatibledemo/confluent_go_kafka_consume'}],
        }

    ]
}

module.exports = getSidebar
  