function getSidebar() {
  return [
    {
      text: 'ARMS Playground 案例',
      items: [
       { text: '案例总览', link: '/armsPlayground/home' },
       { text: '应用监控', link: '/armsPlayground/ApplicationMonitoring.md' },
       { text: '调用链分析', link: '/armsPlayground/callAnalysis.md' },
       { text: '用户体验监控', link: '/armsPlayground/userExperience.md' },
      { text: '性能剖析', link: '/armsPlayground/performanceAnalysis.md' },       
      ],     
    }
  ]
}

module.exports = getSidebar
