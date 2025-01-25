<template>
  <UiDropdown class="dropdown-end" :class="{ 'dropdown-top': length <= idx }">
    <summary class="btn btn-ghost btn-xs relative z-[2]">
      <Icon name="bx:detail" size="1rem" />
    </summary>
    <ul
      class="menu menu-sm dropdown-content bg-base-100 border border-base-content/50 mt-3 w-48 rounded-box z-[3] p-2 shadow"
    >
      <li class="menu-title" v-if="!isRename">{{ description }}</li>
      <li class="menu-title !px-0" v-else>
        <input
          type="text"
          class="input input-bordered input-sm w-full"
          @keydown.enter="toggleRename()"
          maxlength="40"
          v-model="newDesc"
          ref="renameInput"
        />
      </li>
      <li :class="{ disabled: isRename }">
        <a @click.prevent="emit('toggle-freeze', !isFrozen, idx)">{{ isFrozen ? 'Разморозить' : 'Заморозить' }}</a>
      </li>
      <ui-list-divider />
      <li :class="{ disabled: isFrozen }">
        <a @click.prevent="toggleRename()">{{ isRename ? 'Сохранить' : 'Переименовать' }}</a>
      </li>
      <ui-list-divider />
      <li :class="{ disabled: isRename || isFrozen }">
        <a @click.prevent="emit('delete', idx)">Удалить</a>
      </li>
    </ul>
  </UiDropdown>
</template>

<script lang="ts" setup>
const props = defineProps<{ description: string; idx: number; length: number; isFrozen: boolean }>()

const renameInput = ref<HTMLInputElement>()
const [isRename, toggleRename] = useToggle(false)
const newDesc = ref(props.description)
const emit = defineEmits<{
  edit: [desc: string, idx: number]
  'toggle-freeze': [value: boolean, idx: number]
  delete: [idx: number]
}>()

watch(isRename, (val) => {
  if (val) {
    nextTick(() => renameInput.value?.focus())
  } else {
    if (newDesc.value === props.description) return
    emit('edit', newDesc.value, props.idx)
  }
})
</script>
