<template>
  <UiDropdown class="dropdown-end">
    <summary class="btn btn-ghost btn-square ~btn-outline">
      <Icon name="bx:palette" size="1.5rem" />
    </summary>
    <ul class="menu dropdown-content bg-base-100 mt-3 rounded-box z-[1] w-36">
      <li v-for="theme in themes" :key="theme.title">
        <a
          :class="{ active: $colorMode.preference === theme.value }"
          @click.prevent="$colorMode.preference !== theme.value && ($colorMode.preference = theme.value)"
        >
          <Icon :name="theme.icon" />
          {{ theme.title }}
        </a>
      </li>
    </ul>
  </UiDropdown>
</template>

<script lang="ts" setup>
const { $colorMode } = useNuxtApp()
type Themes = { title: string; icon: string; value: string }

const themes = computed((): Themes[] => [
  { title: 'Dark', icon: 'bx:bxs-moon', value: 'dark' },
  { title: 'Light', icon: 'bx:bxs-sun', value: 'light' },
  { title: 'System', icon: 'bx:desktop', value: 'system' },
])
</script>
