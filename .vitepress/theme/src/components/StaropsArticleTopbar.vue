<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

type DrawerGroup = { text: string; items: { text: string; href: string }[] }

const { frontmatter } = useData()
const { sidebarGroups } = useSidebar()
const route = useRoute()

const pageClass = computed(() => frontmatter.value.pageClass || '')
const isStaropsHome = computed(() => pageClass.value === 'sls-starops-home')
const isStaropsArticle = computed(() => pageClass.value === 'sls-starops-article')
const staropsJourney = computed(() => frontmatter.value.journey || 'STAROps 实践')

const drawerOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const drawerPanel = ref<HTMLElement | null>(null)

// 抽屉直接吃 getStaropsSider.js 配出来的侧栏数据，只取每组的一级链接（7 组 27 篇）。
const currentPath = computed(() => route.path.replace(/\.html$/, ''))
const drawerGroups = computed<DrawerGroup[]>(() =>
  sidebarGroups.value
    .map((group) => ({
      text: group.text || '',
      items: (group.items || []).flatMap((item) =>
        item.link && item.text ? [{ text: item.text, href: withBase(item.link) }] : []
      )
    }))
    .filter((group) => group.text && group.items.length > 0)
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && drawerOpen.value) {
    drawerOpen.value = false
    menuButton.value?.focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(drawerOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) nextTick(() => drawerPanel.value?.focus())
})
</script>

<template>
  <header v-if="isStaropsHome" class="sls-starops-topbar sls-starops-topbar--home">
    <div class="sls-starops-topbar__inner">
      <span class="sls-starops-topbar__brand">
        <a class="sls-starops-topbar__brand-main" href="/doc/starops/starops.html">
          <span class="sls-starops-topbar__mark"></span>
          <span>STAROps</span>
        </a>
        <span class="sls-starops-topbar__brand-sep">·</span>
        <a class="sls-starops-topbar__subbrand" href="/doc/index.html">阿里云可观测</a>
      </span>
      <nav class="sls-starops-topbar__links" aria-label="STAROps Navigation">
        <a class="is-active" href="/doc/starops/starops.html">最佳实践</a>
        <a href="https://starops.console.aliyun.com" target="_blank" rel="noreferrer">控制台</a>
        <a class="sls-starops-topbar__cta sls-starops-topbar__cta--ghost" href="/doc/index.html">↗ 现有案例中心</a>
      </nav>
      <a class="sls-starops-topbar__cta sls-starops-topbar__cta--primary" href="https://starops.console.aliyun.com" target="_blank" rel="noreferrer">进入控制台</a>
    </div>
  </header>

  <header v-else-if="isStaropsArticle" class="sls-starops-topbar sls-starops-topbar--article">
    <div class="sls-starops-topbar__inner">
      <button
        ref="menuButton"
        class="sls-starops-topbar__menu"
        type="button"
        aria-controls="sls-starops-drawer"
        :aria-expanded="drawerOpen"
        @click="drawerOpen = !drawerOpen"
      >
        目录
      </button>
      <a class="sls-starops-topbar__brand" href="/doc/starops/starops.html">
        <span class="sls-starops-topbar__mark"></span>
        <span>STAROps 实践</span>
      </a>
      <div class="sls-starops-topbar__crumb">
        <a href="/doc/index.html">案例中心</a>
        <span class="sep">/</span>
        <a href="/doc/starops/starops.html">STAROps</a>
        <span class="sep">/</span>
        <span>{{ staropsJourney }}</span>
      </div>
      <a class="sls-starops-topbar__cta" href="/doc/starops/starops.html">← 返回 STAROps 子站点</a>
    </div>

    <div v-if="drawerOpen" id="sls-starops-drawer" class="sls-starops-drawer">
      <div class="sls-starops-drawer__overlay" @click="drawerOpen = false"></div>
      <nav ref="drawerPanel" class="sls-starops-drawer__panel" tabindex="-1" aria-label="STAROps 实践目录">
        <p class="sls-starops-drawer__title">实践目录</p>
        <div v-for="group in drawerGroups" :key="group.text" class="sls-starops-drawer__group">
          <p class="sls-starops-drawer__group-title">{{ group.text }}</p>
          <a
            v-for="item in group.items"
            :key="item.href"
            class="sls-starops-drawer__link"
            :class="{ 'is-current': item.href === currentPath }"
            :href="item.href"
            :aria-current="item.href === currentPath ? 'page' : undefined"
            @click="drawerOpen = false"
          >{{ item.text }}</a>
        </div>
      </nav>
    </div>
  </header>
</template>