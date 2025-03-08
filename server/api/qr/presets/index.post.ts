import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { presetSchema } from '~/server/schema'

export default defineEventHandler(async (event): Promise<boolean> => {
  try {
    const parsedBody = await readValidatedBody(event, (body) => presetSchema.safeParse(body))
    if (parsedBody.error) throw createError(parsedBody.error)
    const data = JSON.stringify(parsedBody.data)

    const auth = await serverSupabaseUser(event)
    if (!auth) throw createError('Forbidden')
    const author_id = auth.id
    const user_name = auth.user_metadata.user_name || auth.user_metadata.preferred_username

    const client = await serverSupabaseClient(event)

    const { error } = await client.from('qr').insert({ author_id, user_name, options: data })
    if (error !== null)
      await client.from('qr').update({ options: data }).eq('author_id', author_id).eq('user_name', user_name)

    return true
  } catch {
    return false
  }
})
