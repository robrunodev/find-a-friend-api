import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register-user'

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
})
