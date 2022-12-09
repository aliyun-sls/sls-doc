function getSidebar() {
  return [
    {
      text: 'Cheatsheet',
      items: [
        { text: '索引搜索', link: '/searchdemo/query/search_with_index' },
        { text: 'Scan 搜索', link: '/searchdemo/query/search_with_scan' },
      ],
    },
    {
      text: '场景案例',
      items: [
      ],
    },
    {
      text: '编程访问',
      items: [
        { text: '通过 Scan 搜索实现上下文查询', link: '/searchdemo/sdk/search_context_with_scan'},
      ],
    },
  ]
}

module.exports = getSidebar
