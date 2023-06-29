<script lang="ts" setup>
import URI from 'urijs'
import { computed, ref, watchEffect } from 'vue'
import { isDarkTheme } from './utils'
import { inBrowser } from 'vitepress'

const params = computed(() => {
  const search = inBrowser ? window.location.search : ''
  const queries = URI(search).query(true)
  // const hasTopbar = lang === 'zh' || lang === '' || lang == null

  // const navMobile = hasTopbar ? '56px' : '0px'
  // const navDesktop = hasTopbar ? '72px' : '0px'

  // document.body.style.setProperty('--vp-nav-height-mobile', navMobile);
  // document.body.style.setProperty('--vp-nav-height-desktop', navDesktop);

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
