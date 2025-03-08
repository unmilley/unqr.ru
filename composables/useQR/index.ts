import { QRCodeStyling } from '@liquid-js/qr-code-styling'
import QrScanner from 'qr-scanner'
import { useApi } from './api'
import { useOptions } from './options'
import type { ShapeType, UnqrOptions, UseQRWithInitialOpt, UseQRWithoutInitialOpt } from './types'

const options = ref<UnqrOptions>({
  data: 'www.unqr.ru',
  dotsOptions: { type: 'square' },
  cornersSquareOptions: { type: 'square' },
  cornersDotOptions: { type: 'square' },
})
const qr = ref<QRCodeStyling>()

let isCreatedWatch = false
const createWatch = () => {
  watchDebounced(
    () => options.value,
    (opt) => qr.value?.update(normalizeOptions(opt)),
    { deep: true, debounce: 500 }
  )
}

export function useQR(): UseQRWithoutInitialOpt
export function useQR(initialOptions: UnqrOptions): UseQRWithInitialOpt

export function useQR(initialOptions?: UnqrOptions) {
  if (initialOptions) {
    const qr = new QRCodeStyling({ data: 'www.unqr.ru', ...normalizeOptions(initialOptions) })
    const qrBlob = computedAsync(
      async () =>
        new Blob([new Blob([(await qr.serialize()) ?? ''], { type: 'image/svg+xml' })], {
          type: 'image/svg+xml',
        }),
      new Blob(),
      { lazy: true }
    )

    const isReadable = computedAsync(
      async () => {
        const { data: url } = await QrScanner.scanImage(qrBlob.value, { returnDetailedScanResult: true })
        return options.value.data === url
      },
      false,
      { lazy: true }
    )

    const svgUrl = computed(() => useObjectUrl(qrBlob.value).value ?? '')
    return {
      svgUrl: readonly(svgUrl),
      isReadable: readonly(isReadable),
    }
  } else {
    onMounted(async () => {
      if (!qr.value) qr.value = new QRCodeStyling({ data: 'www.unqr.ru' })
      if (isCreatedWatch) return
      createWatch()
      isCreatedWatch = true
    })

    const qrBlob = computedAsync(
      async () => {
        console.log('hello')
        return new Blob([new Blob([(await qr.value?.serialize()) ?? ''], { type: 'image/svg+xml' })], {
          type: 'image/svg+xml',
        })
      },
      new Blob(),
      { lazy: true }
    )

    const isReadable = computedAsync(
      async () => {
        const { data: url } = await QrScanner.scanImage(qrBlob.value, { returnDetailedScanResult: true })
        return options.value.data === url
      },
      false,
      { lazy: true }
    )

    const svgUrl = computed(() => useObjectUrl(qrBlob.value).value ?? '')

    const changeShape = (type?: ShapeType) => {
      const bgColor = options.value.backgroundOptions?.color ?? '#ffffff'

      const nowShape = options.value.shape ?? 'square'

      if (type) {
        if (type === 'square' && nowShape !== 'square') {
          options.value = { ...options.value, backgroundOptions: { round: 0, color: bgColor }, shape: 'square' }
        } else if (type === 'circle' && nowShape !== 'circle') {
          options.value = { ...options.value, backgroundOptions: { round: 1, color: bgColor }, shape: 'circle' }
        }
      } else {
        if (nowShape === 'square') {
          options.value = { ...options.value, backgroundOptions: { round: 1, color: bgColor }, shape: 'circle' }
        } else {
          options.value = { ...options.value, backgroundOptions: { round: 0, color: bgColor }, shape: 'square' }
        }
      }
    }

    return {
      options,
      svgUrl: readonly(svgUrl),
      isReadable: readonly(isReadable),
      useApi,
      useOptions,
      changeShape,
    }
  }
}
