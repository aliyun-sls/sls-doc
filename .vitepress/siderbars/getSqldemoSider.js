function getSidebar() {
  return [
    {
      text: '查询分析案例',
      items: [{ text: '案例总览', link: '/sqldemo/home' }],
    },
    {
      text: '通用聚合分析',
      items: [
        {
          text: '客户端PV全球分布',
          link: '/sqldemo/客户端PV全球分布',
        },
        {
          text: '请求方法分类pv趋势',
          link: '/sqldemo/请求方法分类pv趋势',
        },
        {
          text: 'user_agent请求PV分布',
          link: '/sqldemo/根据pv为http_user_agent进行排序展示',
        },
        {
          text: '本月每日消费及趋势预测',
          link: '/sqldemo/本月每日消费及趋势预测',
        },
        {
          text: '本月消费情况各产品的占比',
          link: '/sqldemo/本月消费情况各产品的占比',
        },
        {
          text: '昨天的消费及与上月的同比',
          link: '/sqldemo/昨天的消费及与上月的同比',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'Nginx日志分析',
      items: [
        {
          text: 'nginx今日PV与昨日对比',
          link: '/sqldemo/nginx今日PV与昨日对比',
        },
        {
          text: 'nginx日志来源IP的分布',
          link: '/sqldemo/nginx日志来源IP的分布',
        },
        {
          text: 'nginx流入流出的流量统计',
          link: '/sqldemo/nginx流入流出的流量统计',
        },
        {
          text: 'nginx访问日志的PV预测',
          link: '/sqldemo/nginx访问日志的PV预测',
        },
        {
          text: 'nginx访问前十的地址',
          link: '/sqldemo/nginx访问前十的地址',
        },
        {
          text: 'nginx访问PV的昨日同比',
          link: '/sqldemo/nginx访问日志的PV趋势同比昨日',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'Tomcat Web服务分析',
      items: [
        {
          text: 'tomcat请求状态趋势分析',
          link: '/sqldemo/tomcat请求状态趋势分析',
        },
        {
          text: 'tomcat请求状态及数量时间分布',
          link: '/sqldemo/tomcat请求状态及数量跟随时间顺序展示',
        },
        {
          text: 'tomcat访问的pv、uv时间分布',
          link: '/sqldemo/展示tomcat访问的pv、uv随时间变化曲线',
        },
        {
          text: 'tomcat错误请求数量以及与上一小时错误请求比较',
          link: '/sqldemo/tomcat错误请求数量以及与上一小时错误请求比较',
        },
        {
          text: 'tomcat中请求数前十的uri展示',
          link: '/sqldemo/tomcat中请求数前十的uri展示',
        },
        {
          text: 'tomcat的客户端分类及数量分布',
          link: '/sqldemo/查询访问tomcat的客户端分类及数量分布',
        },
        {
          text: 'tomcat流出流量统计',
          link: '/sqldemo/tomcat流出流量统计',
        },
        {
          text: 'tomcat错误请求占比',
          link: '/sqldemo/tomcat错误请求占比',
        },
        {
          text: 'tomcat请求客户端分布',
          link: '/sqldemo/将请求客户端分布在地图上展示',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'CDN日志分析',
      items: [
        {
          text: 'CDN日志分析',
          link: '/sqldemo/CDN日志分析',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: '负载均衡（SLB）日志分析',
      items: [
        {
          text: '负载均衡（SLB）日志分析',
          link: '/sqldemo/负载均衡（SLB）日志分析',
        },
        // ...sqldemoFiles,
      ],
    },
    {
      text: 'AI模型服务',
      items: [
        {
          text: '在阿里云日志服务轻松落地您的AI模型服务',
          link: '/sqldemo/deploy_ai_model_with_alilog_service',
        },
        {
          text: '阿里云日志服务的傻瓜式极易预测模型',
          link: '/sqldemo/forecast',
        },
        {
          text: '阿里云日志服务的多指标综合异常检测',
          link: '/sqldemo/multi_metric_anomaly_detection',
        },
        {
          text: '实现大规模预测模型和服务',
          link: '/sqldemo/实现大规模预测模型和服务',
        },
        // ...sqldemoFiles,
      ],
    },
  ]
}

module.exports = getSidebar
