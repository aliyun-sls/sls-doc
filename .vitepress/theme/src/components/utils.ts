import URI from 'urijs'
import Cookies from 'js-cookie'
import { inBrowser } from 'vitepress'

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

export function initLang(lang: string) {
  const domain = '.aliyun.com'

  if (lang == 'en' || lang == 'zh') {
    Cookies.set('aliyun_lang', lang, { domain })
  }
}

const TRUSTED_ORIGINS = [
  'https://sls.console.aliyun.com',
  'https://cmsnext.console.aliyun.com',
  'https://sls.console.alibabacloud.com',
  'https://arms.console.alibabacloud.com',
]

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function addHistoryListener() {
  window.addEventListener('message', (e) => {
    if (!TRUSTED_ORIGINS.includes(e.origin) && e.origin !== window.location.origin) {
      return
    }

    const v = e?.data
    if (v === 'historyback') {
      window.history.back()
    } else if (v === 'historyforward') {
      window.history.forward()
    } else if (v && v.action && v.action === 'pushState') {
      if (typeof v.href === 'string' && isSafeUrl(v.href)) {
        window.location = v.href
      }
    }
  })
}

export function parseCommonQuery() {
  const search = inBrowser ? window.location.search : ''

  const domain = '.aliyun.com'
  const queries = URI(search).query(true)
  const lang = queries.lang
  const isShareStr = queries.isShare

  let aliyun_lang = (Cookies as any).get('aliyun_lang', { domain })

  if (lang !== '' && lang != null) {
    Cookies.set('aliyun_lang', lang, { domain })
    aliyun_lang = lang
  }

  const isShare = isShareStr === 'true' || isShareStr === true

  return {
    isShare,
    lang: aliyun_lang === 'en' ? 'en' : 'zh',
  }
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
