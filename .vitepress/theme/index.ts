import Theme from 'vitepress/theme'

import { h } from 'vue'

import SLSContributors from './src/components/SLSContributors.vue'
import './styles/sls-doc.css'

// uncomment to test CSS variables override
import './override.css'

export default {
  extends: Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // uncomment to test layout slots
      // 'sidebar-top': () => h('div', 'hello top'),
      // 'sidebar-bottom': () => h('div', 'hello bottom'),
      // 'content-top': () => h('h1', 'Announcement!'),
      // 'content-bottom': () => h('div', 'Some ads'),
      // 'aside-top': () => h('div', 'this could be huge'),
      // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
      'aside-outline-after': () => h(SLSContributors),
    })
  },
}
