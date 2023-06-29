<script lang="ts" setup>
import URI from 'urijs'
import { computed, ref, watchEffect } from 'vue'
import { inBrowser } from 'vitepress'
// import Cookies from 'js-cookie'
import { isDarkTheme } from './utils'

const search = inBrowser ? window.location.search : ''

// const domain = '.aliyun.com'

const params = computed(() => {
  const queries = URI(search).query(true)
  // const lang = queries.lang

  // if (lang === 'en' || lang === 'zh') {
  //   // 主动设置才会修改 lang
  //   const aliyun_lang = (Cookies as any).get('aliyun_lang', { domain })
  //   if (lang !== aliyun_lang) {
  //     Cookies.set('aliyun_lang', lang, { domain })
  //   }
  // }

  if (queries == null || queries.dest == null) {
    return {
      dest: '/lognext/profile',
      theme: 'default',
      maxWidth: false,
    }
  }
  return {
    dest: encodeURIComponent(queries.dest),
    theme: isDarkTheme() ? 'dark' : 'default',
    maxWidth: queries.maxWidth === true,
  }
})

let dest = ref('')

watchEffect(async () => {
  const response = await fetch(
    `https://s-sls-demo-thysjcgqcl.cn-shanghai.fcapp.run?dest=${encodeURIComponent(
      params.value.dest
    )}&theme=${params.value.theme}`
  )
  const json = await response.json()
  if (json.success) {
    dest.value = json.data.url
  }
})
</script>

<template>
  <iframe v-if="dest !== ''" :src="dest" :class="{ frame: true, 'max-width': params.maxWidth }">
  </iframe>
</template>

<style scoped>
.frame {
  height: calc(100vh - (var(--sls-topnav-height)));
  width: 100vw;
  border: none;
  outline: none;
  margin: auto;
}

.max-width {
  max-width: var(--sls-page-max-width);
}

.dark .frame {
  background-color: var(--vt-c-bg);
}
</style>
