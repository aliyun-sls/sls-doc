function getSidebar() {
  return [
   {
      text: 'ARMS Playground 性能剖析',
      items: [
        { text: '案例总览', link: '/armsPlayPerformance/home.md' },
        { text: 'Java应用持续性能剖析', link: '/armsPlayPerformance/javaPerformance.md' },
        { text: '查询JVM监控', link: '/armsPlayPerformance/searchJVM.md' },
        { text: '使用Arthas探索应用性能', link: '/armsPlayPerformance/ArthasApp.md' },
      ]
      
    }
  ]
}

module.exports = getSidebar
