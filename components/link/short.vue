<template>
  <div>
    <ClientOnly>
      <div class="tooltip before:font-mono" :data-tip="copied ? 'В буфере!' : previewUrl" v-if="isSupported">
        <button @click="copy(fullUrl)" class="btn btn-ghost btn-xs font-mono">{{ hex }}</button>
      </div>
      <div v-else>{{ fullUrl }}</div>

      <nuxt-link
        :href="fullUrl"
        :title="hex"
        target="_blank"
        class="btn btn-square btn-xs"
        :style="`background-color: #${hex}`"
      >
        <Icon name="bx:link-external" :style="`color: ${luminance(hex)}`" />
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
const props = defineProps<{ hex: string }>()
const { public: config } = useRuntimeConfig()
const { isSupported, copy, copied } = useClipboard()

const fullUrl = computed(() => `${config.baseUrl}/${props.hex}`)
const previewUrl = computed(() => fullUrl.value.replace(/https?:\/\//i, ''))
</script>
