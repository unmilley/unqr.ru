<template>
  <Modal title="auth" :buttons="{ enabled: false }">
    <div class="~border border-b-2 border-dashed border-base-content/50 h-10 mb-4">
      <h1 class="text-xl">Авторизоваться</h1>
    </div>
    <div class="flex flex-col sm:flex-row justify-evenly gap-2 items-center">
      <template v-for="p in providers" :key="p.provider">
        <button class="btn btn-primary" @click="handleSighIn(p.provider)">
          <Icon :name="p.icon" size="1.5rem" />
          Войти через {{ p.title }}
        </button>
      </template>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
const providers = [
  { title: 'Github', icon: 'bx:bxl-github', provider: 'github' },
  { title: 'Google', icon: 'bx:bxl-google', provider: 'google' },
]

const handleSighIn = (provider: any) => {
  return useSupabaseClient().auth.signInWithOAuth({
    provider,
    options: { redirectTo: `/confirm?provider=${provider}` },
  })
}
</script>
