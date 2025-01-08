/**
 * Converts a URL to a domain name with a capital letter and colon at the end.
 *
 * This method extracts the domain name from the passed URL and returns it in a special format.
 * If the URL is invalid or empty, the method will return an empty string.
 *
 * @param {string} url - The URL from which the domain name is to be extracted.
 *                       The URL is expected to be correctly formed.
 * @returns {string} Returns the domain name, capitalized with a colon at the end,
 *                   or an empty string if the URL is empty or invalid.
 *
 * @example
 * transformDomain('https://www.google.com/sea...[+204]') // 'Google:'
 */
export const transformDomain = (url: string): string => {
  if (!url) return ''
  try {
    const { hostname } = new URL(url)
    const parts = hostname.split('.')

    if (parts.length >= 2) {
      const domain = parts[parts.length - 2]
      return `${domain.charAt(0).toUpperCase() + domain.slice(1)}:`
    }
    return hostname
  } catch {
    return ''
  }
}
