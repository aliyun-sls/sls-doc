<script setup lang="ts">
import { useData } from 'vitepress'
import { useFetch } from '@vueuse/core'
import { computed, reactive } from 'vue'

interface CommitAuthor {
  login: string
  avatar_url: string
  url: string
}

const { page } = useData()

const url = computed(
  () =>
    `https://api.github.com/repos/aliyun-sls/sls-doc/commits?path=src/${page.value.relativePath}&per_page=100`
)

const { data, error, statusCode, isFetching, isFinished, canAbort } = useFetch(url, {
  refetch: true,
}).get()

const authors = reactive({
  isFinished,
  isFetching,
  canAbort,
  statusCode,
  error,
  data: computed(() => {
    try {
      const authorMap: Record<string, CommitAuthor> = {}
      const commits = JSON.parse(data.value as string)
      commits.forEach((ct: any) => {
        if (ct.author !== null) {
          authorMap[ct.author.login] = ct.author
        }
      })
      return Object.keys(authorMap).map((key) => authorMap[key])
    } catch (e) {
      return []
    }
  }),
})
</script>

<template>
  <div class="vp-doc" v-if="authors.isFinished">
    <h2>贡献者（{{ authors.data.length }}）</h2>
    <div class="authors">
      <a
        v-for="author in authors.data"
        :key="author.login"
        :href="author.url"
        :title="author.login"
      >
        <img :src="author?.avatar_url" :alt="author.login" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.authors {
  display: flex;
  flex-wrap: wrap;
}

.authors a {
  margin-right: 16px;
  margin-bottom: 16px;
}

.authors img {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
</style>
