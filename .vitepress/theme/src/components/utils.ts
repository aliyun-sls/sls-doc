import { inBrowser } from 'vitepress'
import URI from 'urijs'

const storageKey = 'vitepress-theme-appearance'

export function isDarkTheme() {
  const userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark'
  return isDark
}

export function initTheme() {
  const search = window?.location?.search ?? ''
  const searchParams = new URLSearchParams(search)
  const isDark = searchParams.get('theme') === 'dark'
  localStorage.setItem(storageKey, isDark ? 'dark' : 'light')
}

export function addHistoryListener() {
  window.addEventListener('message', (e) => {
    const v = e?.data
    if (v === 'historyback') {
      window.history.back()
    } else if (v === 'historyforward') {
      window.history.forward()
    } else if (v && v.action && v.action === 'pushState') {
      // window.history.pushState(null, '', v.href)
      window.location = v.href
    }
  })
}

export function initRum() {
  const init = function (h: any, o: any, u: any, n: any, d: any) {
    h = h[d] = h[d] || {
      p: [],
      e: [],
      q: [],
      addLog: function (log: any) {
        h.p.push(log)
      },
      addError: function (log: any) {
        h.e.push(log)
      },
      onReady: function (c: any) {
        h.q.push(c)
      },
    }
    d = o.createElement(u)
    d.async = 1
    d.src = n
    n = o.getElementsByTagName(u)[0]
    n.parentNode.insertBefore(d, n)
  }

  init(window, document, 'script', 'https://o.alicdn.com/sls/sls-rum/sls-rum.js', 'SLS_RUM')

  const thisWindow = window as any

  thisWindow.SLS_RUM.onReady(function () {
    thisWindow.SLS_RUM.init({
      host: 'cn-hangzhou.log.aliyuncs.com',
      project: 'sls-console-log',
      logstore: 'sls-doc-rum-raw',
      instance: 'sls-doc',
      env: 'prod',
      service: 'web',
      enableError: true,
      enableResourcePerf: false,
      enableAjax: true,
      enablePerf: true,
      enableTrace: false,
      sampleRate: 1,
    })
  })
}

const search = inBrowser ? window.location.search : ''
const lang = URI(search).query(true)?.lang ?? 'zh'

export function useSLSConfig() {
  return {
    lang,
    hasTopbar: lang === 'zh'
  }
}
