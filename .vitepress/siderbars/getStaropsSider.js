const getStaropsBenchmarkItems = require('./staropsBenchmarkItems')

function getSidebar() {
  return [
    {
      text: '开始上手',
      collapsed: true,
      items: [
        { text: '从连接数据到完成一次诊断', link: '/starops/practices/01-start/from-connection-to-diagnosis/article' },
        { text: '与 STAROps 有效对话', link: '/starops/practices/01-start/effective-prompts/article' },
      ],
    },
    {
      text: '基准评测',
      collapsed: true,
      items: getStaropsBenchmarkItems(),
    },
    {
      text: '集成扩展',
      collapsed: true,
      items: [
        { text: '把自建 DevOps 系统接进 STAROps', link: '/starops/practices/02-integration/devops-system-integration/article' },
        { text: '使用环境代理排查内网应用及其依赖', link: '/starops/practices/02-integration/intranet-deep-investigation/article' },
        { text: '把应用异常追到本地代码与配置', link: '/starops/practices/02-integration/local-code-root-cause/article' },
        { text: '把数字员工接进 IM 协作工具', link: '/starops/practices/02-integration/im-integration/article' },
        { text: '跨账号统一建模与问题排查', link: '/starops/practices/02-integration/cross-account-access/article' },
      ],
    },
    {
      text: '进阶必备',
      collapsed: true,
      items: [
        { text: 'RDS 巡检与异常追因', link: '/starops/practices/03-keypoint/rds-inspection-via-script/article' },
        { text: 'MySQL 只读性能诊断', link: '/starops/practices/03-keypoint/mysql-readonly-diagnosis/article' },
        { text: 'ES 节点级巡检与异常追因', link: '/starops/practices/03-keypoint/es-inspection-diagnosis/article' },
      ],
    },
    {
      text: '场景能力',
      collapsed: true,
      items: [
        { text: '从一条失败率告警到多分支诊断', link: '/starops/practices/04-scenario/alert-rca-flow/article' },
        { text: '自定义容量风险巡检设计最佳实践', link: '/starops/practices/04-scenario/capacity-risk-prediction/article' },
        { text: '从一次深度评估到持续守住业务基线', link: '/starops/practices/04-scenario/business-reliability-flow/article' },
        { text: 'STAROps 日志智能巡检实践', link: '/starops/practices/04-scenario/log-insight-pattern/article' },
        { text: '云拨测 STAROps 创建与智能分析', link: '/starops/practices/04-scenario/synthetics-agent-analysis/article' },
        { text: '用 STAROps 串起云拨测闭环', link: '/starops/practices/04-scenario/synthetics-closed-loop/article' },
        { text: '账单与成本分析最佳实践', link: '/starops/practices/04-scenario/billing-cost-analysis/article' },
        { text: 'STAROps 助力云成本治理落地', link: '/starops/practices/04-scenario/finops-cost-governance/article' },
        { text: '多云产品融合巡检最佳实践', link: '/starops/practices/04-scenario/cross-product-inspection-summary/article' },
      ],
    },
    {
      text: 'DevOps 闭环',
      collapsed: true,
      items: [
        { text: '从运行异常追到代码变更', link: '/starops/practices/05-devops/devops-code-to-runtime/article' },
        { text: '一个 Agent 入口完成 DevOps 闭环', link: '/starops/practices/05-devops/coding-agent-devops-loop/article' },
      ],
    },
    {
      text: '持续优化',
      collapsed: true,
      items: [
        { text: '技能中心选型与场景包启用', link: '/starops/practices/06-loop/skill-center-selection/article' },
        { text: '编写 STAROps 运维 Skill', link: '/starops/practices/06-loop/skill-authoring/article' },
        { text: '编写 Skill 确定性脚本', link: '/starops/practices/06-loop/skill-script-deterministic/article' },
      ],
    },
  ]
}

module.exports = getSidebar