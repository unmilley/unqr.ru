import type {
  CornerDotType as _CornerDotType,
  CornerSquareType as _CornerSquareType,
  DotType as _DotType,
  ErrorCorrectionLevel as _ErrorCorrectionLevel,
  GradientType as _GradientType,
  Mode as _Mode,
  ShapeType as _ShapeType,
  TypeNumber as _TypeNumber,
  Options,
} from '@liquid-js/qr-code-styling'
export type { Options }

export type DotType = `${_DotType}`
export type CornerSquareType = `${_CornerSquareType}`
export type CornerDotType = `${_CornerDotType}`
export type GradientType = `${_GradientType}`
export type TypeNumber = `${_TypeNumber}`
export type Mode = `${_Mode}`
export type ErrorCorrectionLevel = `${_ErrorCorrectionLevel}`
export type ShapeType = `${_ShapeType}`

export type AllDotsTypes = DotType | CornerSquareType | CornerDotType

export type Gradient = {
  type: GradientType
  rotation: number
  colorStops: [{ offset: number; color: HexColor }, { offset: number; color: HexColor }]
}

export type HexColor = string
export type QrColors = StateColor['gradient'] | StateColor['single']
export type ColorType = 'color' | 'gradient'

export type StateColor = {
  single: HexColor
  gradient: [HexColor, HexColor, number]
  colorType: ColorType
}

export type UnqrOptions = {
  dotsOptions: {
    type: DotType
    color?: QrColors
  }
  cornersSquareOptions: {
    type: CornerSquareType
    color?: QrColors
  }
  cornersDotOptions: {
    type: CornerDotType
    color?: QrColors
  }
  backgroundOptions?: {
    color?: HexColor
    round?: number
  }
  qrOptions?: {
    typeNumber?: TypeNumber
    mode?: Mode
    errorCorrectionLevel?: ErrorCorrectionLevel
  }
  margin?: number
  data?: string
  shape?: ShapeType
  logo?: {
    source: string
    margin?: number
    size?: number
  }
}

export type PresentQrOption = {
  dotsOptions: UnqrOptions['dotsOptions']
  cornersSquareOptions: UnqrOptions['cornersSquareOptions']
  cornersDotOptions: UnqrOptions['cornersDotOptions']
  shape: ShapeType
}

export interface ApiOptions {
  /**
   * Domain will be inserted at the beginning of the line with `?`.
   *
   * @default 'https://unqr.ru/api/qr'
   */
  domain: string
  /**
   * Encode values for correct reading of the api
   *
   * @default 'true'
   */
  isEncode: boolean
}

export type UseQRWithoutInitialOpt = {
  options: Ref<UnqrOptions>
  svgUrl: Readonly<ComputedRef<string>>
  isReadable: Readonly<Ref<boolean>>

  useApi: (options: Ref<UnqrOptions>, apiOpt?: Partial<ApiOptions>) => ComputedRef<string>
  useOptions: (
    options: Ref<UnqrOptions>,
    colorKey: string,
    type?: keyof Pick<UnqrOptions, 'dotsOptions' | 'cornersDotOptions' | 'cornersSquareOptions'>
  ) => {
    isGradient: Readonly<Ref<boolean>>
    dotsType: Readonly<AllDotsTypes[]>
    colors: Ref<StateColor>
  }
  changeShape: (type?: ShapeType) => void
}
export type UseQRWithInitialOpt = Pick<UseQRWithoutInitialOpt, 'svgUrl' | 'isReadable'>

export type ReturnedUseOptions = ReturnType<UseQRWithoutInitialOpt['useOptions']>
