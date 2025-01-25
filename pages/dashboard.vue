<template>
  <section class="min-h-[calc(100dvh-65px)] mt-4">
    <div class="card card-compact max-w-max bg-base-100 mx-auto shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-between">
          Сокращенные ссылки
          <div class="tooltip" data-tip="Обновить">
            <button
              class="btn btn-square btn-ghost btn-md text-base-content text-opacity-50 hover:text-opacity-100"
              @click="refresh()"
              title="Обновить"
            >
              <Icon name="bx:revision" size="1.25rem" />
            </button>
          </div>
        </h2>
        <div class="overflow-x-auto overflow-y-scroll">
          <table class="table table-sm" v-if="data">
            <thead>
              <tr>
                <th
                  v-for="t in tableTitles"
                  :key="t.sortBy"
                  @click="toggleSort(t.sortBy)"
                  class="cursor-pointer drop-shadow transition-colors hover:bg-base-300"
                  :class="{ 'sticky left-0 z-[1] bg-base-100': t.sortBy === 'desc' }"
                >
                  <span class="flex justify-between items-center gap-2">
                    {{ t.title }}

                    <Icon
                      :class="{ invisible: sortBy.key !== t.sortBy }"
                      :name="sortBy.order === 'asc' ? 'bx:bxs-up-arrow' : 'bx:bxs-down-arrow'"
                    />
                  </span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody v-auto-animate>
              <tr
                v-for="(link, idx) in data"
                :key="link.id"
                class="relative disabled transition-colors group hover:bg-base-300"
                :class="{
                  'after:bg-base-300/75 after:h-full after:w-full after:left-0 after:absolute after:z-[1]':
                    link.is_frozen,
                }"
              >
                <td>{{ link.index + 1 }}</td>
                <th class="sticky left-0 z-[1] bg-base-100 drop-shadow-sm transition-colors group-hover:bg-base-300">
                  {{ link.description }}
                </th>
                <td>
                  <link-full :url="link.full_link" />
                </td>
                <td>
                  <link-short :hex="link.short_link" />
                </td>
                <td>{{ link.views }}</td>
                <th>
                  <DashboardTableDetails
                    :description="link.description"
                    :length="data.length - 3"
                    :is-frozen="link.is_frozen"
                    :idx="idx"
                    @edit="renameLink"
                    @toggle-freeze="toggleFreeze"
                    @delete="deleteLink"
                  />
                </th>
              </tr>
            </tbody>
            <tfoot v-show="data.length >= 7">
              <tr>
                <th
                  v-for="t in tableTitles"
                  :key="t.sortBy"
                  :class="{ 'sticky left-0 z-[1] bg-base-100': t.sortBy === 'desc' }"
                >
                  {{ t.title }}
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { vAutoAnimate } from '@formkit/auto-animate'
definePageMeta({ middleware: 'auth' })

type TableTitles = { title: string; sortBy: SortBy['key'] }
type SortBy = { key: 'id' | 'desc' | 'full' | 'short' | 'view'; order: 'asc' | 'desc' }

const tableTitles: TableTitles[] = [
  { title: '№', sortBy: 'id' },
  { title: 'Описание', sortBy: 'desc' },
  { title: 'Полная ссылка', sortBy: 'full' },
  { title: 'Сокращенная ссылка', sortBy: 'short' },
  { title: 'Просмотров', sortBy: 'view' },
]

const { data, refresh } = await useAsyncData<Link[]>('user-links', () =>
  $fetch('/api/url/user', {
    headers: useRequestHeaders(['cookie']),
  })
)

const sortBy = reactive<SortBy>({ key: 'id', order: 'asc' })

const toggleSort = (key: SortBy['key']) => {
  if (sortBy.key === key) sortBy.order = sortBy.order === 'asc' ? 'desc' : 'asc'
  else {
    sortBy.key = key
    sortBy.order = 'asc'
  }
}

const sortLinks = ({ key, order }: SortBy) => {
  if (!data.value) {
    data.value = []
    return
  }

  data.value = [...data.value].toSorted((a, b) => {
    let comparison = 0
    switch (key) {
      case 'id':
        comparison = a.index - b.index
        break
      case 'desc':
        comparison = (a.description || '').localeCompare(b.description || '')
        break
      case 'full':
        comparison = a.full_link.localeCompare(b.full_link)
        break
      case 'short':
        comparison = a.short_link.localeCompare(b.short_link)
        break
      case 'view':
        comparison = a.views - b.views
        break
      default:
        break
    }
    return order === 'asc' ? comparison : -comparison
  })
}
watchImmediate(sortBy, sortLinks)

const renameLink = async (desc: string, idx: number) => {
  if (!data.value) return
  await $fetch('/api/url', {
    method: 'PUT',
    body: { newDesc: desc, id: data.value[idx].id, evt: 'rename' },
  })
  if (data.value) data.value[idx].description = desc
}
const toggleFreeze = async (value: boolean, idx: number) => {
  if (!data.value) return
  await $fetch('/api/url', {
    method: 'PUT',
    body: { freeze: value, id: data.value[idx].id, evt: 'freeze' },
  })
  if (data.value) data.value[idx].is_frozen = value
}
const deleteLink = async (idx: number) => {
  if (!data.value) return
  await $fetch('/api/url', {
    method: 'DELETE',
    body: { id: data.value[idx].id },
  })
  if (data.value) {
    data.value.splice(idx, 1)
    data.value = data.value.map((val, index) => {
      if (index >= idx) return { ...val, index: val.index - 1 }
      return val
    })
  }
}
</script>
