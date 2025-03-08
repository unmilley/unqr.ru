import type { ApiOptions, UnqrOptions } from './types'

const longOptionKeys: Record<string, string> = {
  data: 'data',
  shape: 'shape',
  dotsOptions: 'do',
  cornersSquareOptions: 'cso',
  cornersDotOptions: 'cdo',
  backgroundOptions: 'bo',
  qrOptions: 'qo',
}

export const useApi = (options: Ref<UnqrOptions>, apiOpt?: Partial<ApiOptions>): ComputedRef<string> => {
  const { domain = 'https://unqr.ru/api/qr', isEncode = true } = apiOpt || {}
  return computed(() => {
    const query = Object.entries(options.value)
      .map(([key, value]) => {
        key = longOptionKeys[key]
        if (!key) return ''
        value = JSON.stringify(value).replaceAll('#', '')
        if (isEncode) return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        else return `${key}=${value}`
      })
      .filter((el) => el)
      .join('&')
    return `${domain}${domain.endsWith('?') ? '' : '?'}${query}`
  })
}
