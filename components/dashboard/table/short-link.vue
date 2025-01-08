<template>
  <div>
    <ClientOnly>
      <div class="tooltip before:font-mono" :data-tip="copied ? 'В буфере!' : previewUrl" v-if="isSupported">
        <button @click="copy(fullUrl)" class="btn btn-ghost btn-xs font-mono">
          {{ url }}
        </button>
      </div>
      <div v-else>
        {{ fullUrl }}
      </div>

      <nuxt-link :href="fullUrl" rel="noopener noreferrer" target="'_blank'" class="btn btn-square btn-xs">
        <Icon name="bx:link-external" />
      </nuxt-link>

      <template #fallback>
        <div class="flex gap-0.5">
          <div class="skeleton h-6 w-[3.5rem] rounded-btn"></div>
          <div class="skeleton h-6 w-6 rounded-btn"></div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const prop = defineProps<{ url: string }>()
const { public: config } = useRuntimeConfig()
const { isSupported, copy, copied } = useClipboard()

const fullUrl = computed(() => `${config.baseUrl}/${prop.url}`)
const previewUrl = computed(() => fullUrl.value.replace(/https?:\/\//i, ''))
</script>
