import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event): Promise<Link[]> => {
  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw createError('no user')

    const client = await serverSupabaseClient(event)
    const { data, error } = await client.from('links').select('*').eq('author_id', user.id)

    if (error) throw createError({ statusMessage: error.message })

    return (data || []).sort((a, b) => a.id - b.id).map((link, index) => ({ ...link, index }))
  } catch (error: any) {
    console.warn('api/url/user.get', error.message)
    return []
  }
})
