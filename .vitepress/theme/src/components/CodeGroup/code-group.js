const { nanoid } = require('nanoid')
const container = require('markdown-it-container')

function extractLang(info) {
  return info
    .trim()
    .replace(/:(no-)?line-numbers({| |$).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
}

function extractTitle(info) {
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

function preWrapperPlugin(md) {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const { info } = args[0][args[1]]
    const lang = extractLang(info)
    const rawCode = fence(...args)
      .replace(/^.*<\/span><pre/, '<pre')
      .replace(/<\/div>$/m, '')
    return `<div class="language-${lang}${
      / active( |$)/.test(info) ? ' active' : ''
    }"><button title="Copy Code" class="copy"></button><span class="lang">${lang}</span>${rawCode}</div>`
  }
}

function createCodeGroup() {
  return [
    container,
    'code-group',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5)
          let tabs = ''
          let checked = 'checked="checked"'

          for (
            let i = idx + 1;
            !(
              tokens[i].nesting === -1 &&
              tokens[i].type === 'container_code-group_close'
            );
            ++i
          ) {
            if (tokens[i].type === 'fence' && tokens[i].tag === 'code') {
              const title = extractTitle(tokens[i].info)
              const id = nanoid(7)
              tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label for="tab-${id}">${title}</label>`

              if (checked) {
                tokens[i].info += ' active'
                checked = ''
              }
            }
          }

          return `<div class="vp-code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
        }
        return `</div></div>\n`
      }
    }
  ]
}

module.exports = {
  preWrapperPlugin,
  createCodeGroup
}