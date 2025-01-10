import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  try {
    const link = getRouterParam(event, 'hex')
    if (!link) throw createError('no link')

    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client.from('links').select('views, full_link, description').eq('short_link', link)
    if (error) throw createError({ statusMessage: error.message })
    if (!data.length) throw createError({ statusMessage: 'no data in db' })
    const Data = data[0]
    await client
      .from('links')
      .update({ views: Data.views + 1 })
      .eq('short_link', link)

    return {
      url: Data.full_link,
      description: Data.description,
    }
  } catch (error) {
    console.log('error: ', error)
    return {
      url: useRuntimeConfig(event).public.baseUrl + '?error=L404',
      description: '',
    }
  }
})
