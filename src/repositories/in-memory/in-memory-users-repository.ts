import { type Prisma, type User } from '@prisma/client'
import { type UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // Implement the logic to create a new user in memory
    // You can use the `data` parameter to access the user's information
    // Return the created user object
    return this.items[0]
  }

  async findByEmail(email: string): Promise<User | null> {
    // Implement the logic to find a user by email in memory
    // You can use the `email` parameter to search for the user
    // Return the found user object or null if not found
    return null
  }

  async findById(id: string): Promise<User | null> {
    // Implement the logic to find a user by ID in memory
    // You can use the `id` parameter to search for the user
    // Return the found user object or null if not found
    return null
  }
}
