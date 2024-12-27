const fs = require('fs')
const path = require('path')

/**
 *
 * @param {string} filePath
 * @param {string} searchValue
 * @param {string} replaceValue
 */
function replaceInFile(filePath, searchValue, replaceValue) {
  // Читаем содержимое файла
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Ошибка при чтении файла ${filePath}:`, err)
      return
    }
    // Заменяем строку
    const result = data.replace(searchValue, replaceValue)

    // Записываем обратно в файл
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) console.error(`Ошибка при записи файла ${filePath}:`, err)
      else console.log(`Файл ${filePath} успешно обновлен.`)
    })
  })
}
/**
 *
 * @param {string} relativePath
 * @returns string | null
 */
function generatePath(relativePath) {
  const baseDir = path.join(__dirname, 'node_modules/.pnpm')
  const parts = relativePath.split('/')
  const fileName = parts.shift()
  const packageName = parts.join('/')

  const packageDirs = fs.readdirSync(baseDir).filter((dir) => dir.startsWith(fileName))

  for (const dir of packageDirs) {
    const fullPath = path.join(baseDir, dir, packageName)
    if (fs.existsSync(fullPath)) return fullPath
  }

  return null
}

const searchValue = `require("punycode");`
const replaceValue = `require("punycode/");`
const filesToFind = ['whatwg-url/node_modules/whatwg-url/lib/url-state-machine.js', 'tr46/node_modules/tr46/index.js']

// Проверка каждого файла
filesToFind.forEach((file) => {
  const result = generatePath(file)
  if (result) {
    replaceInFile(result, searchValue, replaceValue)
  } else {
    console.log(`Not found: ${file}`)
  }
})
