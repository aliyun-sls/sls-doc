function getSidebar() {
  return [
    {
      text: 'Overview of SQL Functions',
      items: [{ text: 'Function Overview', link: '/en/sqlfunction/home' }],
    },
    {
      text: 'SQL syntax',
      items: [
        {
          text: 'group by',
          link: '/en/sqlfunction/home#group-by语法',
        },
        {
          text: 'order by',
          link: '/en/sqlfunction/home#order-by语法',
        },
        {
          text: 'case when and if',
          link: '/en/sqlfunction/home#分支判断语法-case-when和if',
        },
        {
          text: 'having',
          link: '/en/sqlfunction/home#having语法',
        },
        {
          text: 'join',
          link: '/en/sqlfunction/home#join语法',
        },
        {
          text: 'Nested subquery',
          link: '/en/sqlfunction/home#嵌套子查询语法',
        },
        {
          text: 'unnest',
          link: '/en/sqlfunction/home#unnest语法',
        },
      ],
    },
    {
      text: 'SQL syntax',
      items: [
        {
          text: 'General comparison functions',
          link: '/en/sqlfunction/home#通用比较函数',
        },
        {
          text: 'General aggregate functions',
          link: '/en/sqlfunction/home#通用聚合函数',
        },
        {
          text: 'Date and time functions',
          link: '/en/sqlfunction/home#日期时间函数',
        },
        {
          text: 'String functions',
          link: '/en/sqlfunction/home#字符串函数',
        },
        {
          text: 'JSON functions',
          link: '/en/sqlfunction/home#JSON函数',
        },
        {
          text: 'Array functions',
          link: '/en/sqlfunction/home#数组函数',
        },
        {
          text: 'Map functions',
          link: '/en/sqlfunction/home#Map映射函数',
        },
        {
          text: 'Regular expression functions',
          link: '/en/sqlfunction/home#正则式函数',
        },
        {
          text: 'URL函URL functions数',
          link: '/en/sqlfunction/home#url函数',
        },
        {
          text: 'Mathematical calculation functions',
          link: '/en/sqlfunction/home#数学计算函数',
        },
        {
          text: 'Approximate functions',
          link: '/en/sqlfunction/home#估算函数',
        },
        {
          text: 'Interval-valued comparison functions and periodicity-valued comparison functions',
          link: '/en/sqlfunction/home#同比环比函数',
        },
        {
          text: 'Window functions',
          link: '/en/sqlfunction/home#窗口函数',
        },
        {
          text: 'Bitwise functions',
          link: '/en/sqlfunction/home#位运算函数',
        },
        {
          text: 'Geospatial functions',
          link: '/en/sqlfunction/home#空间几何函数',
        },
        {
          text: 'IP geolocation functions',
          link: '/en/sqlfunction/home#IP地理位置函数',
        },
        {
          text: 'Security check functions',
          link: '/en/sqlfunction/home#安全检测函数',
        },
        {
          text: 'Mobile number functions',
          link: '/en/sqlfunction/home#电话号码函数',
        },
        {
          text: 'Time series clustering functions',
          link: '/en/sqlfunction/home#时序聚类函数',
        },
        {
          text: 'Time series clustering functions',
          link: '/en/sqlfunction/home#相关性分析函数',
        },
        {
          text: 'Smooth functions',
          link: '/en/sqlfunction/home#平滑函数',
        },
      ],
    },
  ]
}

module.exports = getSidebar
