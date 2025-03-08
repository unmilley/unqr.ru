import { QRCodeStyling, type Options } from '@liquid-js/qr-code-styling'
import defu from 'defu'
import type { PresentQrOption } from '~/composables/useQR/types'
import { optionsSchema, type Format, type OptionsSchema } from '~/server/schema'

const shortOptionKeys: Record<string, string> = {
  data: 'data',
  shape: 'shape',
  do: 'dotsOptions',
  cso: 'cornersSquareOptions',
  cdo: 'cornersDotOptions',
  bo: 'backgroundOptions',
  qo: 'qrOptions',
}

const mimeTypes: Record<Format, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  webp: 'image/webp',
}

export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedQuery(event, async (body) => {
      console.log('body: ', body)
      const parsedBody = deepParseJson<OptionsSchema>(JSON.stringify(body))
      parsedBody.view = 'view' in parsedBody
      if ((parsedBody.format === 'jpeg' || parsedBody.format === 'jpg') && !parsedBody.bo?.color) {
        parsedBody.bo = { ...parsedBody.bo, color: 'ffffff' }
      }

      if (!parsedBody.preset) return optionsSchema.parse(parsedBody)

      const preset = (await event.$fetch(`/api/qr/presets/${parsedBody.preset}`)) as string
      const parsedPreset = deepParseJson<PresentQrOption>(preset || {})

      return optionsSchema.parse(defu(parsedBody, parsedPreset))
    })

    const options: Partial<Options> = Object.fromEntries(
      Object.entries(query).map(([key, val]) => {
        if (typeof val === 'object' && 'color' in val && val.color) {
          return [shortOptionKeys[key], { ...val, ...convertColor(val.color) }]
        }
        return [shortOptionKeys[key], val]
      })
    )

    const qrCode = (await new QRCodeStyling(options).serialize()) ?? ''
    if (!qrCode) throw createError('no svgCode')

    const buffer = await convertBuffer(qrCode, query.format)

    const mimeType = mimeTypes[query.format]
    setHeaders(event, {
      'Content-Type': mimeType,
      'Content-Disposition': `${query.view ? 'inline' : 'attention'}; filename="qr-code.${query.format}"`,
      'Content-Length': buffer.length,
    })

    return send(event, buffer, mimeType)
  } catch (error) {
    console.log('error: ', error)
    return send(event, Buffer.from([]), 'image/png')
  }
})
