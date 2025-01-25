<template>
  <div>
    <ClientOnly>
      <div class="tooltip before:font-mono" :data-tip="copied ? 'В буфере!' : url" v-if="isSupported">
        <button @click="copy(url)" class="btn btn-ghost btn-xs gap-0 flex-nowrap text-nowrap font-mono">
          <Icon :name="secure.icon" :class="secure.color" />
          <span class="text-base-content/50">://</span>

          <span>{{ cropUrl }}</span>
        </button>
      </div>

      <div v-else>
        <button
          @click.passive="changeCrop()"
          class="btn btn-ghost btn-xs gap-0 flex-nowrap text-nowrap font-mono"
          :class="{ 'select-text': !isCrop }"
        >
          <template v-if="isCrop">
            <Icon :name="secure.icon" :class="secure.color" />
            <span class="text-base-content/50">://</span>

            <span>{{ cropUrl }}</span>
          </template>
          <template v-else>
            <span>{{ url }}</span>
          </template>
        </button>
      </div>

      <template #fallback>
        <div class="skeleton h-6 w-56"></div>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ url: string }>()

const [isCrop, changeCrop] = useToggle(true)
const { isSupported, copy, copied } = useClipboard()

const secure = computed(() => {
  const isHttps = props.url.startsWith('https')

  const icon = isHttps ? 'bx:lock-alt' : 'bx:lock-open-alt'
  const color = isHttps ? 'text-success/50' : 'text-error/50'

  return { icon, color }
})

const cropUrl = computed(() => {
  const url = props.url.replace(/https?:\/\//i, '')
  if (url.length <= 25) return url

  const cropped = url.slice(0, 18)
  const diff = url.length - 18
  return `${cropped}...[+${diff}]`
})
</script>
