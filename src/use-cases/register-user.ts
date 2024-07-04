import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'

interface RegisterUserUseCaseParams {
  name: string
  email: string
  whatsapp: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
}
