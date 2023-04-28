function getSidebar() {
  return [
    {
      text: '可视化案例',
      items: [{ text: '案例总览', link: '/visulization/' }],
    },
    {
      text: '常见图表案例',
      items: [
        { text: '如何添加多Y轴线图', link: '/visulization/doubley.md' },
        { text: '如何配置一个带有迷你图的单值图', link: '/visulization/singleWithMiniChart.md' },
        { text: '过滤器最佳实践', link: '/visulization/filter.md' },
        { text: '导入仪表盘最佳实践', link: '/visulization/importOtherProjectDashboard.md' },
      ],
    },
  ]
}

module.exports = getSidebar
