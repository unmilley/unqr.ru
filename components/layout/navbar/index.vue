<template>
  <Transition name="page">
    <div class="btm-nav md:flex-row md:bottom-4 md:bg-opacity-0" v-show="route.name !== 'index'">
      <div class="join md:cursor-auto flex-row gap-0 hidden md:inline-flex">
        <nuxt-link
          v-for="route in routers"
          :key="route.path"
          :to="route.path"
          class="join-item btn btn-outline bg-base-100"
          exact-active-class="!btn-primary"
        >
          {{ route.title }}
          <Icon :name="route.icon" class="size-5" />
        </nuxt-link>
      </div>
      <nuxt-link
        v-for="route in routers"
        :key="route.path"
        :to="route.path"
        class="flex md:hidden"
        exact-active-class="active"
      >
        <Icon :name="route.icon" class="size-5" />
        <span class="btm-nav-label">{{ route.title }}</span>
      </nuxt-link>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const route = useRoute()
const routers = [
  { title: 'Создать', path: '/qr', icon: 'bx:qr' },
  { title: 'Сканировать', path: '/scan', icon: 'bx:scan' },
  { title: 'Сократить', path: '/short', icon: 'bx:link-alt' },
]
</script>
