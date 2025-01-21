import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event): Promise<boolean> => {
  const body = await readBody<{ id: number }>(event)
  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw createError('no user')

    const client = await serverSupabaseClient(event)

    const { error } = await client.from('links').delete().eq('id', body.id)
    if (error) throw createError({ statusMessage: error.message })

    return true
  } catch (error: any) {
    console.warn('api/url/index.delete', error.message)
    return false
  }
})
