<script lang="ts" setup>
import URI from 'urijs'
import { computed, ref, watchEffect } from 'vue'
import { initLang, isDarkTheme, parseCommonQuery } from './utils'
import { inBrowser, useData } from 'vitepress'

const props = defineProps(['workspace', 'region'])
const workspace = props.workspace ?? 'default-cms-1819385687343877-cn-hongkong'
const region = props.region ?? 'cn-hongkong'

const { lang } = useData()
watchEffect(() => {
  if (inBrowser) {
    initLang(lang.value)
  }
})

const params = computed(() => {
  const search = inBrowser ? window.location.search : ''
  const queries = URI(search).query(true)

  if (queries == null || queries.dest == null) {
    return {
      dest: `/next/region/${region}/workspace/${workspace}/app/entity/explorer`,
      theme: 'default',
      maxWidth: false,
    }
  }

  return {
    dest: queries.dest,
    theme: isDarkTheme() ? 'dark' : 'default',
    maxWidth: queries.maxWidth === true,
  }
})

const { isShare } = parseCommonQuery()

const tip = ref(
  isShare
    ? ''
    : lang.value === 'en'
    ? 'The current data is for demonstration purposes only, please do not use it for production.'
    : '当前为演示数据，请勿用于生产'
)

let dest = ref('')

watchEffect(async () => {
  if (inBrowser) {
    if (!params.value.dest.startsWith('/next')) {
      console.error('dest is not start with /next')
      return
    }
    console.log(params.value.dest)
    const target = params.value.dest.includes('?')
      ? encodeURIComponent(params.value.dest)
      : params.value.dest

    const response = await fetch(
      `https://cmsdemo-sls-demo-dussgynyta.cn-shanghai.fcapp.run?dest=${target}`
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
  top: 6px;
  color: red;
  width: 100%;
  text-align: center;
  padding: 10px 16px;
  pointer-events: none;
  font-size: 18px;
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
