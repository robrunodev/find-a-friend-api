import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUseCase(): RegisterUserUseCase {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserUseCase(prismaUsersRepository)

  return registerUseCase
}
