import { addHistoryListener, initRum, initTheme } from './components/utils'
import Theme from './theme-default'
import { inBrowser } from 'vitepress'

if (inBrowser) {
  initTheme()
  initRum()
  addHistoryListener()
}

export { Theme }
