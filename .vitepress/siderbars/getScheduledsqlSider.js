function getSidebar() {
  return [
    {
      text: '案例总览',
      items: [{ text: '案例总览', link: '/scheduledsql/' }],
    },
    {
      text: '任务配置案例',
      items: [
        { text: '日志数据转日志数据介绍', link: '/scheduledsql/log2log.md' },
        { text: '日志数据转时序数据介绍', link: '/scheduledsql/log2metric.md' },
        { text: '时序数据转时序数据介绍', link: '/scheduledsql/metric2metric.md' },
      ],
    },
    {
      text: '告警配置案例',
      items: [
        { text: '定时 SQL 告警介绍', link: '/scheduledsql/scheduledsql_alert.md' },
      ],
    },
  ]
}

module.exports = getSidebar
