function getSidebar() {
  return [
  {
      text: 'ARMS Playground 用户体验监控',
      items: [
        { text: '案例总览', link: '/armsPlayUser/home.md' },
        { text: '追踪用户会话操作轨迹', link: '/armsPlayUser/operationTrajectory.md' },
        { text: '分析页面资源加载性能', link: '/armsPlayUser/analysisPerformance.md' },
        { text: '查询客户端资源加载性能', link: '/armsPlayUser/searchPerformance.md' },
        { text: '追踪用户会话', link: '/armsPlayUser/trackUsers.md' },
        { text: '分析页面功能访问量', link: '/armsPlayUser/Analysisfunction.md' },
      ]
      
    }
  ]
}

module.exports = getSidebar
