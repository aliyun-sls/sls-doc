function getNavs() {
  const base = [
    {
      text: '案例中心',
      activeMatch: `^/(sqldemo|sqlfunction|sqlerror|searchdemo|metrics|visulization|dataprocessdemo|oscompatibledemo|spldataprocessdemo)/`,
      items: [
        {
          items: [
            { text: 'SQL分析案例', link: '/sqldemo/index' },
            { text: 'SPL数据处理案例', link: '/spldataprocessdemo/index' },
            { text: 'SQL函数案例', link: '/sqlfunction/index' },
            { text: 'SQL错误中心', link: '/sqlerror/index' },
            { text: '定时SQL案例', link: '/scheduledsql/index' },
            { text: '查询案例', link: '/searchdemo/query/search_with_index' },
            { text: '时序库查询案例', link: '/metrics/index'},
            { text: '可视化案例', link: '/visulization/index' },
            { text: '数据采集案例', link: '/dataaccess/index' },
            { text: '加工案例', link: '/dataprocessdemo/index' },
            { text: '开源兼容', link: '/oscompatibledemo/index' },
            { text: '告警规则案例', link: '/alert/index' },
            { text: 'CloudLen案例', link: '/cloudlen/index' },
            { text: '智能运维案例', link: '/intelligentom/index' },
            { text: '审计与安全案例', link: '/billandsecurity/index' },
          ],
        },
      ],
    },
    {
      text: '常用工具',
      activeMatch: `^/(tools)/`,
      items: [
        {
          items: [
            {
              text: '同步索引配置',
              link: '/tools/syncIndexConfig',
            },
            {
              text: '同步定时 SQL',
              link: '/tools/syncScheduleSql',
            },
            {
              text: '批量更新定时 SQL',
              link: '/tools/updateScheduleSqlConfig',
            },
          ],
        },
      ],
    },
    {
      text: '产品动态',
      link: '/product/',
    },
    {
      text: '招聘',
      activeMatch: `^/(jobs)/`,
      items: [
        {
          items: [
            {
              text: '可视化研发工程师',
              link: '/jobs/front',
            },
            {
              text: '2025春招实习',
              link: '/jobs/2025intern',
            },
          ],
        },
      ],
    },
    {
      text: '链接',
      items: [
        {
          items: [
            {
              text: '控制台 Playground',
              link: 'https://sls.aliyun.com/doc/playground/demo.html',
            },
            {
              text: '日志服务控制台',
              link: 'https://sls.console.aliyun.com/',
            },
          ],
        },
        {
          text: '其他链接',
          items: [
            {
              text: '日志服务文档',
              link: 'https://help.aliyun.com/document_detail/48869.html',
            },
          ],
        },
      ],
    },
  ]

  base.push({
    text: '如何贡献',
    activeMatch: `^/(dev)/`,
    items: [
      {
        items: [
          { text: '环境准备', link: '/dev/env' },
          { text: '文档样例', link: '/dev/' },
        ],
      },
    ],
  })

  return base
}

module.exports = getNavs
