import { serverSupabaseClient } from '#supabase/server'

export default defineCachedEventHandler(
  async (event): Promise<string[]> => {
    try {
      const client = await serverSupabaseClient(event)
      const { data, error } = await client
        .from('links')
        .select('short_link')
        .limit(14)
        .order('id', { ascending: false })
        .neq('is_private', true)
        .neq('is_frozen', true)
      if (error) throw createError({ statusMessage: error.message })

      return data.map(({ short_link }) => short_link)
    } catch (error: any) {
      console.warn('api/url/last.get', error.message)
      return []
    }
  },
  { maxAge: 60 * 5 }
)
