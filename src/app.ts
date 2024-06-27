import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    JSON.stringify(error.message)
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }
})
