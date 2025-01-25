<template>
  <div class="card card-compact bg-base-100 w-full max-w-sm md:max-w-72 mx-auto shadow-2xl">
    <div class="card-body !px-0 gap-4 relative">
      <h2 class="card-title pl-4">Последнии</h2>
      <ClientOnly>
        <div class="stats overflow-visible stats-vertical shadow" v-auto-animate>
          <template v-if="latest.length">
            <div v-for="(l, idx) in latest" :key="l.hex" class="stat place-items-center *:text-base-content">
              <div class="stat-title" :class="{ 'badge !badge-primary': idx === 0 && isNew }">
                {{ l.desc }}
              </div>
              <div class="stat-title"><link-full :url="l.full" /></div>
              <div class="stat-title"><link-short :hex="l.hex" /></div>
              <div class="stat-desc font-mono !text-base-content/60">
                {{ useDateFormat(l.createAt, 'DD.MM.YYYY HH:mm:ss') }}
              </div>
            </div>
          </template>
          <template v-else>
            <div class="stat place-items-center *:text-base-content">
              <div class="stat-title my-4">Не часто Вы сокращаете ссылки 🤔</div>
            </div>
          </template>
        </div>
        <template #fallback>
          <div class="flex flex-col gap-1.5 justify-center items-center w-full h-[6.75rem]">
            <div class="skeleton w-20 h-4"></div>
            <div class="skeleton w-52 h-4"></div>
            <div class="flex gap-1">
              <div class="skeleton h-6 w-[3.5rem] rounded-btn"></div>
              <div class="skeleton h-6 w-6 rounded-btn"></div>
            </div>
            <div class="skeleton w-32 h-4"></div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
const { latest, isNew } = useLatest()
</script>
