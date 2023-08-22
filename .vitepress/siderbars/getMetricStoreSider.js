function getSidebar() {
    return [
      {
        text: 'PromQL基础使用案例',
        items: [
          {
            text: '按label筛选指标中的特定时间线',
            link: '/metrics/index#按label筛选指标中的特定时间线',
          },
          {
            text: '使用函数或聚合算子执行计算',
            link: '/metrics/index#使用函数或聚合算子执行计算',
          },
          {
            text: '二元计算',
            link: '/metrics/index#二元计算',
          },
          {
            text: '如何正确使用Subquery',
            link: '/metrics/index#如何正确使用Subquery',
          },
        ],
      },
      {
        text: '如何在时序库中使用SQL查询',
        items: [
          {
            text: '查询指标下的所有原始数据',
            link: '/metrics/index#查询指标下的所有原始数据',
          },
          {
            text: '查询指标中instance为特定值的原始数据',
            link: '/metrics/index#查询指标中instance为特定值的原始数据',
          },
          {
            text: '使用SQL对时序数据做聚合计算',
            link: '/metrics/index#使用SQL对时序数据做聚合计算',
          },
        ],
      },
      {
        text: '为时序库创建告警策略',
        items: [
          {
            text: '实例宕机',
            link: '/metrics/index#实例宕机',
          },
          {
            text: '实例的常驻内存大于8GB',
            link: '/metrics/index#实例的常驻内存大于8GB',
          },
          {
            text: 'CPU使用率过高',
            link: '/metrics/index#CPU使用率过高',
          },
          {
            text: 'Go进程中协程数量过多',
            link: '/metrics/index#Go进程中协程数量过多',
          },
          {
            text: 'Gc时间过长',
            link: '/metrics/index#Gc时间过长',
          },
        ],
      },
    ]
  }
  
  module.exports = getSidebar
  