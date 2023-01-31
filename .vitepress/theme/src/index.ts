import { addHistoryListener, initTheme } from './components/utils'
import Theme from './theme-default'
import { inBrowser } from 'vitepress'

if (inBrowser) {
  initTheme()
  addHistoryListener()
}

export { Theme }
