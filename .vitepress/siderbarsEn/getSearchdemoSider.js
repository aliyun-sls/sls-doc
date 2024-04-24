function getSidebar() {
  return [
    {
      text: 'Cheatsheet',
      items: [
        { text: 'Search statement', link: '/en/searchdemo/query/search_with_index' },
        { text: 'Search using SPL', link: '/en/searchdemo/query/search_with_spl' },
      ],
    },
    {
      text: 'Scenario Cases',
      items: [
      ],
    },
    {
      text: 'Query logs in the console',
      items: [
        { text: 'Implementing Context Query through Scan Search', link: '/en/searchdemo/sdk/search_context_with_scan'},
      ],
    },
  ]
}

module.exports = getSidebar
