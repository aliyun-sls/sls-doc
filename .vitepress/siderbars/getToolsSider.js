function getSidebar() {
  return [
    {
      text: '常用工具',
      items: [
        { text: '常用工具集合', link: '/tools/index' },
        { text: '同步索引配置', link: '/tools/syncIndexConfig.md' },
        { text: '同步定时 SQL', link: '/tools/syncScheduleSql.md' },
      ],
    },
  ]
}

module.exports = getSidebar
