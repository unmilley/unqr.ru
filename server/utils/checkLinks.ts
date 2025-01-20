import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'

export const checkShortLink = async (event: H3Event, url: string): Promise<boolean> => {
  const client = await serverSupabaseClient(event)
  const { count } = await client.from('links').select('*', { count: 'exact' }).eq('short_link', url)
  return Boolean(count)
}
