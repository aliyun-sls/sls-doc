function getSidebar() {
  return [
    {
      text: 'Common tools',
      items: [
        { text: 'Overview of common tools', link: '/en/tools/home' },
        { text: 'Synchronizes index configurations', link: '/en/tools/syncIndexConfig.md' },
        { text: 'Synchronizes a scheduled SQL task', link: '/en/tools/syncScheduleSql.md' },
        { text: 'Updates multiple scheduled SQL tasks', link: '/en/tools/updateScheduleSqlConfig.md' },
      ],
    },
  ]
}

module.exports = getSidebar
