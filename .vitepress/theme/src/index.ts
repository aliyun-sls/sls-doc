import { addHistoryListener, initLang, initRum, initTheme } from './components/utils'

import { inBrowser } from 'vitepress'

if (inBrowser) {
  initLang()
  initTheme()
  initRum()
  addHistoryListener()
}
