import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event): Promise<boolean> => {
  const body = await readBody<{ newDesc: string; freeze: boolean; id: number; evt: 'rename' | 'freeze' }>(event)
  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw createError('no user')
    const client = await serverSupabaseClient(event)

    const update =
      body.evt === 'rename' ? { description: body.newDesc } : body.evt === 'freeze' ? { is_frozen: body.freeze } : null
    if (update === null) throw createError('What to update')
    const { error } = await client.from('links').update(update).eq('id', body.id)
    if (error) throw createError({ statusMessage: error.message })
    return true
  } catch (error: any) {
    console.warn('api/dashboard/update-link.put', error.message)
    return false
  }
})
