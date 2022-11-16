function getSidebar() {
  return [
    {
      text: '查询分析案例',
      items: [{ text: '案例总览', link: '/sqldemo/index' }],
    },
    {
      text: 'Nginx 日志分析',
      items: [
        {
          text: 'nginx今日PV与昨日对比',
          link: '/sqldemo/nginx今日PV与昨日对比',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: '通用聚合分析',
      items: [
        {
          text: 'tomcat请求状态趋势分析',
          link: '/sqldemo/tomcat请求状态趋势分析',
        },
        // ...sqldemoFiles,
      ],
    },
  ]
}

module.exports = getSidebar
