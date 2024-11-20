function getSidebar() {
  return [
    {
      text: '开源兼容总览',
      items: [{ text: '总览', link: '/oscompatibledemo/home' }],
    },
    {
      text: 'Kafka SDK对接SLS',
      items: [
        { text: '功能说明', link: '/oscompatibledemo/kafka_overview' },
        { text: '使用SPL过滤消费', link: '/oscompatibledemo/kafka_spl' },
        { text: 'Java Kafka SDK', link: '/oscompatibledemo/kafka_java' },
        { text: 'Confluent-Kafka-Go', link: '/oscompatibledemo/kafka_go' },
        { text: 'Confluent-Kafka-Python', link: '/oscompatibledemo/kafka_python' },
        // { text: 'Confluent-Kafka-C#', link: '/oscompatibledemo/kafka_c_sharp'},
        // { text: 'Sarama-Kafka-Go示例', link: '/oscompatibledemo/sarama_go_kafka_consume' },
      ],
    },
    {
      text: 'ES兼容',
      items: [
        { text: '最佳实践', link: '/oscompatibledemo/es_best_practice' },
      ],
    },
  ]
}

module.exports = getSidebar
