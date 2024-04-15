function getSidebar() {
  return [
    {
      text: '为时序库创建告警策略',
      items: [
        {
          text: 'PromQL基础使用案例',
          link: '/metrics/index#PromQL基础使用案例',
        },
        {
          text: '如何在时序库中使用SQL查询',
          link: '/metrics/index#如何在时序库中使用SQL查询',
        },
        {
          text: '为时序库创建告警策略',
          link: '/metrics/index#为时序库创建告警策略',
        },
      ],
    },
    {
      text: 'PromQL基础使用案例',
      items: [
        {
          text: '查看单指标数据',
          link: '/metrics/1.指标查询.md',
        },
        {
          text: '按Label筛选指标数据',
          link: '/metrics/2.Label筛选.md',
        },
        {
          text: 'Label筛选使用正则匹配',
          link: '/metrics/3.Label筛选使用正则匹配.md',
        },
        {
          text: '计算某指标各时间点最大值',
          link: '/metrics/4.指标最大值.md',
        },
        {
          text: '计算某指标时间线个数',
          link: '/metrics/5.时间线个数.md',
        },
        {
          text: '计算指标随时间的变化率',
          link: '/metrics/6.计算变化率.md',
        },
        {
          text: '计算指标相较前n分钟的差值',
          link: '/metrics/7.计算差值.md',
        },
        {
          text: '多算子、函数嵌套使用',
          link: '/metrics/8.多函数嵌套使用.md',
        },
        {
          text: '多数值间计算',
          link: '/metrics/9.多数值间计算.md',
        },
        {
          text: '指标与数值间计算',
          link: '/metrics/10.指标与数值间计算.md',
        },
        {
          text: '多指标间二元计算',
          link: '/metrics/11.多指标间计算.md',
        },
        {
          text: '如何正确使用Subquery',
          link: '/metrics/12.Subquery.md',
        },
      ],
    },
    {
      text: '如何在时序库中使用SQL查询',
      items: [
        {
          text: '查询指标下的所有原始数据',
          link: '/metrics/13.查询所有数据.md',
        },
        {
          text: '查询指标中instance为特定值的原始数据',
          link: '/metrics/14.指定Label条件.md',
        },
        {
          text: '使用SQL对时序数据做聚合计算',
          link: '/metrics/15.聚合计算.md',
        },
        {
          text: '创建定时SQL任务',
          link: '/metrics/15.聚合计算.md',
        },
      ],
    },
    {
      text: '高级配置项',
      items: [
        {
          text: '配置并发查询',
          link: '/metrics/26.配置并发查询.md',
        },
        {
          text: '配置全局缓存',
          link: '/metrics/27.配置全局缓存.md',
        },
        {
          text: '配置降采样',
          link: '/metrics/28.配置降采样.md',
        },
        {
          text: '配置RemoteWrite过滤条件',
          link: '/metrics/29.配置数据过滤条件.md',
        },
      ],
    },
    {
      text: '仪表盘图表相关',
      items: [
        {
          text: '保存图表到仪表盘',
          link: '/metrics/22.创建仪表盘.md',
        },
        {
          text: '添加时序图表',
          link: '/metrics/23.新建时序图表.md',
        },
        {
          text: '为PromQL添加变量替换',
          link: '/metrics/24.添加变量替换.md',
        },
        {
          text: '添加时序过滤器',
          link: '/metrics/25.添加时序过滤器.md',
        },
      ],
    },
    {
      text: '为时序库创建告警策略',
      items: [
        {
          text: '在时序查询界面创建告警',
          link: '/metrics/21.在时序查询界面创建告警.md',
        },
        {
          text: '实例宕机',
          link: '/metrics/16.宕机告警.md',
        },
        {
          text: '实例的常驻内存大于8GB',
          link: '/metrics/17.内存告警.md',
        },
        {
          text: 'CPU使用率过高',
          link: '/metrics/18.cpu告警.md',
        },
        {
          text: 'Go进程中协程数量过多',
          link: '/metrics/19.协程数量告警.md',
        },
        {
          text: 'Gc时间过长',
          link: '/metrics/20.GC过长告警.md',
        },
      ],
    },
    {
      text: 'PromQL函数使用示例',
      items: [
        {
          text: 'abs()',
          link: '/metrics/30.abs().md',
        },
        {
          text: 'changes()',
          link: '/metrics/31.changes().md',
        },
        {
          text: 'absent()',
          link: '/metrics/32.absent().md',
        },
        {
          text: 'absent_over_time()',
          link: '/metrics/33.absent_over_time().md',
        },
        {
          text: 'ceil()',
          link: '/metrics/34.ceil().md',
        },
        {
          text: 'clamp()',
          link: '/metrics/35.clamp().md',
        },
        {
          text: 'clamp_max()',
          link: '/metrics/36.clamp_max().md',
        },
        {
          text: 'clamp_min()',
          link: '/metrics/37.clamp_min().md',
        },
        {
          text: 'day_of_month()',
          link: '/metrics/38.day_of_month().md',
        },
        {
          text: 'day_of_week()',
          link: '/metrics/38.day_of_week().md',
        },
        {
          text: 'day_of_year()',
          link: '/metrics/38.day_of_year().md',
        },
        {
          text: 'delta()',
          link: '/metrics/39.delta().md',
        },
        {
          text: 'deriv()',
          link: '/metrics/40.deriv().md',
        },
        {
          text: 'exp()',
          link: '/metrics/41.exp().md',
        },
        {
          text: 'floor()',
          link: '/metrics/42.floor().md',
        },
        {
          text: 'holt_winters()',
          link: '/metrics/43.holt_winters().md',
        },
        {
          text: 'rate()',
          link: '/metrics/44.rate().md',
        },
        {
          text: 'idelta()',
          link: '/metrics/45.idelta().md',
        },
        {
          text: 'increase()',
          link: '/metrics/46.increase().md',
        },
        {
          text: 'irate()',
          link: '/metrics/47.irate().md',
        },
        {
          text: 'hour()',
          link: '/metrics/48.hour().md',
        },
        {
          text: 'minute()',
          link: '/metrics/48.minute().md',
        },
        {
          text: 'month()',
          link: '/metrics/48.month().md',
        },
        {
          text: 'resets()',
          link: '/metrics/49.resets().md',
        },
        {
          text: 'round()',
          link: '/metrics/50.round().md',
        },
      ],
    },
  ]
}

module.exports = getSidebar
