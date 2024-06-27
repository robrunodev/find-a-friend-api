import { app } from './app'
import { env } from './env'

async function startServer(): Promise<void> {
  await app.listen({ port: env.PORT, host: '0.0.0.0' })
  console.log(`🚀 HTTP Server is running on port ${env.PORT}`)
}

try {
  void startServer()
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
