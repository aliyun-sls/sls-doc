function getCnNavs() {
  const base = [
    {
      text: '案例中心',
      activeMatch: `^/(sqldemo|sqlfunction|sqlerror|searchdemo|metrics|visulization|dataprocessdemo|oscompatibledemo|spldataprocessdemo)/`,
      items: [
        {
          items: [
            { text: 'SQL分析案例', link: '/sqldemo/home' },
            { text: 'SPL数据处理案例', link: '/spldataprocessdemo/home' },
            { text: 'SQL函数案例', link: '/sqlfunction/home' },
            { text: 'SQL错误中心', link: '/sqlerror/home' },
            { text: '定时SQL案例', link: '/scheduledsql/home' },
            { text: '查询案例', link: '/searchdemo/query/search_with_index' },
            { text: '时序库查询案例', link: '/metrics/home' },
            { text: '可视化案例', link: '/visulization/home' },
            { text: '数据采集案例', link: '/dataaccess/home' },
            { text: '加工案例', link: '/dataprocessdemo/home' },
            { text: '开源兼容', link: '/oscompatibledemo/home' },
            { text: '告警规则案例', link: '/alert/home' },
            { text: 'CloudLen案例', link: '/cloudlen/home' },
            { text: '智能运维案例', link: '/intelligentom/home' },
            { text: '审计与安全案例', link: '/billandsecurity/home' },
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
      link: 'https://help.aliyun.com/zh/sls/product-overview/release-notes',
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
          text: 'Playground',
          items: [
            {
              text: '日志服务 Playground',
              link: 'https://sls.aliyun.com/doc/playground/demo.html',
            },
            {
              text: 'ARMS Playground',
              link: 'https://sls.aliyun.com/doc/playground/armsdemo.html',
            },
          ],
        },
        {
          text: '控制台',
          items: [
            {
              text: '日志服务',
              link: 'https://sls.console.aliyun.com/',
            },
            {
              text: 'ARMS',
              link: 'https://arms.console.aliyun.com/',
            },
            {
              text: '云监控',
              link: 'https://cloudmonitornext.console.aliyun.com/',
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

function getEnNavs() {
    const base = [
    {
      text: '案例中心',
      activeMatch: `^/(sqldemo|sqlfunction|sqlerror|searchdemo|metrics|visulization|dataprocessdemo|oscompatibledemo|spldataprocessdemo)/`,
      items: [
        {
          items: [
            { text: 'SQL分析案例', link: '/en/sqldemo/home' },
            { text: 'SPL数据处理案例', link: '/en/spldataprocessdemo/home' },
            { text: 'SQL函数案例', link: '/en/sqlfunction/home' },
            { text: 'SQL错误中心', link: '/en/sqlerror/home' },
            { text: '定时SQL案例', link: '/en/scheduledsql/home' },
            { text: '查询案例', link: '/en/searchdemo/query/search_with_index' },
            { text: '时序库查询案例', link: '/en/metrics/home'},
            // { text: '可视化案例', link: '/en/visulization/home' },
            { text: '数据采集案例', link: '/en/dataaccess/home' },
            { text: '加工案例', link: '/en/dataprocessdemo/home' },
            { text: '开源兼容', link: '/en/oscompatibledemo/home' },
            { text: '告警规则案例', link: '/en/alert/home' },
            { text: 'CloudLen案例', link: '/en/cloudlen/home' },
            { text: '智能运维案例', link: '/en/intelligentom/home' },
            { text: '审计与安全案例', link: '/en/billandsecurity/home' },
          ],
        },
      ],
    },
    {
      text: '常用工具',
      activeMatch: `^/en/(tools)/`,
      items: [
        {
          items: [
            {
              text: '同步索引配置',
              link: '/en/tools/syncIndexConfig',
            },
            {
              text: '同步定时 SQL',
              link: '/en/tools/syncScheduleSql',
            },
            {
              text: '批量更新定时 SQL',
              link: '/en/tools/updateScheduleSqlConfig',
            },
          ],
        },
      ],
    },
 

  ]



  return base
}

exports.getCnNavs = getCnNavs
exports.getEnNavs = getEnNavs
