require('dotenv').config()

const { execSync } = require('child_process')
const { env, platform } = require('process')

try {
  const command = `pnpm dlx supabase gen types typescript --project-id ${env.SUPABASE_ID} --schema public > types/database.types.ts`
  console.log('command: ', command)
  if (platform === 'win32') {
    execSync(`powershell -Command ${command}`, {
      stdio: 'inherit',
    })
  } else {
    execSync(command, {
      stdio: 'inherit',
    })
  }
} catch (error) {
  console.error('An error occurred:', error)
  process.exit(1)
}
