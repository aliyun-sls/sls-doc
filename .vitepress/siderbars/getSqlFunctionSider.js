function getSidebar() {
  return [
    {
      text: 'SQL函数概述',
      items: [{ text: '函数总览', link: '/sqlfunction/index' }],
    },
    {
      text: 'SQL语法',
      items: [
        {
          text: 'group by语法',
          link: '/sqlfunction/group by语法',
        },
        {
          text: 'order by语法',
          link: '/sqlfunction/order by语法',
        },
        {
          text: '分支判断语法（case when和if）',
          link: '/sqlfunction/分支判断语法（case when和if）',
        },
        {
          text: 'having 语法',
          link: '/sqlfunction/having 语法',
        },
        {
          text: 'join语法',
          link: '/sqlfunction/join语法',
        },
        {
          text: '嵌套子查询语法',
          link: '/sqlfunction/嵌套子查询语法',
        },
        {
          text: 'unnest语法',
          link: '/sqlfunction/unnest语法',
        },
      ],
    },
    {
      text: 'SQL函数',
      items: [
        {
          text: '通用比较函数',
          link: '/sqlfunction/通用比较函数',
        },
        {
          text: '通用聚合函数',
          link: '/sqlfunction/通用聚合函数',
        },
        {
          text: '日期时间函数',
          link: '/sqlfunction/日期时间函数',
        },
        {
          text: '字符串函数',
          link: '/sqlfunction/字符串函数',
        },
        {
          text: 'JSON函数',
          link: '/sqlfunction/JSON函数',
        },
        {
          text: '数组函数',
          link: '/sqlfunction/数组函数',
        },
        {
          text: 'Map映射函数',
          link: '/sqlfunction/Map映射函数',
        },
        {
          text: '正则式函数',
          link: '/sqlfunction/正则式函数',
        },
        {
          text: 'URL函数',
          link: '/sqlfunction/URL函数',
        },
        {
          text: '数学计算函数',
          link: '/sqlfunction/数学计算函数',
        },
        {
          text: '估算函数',
          link: '/sqlfunction/估算函数',
        },
        {
          text: '同比环比函数',
          link: '/sqlfunction/同比环比函数',
        },
        {
          text: '窗口函数',
          link: '/sqlfunction/窗口函数',
        },
        {
          text: '位运算函数',
          link: '/sqlfunction/位运算函数',
        },
        {
          text: '空间几何函数',
          link: '/sqlfunction/空间几何函数',
        },
        {
          text: 'IP地理位置函数',
          link: '/sqlfunction/IP地理位置函数',
        },
        {
          text: '安全检测函数',
          link: '/sqlfunction/安全检测函数',
        },
        {
          text: '电话号码函数',
          link: '/sqlfunction/电话号码函数',
        },
        {
          text: '时序聚类函数',
          link: '/sqlfunction/时序聚类函数',
        },
        {
          text: '相关性分析函数',
          link: '/sqlfunction/相关性分析函数',
        },
        {
          text: '平滑函数',
          link: '/sqlfunction/平滑函数',
        },
      ],
    },
  ]
}

module.exports = getSidebar
