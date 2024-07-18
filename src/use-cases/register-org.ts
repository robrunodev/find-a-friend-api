import { type OrgsRepository } from '@/repositories/orgs-repository'
import { type Organization } from '@prisma/client'
import { EmailAlreadyExistsError } from './errors/user-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateOrgRequest {
  name: string
  email: string
  whatsapp: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
  description: string
  password: string
}

interface CreateOrgResponse {
  org: Organization
}

export class RegisterOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    cep,
    state,
    city,
    street,
    neighborhood,
    latitude,
    longitude,
    description,
    password,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      cep,
      state,
      city,
      street,
      neighborhood,
      latitude,
      longitude,
      description,
      password_hash,
    })

    return { org }
  }
}
