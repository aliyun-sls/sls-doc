function getSidebar() {
  return [
    {
      text: '案例总览',
      items: [{ text: '案例总览', link: '/billandsecurity/' }],
    },
    {
      text: '审计与安全快速介绍',
      items: [
        { text: '日志审计快速介绍', link: '/billandsecurity/logauditintro.md' },
        { text: '成本管家快速介绍', link: '/billandsecurity/costmanagerintro.md' },
      ],
    },
    {
      text: '成本管家案例介绍',
      items: [
        { text: '账单自定义分析案例', link: '/billandsecurity/billAnalysis.md' },
        { text: '账单自定义告警案例', link: '/billandsecurity/billAlert.md' },
        { text: 'SLS账单分析案例介绍', link: '/billandsecurity/billSls.md' },
        { text: 'OSS账单分析案例介绍', link: '/billandsecurity/billOss.md' },
        { text: 'ECS账单分析案例介绍', link: '/billandsecurity/billEcs.md' },
      ],
    },
  ]
}

module.exports = getSidebar
