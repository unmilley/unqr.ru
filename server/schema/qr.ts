import {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  Mode,
  ShapeType,
} from '@liquid-js/qr-code-styling'
import { z } from 'zod'

export const Formats = ['jpeg', 'jpg', 'png', 'svg', 'webp'] as const

export const colorSchema = z.union([z.tuple([z.string(), z.string(), z.number().min(0).max(360)]), z.string()])

export const optionsSchema = z.object({
  data: z.string().default('www.unqr.ru'),
  shape: z.nativeEnum(ShapeType).optional(),
  do: z
    .object({
      type: z.nativeEnum(DotType).optional(),
      color: colorSchema.optional(),
      size: z.number().optional(),
    })
    .optional(),
  cso: z
    .object({
      type: z.nativeEnum(CornerSquareType).optional(),
      color: colorSchema.optional(),
    })
    .optional(),
  cdo: z
    .object({
      type: z.nativeEnum(CornerDotType).optional(),
      color: colorSchema.optional(),
    })
    .optional(),
  bo: z
    .object({
      round: z.number().min(0).max(1).optional(),
      color: colorSchema.optional(),
      margin: z.number().min(0).optional(),
    })
    .optional(),
  qo: z
    .object({
      typeNumber: z.number().min(0).max(40).optional(),
      mode: z.nativeEnum(Mode).optional(),
      errorCorrectionLevel: z.nativeEnum(ErrorCorrectionLevel).optional(),
    })
    .optional(),
  format: z.enum(Formats).default('svg'),
  view: z.boolean().default(false),
})

export type OptionsSchema = z.infer<typeof optionsSchema> & { preset?: string }
export type Format = OptionsSchema['format']

export const presetSchema = z.object({
  shape: z.nativeEnum(ShapeType).optional(),
  do: z
    .object({
      type: z.nativeEnum(DotType).optional(),
      color: colorSchema.optional(),
      size: z.number().optional(),
    })
    .optional(),
  cso: z
    .object({
      type: z.nativeEnum(CornerSquareType).optional(),
      color: colorSchema.optional(),
    })
    .optional(),
  cdo: z
    .object({
      type: z.nativeEnum(CornerDotType).optional(),
      color: colorSchema.optional(),
    })
    .optional(),
  bo: z
    .object({
      round: z.number().min(0).max(1).optional(),
      color: colorSchema.optional(),
      margin: z.number().min(0).optional(),
    })
    .optional(),
  qo: z
    .object({
      typeNumber: z.number().min(0).max(40).optional(),
      mode: z.nativeEnum(Mode).optional(),
      errorCorrectionLevel: z.nativeEnum(ErrorCorrectionLevel).optional(),
    })
    .optional(),
})
