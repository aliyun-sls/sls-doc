const storageKey = 'vitepress-theme-appearance'

export function isDarkTheme() {
  const userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark'
  return isDark
}

export function initTheme() {
  const searchParams = new URLSearchParams(window.location.search)
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
