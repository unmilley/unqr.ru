export const config = {
  public: {
    baseUrl: process.env.BASE_URL || 'https://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development',
    appVersion: process.env.npm_package_version ?? '',
    gitRepo: process.env.GIT_REPO,
  },
}
