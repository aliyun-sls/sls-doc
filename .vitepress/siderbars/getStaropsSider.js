const getStaropsBenchmarkItems = require('./staropsBenchmarkItems')

function getSidebar() {
  return [
    {
      text: '开始上手',
      collapsed: true,
      items: [
        { text: '与 STAROps 有效对话', link: '/starops/onboarding/effective-prompts/article' },
        { text: '从连接数据到完成一次诊断', link: '/starops/practices/from-connection-to-diagnosis/article' },
      ],
    },
    {
      text: '基准评测',
      collapsed: true,
      items: getStaropsBenchmarkItems(),
    },
    {
      text: '进阶必备',
      collapsed: true,
      items: [
        { text: '如何提升巡检稳定性，同时支持异常后的动态追因', link: '/starops/practices/rds-inspection-via-script/article' },
        { text: 'MySQL 只读性能诊断', link: '/starops/practices/mysql-readonly-diagnosis/article' },
      ],
    },
    {
      text: '场景能力',
      collapsed: true,
      items: [
        { text: '告警 RCA 多分支诊断最佳实践', link: '/starops/practices/alert-rca-flow/article' },
        { text: '自定义容量风险巡检设计最佳实践', link: '/starops/practices/capacity-risk-prediction/article' },
        { text: '从一次深度评估到持续守住业务基线', link: '/starops/practices/business-reliability-flow/article' },
        { text: 'STAROps 日志智能巡检实践', link: '/starops/practices/log-insight-pattern/article' },
        { text: '用 STAROps 串起云拨测闭环', link: '/starops/practices/synthetics-closed-loop/article' },
        { text: '多云产品融合巡检最佳实践', link: '/starops/practices/cross-product-inspection-summary/article' },
        { text: '账单与成本分析最佳实践', link: '/starops/practices/billing-cost-analysis/article' },
      ],
    },
    {
      text: 'DevOps 闭环',
      collapsed: true,
      items: [
        { text: '从运行异常追到代码变更', link: '/starops/practices/devops-code-to-runtime/article' },
        { text: '把应用异常追到本地代码与配置', link: '/starops/practices/local-code-root-cause/article' },
        { text: '一个 Agent 入口完成 DevOps 闭环', link: '/starops/practices/coding-agent-devops-loop/article' },
      ],
    },
    {
      text: '持续优化',
      collapsed: true,
      items: [
        { text: '编写 STAROps 运维 Skill', link: '/starops/practices/skill-authoring/article' },
        { text: '编写 Skill 确定性脚本', link: '/starops/practices/skill-script-deterministic/article' },
      ],
    },
    {
      text: '集成扩展',
      collapsed: true,
      items: [
        { text: '把数字员工接进 IM 协作工具', link: '/starops/practices/im-integration/article' },
        { text: '把团队自己的系统接进 STAROps', link: '/starops/practices/mcp-integration/article' },
        { text: '跨账号统一建模与问题排查', link: '/starops/practices/cross-account-access/article' },
      ],
    },
  ]
}

module.exports = getSidebar
