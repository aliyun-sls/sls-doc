<script lang="ts" setup>
import URI from 'urijs'
import { computed, ref, watchEffect } from 'vue'
import { initLang, isDarkTheme, parseCommonQuery } from './utils'
import { inBrowser, useData } from 'vitepress'

const props = defineProps(['dest'])
const defaultDest = props.dest ?? '/quickExperience?staropsClusterRegion=cn-beijing&hideSidebar=true&hideHeader=true'

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
      dest: defaultDest,
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



const productionUrl = 'https://starops.console.aliyun.com/quickExperience?staropsClusterRegion=cn-beijing&hideSidebar=true&hideHeader=true'

const tip = computed(() => {
  return null
})

let dest = ref('')

watchEffect(async () => {
  if (inBrowser) {
    console.log(params.value.dest)
    const target = params.value.dest.includes('?')
      ? encodeURIComponent(params.value.dest)
      : params.value.dest

    const response = await fetch(
      `https://cmsdemo-sls-demo-dussgynyta.cn-shanghai.fcapp.run?dest=${target}&target=starops`
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
    <div class="tip" v-if="tip">
      <span>{{ tip.prefix }}</span>
      <a :href="productionUrl" target="_blank" rel="noopener noreferrer">
        {{ tip.linkText }}
      </a>
      <span>{{ tip.suffix }}</span>
    </div>
    <iframe
      v-if="dest !== ''"
      :src="dest"
      :class="{ frame: true, 'max-width': params.maxWidth }"
      allow="clipboard-read *; clipboard-write *"
    >
    </iframe>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - (var(--sls-topnav-height)));
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tip {
  flex: 0 0 auto;
  box-sizing: border-box;
  color: #d4380d;
  background: rgba(255, 247, 230, 0.96);
  border-bottom: 1px solid rgba(250, 173, 20, 0.35);
  width: 100%;
  text-align: center;
  padding: 6px 16px;
  font-size: 14px;
  line-height: 20px;
  z-index: 1;
}

.tip a {
  color: #1677ff;
  font-weight: 500;
  text-decoration: none;
  text-underline-offset: 3px;
}

.tip a:hover,
.tip a:focus-visible {
  color: #40a9ff;
  text-decoration: underline;
}

.frame {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  display: block;
  margin: 0 auto;
}

.max-width {
  max-width: var(--sls-page-max-width);
}

.dark .frame {
  background-color: var(--vt-c-bg);
}
</style>
