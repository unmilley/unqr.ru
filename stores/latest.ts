import type { LatestLink } from '@/types'
import { useStorage } from '@vueuse/core'

export const useLatest = () => {
  const latest = useStorage<LatestLink[]>('latest-short-links', () => [], undefined, {
    serializer: {
      read: (v: any) => {
        const parsed = v ? (JSON.parse(v) as LatestLink[]) : null
        if (!parsed || !Array.isArray(parsed)) return []
        return parsed.sort((a, b) => +new Date(b.createAt) - +new Date(a.createAt))
      },
      write: (v: LatestLink[]) => JSON.stringify(v.sort((a, b) => +new Date(b.createAt) - +new Date(a.createAt))),
    },
    mergeDefaults: true,
    initOnMounted: true,
  })

  const isNew = computed(() => {
    if (!latest.value.length) return false
    const now = +useNow({ interval: 1e3 }).value
    const late = +new Date(latest.value[0].createAt)
    const isN = now - late <= 3e4
    return isN
  })

  const setLatest = (item: LatestLink) => {
    if (latest.value.map(({ hex }) => hex).includes(item.hex)) return
    if (latest.value.length < 5) latest.value.push(item)
    else latest.value[latest.value.length - 1] = item
  }

  return {
    latest,
    isNew,
    setLatest,
  }
}
