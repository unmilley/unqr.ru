import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { H3Event } from 'h3'
import { checkShortLink } from '~/server/utils/checkLinks'

const generateUniqueHex = async (event: H3Event, url: string): Promise<string> => {
  const hex = generateHex(url)
  const isExist = await checkShortLink(event, hex)
  return isExist ? await generateUniqueHex(event, url + ' ') : hex
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ desc: string; url: string; isPrivate: boolean }>(event)

  try {
    const user = await serverSupabaseUser(event)
    if (!user) throw createError('no user')

    const hex = await generateUniqueHex(event, body.url)

    const client = await serverSupabaseClient(event)
    const { error } = await client.from('links').insert({
      full_link: body.url,
      short_link: hex,
      description: body.desc,
      author_id: user.id,
      is_private: body.isPrivate,
    })
    if (error) throw createError({ statusMessage: error.message })
    return hex
  } catch (error: any) {
    console.warn('api/dashboard/create-link.post', error.message)
    return ''
  }
})
