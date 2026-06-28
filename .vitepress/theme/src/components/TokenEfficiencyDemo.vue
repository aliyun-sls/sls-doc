<script lang="ts" setup>
import URI from 'urijs'
import { computed, ref, watchEffect } from 'vue'
import { initLang, isDarkTheme, parseCommonQuery } from './utils'
import { inBrowser, useData } from 'vitepress'

const slsDemoService = 'https://new-share-sls-demo-mptiifapvo.cn-shanghai.fcapp.run'
const agentLoopDemoService = 'https://agentloop-demo-ytovjpywyc.cn-shanghai.fcapp.run'
const serviceConsoleOrigin = 'https://agentloop4service.console.aliyun.com'

const slsDest = '/lognext/project/proj-xtrace-ee483ec157740929c4cb92d4ff85f-cn-hongkong/dashboard/ai-coding-agent-token-eval-xtrace-20260626'
const reportDest = '/lognext/project/agentloop-c260254f99d705a28d1309acb0e53fda/dashboard/agentloop-evaluation-analysis-report-5m'
const evaluatorDest = '/agentloop/region/cn-hongkong/agentspace/al-playground-cn-hongkong/app/evaluator'
const explorerDest = '/agentloop/region/cn-hongkong/agentspace/al-playground-cn-hongkong/app/explorer?q=task_name%3Atoken%E6%95%88%E7%8E%87%E8%AF%84%E4%BC%B0'

const tabs = [
  { key: 'dashboard', label: 'Token 指标大盘' },
  { key: 'report', label: '优化报告' },
  { key: 'evaluator', label: 'Token 效率评估器' },
  { key: 'explorer', label: '评估结果洞察' },
  { key: 'article', label: '技术文章', href: '/doc/ai_coding/token_efficiency.html' },
]

const activeTab = ref('dashboard')

const { lang } = useData()
watchEffect(() => {
  if (inBrowser) {
    initLang(lang.value)
  }
})

const { isShare } = parseCommonQuery()

const tip = computed(() => {
  if (isShare) {
    return null
  }
  return lang.value === 'en'
    ? { prefix: 'This is a demo environment. ' }
    : { prefix: '当前为演示环境' }
})

function replaceDestinationOrigin(loginUrl: string) {
  try {
    const url = new URL(loginUrl)
    const destination = url.searchParams.get('Destination')
    if (destination == null) {
      return loginUrl
    }
    const destinationUrl = new URL(destination)
    const targetOrigin = new URL(serviceConsoleOrigin)
    destinationUrl.protocol = targetOrigin.protocol
    destinationUrl.host = targetOrigin.host
    url.searchParams.set('Destination', destinationUrl.toString())
    return url.toString()
  } catch (e) {
    return loginUrl
  }
}

const slsUrl = ref('')
const reportUrl = ref('')
const evaluatorUrl = ref('')
const explorerUrl = ref('')

watchEffect(async () => {
  if (!inBrowser) return

  const theme = isDarkTheme() ? 'dark' : 'default'

  const slsResponse = await fetch(slsDemoService)
  const slsJson = await slsResponse.json()
  if (slsJson.success) {
    const ticket = slsJson.data.ticket
    slsUrl.value = `https://sls.console.aliyun.com${slsDest}?sls_ticket=${ticket}&theme=${theme}`
    reportUrl.value = `https://sls.console.aliyun.com${reportDest}?sls_ticket=${ticket}&theme=${theme}`
  }

  const evalTarget = encodeURIComponent(evaluatorDest)
  const evalResponse = await fetch(`${agentLoopDemoService}?dest=${evalTarget}`)
  const evalJson = await evalResponse.json()
  if (evalJson.success) {
    evaluatorUrl.value = replaceDestinationOrigin(evalJson.data.url)
  }

  const expTarget = encodeURIComponent(explorerDest)
  const expResponse = await fetch(`${agentLoopDemoService}?dest=${expTarget}`)
  const expJson = await expResponse.json()
  if (expJson.success) {
    explorerUrl.value = replaceDestinationOrigin(expJson.data.url)
  }
})

const currentUrl = computed(() => {
  switch (activeTab.value) {
    case 'dashboard': return slsUrl.value
    case 'report': return reportUrl.value
    case 'evaluator': return evaluatorUrl.value
    case 'explorer': return explorerUrl.value
    default: return ''
  }
})
</script>

<template>
  <div class="container">
    <div class="tip" v-if="tip">
      <span>{{ tip.prefix }}</span>
    </div>
    <div class="tabs">
      <template v-for="tab in tabs" :key="tab.key">
        <a
          v-if="tab.href"
          :href="tab.href"
          class="tab tab-link"
          target="_blank"
        >
          {{ tab.label }} ↗
        </a>
        <button
          v-else
          :class="{ tab: true, active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </template>
    </div>
    <iframe
      v-if="currentUrl !== ''"
      :key="activeTab"
      :src="currentUrl"
      class="frame"
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

.tabs {
  flex: 0 0 auto;
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 16px;
  background: #fafafa;
}

.tab {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab:hover {
  color: #1677ff;
}

.tab.active {
  color: #1677ff;
  border-bottom-color: #1677ff;
  font-weight: 500;
}

.tab-link {
  text-decoration: none;
  color: #666;
}

.tab-link:hover {
  color: #1677ff;
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

.dark .tabs {
  background: var(--vt-c-bg-soft);
  border-bottom-color: var(--vt-c-divider);
}

.dark .tab {
  color: #aaa;
}

.dark .tab:hover,
.dark .tab.active {
  color: #1677ff;
}

.dark .frame {
  background-color: var(--vt-c-bg);
}
</style>
