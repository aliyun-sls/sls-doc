function getSidebar() {
  return [
    {
      text: 'ARMS 调用链分析',
      items: [
        { text: '案例总览', link: '/arms/callAnalysis/home.md' },
        { text: '端到端全链路追踪', link: '/arms/callAnalysis/Endtoend.md' },
        {
          text: '通过错/慢调用链排查应用产生异常的原因',
          link: '/arms/callAnalysis/callException.md',
        },
        { text: '调用链采样配置最佳实践', link: '/arms/callAnalysis/bestPractices.md' },
        {
          text: '通过调用链关联应用日志分析业务异常',
          link: '/arms/callAnalysis/AssociationAnomaly.md',
        },
      ],
    },
  ]
}

module.exports = getSidebar
