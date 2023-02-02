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
      ],
    },
  ]
}

module.exports = getSidebar
