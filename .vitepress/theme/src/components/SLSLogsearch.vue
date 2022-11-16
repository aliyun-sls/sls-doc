<script lang="ts" setup>
import URI from 'urijs'
import { computed } from 'vue'

const location = window.location

const params = computed(() => {
  const parsedQuery = URI(decodeURIComponent(location.search)).escapeQuerySpace(false).query(true)
  if (parsedQuery == null || parsedQuery.url == null) {
    return {}
  }
  let uri = parsedQuery.url + '?'
  delete parsedQuery.url
  Object.keys(parsedQuery).forEach((key) => {
    uri += key + '=' + parsedQuery[key] + '&'
  })
  return {
    uri,
  }
})
</script>

<template>
  <iframe :src="params.uri" class="frame"> </iframe>
</template>

<style scoped>
.frame {
  height: calc(100vh - (var(--sls-topnav-height)) - (var(--sls-footer-height)));
  width: 100vw;
  border: none;
  outline: none;
  max-width: var(--sls-page-max-width);
  margin: auto;
}
</style>
