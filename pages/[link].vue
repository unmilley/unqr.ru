<template>
  <div></div>
</template>

<script lang="ts" setup>
const color = computed(() => useRoute().params.link.toString())
definePageMeta({ layout: 'empty' })

const { data } = await useAsyncData(color.value, () => $fetch(`/api/redirect/${color.value}`))
watchImmediate(data, () => {
  data.value && navigateTo(data.value.url, { external: true, redirectCode: 302, replace: true })
})
</script>
