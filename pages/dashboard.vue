<template>
  <div>
    <div class="card card-compact bg-base-100 ~w-96 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Сокращенные ссылки</h2>
        <div class="overflow-x-auto">
          <table class="table" v-if="data">
            <thead>
              <tr>
                <th></th>
                <th>Название</th>
                <th>Полная ссылка</th>
                <th>Сокращенная ссылка</th>
                <th>Просмотров</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(link, id) in data" :key="link.id" class="transition-colors hover:bg-base-300">
                <td>{{ id + 1 }}</td>
                <th>
                  {{ link.description }}
                </th>
                <td>
                  <DashboardTableFullLink :url="link.full_link" />
                </td>
                <td>
                  <DashboardTableShortLink :url="link.short_link" />
                </td>
                <td>{{ link.views }}</td>
              </tr>
            </tbody>
            <tfoot v-show="data.length >= 7">
              <tr>
                <th></th>
                <th>Название</th>
                <th>Полная ссылка</th>
                <th>Сокращенная ссылка</th>
                <th>Просмотров</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <!-- <pre>data: {{ data }}</pre> -->

    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form class="card-body" @submit.prevent="createLink">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Your link</span>
          </label>
          <input type="text" placeholder="Your link" class="input input-bordered" v-model="form.url" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input type="text" placeholder="Title" class="input input-bordered" v-model="form.title" />
        </div>
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })

const { data, error, refresh } = await useAsyncData('user-links', () =>
  $fetch('/api/dashboard/user-links', {
    headers: useRequestHeaders(['cookie']),
  })
)

const form = reactive({
  title: '',
  url: '',
})

watchThrottled(
  () => form.url,
  (url) => {
    form.title = transformDomain(url)
  },
  { throttle: 400 }
)

const createLink = async () => {
  const data = await $fetch('/api/dashboard/create-link', {
    headers: useRequestHeaders(['cookie']),
    body: form,
    method: 'POST',
  })
  if (data) {
    console.log('OK')
    refresh()
  } else {
    console.log('ERR')
  }
  form.title = ''
  form.url = ''
}
</script>
