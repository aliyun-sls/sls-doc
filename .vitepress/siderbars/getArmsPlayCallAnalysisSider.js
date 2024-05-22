function getSidebar() {
  return [
    {
      text: 'ARMS Playground 调用链分析',
      items: [
        { text: '案例总览', link: '/armsPlayground/callAnalysis/home.md' },
        { text: '端到端全链路追踪', link: '/armsPlayground/callAnalysis/Endtoend.md' },
        { text: '通过错/慢调用链排查应用产生异常的原因', link: '/armsPlayground/callAnalysis/callException.md' },
        { text: '调用链采样配置最佳实践', link: '/armsPlayground/callAnalysis/bestPractices.md' },
        { text: '通过调用链关联应用日志分析业务异常', link: '/armsPlayground/callAnalysis/AssociationAnomaly.md' },
      ]
      
    }
  ]
}

module.exports = getSidebar
