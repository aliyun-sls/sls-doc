function getSidebar() {
  return [
    {
      text: 'CloudLen 案例',
      items: [
        { text: '案例总览', link: '/cloudlen/' },
        { text: '使用 CloudLens 对负载均衡进行全面观测', link: '/cloudlen/slb.md' },
        { text: '使用CloudLens for SLS监控Project资源配额最佳实践', link: '/cloudlen/slsquota.md' },
        { text: '使用CloudLens for OSS构建服务端性能指标可观测实践', link: '/cloudlen/ossaccess.md' },
        { text: '基于RDS lens的日志采集和应用', link: '/cloudlen/rds.md' },
      ],
    },
  ]
}

module.exports = getSidebar
