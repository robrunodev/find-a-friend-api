import { EmailAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    whatsapp: z.string(),
    city: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    cep: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    description: z.string(),
  })

  const registerOrgBody = registerOrgBodySchema.parse(request.body)

  const registerOrgUseCase = makeRegisterOrgUseCase()

  try {
    await registerOrgUseCase.execute({
      ...registerOrgBody,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return await reply.status(409).send(err.message)
    }
    return await reply.status(500).send()
  }

  return await reply.status(201).send()
}
