<template>
  <div>
    <button v-if="!user" @click="openModal()" class="btn btn-primary">Войти</button>
    <UiDropdown v-else class="dropdown-end">
      <summary class="btn btn-ghost">
        <div class="avatar">
          <div class="w-9 rounded-full">
            <img alt="avatar" :src="user.user_metadata.avatar_url" />
          </div>
        </div>

        {{ user.user_metadata.user_name }}
      </summary>
      <ul class="menu menu-sm dropdown-content bg-base-100 mt-3 rounded-box z-[1] p-2 shadow">
        <li>
          <nuxt-link to="/dashboard" class="justify-between">Панель управления</nuxt-link>
        </li>
        <div class="divider my-0"></div>
        <li><a @click.prevent="handleSignOut">Выйти</a></li>
      </ul>
    </UiDropdown>
  </div>
</template>

<script lang="ts" setup>
const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const handleSignOut = async () => {
  await auth.signOut()
  navigateTo('/')
}

const { open: openModal } = useModal('auth')
</script>
