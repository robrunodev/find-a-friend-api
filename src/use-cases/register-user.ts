import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'
import { hash } from 'bcryptjs'

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

  async execute({
    name,
    email,
    password,
    whatsapp,
  }: RegisterUserUseCaseParams): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithTheSameEmail = await this.userRepository.findByEmail(email)

    if (userWithTheSameEmail) {
      throw new Error(`User has the same email ${userWithTheSameEmail}`)
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
    })

    return { user }
  }
}
