<template>
  <div>
    <LayoutHeaderNavbar />
    <main class="container mx-auto mb-16">
      <slot />
      <LayoutNavbar />
      <Auth v-if="!user" />
    </main>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
</script>
