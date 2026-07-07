import Theme from 'vitepress/theme'

import { h, nextTick } from 'vue'

import SLSContributors from './src/components/SLSContributors.vue'
import StaropsArticleTopbar from './src/components/StaropsArticleTopbar.vue'

import './src/index'

import './styles/sls-doc.css'

// uncomment to test CSS variables override
import './override.css'

export default {
  extends: Theme,
  Layout() {
    nextTick(() => {
      if (typeof document === 'undefined') return
      const badgeMap: Record<string, string> = {
        'RDS 脚本巡检与动态追因': 'PUBLISHED v1.0',
        '告警 RCA：用 Skill 固化历史 Runbook': 'PUBLISHED v1.0',
        日志模式巡检: 'DRAFT',
        业务服务可靠性巡检: 'DRAFT',
        'MCP 集成治理 Checklist': 'WIP · 模板态',
        'UModel 指标语义与实体拓扑': 'DRAFT',
        '编写 STAROps 运维 Skill': 'DRAFT',
        '编写 Skill 确定性脚本': 'DRAFT',
      }
      document.querySelectorAll('.sls-starops-article .VPSidebar .items .link').forEach((node) => {
        const label = node.querySelector('.text')?.textContent?.trim()
        const badge = label && badgeMap[label]
        if (badge) {
          node.setAttribute('data-starops-badge', badge)
        }
      })
    })

    return h(Theme.Layout, null, {
      // uncomment to test layout slots
      // 'sidebar-top': () => h('div', 'hello top'),
      // 'sidebar-bottom': () => h('div', 'hello bottom'),
      // 'content-top': () => h('h1', 'Announcement!'),
      // 'content-bottom': () => h('div', 'Some ads'),
      // 'aside-top': () => h('div', 'this could be huge'),
      // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
      'layout-top': () => h(StaropsArticleTopbar),
      'aside-outline-after': () => h(SLSContributors),
    })
  },
}
