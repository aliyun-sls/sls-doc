<script setup lang="ts">
import { useData } from 'vitepress'
import { useFetch } from '@vueuse/core'
import { computed, reactive } from 'vue'

const { page } = useData()
const { data, error, statusCode, isFetching, isFinished, canAbort } = useFetch(
  `https://api.github.com/repos/aliyun-sls/sls-doc/commits?path=src/${page.value.relativePath}`
).get()

const json = reactive({
  isFinished,
  isFetching,
  canAbort,
  statusCode,
  error,
  data: computed(() => {
    try {
      const commits = JSON.parse(data.value as string)
      return commits
    } catch (e) {
      return null
    }
  }),
})
</script>

<template>
  <div class="vp-doc">
    <h2>贡献者</h2>
    <div>
      {{ json.data }}
      <!-- <div v-for="group in sidebar" :key="group.text" class="group">
        <VPSidebarGroup
          :text="group.text"
          :items="group.items"
          :collapsible="group.collapsible"
          :collapsed="group.collapsed"
        />
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
