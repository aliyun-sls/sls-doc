const storageKey = 'vitepress-theme-appearance'

export function isDarkTheme() {
  const userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark'
  return isDark
}
