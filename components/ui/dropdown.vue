<template>
  <details class="dropdown" v-bind="$attrs" ref="details">
    <slot />
  </details>
</template>

<script lang="ts" setup>
const details = ref<HTMLDetailsElement>()
onClickOutside(details, () => (details.value!.open = false))
</script>
