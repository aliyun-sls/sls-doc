function getSidebar() {
  return [
    {
      text: 'ARMS 应用监控',
      items: [
        { text: '案例总览', link: '/arms/appMonitor/home.md' },
        { text: '查询应用提供/依赖服务监控', link: '/arms/appMonitor/searchApp.md' },
        {
          text: '查询应用实例资源监控',
          link: '/arms/appMonitor/searchInstanceMonitor.md',
        },
        { text: '分析应用新增/突增异常', link: '/arms/appMonitor/classfictionApp.md' },
        {
          text: '通过智能洞察自动诊断错慢根因',
          link: '/arms/appMonitor/InsightDiagnosis.md',
        },
      ],
    },
  ]
}

module.exports = getSidebar
