const fs = require('fs')
const path = require('path')
const tpls = require('./alert-template')

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
  const alert = {
    ...config,
    configuration: {
      ...config.configuration,
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
        repeatInterval: config.schedule.interval,
        useDefault: false
      }
    }
  }
  const tplVars = {
    alert,
    projectIsToken: alert.configuration.queryList[0].project === '{{default.project}}',
    storeIsToken: alert.configuration.queryList[0].store === '{{default.logstore}}'
  }

  const result = `
# ${alert.displayName}

## Java

\`\`\`java
${tpls.java(deepCopy(tplVars)).trim()}
\`\`\`

## Python
\`\`\`python
${tpls.python(deepCopy(tplVars)).trim()}
\`\`\`

## Go
\`\`\`go
${tpls.go(deepCopy(tplVars)).trim()}
\`\`\`
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
  } catch(err) {
    console.log(`Error: ${JSON.stringify({ srcRoot, group, rule })} ${err}`)
  }
}

/**
 * Generate src/alert/index.md
 */
function generateIndex(srcRoot, dstRoot) {
  const src = path.join(srcRoot, 'index.md')
  const dst = path.join(dstRoot, 'index.md')
  fs.copyFileSync(src, dst)
}

/**
 * Build alert rules and index.
 */
function buildRules() {
  const srcRoot = path.resolve(__dirname, 'alert')
  const dstRoot = path.resolve(__dirname, '../src/alert')

  cleanDstRoot(dstRoot)

  const groups = fs.readdirSync(srcRoot).filter(group => isDirectory(path.join(srcRoot, group)))
  groups.forEach(group => {
    ensureDstGroup(dstRoot, group)
    const rules = fs.readdirSync(path.join(srcRoot, group))
    rules.forEach(rule => {
      buildSingleRule(srcRoot, dstRoot, group, rule)
    })
  })

  generateIndex(srcRoot, dstRoot)
}

buildRules()