import { Role, type Prisma, type User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { name, email, whatsapp, password_hash } = data

    const user = {
      id: randomUUID(),
      name,
      email,
      whatsapp,
      password_hash,
      role: Role.ADMIN,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
