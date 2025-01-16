<template>
  <section class="hero min-h-[calc(100dvh-65px)]">
    <div class="hero-content flex-col-reverse lg:flex-row-reverse">
      <HeroStats v-if="data" :stats="data" />
      <div>
        <h1 class="text-5xl text-pretty font-bold">Создание QR-кодов и сокращение ссылок с помощью unQR</h1>
        <p class="py-6 text-pretty">
          Создавайте QR-коды и сокращайте ссылки с помощью unQR. Создавайте, отслеживайте и управляйте QR-кодами и
          ссылками в одном месте.
        </p>
        <div class="flex gap-2 mb-2">
          <nuxt-link to="/qr" class="btn btn-primary">Создать свой QR код</nuxt-link>
          <nuxt-link to="/scan" class="btn btn-primary">Расшифровать QR код</nuxt-link>
        </div>
        <div class="flex gap-2">
          <nuxt-link to="/short" class="btn btn-primary">Создать сокращенную ссылку</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData('stats', () => $fetch('/api/stats'))
</script>
