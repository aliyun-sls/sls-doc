const getSidebar = require('../.vitepress/siderbars/getVisulizationSider')

function convertToMultiLevelMarkdownTable(data) {
  let markdown = ''

  data.forEach((category) => {
    markdown += `## ${category.text}\n\n`
    markdown += '| 案例名称 | 描述 |\n| --- | --- |\n'

    category.items.forEach((item) => {
      const name = `[${item.text}](${item.link.replace('.md', '')})`
      const description = item.description || item.text // 这里应该是每个案例的描述
      markdown += `| ${name} | ${description} |\n`
    })

    markdown += '\n\n'
  })

  return markdown
}

const data = getSidebar()

console.log(convertToMultiLevelMarkdownTable(data.slice(1)))
