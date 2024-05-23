function getSidebar() {
  return [
    {
      text: 'ARMS 性能剖析',
      items: [
        { text: '案例总览', link: '/arms/performance/home.md' },
        { text: 'Java应用持续性能剖析', link: '/arms/performance/javaPerformance.md' },
        { text: '查询JVM监控', link: '/arms/performance/searchJVM.md' },
        { text: '使用Arthas探索应用性能', link: '/arms/performance/ArthasApp.md' },
      ],
    },
  ]
}

module.exports = getSidebar
