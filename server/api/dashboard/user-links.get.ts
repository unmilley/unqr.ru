import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw createError('no user')
    const client = await serverSupabaseClient<Database>(event)
    const { data } = await client.from('links').select('*').eq('author_id', user.id)
    return data || []
  } catch (error) {
    console.log('error: ', error)
    return []
  }
})
