const getStaropsBenchmarkItems = require('./staropsBenchmarkItems')

function getSidebar() {
  return [
    {
      text: '开始上手',
      collapsed: true,
      items: [
        { text: '与 STAROps 有效对话', link: '/starops/onboarding/effective-prompts/article' },
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
        { text: 'RDS 脚本巡检与动态追因', link: '/starops/practices/rds-inspection-via-script/article' },
      ],
    },
    {
      text: '场景能力',
      collapsed: true,
      items: [
        { text: '告警 RCA：用 Skill 固化历史 Runbook', link: '/starops/practices/alert-rca-flow/article' },
        { text: '自定义容量风险巡检设计最佳实践', link: '/starops/practices/capacity-risk-prediction/article' },
        { text: '业务服务可靠性巡检', link: '/starops/practices/business-reliability-flow/article' },
        { text: '日志模式定时巡检', link: '/starops/practices/log-insight-pattern/article' },
      ],
    },
    {
      text: 'DevOps 闭环',
      collapsed: true,
      items: [
        { text: 'DevOps 跨域追因建模', link: '/starops/practices/devops-code-to-runtime/article' },
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
        { text: '集成钉钉 IM 通道', link: '/starops/practices/dingtalk-integration/article' },
        { text: 'MCP 能力扩展与工具治理', link: '/starops/practices/mcp-integration/article' },
      ],
    },
  ]
}

module.exports = getSidebar
