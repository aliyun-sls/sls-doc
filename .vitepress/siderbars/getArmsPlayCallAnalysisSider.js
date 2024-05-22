function getSidebar() {
  return [
    {
      text: 'ARMS Playground 调用链分析',
      items: [
        { text: '案例总览', link: '/armsPlayCallAnalysis/home.md' },
        { text: '端到端全链路追踪', link: '/armsPlayCallAnalysis/Endtoend.md' },
        { text: '通过错/慢调用链排查应用产生异常的原因', link: '/armsPlayCallAnalysis/callException.md' },
        { text: '调用链采样配置最佳实践', link: '/armsPlayCallAnalysis/bestPractices.md' },
        { text: '通过调用链关联应用日志分析业务异常', link: '/armsPlayCallAnalysis/AssociationAnomaly.md' },
      ]
      
    }
  ]
}

module.exports = getSidebar
