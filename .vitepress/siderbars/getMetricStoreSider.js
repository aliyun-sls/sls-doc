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
        ],
      },
      {
        text: '为时序库创建告警策略',
        items: [
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
    ]
  }
  
  module.exports = getSidebar
  