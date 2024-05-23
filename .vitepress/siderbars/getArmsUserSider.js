function getSidebar() {
  return [
    {
      text: 'ARMS 用户体验监控',
      items: [
        { text: '案例总览', link: '/arms/user/home.md' },
        { text: '追踪用户会话操作轨迹', link: '/arms/user/operationTrajectory.md' },
        { text: '分析页面资源加载性能', link: '/arms/user/analysisPerformance.md' },
        { text: '查询客户端资源加载性能', link: '/arms/user/searchPerformance.md' },
        { text: '追踪用户会话', link: '/arms/user/trackUsers.md' },
        { text: '分析页面功能访问量', link: '/arms/user/Analysisfunction.md' },
      ],
    },
  ]
}

module.exports = getSidebar
