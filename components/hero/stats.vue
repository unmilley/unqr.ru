<template>
  <div class="flex flex-col gap-2 min-w-96 self-start">
    <div class="collapse collapse-plus bg-base-100">
      <input type="radio" name="stats" checked />
      <div class="collapse-title text-xl font-medium text-base-content/60">Сокращенные ссылки</div>
      <div class="collapse-content px-0 stats stats-vertical shadow bg-base-100 w-full">
        <div class="stat">
          <div class="stat-figure">
            <Icon name="bx:link-alt" class="inline-block size-8" />
          </div>
          <div class="stat-title">Создано</div>
          <div class="stat-value">{{ stats.totalLinks }}</div>
          <div class="stat-desc">
            Использовано
            <div class="tooltip" data-tip="Из 16777216">
              <button class="btn btn-outline btn-xs border-base-content/50 no-animation" @click="togglePercent()">
                {{ percentUsed }}%
              </button>
            </div>
          </div>
        </div>
        <div class="stat">
          <div class="stat-figure">
            <Icon name="bx:run" class="inline-block size-8" />
          </div>
          <div class="stat-title">Воспользовалось</div>
          <div class="stat-value">{{ stats.totalViews }}</div>
        </div>
      </div>
    </div>
    <div class="collapse collapse-plus bg-base-100">
      <input type="radio" name="stats" />
      <div class="collapse-title text-xl font-medium text-base-content/60">Общее</div>
      <div class="collapse-content px-0 stats stats-vertical shadow bg-base-100 w-full">
        <div class="stat">
          <div class="stat-figure">
            <Icon name="bx:bxs-user-account" class="inline-block size-8" />
          </div>
          <div class="stat-title">Пользователей создано</div>
          <div class="stat-value">{{ stats.totalUsers }}</div>
        </div>

        <div class="stat">
          <div class="stat-figure">
            <Icon name="bx:bxl-github" class="inline-block size-8" />
          </div>
          <div class="stat-title">Звезд на Github</div>
          <div class="stat-value">{{ stats.stars }}</div>
          <div class="stat-desc">
            <nuxt-link :href="`https://github.com/${gitRepo}`" target="_blank" class="btn-link text-base-content">
              Поставить
            </nuxt-link>
          </div>
        </div>
        <div class="stat">
          <div class="stat-title">Версия приложения</div>
          <div class="stat-value">{{ version }}</div>
          <div class="stat-desc">Последний коммит был {{ formatted }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { stats } = defineProps<{ stats: Stats }>()

const { appVersion: version, gitRepo } = useRuntimeConfig().public

const [isFullPercent, togglePercent] = useToggle(false)

const formatted = useDateFormat(stats.lastCommitAt, 'DD.MM.YYYY')

const percentUsed = computed(() => {
  const percent = (stats.totalLinks / Math.pow(256, 3)) * 100
  return isFullPercent.value ? percent : percent.toFixed(2)
})
</script>
