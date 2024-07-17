import { type FastifyInstance } from 'fastify'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post('/users', register)
}
