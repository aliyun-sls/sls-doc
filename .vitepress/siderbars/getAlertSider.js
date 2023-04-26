const fs = require('fs')
const path = require('path')

const groupNames = {
  etl: '数据加工'
}

module.exports = function() {
  const baseDir = './src/alert'
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