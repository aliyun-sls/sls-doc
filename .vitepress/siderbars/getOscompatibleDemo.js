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
        { text: '查看消费延迟', link: '/oscompatibledemo/kafka_consume_monitor' },
        { text: '使用SPL过滤消费', link: '/oscompatibledemo/kafka_spl' },
        { text: 'Java Kafka(消费和上报)', link: '/oscompatibledemo/kafka_java' },
        { text: 'Confluent-Kafka-Go', link: '/oscompatibledemo/kafka_go' },
        { text: 'Confluent-Kafka-Python', link: '/oscompatibledemo/kafka_python' },
        { text: 'Logstash证书更新', link: '/oscompatibledemo/kafka_logstash' },

        // { text: 'Confluent-Kafka-C#', link: '/oscompatibledemo/kafka_c_sharp'},
        // { text: 'Sarama-Kafka-Go示例', link: '/oscompatibledemo/sarama_go_kafka_consume' },
      ],
    },
    {
      text: 'ES兼容',
      items: [
        { text: '对接Kibana', link: '/oscompatibledemo/sls_kibana' },
        { text: '对接OpenSearch', link: '/oscompatibledemo/sls_opensarch' },
        { text: 'Kibana+ECS角色方式访问SLS', link: '/oscompatibledemo/es_ecs_role' },
        { text: '多云场景下部署SLS-Kibana', link: '/oscompatibledemo/es_kibana_helm' },
        { text: 'Kibana Dashboard迁移', link: '/oscompatibledemo/kibana_dashboard_transfer' },
        {
          text: 'Kibana Index Pattern批量删除',
          link: '/oscompatibledemo/kibana_pattern_batch_delete',
        },
        { text: '最佳实践', link: '/oscompatibledemo/es_best_practice' },
        { text: 'FAQ', link: '/oscompatibledemo/es_faq' },
      ],
    },
  ]
}

module.exports = getSidebar
