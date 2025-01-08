/**
 * Generates a hexadecimal color code based on the given URL.
 *
 * @param url - The string from which the hash will be created.
 * @param withHash - Specifies whether to add a '#' character before the color code.
 *                 The default is false.
 *
 * @returns Hexadecimal color code as a string.
 *
 * ```js
 * generateHex('https://github.com/unmilley') //'34B773'
 * generateHex('https://milley.uno', true) //'#CE93E7'
 * ```
 */
export const generateHex = (url: string, withHash: boolean = false): string => {
  let hash = 0
  for (const char of url) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  }

  let code = (hash & 0xffffff).toString(16).padStart(6, '0').toUpperCase()
  const pairs = code.match(/.{1,2}/g) as [string, string, string]
  if (pairs.length === 3 && pairs[0] === pairs[1] && pairs[1] === pairs[2]) {
    code = pairs[0] + pairs[1][0]
  }
  return withHash ? `#${code}` : code
}
