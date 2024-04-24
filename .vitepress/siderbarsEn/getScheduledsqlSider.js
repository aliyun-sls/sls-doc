function getSidebar() {
  return [
    {
      text: 'Case overview',
      items: [{ text: 'Case overview', link: '/en/scheduledsql/home' }],
    },
    {
      text: 'Task Configuration Case',
      items: [
        { text: 'Process and store data from a Logstore to another Logstore', link: '/en/scheduledsql/log2log.md' },
        { text: 'Process and store data from a Logstore to a Metricstore', link: '/en/scheduledsql/log2metric.md' },
        { text: 'Process and store data from a Metricstore to another Metricstore', link: '/en/scheduledsql/metric2metric.md' },
      ],
    },
    {
      text: 'alert Configuration Case',
      items: [
        { text: 'Configure alerting for Scheduled SQL', link: '/en/scheduledsql/scheduledsql_alert.md' },
      ],
    },
  ]
}

module.exports = getSidebar
