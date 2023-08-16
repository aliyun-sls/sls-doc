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
  ]
}

module.exports = getSidebar
