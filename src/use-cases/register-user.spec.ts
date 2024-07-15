import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register user Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'test@123',
      whatsapp: '+5511999999999',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with the same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'test@123',
      whatsapp: '+5511999999999',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Rodrigo Doe',
        email: 'john@test.com',
        password: 'test@123',
        whatsapp: '+5511999999999',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash user password when registration', async () => {
    const { user } = await sut.execute({
      name: 'Rodrigo Bruno de Solza',
      email: 'rod@rod.com',
      password: '123456',
      whatsapp: '+5511999999999',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
