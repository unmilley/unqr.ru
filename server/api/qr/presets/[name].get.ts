import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<string> => {
  try {
    const name = getRouterParam(event, 'name')
    if (!name) throw createError('no Name?')

    const client = await serverSupabaseClient(event)

    const { data, error } = await client.from('qr').select('options').eq('user_name', name)
    if (error || !data[0]) throw createError(error || 'No Data')
    return JSON.stringify(data[0].options)
  } catch {
    return ''
  }
})
