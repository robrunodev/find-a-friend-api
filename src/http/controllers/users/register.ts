import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-user-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
  })

  const { name, email, password, whatsapp } = registerBodySchema.parse(
    request.body,
  )

  const registerUserCase = makeRegisterUseCase()

  try {
    await registerUserCase.execute({
      name,
      email,
      password,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(409).send(err.message)
    }
    return await reply.status(500)
  }

  return await reply.status(201).send()
}
