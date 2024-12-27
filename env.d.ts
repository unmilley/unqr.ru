declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    SUPABASE_URL: string
    SUPABASE_KEY: string
    BASE_URL: string
  }
}
