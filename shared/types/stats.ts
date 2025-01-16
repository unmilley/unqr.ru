export type GithubStat = {
  lastCommitAt: string
  stars: number
}

export type LinksStat = {
  totalViews: number
  totalUsers: number
  totalLinks: number
}
export type Stats = GithubStat & LinksStat
