import sharp from 'sharp'
import type { Format } from '../schema'

export const convertBuffer = async (input: string, format: Format): Promise<Buffer> => {
  const content = Buffer.from(loadSVGContent(input))
  if (format === 'svg') return content
  try {
    let outputBuffer: Buffer

    switch (format) {
      case 'png':
        outputBuffer = await sharp(content).png().toBuffer()
        break
      case 'webp':
        outputBuffer = await sharp(content).webp().toBuffer()
        break
      case 'jpg':
      case 'jpeg':
        outputBuffer = await sharp(content).jpeg().toBuffer()
        break
      default:
        throw new Error('Unsupported format')
    }

    return outputBuffer
  } catch (error) {
    console.error('Error converting buffer:', error)
    throw error
  }
}

const loadSVGContent = (svg: string): string => {
  if (svg.indexOf('data:image/svg+xml;base64,') >= 0 && !/^<svg/.test(svg)) {
    return atob(svg.substring('data:image/svg+xml;base64,'.length))
  } else if (svg.indexOf('<svg') >= 0) {
    return svg
  }
  throw new Error('loadSVGContent')
}
