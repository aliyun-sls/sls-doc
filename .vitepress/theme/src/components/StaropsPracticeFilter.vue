<script setup lang="ts">
import { onMounted, ref } from 'vue'

type PracticeGroup = {
  button: HTMLButtonElement
  section: HTMLElement
  label: string
  count: number
}

const total = ref(27)
const countText = ref('共 27 篇实践')
const canReset = ref(false)

let groups: PracticeGroup[] = []
let active = ''

function apply(group: string) {
  active = group
  groups.forEach((item) => {
    const current = item.button.dataset.group === group
    item.button.setAttribute('aria-pressed', String(current))
    item.section.hidden = group !== '' && !current
    const head = item.section.querySelector('.sls-starops-section__head')
    if (head instanceof HTMLElement) head.hidden = group !== ''
  })

  const picked = groups.find((item) => item.button.dataset.group === group)
  canReset.value = group !== ''
  countText.value = picked ? `已筛选 · ${picked.label} ${picked.count} 篇` : `共 ${total.value} 篇实践`
}

onMounted(() => {
  const root = document.querySelector('.sls-starops-home')
  if (!root) return

  total.value = root.querySelectorAll('.sls-starops-card').length
  countText.value = `共 ${total.value} 篇实践`

  groups = Array.from(root.querySelectorAll<HTMLButtonElement>('.sls-starops-scene-card[data-group]'))
    .map((button) => {
      const section = root.querySelector<HTMLElement>(`#${button.dataset.group}`)
      if (!section) return null
      const label = button.querySelector('.sls-starops-scene-card__title')?.textContent?.trim() || ''
      return { button, section, label, count: section.querySelectorAll('.sls-starops-card').length }
    })
    .filter((item): item is PracticeGroup => item !== null)

  groups.forEach((item) => {
    item.button.addEventListener('click', () => {
      const group = item.button.dataset.group || ''
      apply(active === group ? '' : group)
    })
  })
})
</script>

<template>
  <div class="sls-starops-filter-bar">
    <p class="sls-starops-filter-bar__count" aria-live="polite">{{ countText }}</p>
    <button v-if="canReset" class="sls-starops-filter-bar__reset" type="button" @click="apply('')">
      显示全部 {{ total }} 篇
    </button>
  </div>
</template>