const fs = require('fs')
const path = require('path')
const tpls = require('./alert-template')
const { groupNames } = require('../.vitepress/siderbars/getAlertSider')

function isDirectory(file) {
  const stat = fs.statSync(file)
  return stat.isDirectory()
}

function deepCopy(data) {
  return JSON.parse(JSON.stringify(data))
}

function readAlertRule(file) {
  return fs.readFileSync(file, 'utf-8')
}

function cleanDstRoot(dstRoot) {
  fs.rmSync(dstRoot, { recursive: true, force: true })
}

function ensureDstGroup(dstRoot, group) {
  fs.mkdirSync(path.join(dstRoot, group), { recursive: true })
}

function transformAlert(config) {
  const { description, alert } = config
  Object.assign(alert.configuration, {
    sinkEventStore: {
      enabled: false,
      endpoint: '',
      project: '',
      eventStore: '',
      roleArn: ''
    },
    sinkCms: {
      enabled: false,
    },
    sinkAlerthub: {
      enabled: false,
    },
    policyConfiguration: {
      alertPolicyId: 'sls.builtin.dynamic',
      actionPolicyId: 'sls.builtin',
      repeatInterval: alert.schedule.interval,
      useDefault: false
    }
  })
  const tplVars = {
    alert,
    projectIsToken: alert.configuration.queryList[0].project === '{{default.project}}',
    storeIsToken: alert.configuration.queryList[0].store === '{{default.logstore}}'
  }

  const result = `
# ${alert.displayName}

::: tip 说明
- ${description}
- [告警SDK使用参考](https://help.aliyun.com/document_detail/387421.html)
- [告警规则数据结构参考](https://help.aliyun.com/document_detail/433029.htm)
:::

::: code-group

\`\`\`java [Java]
${tpls.java(deepCopy(tplVars)).trim()}
\`\`\`

\`\`\`python [Python]
${tpls.python(deepCopy(tplVars)).trim()}
\`\`\`

\`\`\`go [Go]
${tpls.go(deepCopy(tplVars)).trim()}
\`\`\`

:::
`
  return result.trim()
}

/**
 * Build single alert rule.
 */
function buildSingleRule(srcRoot, dstRoot, group, rule) {
  const basename = path.basename(rule, '.json')
  const srcFile = path.join(srcRoot, group, rule)
  const dstFile = path.join(dstRoot, group, `${basename}.md`)

  try {
    const data = fs.readFileSync(srcFile, 'utf8')
    const config = JSON.parse(data)
    const result = transformAlert(config)
    fs.writeFileSync(dstFile, result, 'utf8')
    return config
  } catch(err) {
    console.log(err)
    console.log(`Error: ${JSON.stringify({ srcRoot, group, rule })} ${err}`)
  }
}

/**
 * Generate src/alert/index.md
 */
function generateIndex(dstRoot, results) {
  const dst = path.join(dstRoot, 'index.md')  
  const toc = results.map(({ group, configs }) => {
    const groupName = groupNames[group] || group
    const rules = configs.map(c => `- [${c.alert.displayName}](./${group}/${c.alert.name})`)
    return [`## ${groupName}`, ...rules].join('\n')
  }).join('\n')
  const content = `
# 告警规则案例

${toc}
`.trim()

  fs.writeFileSync(dst, content, 'utf8')
}

/**
 * Build alert rules and index.
 */
function buildRules() {
  const srcRoot = path.resolve(__dirname, 'alert')
  const dstRoot = path.resolve(__dirname, '../src/alert')
  const results = []

  cleanDstRoot(dstRoot)

  const groups = fs.readdirSync(srcRoot).filter(group => isDirectory(path.join(srcRoot, group)))
  groups.forEach(group => {
    ensureDstGroup(dstRoot, group)

    const rules = fs.readdirSync(path.join(srcRoot, group))
    const configs = rules.map(rule => {
      return buildSingleRule(srcRoot, dstRoot, group, rule)
    })

    results.push({ group, configs })
  })

  generateIndex(dstRoot, results)
}

buildRules()