function getNavs() {
  const base = [
    {
      text: '案例',
      activeMatch: `^/(sqldemo)/`,
      items: [
        {
          items: [{ text: '查询分析案例', link: '/sqldemo/' }],
        },
      ],
    },
    {
      text: '开源社区',
      activeMatch: `^/(opensource)/`,
      items: [
        {
          items: [{ text: 'iLogtail', link: '/opensource/ilogtail/' }],
        },
      ],
    },
    {
      text: '文档',
      activeMatch: `^/(sqlfun)/`,
      items: [
        {
          items: [
            { text: 'SQL函数', link: '/sqlfun/' },
            // { text: "SQL语法", link: "/xx/xx" },
          ],
        },
      ],
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

  if (process.env.NODE_ENV !== 'production') {
    base.push({
      text: '开发',
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
  }

  return base
}

module.exports = getNavs
