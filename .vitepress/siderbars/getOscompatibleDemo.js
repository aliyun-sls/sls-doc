function getSidebar() {
    return [
        {
            text: '开源兼容总览',
            items: [{text: '总览', link: '/oscompatibledemo/index'}],
        },
        {
            text: 'Kafka兼容',
            items: [{text: '各语言消费示例', link: '/oscompatibledemo/kafka_consume'}],
        }

    ]
}

module.exports = getSidebar
  