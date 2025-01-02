<template>
  <div>
    <LayoutHeaderNavbar />
    <Auth v-if="!user" />
    <main class="container mx-auto">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
</script>
