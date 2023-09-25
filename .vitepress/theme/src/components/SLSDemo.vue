<script lang="ts" setup>
import URI from 'urijs'
import { computed, ref, watchEffect } from 'vue'
import { isDarkTheme, parseCommonQuery } from './utils'
import { inBrowser } from 'vitepress'

const params = computed(() => {
  const search = inBrowser ? window.location.search : ''
  const queries = URI(search).query(true)

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

const { lang, isShare } = parseCommonQuery()

const tip = ref(
  isShare
    ? ''
    : lang === 'en'
    ? 'The current data is for demonstration purposes only, please do not use it for production.'
    : '当前为演示数据，请勿用于生产'
)

let dest = ref('')

watchEffect(async () => {
  if (inBrowser) {
    const response = await fetch(
      `https://s-sls-demo-thysjcgqcl.cn-shanghai.fcapp.run?dest=${encodeURIComponent(
        params.value.dest
      )}&theme=${params.value.theme}`
    )
    const json = await response.json()
    if (json.success) {
      dest.value = json.data.url
    }
  }
})
</script>

<template>
  <div class="container">
    <iframe v-if="dest !== ''" :src="dest" :class="{ frame: true, 'max-width': params.maxWidth }">
    </iframe>
    <div class="tip">{{ tip }}</div>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - (var(--sls-topnav-height)));
  width: 100vw;
  position: relative;
}

.tip {
  position: absolute;
  bottom: 0px;
  color: red;
  width: 100%;
  text-align: center;
  padding: 10px 16px;
  pointer-events: none;
}

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
