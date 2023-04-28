function indent(value, prefix, cnt) {
  const ind = Array.from({ length: cnt || 1 }).fill(prefix).join('')
  if (typeof value === 'string') {
    value = value.split('\n')
  }
  return value.map(v => `${ind}${v}`).join('\n')
}

exports.indent = indent

exports.indentSpace = function(value, cnt) {
  return indent(value, ' ', cnt)
}

exports.indentTab = function(value, cnt) {
  return indent(value, '\t', cnt)
}

exports.quote = function(value) {
  if (typeof value === 'string') {
    return JSON.stringify(value)
  }
  return `"${value}"`
}

exports.camelCase = function(str) {
  return str.toLowerCase().replace(/([-_][a-z])/g, group => {
    return group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}
  