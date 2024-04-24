function getSidebar() {
  return [
    {
      text: 'Open source compatibility overview',
      items: [{ text: 'overview', link: '/en/oscompatibledemo/home' }],
    },
    {
      text: 'Compatibility with Kafka',
      items: [
        // { text: 'Feature description for data consumption by using the Kafka protocol', link: '/en/oscompatibledemo/overview' },
        { text: 'Use Java to consume data', link: '/en/oscompatibledemo/java_kafka_consume' },
        {
          text: 'Use Confluent-Kafka-Go to consume data',
          link: '/en/oscompatibledemo/confluent_go_kafka_consume',
        },
        { text: 'Use Franz-Kafka-Go to consume data', link: '/en/oscompatibledemo/franz_go_kafka_consume' },
        { text: 'Use Python-Kafka to consume data', link: '/en/oscompatibledemo/python_kafka_consume' },
        {
          text: 'Use Confluent-Kafka-C# to consume data',
          link: '/en/oscompatibledemo/confluent_dotnet_kafka_consume',
        },
        { text: 'Use Sarama-Kafka-Go to consume data', link: '/en/oscompatibledemo/sarama_go_kafka_consume' },
      ],
    },
  ]
}

module.exports = getSidebar
