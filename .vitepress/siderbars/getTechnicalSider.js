function getSidebar() {
    return [
      {
        text: '',
        items: [
          { text: '技术分享', link: '/technical/' },
          { text: 'Kubernetes日志落盘及SLS日志采集实践', link: '/technical/Kubernetes日志落盘及SLS日志采集实践.md' },
          { text: '可观测搭建最佳实践', link: '/technical/可观测搭建最佳实践.md' },
          { text: '阿里LogScan的设计与实践', link: '/technical/阿里LogScan的设计与实践.md' },
          { text: '2022可观测领域的10大要点和趋势', link: '/technical/2022可观测领域的10大要点和趋势.md' },
          { text: '丝滑的日志接入体验 -- Datadog Log Management调研', link: '/technical/丝滑的日志接入体验.md' },
          { text: 'DevOps下可观测数据质量建设最佳实践（Tid2022）', link: '/technical/DevOps下可观测数据质量建设最佳实践.md' },
          { text: '现代化自建监控告警平台搭建决策实践（GNSEC2022）', link: '/technical/现代化自建监控告警平台搭建决策实践.md' },
          { text: 'OpenTelemetry在阿里云的应用实践', link: '/technical/OpenTelemetry在阿里云的应用实践' },
          
        ],
      },
    ]
  }
  
  module.exports = getSidebar