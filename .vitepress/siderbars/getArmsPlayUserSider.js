function getSidebar() {
  return [
  {
      text: 'ARMS Playground 用户体验监控',
      items: [
        { text: '案例总览', link: '/armsPlayground/user/home.md' },
        { text: '追踪用户会话操作轨迹', link: '/armsPlayground/user/operationTrajectory.md' },
        { text: '分析页面资源加载性能', link: '/armsPlayground/user/analysisPerformance.md' },
        { text: '查询客户端资源加载性能', link: '/armsPlayground/user/searchPerformance.md' },
        { text: '追踪用户会话', link: '/armsPlayground/user/trackUsers.md' },
        { text: '分析页面功能访问量', link: '/armsPlayground/user/Analysisfunction.md' },
      ]
      
    }
  ]
}

module.exports = getSidebar
