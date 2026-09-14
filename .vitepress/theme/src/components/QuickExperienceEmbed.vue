<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const demoEndpoint = 'https://cmsdemo-sls-demo-dussgynyta.cn-shanghai.fcapp.run'
const experiencePath =
  '/quickExperience?staropsClusterRegion=cn-beijing&hideSTAROpsHeader=true&hideSTAROpsSidebar=true&showCreditsNotice=false'
const trustedOrigins = new Set([
  'https://starops.console.aliyun.com',
  'https://starops4service.console.aliyun.com',
])

const iframeRef = ref<HTMLIFrameElement | null>(null)
const src = ref('')
const frameOrigin = ref('')
const loading = ref(true)
const error = ref('')
let controller: AbortController | undefined

async function loadExperience() {
  controller?.abort()
  const request = new AbortController()
  controller = request
  loading.value = true
  error.value = ''
  src.value = ''
  frameOrigin.value = ''

  try {
    const endpoint = new URL(demoEndpoint)
    endpoint.search = new URLSearchParams({ dest: experiencePath, target: 'starops' }).toString()
    const response = await fetch(endpoint, { signal: request.signal })
    if (!response.ok) throw new Error('Demo request failed')

    const result = await response.json()
    if (result?.success !== true || typeof result.data?.url !== 'string') {
      throw new Error('Invalid demo response')
    }

    const url = new URL(result.data.url)
    const isFederation =
      url.origin === 'https://signin.aliyun.com' && url.pathname === '/federation'
    if ((!isFederation && !trustedOrigins.has(url.origin)) || url.username || url.password) {
      throw new Error('Untrusted demo URL')
    }

    const destination = isFederation ? new URL(url.searchParams.get('Destination') || '') : url
    if (
      !trustedOrigins.has(destination.origin) ||
      destination.username ||
      destination.password ||
      destination.pathname !== '/quickExperience' ||
      destination.searchParams.get('hideSTAROpsHeader') !== 'true' ||
      destination.searchParams.get('hideSTAROpsSidebar') !== 'true' ||
      destination.searchParams.get('showCreditsNotice') !== 'false'
    ) {
      throw new Error('Invalid experience destination')
    }

    if (request.signal.aborted) return
    frameOrigin.value = destination.origin
    src.value = url.href
  } catch {
    if (request.signal.aborted) return
    loading.value = false
    error.value = '暂时无法加载体验页面，请重试。'
  }
}

function handleMessage(event: MessageEvent) {
  const frame = iframeRef.value?.contentWindow
  if (
    !frame ||
    !frameOrigin.value ||
    event.source !== frame ||
    event.origin !== frameOrigin.value ||
    event.data?.type !== 'starops:getLoginStatus'
  ) {
    return
  }

  // The demo token still authorizes API calls; this only allows the embedded experience to send.
  frame.postMessage(
    { type: 'starops:loginStatus', payload: { isLoggedIn: true } },
    frameOrigin.value
  )
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  loadExperience()
})

onBeforeUnmount(() => {
  controller?.abort()
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <div class="quick-experience-embed" :aria-busy="loading">
    <iframe
      v-if="src"
      ref="iframeRef"
      :src="src"
      :allow="`clipboard-write ${frameOrigin}`"
      title="STAROps 快速体验"
      class="quick-experience-embed__frame"
      @load="loading = false"
    ></iframe>
    <div v-if="loading" class="quick-experience-embed__state" role="status">
      正在加载 STAROps 体验…
    </div>
    <div v-else-if="error" class="quick-experience-embed__state" role="alert">
      <span>{{ error }}</span>
      <button type="button" @click="loadExperience">重新加载</button>
    </div>
  </div>
</template>

<style scoped>
.quick-experience-embed {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background: #fff;
}

.quick-experience-embed__frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.quick-experience-embed__state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.quick-experience-embed__state button {
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
}

.quick-experience-embed__state button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
