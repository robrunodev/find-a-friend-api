import { type FastifyInstance } from 'fastify'
import { register } from './register'

export async function organizationRoutes(app: FastifyInstance): Promise<void> {
  app.post('/orgs', register)
}
