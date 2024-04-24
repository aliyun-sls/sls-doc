function getSidebar() {
  return [
    {
      text: 'Use cases of query and analysis',
      items: [{ text: 'Case overview', link: '/en/sqldemo/home' }],
    },
    {
      text: 'General aggregate analysis',
      items: [
        {
          text: 'Query the global distribution of clients',
          link: '/en/sqldemo/客户端PV全球分布',
        },
        {
          text: 'Query the classification and PV trend of request methods',
          link: '/en/sqldemo/请求方法分类pv趋势',
        },
        {
          text: 'Distribution of user agent requests by PV',
          link: '/en/sqldemo/根据pv为http_user_agent进行排序展示',
        },
        {
          text: 'Daily consumption and trend prediction for this month',
          link: '/en/sqldemo/本月每日消费及趋势预测',
        },
        {
          text: 'Service consumption distribution of this month',
          link: '/en/sqldemo/本月消费情况各产品的占比',
        },
        {
          text: 'Consumption of yesterday and comparison to that of last month',
          link: '/en/sqldemo/昨天的消费及与上月的同比',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'NGINX log analysis',
      items: [
        {
          text: 'Day-to-day comparison of PVs based on NGINX access logs',
          link: '/en/sqldemo/nginx今日PV与昨日对比',
        },
        {
          text: 'Distribution of source IP addresses from NGINX logs',
          link: '/en/sqldemo/nginx日志来源IP的分布',
        },
        {
          text: 'Statistics on the inbound and outbound NGINX traffic',
          link: '/en/sqldemo/nginx流入流出的流量统计',
        },
        {
          text: 'PV prediction based on NGINX access logs',
          link: '/en/sqldemo/nginx访问日志的PV预测',
        },
        {
          text: 'Top 10 addresses that access NGINX',
          link: '/en/sqldemo/nginx访问前十的地址',
        },
        {
          text: 'PV trend and day-to-day comparison from NGINX access logs',
          link: '/en/sqldemo/nginx访问日志的PV趋势同比昨日',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'Tomcat web service analysis',
      items: [
        {
          text: 'Trend of Tomcat request status',
          link: '/en/sqldemo/tomcat请求状态趋势分析',
        },
        {
          text: 'Distribution of Tomcat access requests by status and quantity over time',
          link: '/en/sqldemo/tomcat请求状态及数量跟随时间顺序展示',
        },
        {
          text: 'Analyze the distribution of Tomcat access requests in different states over time.',
          link: '/en/sqldemo/展示tomcat访问的pv、uv随时间变化曲线',
        },
        {
          text: 'Number of Tomcat error requests and comparison with that of last hour',
          link: '/en/sqldemo/tomcat错误请求数量以及与上一小时错误请求比较',
        },
        {
          text: 'Top 10 URIs in Tomcat requests',
          link: '/en/sqldemo/tomcat中请求数前十的uri展示',
        },
        {
          text: 'Types and distribution of Tomcat clients',
          link: '/en/sqldemo/查询访问tomcat的客户端分类及数量分布',
        },
        {
          text: 'Statistics on the outbound Tomcat traffic',
          link: '/en/sqldemo/tomcat流出流量统计',
        },
        {
          text: 'Proportion of Tomcat error requests',
          link: '/en/sqldemo/tomcat错误请求占比',
        },
        {
          text: 'Distribution of Tomcat request clients',
          link: '/en/sqldemo/将请求客户端分布在地图上展示',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'CDN log analysis',
      items: [
        {
          text: 'CDN log analysis',
          link: '/en/sqldemo/CDN日志分析',
        },
        // ...sqldemoFiles,
      ],
    },
    // {
    //   text: 'SLB log analysis',
    //   items: [
    //     {
    //       text: 'SLB log analysis',
    //       link: '/en/sqldemo/负载均衡（SLB）日志分析',
    //     },
    //     // ...sqldemoFiles,
    //   ],
    // },
    {
      text: 'machine learning',
      items: [
        {
          text: 'Implement large-scale prediction models and services',
          link: '/en/sqldemo/实现大规模预测模型和服务',
        },
        // ...sqldemoFiles,
      ],
    },
  ]
}

module.exports = getSidebar
