/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { organizationRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(usersRoutes)
app.register(organizationRoutes)

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

  return reply.status(500).send({ message: 'Internal server error' })
})
