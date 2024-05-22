function getSidebar() {
  return [
   {
      text: 'ARMS Playground 性能剖析',
      items: [
        { text: '案例总览', link: '/armsPlayground/performance/home.md' },
        { text: 'Java应用持续性能剖析', link: '/armsPlayground/performance/javaPerformance.md' },
        { text: '查询JVM监控', link: '/armsPlayground/performance/searchJVM.md' },
        { text: '使用Arthas探索应用性能', link: '/armsPlayground/performance/ArthasApp.md' },
      ]
      
    }
  ]
}

module.exports = getSidebar
