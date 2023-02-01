<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import docsearch from '@aliyun-sls/docsearch-js'
import { onMounted } from 'vue'
import { useRouter, useRoute, useData } from 'vitepress'

const router = useRouter()
const route = useRoute()
const { theme, site } = useData()

onMounted(() => {
  initialize(theme.value.algolia)
  setTimeout(poll, 16)
})

function poll() {
  // programmatically open the search box after initialize
  const e = new Event('keydown') as any

  e.key = 'k'
  e.metaKey = true

  window.dispatchEvent(e)

  setTimeout(() => {
    if (!document.querySelector('.DocSearch-Modal')) {
      poll()
    }
  }, 16)
}

const docsearch$ = docsearch.default ?? docsearch
type DocSearchProps = Parameters<typeof docsearch$>[0]

function initialize(userOptions: DefaultTheme.AlgoliaSearchOptions) {
  // note: multi-lang search support is removed since the theme
  // doesn't support multiple locales as of now.
  const options = Object.assign<{}, {}, DocSearchProps>({}, userOptions, {
    container: '#docsearch',

    navigator: {
      navigate({ itemUrl }) {
        const { pathname: hitPathname } = new URL(window.location.origin + itemUrl)

        // router doesn't handle same-page navigation so we use the native
        // browser location API for anchor navigation
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl)
        } else {
          router.go(itemUrl)
        }
      },
    },

    transformItems(items) {
      return items.map((item) => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url),
        })
      })
    },

    // @ts-expect-error vue-tsc thinks this should return Vue JSX but it returns the required React one
    hitComponent({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children },
      }
    },
    openSearchUrl: 'https://sls-doc-search-sls-doc-search-otdlhfahpe.cn-hangzhou.fcapp.run',
    // translations: {
    //   button: {
    //     buttonText: '搜索',
    //     buttonAriaLabel: '搜索',
    //   },
    //   modal: {
    //     searchBox: {
    //       resetButtonTitle: '清除查询',
    //       resetButtonAriaLabel: '清除查询',
    //       cancelButtonText: '取消',
    //       cancelButtonAriaLabel: '取消',
    //     },
    //     startScreen: {
    //       recentSearchesTitle: '最近查询',
    //       noRecentSearchesText: '没有最近查询结果',
    //       saveRecentSearchButtonTitle: '保存查询',
    //       removeRecentSearchButtonTitle: '清除查询历史',
    //       favoriteSearchesTitle: 'Favorite',
    //       removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
    //     },
    //     errorScreen: {
    //       titleText: '无法获取查询结果',
    //       helpText: '请检查网络是否联通',
    //     },
    //     footer: {
    //       selectText: '选择',
    //       selectKeyAriaLabel: '搜索',
    //       navigateText: 'to navigate',
    //       navigateUpKeyAriaLabel: '向上',
    //       navigateDownKeyAriaLabel: '向下',
    //       closeText: '关闭',
    //       closeKeyAriaLabel: 'Escape key',
    //       searchByText: 'Search by',
    //     },
    //     noResultsScreen: {
    //       noResultsText: '没有查询结果',
    //       suggestedQueryText: '正在查询',
    //       reportMissingResultsText: '这个查询一定会有结果吗?',
    //       reportMissingResultsLinkText: '联系我们.',
    //     },
    //   },
    // },
  })

  docsearch$(options)
}

function getRelativePath(absoluteUrl: string) {
  const { pathname, hash } = new URL(absoluteUrl)
  return pathname.replace(/\.html$/, site.value.cleanUrls === 'disabled' ? '.html' : '') + hash
}
</script>

<template>
  <div id="docsearch" />
</template>
