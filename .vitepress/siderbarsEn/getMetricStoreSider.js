function getSidebar() {
  return [
    {
      text: 'Create an alert policy for a Metricstore',
      items: [
        {
          text: 'Basic PromQL use cases',
          link: '/en/metrics/index#PromQL基础使用案例',
        },
        {
          text: 'How to use SQL queries to query data in a Metricstore',
          link: '/en/metrics/index#如何在时序库中使用SQL查询',
        },
        {
          text: 'Create an alert policy for a Metricstore',
          link: '/en/metrics/index#为时序库创建告警策略',
        },
      ],
    },
    {
      text: 'Basic Use Cases of PromQL',
      items: [
        {
          text: 'Query metric data',
          link: '/en/metrics/1.指标查询.md',
        },
        {
          text: 'Filter metric data by label',
          link: '/en/metrics/2.Label筛选.md',
        },
        {
          text: 'Filter metric data by label using a regular expression',
          link: '/en/metrics/3.Label筛选使用正则匹配.md',
        },
        {
          text: 'Query the maximum metric value',
          link: '/en/metrics/4.指标最大值.md',
        },
        {
          text: 'Query the number of timelines',
          link: '/en/metrics/5.时间线个数.md',
        },
        {
          text: 'Calculate the rate of change',
          link: '/en/metrics/6.计算变化率.md',
        },
        {
          text: 'Calculate the difference',
          link: '/en/metrics/7.计算差值.md',
        },
        {
          text: 'Use multiple functions in a nested manner',
          link: '/en/metrics/8.多函数嵌套使用.md',
        },
        {
          text: 'Calculate between multiple numeric values',
          link: '/en/metrics/9.多数值间计算.md',
        },
        {
          text: 'Calculate between metrics and numeric values',
          link: '/en/metrics/10.指标与数值间计算.md',
        },
        {
          text: 'Calculate between multiple metrics',
          link: '/en/metrics/11.多指标间计算.md',
        },
        {
          text: 'Correct use Subquery',
          link: '/en/metrics/12.Subquery.md',
        },
      ],
    },
    {
      text: 'How to use SQL queries to query data in a Metricstore',
      items: [
        {
          text: 'Query all data.',
          link: '/en/metrics/13.查询所有数据.md',
        },
        {
          text: 'Specify the label condition',
          link: '/en/metrics/14.指定Label条件.md',
        },
        {
          text: 'Aggregate calculation',
          link: '/en/metrics/15.聚合计算.md',
        },
        {
          text: 'Aggregate calculation',
          link: '/en/metrics/15.聚合计算.md',
        },
      ],
    },
    {
      text: 'Advanced configuration items',
      items: [
        {
          text: 'Configure concurrent queries',
          link: '/en/metrics/26.配置并发查询.md',
        },
        {
          text: 'Configure the global cache',
          link: '/en/metrics/27.配置全局缓存.md',
        },
        {
          text: 'Configure downsampling',
          link: '/en/metrics/28.配置降采样.md',
        },
        {
          text: 'Configure the RemoteWrite filter',
          link: '/en/metrics/29.配置数据过滤条件.md',
        },
      ],
    },
    {
      text: 'Dashboard chart related',
      items: [
        {
          text: 'Save chart to dashboard',
          link: '/en/metrics/22.创建仪表盘.md',
        },
        {
          text: 'Create a time series chart',
          link: '/en/metrics/23.新建时序图表.md',
        },
        {
          text: 'Add PromQL variable replacement',
          link: '/en/metrics/24.添加变量替换.md',
        },
        {
          text: 'Add a time series filter',
          link: '/en/metrics/25.添加时序过滤器.md',
        },
      ],
    },
    {
      text: 'Create an alert policy for a Metricstore',
      items: [
        {
          text: 'Create an alert on the time series query page',
          link: '/en/metrics/21.在时序查询界面创建告警.md',
        },
        {
          text: 'Downtime alert',
          link: '/en/metrics/16.宕机告警.md',
        },
        {
          text: 'Downtime alert more than 8GB',
          link: '/en/metrics/17.内存告警.md',
        },
        {
          text: 'CPU alert',
          link: '/en/metrics/18.cpu告警.md',
        },
        {
          text: 'Too many coroutine number alert',
          link: '/en/metrics/19.协程数量告警.md',
        },
        {
          text: 'Overlong GC duration alert',
          link: '/en/metrics/20.GC过长告警.md',
        },
      ],
    },
    {
      text: 'Example of PromQL Function Usage',
      items: [
        {
          text: 'abs()',
          link: '/en/metrics/30.abs().md',
        },
        {
          text: 'changes()',
          link: '/en/metrics/31.changes().md',
        },
        {
          text: 'absent()',
          link: '/en/metrics/32.absent().md',
        },
        {
          text: 'absent_over_time()',
          link: '/en/metrics/33.absent_over_time().md',
        },
        {
          text: 'ceil()',
          link: '/en/metrics/34.ceil().md',
        },
        {
          text: 'clamp()',
          link: '/en/metrics/35.clamp().md',
        },
        {
          text: 'clamp_max()',
          link: '/en/metrics/36.clamp_max().md',
        },
        {
          text: 'clamp_min()',
          link: '/en/metrics/37.clamp_min().md',
        },
        {
          text: 'day_of_month()',
          link: '/en/metrics/38.day_of_month().md',
        },
        {
          text: 'day_of_week()',
          link: '/en/metrics/38.day_of_week().md',
        },
        {
          text: 'day_of_year()',
          link: '/en/metrics/38.day_of_year().md',
        },
        {
          text: 'delta()',
          link: '/en/metrics/39.delta().md',
        },
        {
          text: 'deriv()',
          link: '/en/metrics/40.deriv().md',
        },
        {
          text: 'exp()',
          link: '/en/metrics/41.exp().md',
        },
        {
          text: 'floor()',
          link: '/en/metrics/42.floor().md',
        },
        {
          text: 'holt_winters()',
          link: '/en/metrics/43.holt_winters().md',
        },
        {
          text: 'rate()',
          link: '/en/metrics/44.rate().md',
        },
        {
          text: 'idelta()',
          link: '/en/metrics/45.idelta().md',
        },
        {
          text: 'increase()',
          link: '/en/metrics/46.increase().md',
        },
        {
          text: 'irate()',
          link: '/en/metrics/47.irate().md',
        },
        {
          text: 'hour()',
          link: '/en/metrics/48.hour().md',
        },
        {
          text: 'minute()',
          link: '/en/metrics/48.minute().md',
        },
        {
          text: 'month()',
          link: '/en/metrics/48.month().md',
        },
        {
          text: 'resets()',
          link: '/en/metrics/49.resets().md',
        },
        {
          text: 'round()',
          link: '/en/metrics/50.round().md',
        },
      ],
    },
  ]
}

module.exports = getSidebar
