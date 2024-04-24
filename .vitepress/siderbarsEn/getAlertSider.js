const fs = require('fs')
const path = require('path')

const groupNames = {
  etl: 'Data Transformation',
  export: 'Data Shipping',
  logtail: 'Logtail',
  scheduled_sql: 'Scheduled SQL',
  ack: 'K8s Event Center',
  k8s_audit: 'K8s Audit Logs',
}

exports = module.exports = function() {
  const baseDir = './src/en/salert'
  const groups = fs.readdirSync(baseDir).filter(g => !g.endsWith('.md'))

  const toc = groups.map(group => {
    const groupDir = path.join(baseDir, group)
    const files = fs.readdirSync(groupDir).filter(f => f.endsWith('.md'))

    const items = files.map(f => {
      const link = `/alert/${group}/${path.basename(f, '.md')}`
      const data = fs.readFileSync(path.join(groupDir, f), 'utf8')
      const text = data.split('\n')[0].replace(/^#+\s+/, '')
      return { text, link }
    })

    return {
      text: groupNames[group] || group,
      collapsed: true,
      items
    }
  })

  return toc
}

exports.groupNames = groupNames
