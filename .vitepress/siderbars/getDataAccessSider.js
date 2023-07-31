function getSidebar() {
  return [
    {
      text: '数据采集案例',
      items: [
        { text: '案例总览', link: '/dataaccess/' },
        { text: '如何采集企业内网服务器日志', link: '/dataaccess/logtail1.md' },
      ],
    },
  ]
}

module.exports = getSidebar
