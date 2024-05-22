function getSidebar() {
  return [
   {
      text: 'ARMS Playground 应用监控',
      items: [
        { text: '案例总览', link: '/armsPlayAppMonitor/home.md' },
        { text: '查询应用提供/依赖服务监控', link: '/armsPlayAppMonitor/searchApp.md' },
        { text: '查询应用实例资源监控', link: '/armsPlayAppMonitor/searchInstanceMonitor.md' },
        { text: '分析应用新增/突增异常', link: '/armsPlayAppMonitor/classfictionApp.md' },
        { text: '通过智能洞察自动诊断错慢根因', link: '/armsPlayAppMonitor/InsightDiagnosis.md' },
      ] 
    },
    
  ]
}

module.exports = getSidebar
