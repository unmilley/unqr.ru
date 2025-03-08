import type { CornerDotType, CornerSquareType, DotType, ReturnedUseOptions, StateColor, UnqrOptions } from './types'

const dotsOptions: DotType[] = [
  'dot',
  'random-dot',
  'rounded',
  'extra-rounded',
  'vertical-line',
  'horizontal-line',
  'classy',
  'classy-rounded',
  'square',
  'small-square',
  'tiny-square',
  'diamond',
]

const cornersSquareOptions: CornerSquareType[] = ['dot', 'square', 'extra-rounded', 'classy', 'outpoint', 'inpoint']

const cornersDotOptions: CornerDotType[] = ['dot', 'square', 'heart', 'extra-rounded', 'classy', 'outpoint', 'inpoint']

const dotsTypes = {
  dotsOptions,
  cornersSquareOptions,
  cornersDotOptions,
}

export const useOptions = (
  options: Ref<UnqrOptions>,
  colorKey: string,
  type?: keyof Pick<UnqrOptions, 'dotsOptions' | 'cornersDotOptions' | 'cornersSquareOptions'>
): ReturnedUseOptions => {
  const isGradient = computed(() => colors.value.colorType === 'gradient')

  const colors = useState<StateColor>(colorKey, () => ({
    single: '#000000',
    gradient: ['#19191a', '#9629f6', 0],
    colorType: 'color',
  }))

  const dotsType = dotsTypes[type ?? 'dotsOptions']

  watchDebounced(
    [isGradient, () => colors.value],
    () => {
      if (!type) return
      const color = isGradient.value ? colors.value.gradient : colors.value.single
      if (type === 'dotsOptions') options.value[type] = { ...options.value[type], color }
      else if (type === 'cornersDotOptions') options.value[type] = { ...options.value[type], color }
      else if (type === 'cornersSquareOptions') options.value[type] = { ...options.value[type], color }
    },
    { debounce: 50, deep: true }
  )

  watch(
    () => colors.value.gradient[2],
    (val) => {
      colors.value.gradient[2] = Math.min(360, Math.max(0, val || 0))
    }
  )

  return {
    isGradient: readonly(isGradient),
    dotsType: readonly(dotsType),
    colors,
  }
}
