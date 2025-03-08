/**
 * The `deepParseJson` function recursively parses a JSON string or object, handling nested arrays and
 * objects, and returns the parsed result.
 * @param {string | any[] | UnknownObject} jsonString - The `jsonString` parameter in the
 * `deepParseJson` function can be a string, an array, or an object (referred to as `UnknownObject` in
 * the type definition). The function recursively parses and converts the input JSON string, array, or
 * object into a deeply parsed and typed
 * @returns The `deepParseJson` function returns the parsed JSON data with deep parsing, converting any
 * nested JSON strings into their respective JavaScript objects.
 */
export const deepParseJson = <T = any>(jsonString: string | any[] | { [key: string]: any }): T => {
  if (typeof jsonString === 'string') {
    if (!Number.isNaN(Number(jsonString))) return jsonString as T
    try {
      return deepParseJson(JSON.parse(jsonString))
    } catch {
      return jsonString as T
    }
  }

  if (Array.isArray(jsonString)) return jsonString.map((val) => deepParseJson(val)) as T

  if (typeof jsonString === 'object' && jsonString !== null) {
    return Object.keys(jsonString).reduce(
      (obj, key) => Object.assign(obj, { [key]: deepParseJson(jsonString[key]) }),
      {}
    ) as T
  }

  return jsonString
}
