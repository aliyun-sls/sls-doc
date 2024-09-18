function getSidebar() {
  return [
    {
      text: 'ARMS 用户体验监控',
      items: [
        { text: '案例总览', link: '/arms/user/home.md' },
        { text: '定位某用户产品使用报错', link: '/arms/user/locateUsageException.md' },
        { text: '定位 App 页面打开缓慢', link: '/arms/user/locateAppPagePerformance.md' },
        { text: '快速统计因故障造成用户影响面', link: '/arms/user/analyzeImpect.md' },
        { text: '统计活动点击次数', link: '/arms/user/countingClick.md' },
        { text: '快速定位白屏还原用户操作路径', link: '/arms/user/analyzePageBlank.md' },
      ],
    },
  ]
}

module.exports = getSidebar
