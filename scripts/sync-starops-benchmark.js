#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')

const repoRoot = path.resolve(__dirname, '..')
const sourceDir = path.resolve(process.argv[2] || '/Users/zhangcheng/workspace/ai/articles/rca')
const targetDir = path.join(repoRoot, 'src/public/starops/benchmark/rca')
const sidebarFile = path.join(repoRoot, '.vitepress/siderbars/staropsBenchmarkItems.js')
const manifestFile = path.join(targetDir, 'sync-manifest.json')

const sidebarOrder = ['语义上手', '基准评测', '告警追因', '主动巡检', '经验固化', '协作闭环']

const caseTreeCss = `
body.sls-starops-article .VPSidebar .group {
  padding: 0 !important;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 {
  padding: 0 0 6px !important;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0[data-sidebar-state="closed"] {
  padding-bottom: 6px !important;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 > .item {
  align-items: center !important;
  border-radius: 6px !important;
  cursor: pointer;
  min-height: 32px !important;
  padding: 4px 4px !important;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 > .item:hover {
  background: rgba(68, 100, 240, .04) !important;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 > .item > h2.text {
  flex: 1 1 auto;
  font-size: 13px !important;
  letter-spacing: 0 !important;
  line-height: 20px !important;
  min-width: 0;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 > .item::after {
  content: none !important;
  display: none !important;
}
body.sls-starops-article .VPSidebar .nav-top-chevron {
  border-bottom: 1.7px solid currentColor;
  border-right: 1.7px solid currentColor;
  color: rgba(32, 38, 51, .42);
  display: inline-block;
  flex: 0 0 auto;
  height: 6px;
  margin: 0 4px 0 10px;
  pointer-events: none;
  transform: rotate(-45deg);
  transition: transform .16s ease, color .16s ease;
  width: 6px;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 > .item:hover .nav-top-chevron {
  color: rgba(32, 38, 51, .64);
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0[data-sidebar-state="open"] > .item .nav-top-chevron {
  transform: rotate(45deg);
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0 > .items {
  margin: 1px 0 6px !important;
}
body.sls-starops-article .VPSidebar .VPSidebarItem.level-0[data-sidebar-state="closed"] > .items {
  display: none !important;
}
body.sls-starops-article .VPSidebar .nav-sub-tree {
  border-left: 1px solid rgba(68, 100, 240, .16) !important;
  margin: 5px 0 8px 14px !important;
  max-height: none !important;
  overflow: visible !important;
  padding: 2px 0 4px 12px !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group {
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  margin: 2px 0 !important;
  padding: 0 !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group-title {
  appearance: none !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  color: rgba(32, 38, 51, .56) !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  gap: 5px !important;
  justify-content: space-between !important;
  letter-spacing: 0 !important;
  line-height: 18px !important;
  margin: 0 !important;
  min-height: 26px !important;
  outline-offset: 2px !important;
  padding: 4px 4px 4px 0 !important;
  position: relative !important;
  text-decoration: none !important;
  text-transform: none !important;
  user-select: none !important;
  list-style: none !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group-title::-webkit-details-marker {
  display: none !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group-title::marker {
  content: "" !important;
  display: none !important;
  font-size: 0 !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group-title::before {
  content: none !important;
  display: none !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group[data-open="true"] > .nav-sub-group-title {
  color: rgba(32, 38, 51, .72) !important;
}
body.sls-starops-article .VPSidebar .nav-sub-chevron {
  background: transparent !important;
  border: 0 !important;
  border-bottom: 1.7px solid currentColor !important;
  border-right: 1.7px solid currentColor !important;
  color: rgba(68, 100, 240, .48);
  display: inline-block !important;
  flex: 0 0 7px !important;
  height: 7px !important;
  margin: 0 3px 0 2px !important;
  min-height: 0 !important;
  min-width: 0 !important;
  pointer-events: none;
  transform: rotate(-45deg);
  transition: transform .16s ease, color .16s ease;
  width: 7px !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group-title:hover .nav-sub-chevron {
  color: rgba(68, 100, 240, .74);
}
body.sls-starops-article .VPSidebar .nav-sub-group[data-open="true"] > .nav-sub-group-title .nav-sub-chevron {
  transform: rotate(45deg);
}
body.sls-starops-article .VPSidebar .nav-sub-group-title > .nav-sub-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}
body.sls-starops-article .VPSidebar .nav-sub-count {
  color: rgba(32, 38, 51, .36);
  font-size: 11px;
  font-weight: 600;
}
body.sls-starops-article .VPSidebar .nav-sub-group-items {
  border-left: 1px solid rgba(68, 100, 240, .12);
  margin: 1px 0 6px 8px !important;
  padding-left: 8px !important;
}
body.sls-starops-article .VPSidebar .nav-sub-group-items[hidden] {
  display: none !important;
}
body.sls-starops-article .VPSidebar .nav-sub-item {
  background: transparent !important;
  border-left: 2px solid transparent !important;
  border-radius: 0 4px 4px 0 !important;
  color: rgb(62, 70, 84) !important;
  display: block !important;
  font-size: 12.5px !important;
  line-height: 18px !important;
  margin: 1px 0 !important;
  padding: 4px 8px !important;
  text-decoration: none !important;
}
body.sls-starops-article .VPSidebar .nav-sub-item:hover {
  background: rgba(68, 100, 240, .05) !important;
  color: rgb(36, 66, 199) !important;
}
body.sls-starops-article .VPSidebar .nav-sub-item.active {
  background: rgba(68, 100, 240, .09) !important;
  border-left-color: rgb(68, 100, 240) !important;
  color: rgb(68, 100, 240) !important;
  font-weight: 600 !important;
}
`.trim()

const caseTreeScript = `
(function() {
  function initStaropsSidebarFold() {
    var sections = document.querySelectorAll('.VPSidebar .VPSidebarItem.level-0');
    sections.forEach(function(section) {
      var header = section.querySelector(':scope > .item');
      var items = section.querySelector(':scope > .items');
      if (!header || !items || header.dataset.staropsFoldBound) return;
      header.dataset.staropsFoldBound = '1';
      if (!header.querySelector(':scope > .nav-top-chevron')) {
        var icon = document.createElement('span');
        icon.className = 'nav-top-chevron';
        icon.setAttribute('aria-hidden', 'true');
        header.appendChild(icon);
      }
      var active = section.classList.contains('has-active') || section.querySelector('.is-active, .active');
      section.dataset.sidebarState = active ? 'open' : 'closed';
      header.setAttribute('aria-expanded', active ? 'true' : 'false');
      function toggle(event) {
        if (event.target && event.target.closest && event.target.closest('a')) return;
        var nextOpen = section.dataset.sidebarState !== 'open';
        section.dataset.sidebarState = nextOpen ? 'open' : 'closed';
        header.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
      }
      header.addEventListener('click', toggle);
      header.addEventListener('keydown', function(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggle(event);
      });
    });
  }
  function initStaropsCaseTree() {
    var groups = document.querySelectorAll('.VPSidebar [data-starops-case-tree] .nav-sub-group');
    groups.forEach(function(group) {
      var button = group.querySelector(':scope > .nav-sub-group-title');
      var items = group.querySelector(':scope > .nav-sub-group-items');
      if (!button || !items || button.dataset.staropsCaseBound) return;
      button.dataset.staropsCaseBound = '1';
      function setOpen(nextOpen) {
        group.dataset.open = nextOpen ? 'true' : 'false';
        button.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
        if (nextOpen) {
          items.removeAttribute('hidden');
        } else {
          items.setAttribute('hidden', '');
        }
      }
      setOpen(group.dataset.open === 'true');
      function toggleGroup() {
        setOpen(group.dataset.open !== 'true');
      }
      button.addEventListener('click', toggleGroup);
      button.addEventListener('keydown', function(event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleGroup();
      });
    });
  }
  function initAll() {
    initStaropsSidebarFold();
    initStaropsCaseTree();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
`.trim()

function assertExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found: ${filePath}`)
  }
}

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0
  let copied = 0
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copied += copyDir(from, to)
    } else if (entry.isFile()) {
      copyFile(from, to)
      copied += 1
    }
  }
  return copied
}

function parseHtml(html) {
  return parse(html, { comment: true })
}

function hasClass(node, className) {
  return (` ${node.getAttribute('class') || ''} `).includes(` ${className} `)
}

function childElements(node) {
  return node.childNodes.filter((child) => child.nodeType === 1)
}

function normalizedText(node) {
  return node.innerText.replace(/\s+/g, ' ').trim()
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[char]
  })
}

function fileFromHref(href) {
  return path.basename(String(href || '').split('#')[0].split('?')[0])
}

function caseFileMap(groups) {
  return new Map(groups.flatMap((group) => group.items.map((item) => [item.originalFile, item.file])))
}

function reorderBenchmarkSidebar(root) {
  const sidebar = root.querySelector('aside.VPSidebar')
  const nav = sidebar?.querySelector('nav')
  if (!nav) return

  const children = nav.childNodes
  const groups = childElements(nav)
    .filter((node) => hasClass(node, 'group'))
    .map((node) => ({
      node,
      title: normalizedText(node.querySelector('h2.text') || { innerText: '' }),
    }))

  if (!groups.some((group) => group.title === '基准评测')) return

  const known = new Map(groups.map((group) => [group.title, group.node]))
  const orderedGroups = [
    ...sidebarOrder.filter((title) => known.has(title)).map((title) => known.get(title)),
    ...groups.filter((group) => !sidebarOrder.includes(group.title)).map((group) => group.node),
  ]

  const groupNodeSet = new Set(groups.map((group) => group.node))
  const firstGroupIndex = children.findIndex((child) => groupNodeSet.has(child))
  const lastGroupIndex =
    children.length - 1 - [...children].reverse().findIndex((child) => groupNodeSet.has(child))
  const before = children.slice(0, firstGroupIndex).map(String).join('')
  const after = children.slice(lastGroupIndex + 1).map(String).join('')
  nav.set_content(`${before}${orderedGroups.map(String).join('')}${after}`)
}

function rewriteDocLinks(root) {
  root.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href')
    if (href?.startsWith('https://sls.aliyun.com/doc/')) {
      link.setAttribute('href', href.replace('https://sls.aliyun.com/doc/', '/doc/'))
    }
  })
}

function rewriteHtml(html) {
  const root = parseHtml(html)
  reorderBenchmarkSidebar(root)
  rewriteDocLinks(root)
  return root.toString()
}

function cleanCaseFilename(originalFile, caseIndex) {
  const stem = originalFile.replace(/\.html$/, '')
  const match = stem.match(/^case_(F\d+-.+?)(?:\.[a-z0-9]+)?$/)
  const readable = match ? match[1] : stem.replace(/^case_/, '')
  return `case_${String(caseIndex).padStart(2, '0')}_${readable}.html`
}

function extractCaseTree(casesHtml) {
  const root = parseHtml(casesHtml)
  const tree = root.querySelector('.nav-sub-tree')
  if (!tree) {
    throw new Error('Cannot find nav-sub-tree in cases_compare.html')
  }

  const groups = tree.querySelectorAll('.nav-sub-group').map((groupNode) => {
    const title = groupNode.querySelector('.nav-sub-group-title')
    const items = groupNode.querySelectorAll('a.nav-sub-item').map((link) => ({
      text: normalizedText(link),
      originalFile: fileFromHref(link.getAttribute('href')),
      target: '_self',
    }))
    return {
      group: normalizedText(title || { innerText: '' }),
      items,
    }
  })

  const caseCount = groups.reduce((count, group) => count + group.items.length, 0)
  if (groups.length === 0 || caseCount === 0) {
    throw new Error(`Unexpected empty case tree: ${groups.length} groups, ${caseCount} cases`)
  }

  let caseIndex = 0
  for (const group of groups) {
    for (const item of group.items) {
      caseIndex += 1
      item.file = cleanCaseFilename(item.originalFile, caseIndex)
      item.link = `/starops/benchmark/rca/${item.file}`
    }
  }
  return groups
}

function rewriteCaseLinks(root, groups) {
  const aliases = caseFileMap(groups)
  root.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href')
    const cleanFile = aliases.get(fileFromHref(href))
    if (cleanFile) {
      link.setAttribute('href', cleanFile)
    }
  })
}

function buildCaseTreeHtml(groups, currentFile) {
  const aliases = caseFileMap(groups)
  const currentCleanFile = aliases.get(currentFile) || currentFile
  const groupHtml = groups
    .map((group, groupIndex) => {
      const isCurrentGroup = group.items.some((item) => item.file === currentCleanFile)
      const openAttr = isCurrentGroup ? 'true' : 'false'
      const hiddenAttr = isCurrentGroup ? '' : ' hidden'
      const controlId = `starops-case-group-${groupIndex}`
      const items = group.items
        .map((item) => {
          const active = item.file === currentCleanFile ? ' active' : ''
          return `<a class="nav-sub-item${active}" href="${escapeHtml(item.file)}">${escapeHtml(item.text)}</a>`
        })
        .join('')
      return `<div class="nav-sub-group" data-open="${openAttr}"><button class="nav-sub-group-title" type="button" aria-expanded="${openAttr}" aria-controls="${controlId}"><span class="nav-sub-chevron" aria-hidden="true"></span><span class="nav-sub-label">${escapeHtml(group.group)}</span><span class="nav-sub-count">${group.items.length}</span></button><div class="nav-sub-group-items" id="${controlId}"${hiddenAttr}>${items}</div></div>`
    })
    .join('')
  return `<div class="nav-sub-tree" data-starops-case-tree>${groupHtml}</div>`
}

function replaceCaseTree(root, groups, currentFile) {
  const tree = root.querySelector('.nav-sub-tree')
  if (!tree) return
  tree.replaceWith(parseHtml(buildCaseTreeHtml(groups, currentFile)).firstChild)
}

function removeGeneratedCaseTreeAssets(root) {
  root.querySelectorAll('#STAROPS_CASE_TREE_ASSETS, #STAROPS_CASE_TREE_SCRIPT').forEach((node) => {
    node.remove()
  })
}

function injectCaseTreeAssets(root) {
  removeGeneratedCaseTreeAssets(root)
  const mount = root.querySelector('body') || root.querySelector('html') || root
  mount.insertAdjacentHTML(
    'beforeend',
    `<style id="STAROPS_CASE_TREE_ASSETS">\n${caseTreeCss}\n</style>\n<script id="STAROPS_CASE_TREE_SCRIPT">\n${caseTreeScript}\n</script>`
  )
}

function normalizeCopiedCaseTrees(groups) {
  const aliases = []
  const files = fs.readdirSync(targetDir).filter((name) => name.endsWith('.html'))
  const aliasMap = caseFileMap(groups)
  for (const file of files) {
    const filePath = path.join(targetDir, file)
    const root = parseHtml(fs.readFileSync(filePath, 'utf8'))
    rewriteCaseLinks(root, groups)
    replaceCaseTree(root, groups, file)
    injectCaseTreeAssets(root)

    const html = root.toString()
    fs.writeFileSync(filePath, html, 'utf8')

    const cleanFile = aliasMap.get(file)
    if (cleanFile) {
      aliases.push({ originalFile: file, file: cleanFile })
      fs.writeFileSync(path.join(targetDir, cleanFile), html, 'utf8')
    }
  }
  return aliases
}

function sidebarGroups(groups) {
  return groups.map((group) => ({
    group: group.group,
    items: group.items.map((item) => ({
      text: item.text,
      target: item.target,
      file: item.file,
      link: item.link,
    })),
  }))
}

function writeSidebarFile(groups) {
  const content = `const caseGroups = ${JSON.stringify(sidebarGroups(groups), null, 2)}

function getStaropsBenchmarkItems() {
  return [
    {
      text: '评测基准',
      link: '/starops/benchmark/rca/rca_benchmark_dataset.html',
      target: '_self',
    },
    {
      text: '评测结果',
      link: '/starops/benchmark/rca/rca_benchmark_results.html',
      target: '_self',
    },
    {
      text: '评测案例',
      link: '/starops/benchmark/rca/cases_compare.html',
      target: '_self',
      collapsed: true,
      items: caseGroups.map((group) => ({
        text: group.group,
        collapsed: true,
        items: group.items,
      })),
    },
  ]
}

module.exports = getStaropsBenchmarkItems
`
  fs.writeFileSync(sidebarFile, content, 'utf8')
}

function main() {
  assertExists(sourceDir, 'Benchmark source directory')
  assertExists(path.join(sourceDir, 'cases_compare.html'), 'Benchmark cases overview')
  assertExists(path.join(sourceDir, 'rca_benchmark_dataset.html'), 'Benchmark dataset page')
  assertExists(path.join(sourceDir, 'rca_benchmark_results.html'), 'Benchmark results page')

  ensureCleanDir(targetDir)

  const htmlFiles = fs
    .readdirSync(sourceDir)
    .filter((file) => file.endsWith('.html'))
    .sort()

  for (const file of htmlFiles) {
    const src = path.join(sourceDir, file)
    const dest = path.join(targetDir, file)
    fs.writeFileSync(dest, rewriteHtml(fs.readFileSync(src, 'utf8')), 'utf8')
  }

  const svgCount = copyDir(path.join(sourceDir, 'svg_recolored'), path.join(targetDir, 'svg_recolored'))
  const assetCount = copyDir(path.join(sourceDir, 'assets'), path.join(targetDir, 'assets'))

  const groups = extractCaseTree(fs.readFileSync(path.join(targetDir, 'cases_compare.html'), 'utf8'))
  const aliases = normalizeCopiedCaseTrees(groups)
  writeSidebarFile(groups)

  const manifest = {
    sourceDir,
    targetDir,
    sourceHtmlFiles: htmlFiles.length,
    htmlFiles: fs.readdirSync(targetDir).filter((file) => file.endsWith('.html')).length,
    caseFiles: htmlFiles.filter((file) => /^case_F.+\.html$/.test(file)).length,
    cleanCaseFiles: aliases.length,
    caseGroups: groups.map((group) => ({ group: group.group, count: group.items.length })),
    caseAliases: aliases,
    svgFiles: svgCount,
    assetFiles: assetCount,
    generatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(JSON.stringify(manifest, null, 2))
}

main()
