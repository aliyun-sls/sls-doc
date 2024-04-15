import { addHistoryListener, initRum, initTheme } from './components/utils'

import { inBrowser } from 'vitepress'

if (inBrowser) {
  initTheme()
  initRum()
  addHistoryListener()
}
