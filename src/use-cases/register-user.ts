import { type UsersRepository } from '@/repositories/users-repository'

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
}
