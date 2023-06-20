function getSidebar() {
  return [
    {
      text: 'CloudLen 案例',
      items: [
        { text: '案例总览', link: '/cloudlen/' },
        { text: '使用 CloudLens 对负载均衡进行全面观测', link: '/cloudlen/slb.md' },
      ],
    },
  ]
}

module.exports = getSidebar
