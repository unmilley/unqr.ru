<template>
  <header class="navbar bg-base-100">
    <div class="navbar-start">
      <nuxt-link to="/" class="btn btn-ghost text-3xl font-logo">
        <Icon name="unqr:logo" size="2rem" />
        <span>unQR</span>
      </nuxt-link>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end">
      <layout-header-theme />
      <layout-header-user />
    </div>
  </header>
</template>

<script lang="ts" setup></script>
