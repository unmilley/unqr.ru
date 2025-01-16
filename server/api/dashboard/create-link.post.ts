import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title: string; url: string }>(event)

  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw createError('no user')
    const client = await serverSupabaseClient(event)
    const { data, error } = await client
      .from('links')
      .insert({
        full_link: body.url,
        short_link: generateHex(body.url),
        title: body.title,
        author_id: user.id,
      })
      .select('*')
    if (error) throw createError(error)
    return Boolean(data)
  } catch (error) {
    console.log('error: ', error)
    return false
  }
})
