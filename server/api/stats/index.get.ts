import { serverSupabaseClient } from '#supabase/server'

export default defineCachedEventHandler(
  async (event): Promise<Stats> => {
    const { public: config } = useRuntimeConfig(event)
    try {
      const client = await serverSupabaseClient(event)

      let { data } = await client.rpc('get_link_stats')

      if (!data) data = [{ total_views: 0, total_users: 0, total_links: 0 }]

      const github = await event.$fetch<GithubStat>(`https://api.github.com/repos/${config.gitRepo}`, {
        parseResponse: (val) => {
          const { stargazers_count, pushed_at } = JSON.parse(val)
          return {
            lastCommitAt: pushed_at as string,
            stars: stargazers_count ?? 0,
          }
        },
      })

      return {
        totalViews: data[0].total_views,
        totalUsers: data[0].total_users,
        totalLinks: data[0].total_links,
        ...github,
      }
    } catch (error: any) {
      console.warn('api/stats/index.get: ', error.message)
      return {} as Stats
    }
  },
  { maxAge: 60 * 60 * 2 }
)
