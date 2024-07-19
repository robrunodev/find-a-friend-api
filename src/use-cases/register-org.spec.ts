import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { EmailAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase
const LAT = -23.631743867302344
const LONG = -46.6085877612109

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register an organization', async () => {
    const { org } = await sut.execute({
      name: 'Cão Sem Dono',
      email: 'caosemdono@caosemdono.com.br',
      password: 'test@123',
      whatsapp: '+5511999999999',
      city: 'São Paulo',
      street: 'Rua Honório Serpa, 259',
      neighborhood: 'Jardim Vergueiro',
      state: 'SP',
      cep: '04174-090',
      latitude: LAT,
      longitude: LONG,
      description:
        'O Cão Sem Dono é uma ONG (Organização Não Governamental), sem fins lucrativos',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to register with the same email twice', async () => {
    await sut.execute({
      name: 'Cão Sem Dono',
      email: 'caosemdono@caosemdono.com.br',
      password: 'test@123',
      whatsapp: '+5511999999999',
      city: 'São Paulo',
      street: 'Rua Honório Serpa, 259',
      neighborhood: 'Jardim Vergueiro',
      state: 'SP',
      cep: '04174-090',
      latitude: LAT,
      longitude: LONG,
      description: 'lore ipsum dolor sit amet, consectetur adipiscing elit',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Pathas Therapeuticas',
        email: 'caosemdono@caosemdono.com.br',
        password: 'test@123',
        whatsapp: '+5511999999999',
        city: 'São Paulo',
        street: 'Rua Honório Serpa, 259',
        neighborhood: 'Jardim Vergueiro',
        state: 'SP',
        cep: '04174-090',
        latitude: LAT,
        longitude: LONG,
        description: '',
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should hash user password when registration', async () => {
    const { org } = await sut.execute({
      name: 'Pathas Therapeuticas',
      email: 'caosemdono@caosemdono.com.br',
      password: '1234',
      whatsapp: '+5511999999999',
      city: 'São Paulo',
      street: 'Rua Honório Serpa, 259',
      neighborhood: 'Jardim Vergueiro',
      state: 'SP',
      cep: '04174-090',
      latitude: LAT,
      longitude: LONG,
      description: '',
    })

    const isPasswordCorrectlyHashed = await compare('1234', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
