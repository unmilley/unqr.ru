/**
 * A function to calculate the brightness of a color by its hex code and determine whether it is light or dark.
 *
 * @param {string} hex Hex color code. Can be in format with or without “#”.
 *                     Can be either 3-digit or 6-digit.
 * @return {'black' | 'white'} Returns `'white'` if the color is light, `'black'` if it is dark
 *
 * @throws Will throw an error if `hex` is invalid.
 *
 * @example
 * ```js
 * luminance("#000000") // 'black'
 * luminance("ffffff")  // 'white'
 * luminance("808")     // 'black'
 * ```
 */
export const luminance = (hex: string): 'black' | 'white' => {
  const hexPattern = /^#?([0-9A-Fa-f]{3}){1,2}$/
  if (!hexPattern.test(hex)) throw new Error('Please provide a valid hex code')

  hex = hex.replace(/^#/, '')
  hex = hex.length === 3 ? hex + hex : hex

  const [r, g, b] = [0, 2, 4].map((startIdx) => {
    const x = parseInt(hex.substring(startIdx, startIdx + 2), 16) / 255
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  })

  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum >= 0.5 ? 'black' : 'white'
}
