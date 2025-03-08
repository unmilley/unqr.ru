import type { Gradient, HexColor, QrColors, UnqrOptions } from './types'

export const normalizeOptions = (opt: UnqrOptions) => {
  const normalizeOptionsAsEntries = Object.entries(opt).map(([key, val]) => {
    if (typeof val === 'object' && 'color' in val && val.color) {
      return [key, { ...val, ...convertColor(val.color) }]
    }
    return [key, val]
  })
  return Object.fromEntries(normalizeOptionsAsEntries)
}

export const checkHex = (hex: string): HexColor => {
  const hexPattern = /^#?([0-9A-Fa-f]{3}){1,2}$/
  if (!hexPattern.test(hex)) throw new Error('Please provide a valid hex code')

  hex = hex.replace(/^#/, '')
  hex = hex.length === 3 ? hex + hex : hex

  return `#${hex}`
}

export const convertColor = (
  color: QrColors
): { color: HexColor; gradient?: undefined } | { color?: undefined; gradient: Gradient } => {
  if (!Array.isArray(color)) return { color: checkHex(color), gradient: undefined }
  return {
    gradient: {
      type: 'linear',
      rotation: color[2],

      colorStops: [
        { offset: 0, color: checkHex(color[0]) },
        { offset: 1, color: checkHex(color[1]) },
      ],
    } as Gradient,
    color: undefined,
  }
}

export const fileToBase64 = (file: File): Promise<string> => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Failed to convert file to Base64.'))
    }
    reader.onerror = (error) => reject(error)
  })
}
