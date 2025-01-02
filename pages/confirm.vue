<template>
  <div class="flex flex-row items-end">
    <p v-if="query.provider">[{{ query.provider }}] ~&nbsp;</p>
    <p>Redirecting</p>
    <Icon name="eos-icons:three-dots-loading" size="1.25rem" />
  </div>
</template>

<script setup lang="ts">
const { query } = useRoute()
const user = useSupabaseUser()
watchImmediate(user, () => user.value && navigateTo('/tasks'))
</script>
