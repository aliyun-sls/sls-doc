function getSidebar() {
    return [
      {
        text: '',
        items: [
          { text: '产品动态', link: '/product/' },
          {
            text: 'SLS告警通知到Line',
            link: '/product/SLS告警通知到Line',
          },
          { text: '可视化更新介绍', link: '/product/SLS可视化更新-雷达图直方图.md' },
          { text: 'SLS使用Kafka协议上传日志', link: '/product/SLS使用Kafka协议上传日志.md' },
          { text: '基于ARMSRUM进行日志自定义分析', link: '/product/基于ARMSRUM进行日志自定义分析.md' },
          { text: '阿里SLS无侵入监控采集方案发布', link: '/product/阿里SLS无侵入监控采集方案发布.md' },
          { text: '数据预处理场景概述', link: '/product/数据预处理场景概述.md' },
          { text: '日志审计：开通RDS PostgreSQL日志采集', link: '/product/日志审计开通RDSPostgreSQL日志采集.md' },
          { text: '开箱即用：多集群下K8s日志集中审计升级', link: '/product/多集群下K8s日志集中审计升级.md' },
          { text: '使用CloudLens for SLS 对日志服务进行全面观测', link: '/product/使用CloudLensforSLS对日志服务进行全面观测.md' },
          { text: 'SLS可视化更新-饼图Pro、统计Pro、计量图Pro', link: '/product/SLS可视化更新饼图Pro统计Pro计量图Pro.md' },
        ],
      },
    ]
  }
  
  module.exports = getSidebar