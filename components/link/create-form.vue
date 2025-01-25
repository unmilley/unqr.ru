<template>
  <div class="card card-compact bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
    <form class="card-body" @submit.prevent="createLink">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Ваша о-о-о-очень длинная ссылка</span>
        </label>
        <textarea
          ref="textarea"
          v-model="url"
          class="textarea textarea-primary resize-none"
          placeholder="Ссылочку сюда"
          autofocus
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text flex items-center">
            Описание
            <ui-dropdown :open="isInfoHover">
              <summary class="btn btn-circle btn-ghost btn-xs">
                <Icon name="bx:info-circle" size="1rem" />
              </summary>
              <div class="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64" ref="dropdownInfo">
                <div class="card-body">
                  <p>Необязательно: добавьте пояснения, если это необходимо</p>
                </div>
              </div>
            </ui-dropdown>
          </span>
          <span v-if="description" class="label-text-alt">{{ description.length }} / 40</span>
        </label>
        <input
          type="text"
          placeholder="Описание"
          class="input input-md input-bordered"
          maxlength="40"
          v-model="description"
        />
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text flex items-center">
            Приватность
            <ui-dropdown :open="isPrivateHover">
              <summary class="btn btn-circle btn-ghost btn-xs">
                <Icon name="bx:info-circle" size="1rem" />
              </summary>
              <div class="card compact bg-base-100 dropdown-content rounded-box z-[1] w-64" ref="dropdownPrivate">
                <div class="card-body">
                  <p>Приватность дает только ограничение просмотра количества посещений</p>
                  <p><span class="text-base-content/75">Примечание: </span> Только для авторизованных пользователей</p>
                  <p>
                    <span class="text-base-content/75">Исключение: </span>
                    <nuxt-link to="/dashboard" class="link">Панель управления</nuxt-link>
                  </p>
                </div>
              </div>
            </ui-dropdown>
          </span>
          <input type="checkbox" class="checkbox" v-model="isPrivate" :disabled="!user" />
        </label>
      </div>
      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <template v-if="!isLoading"> Создать </template>

          <template v-else>
            <Icon name="bx:loader-alt" class="animate-spin text-lg" />
          </template>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { setLatest } = useLatest()

const user = useSupabaseUser()

const { textarea, input: url } = useTextareaAutosize()
const description = ref('')
const isPrivate = ref(false)

const { baseUrl } = useRuntimeConfig().public

const [isLoading, toggleLoading] = useToggle(false)

const isGeneratedLink = ref('')

const dropdownInfo = ref<HTMLDivElement>()
const isInfoHover = useElementHover(dropdownInfo)

const dropdownPrivate = ref<HTMLDivElement>()
const isPrivateHover = useElementHover(dropdownPrivate)

watchThrottled(
  url,
  (url) => {
    description.value = transformDomain(url)
  },
  { throttle: 400 }
)

const createLink = async () => {
  toggleLoading()
  isGeneratedLink.value = ''
  const data = await $fetch('/api/url', {
    headers: useRequestHeaders(['cookie']),
    body: { desc: description.value, url: url.value, isPrivate: isPrivate.value },
    method: 'POST',
  })
  if (data) {
    isGeneratedLink.value = baseUrl + data
    setLatest({
      createAt: data.created_at,
      desc: data.description,
      full: data.full_link,
      hex: data.short_link,
    })
    console.log('OK')
  } else {
    console.log('ERR')
  }
  toggleLoading()
  url.value = ''
}
</script>
