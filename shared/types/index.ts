import type { Database } from '~/types'

export * from './stats'

export type Link = Database['public']['Tables']['links']['Row'] & { index: number }
