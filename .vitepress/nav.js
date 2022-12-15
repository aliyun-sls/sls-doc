function getNavs() {
  const base = [
    {
      text: '案例中心',
      activeMatch: `^/(sqldemo|searchdemo)/`,
      items: [
        {
          items: [
            { text: '分析案例', link: '/sqldemo/' },
            { text: '查询案例', link: '/searchdemo/' },
            { text: '加工案例', link: '/dataprocessdemo/'},
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
