function getSidebar() {
  return [
    {
      text: '案例总览',
      items: [{ text: '案例总览', link: '/intelligentom/' }],
    },
    {
      text: '智能运维快速介绍',
      items: [
        { text: '全栈监控快速介绍', link: '/intelligentom/fullmonitorintro.md' },
        { text: '全栈可观测快速介绍', link: '/intelligentom/fullstackintro.md' },
        { text: 'Trace 服务快速介绍', link: '/intelligentom/traceintro.md' },
        { text: '智能异常分析介绍', link: '/intelligentom/anomalyanalysisintro.md' },
      ],
    },
  ]
}

module.exports = getSidebar
