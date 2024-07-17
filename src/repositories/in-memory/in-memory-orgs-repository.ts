/* eslint-disable @typescript-eslint/no-base-to-string */
import { Prisma, type Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const {
      name,
      email,
      whatsapp,
      cep,
      city,
      description,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
    } = data

    const org = {
      id: randomUUID(),
      name,
      email,
      whatsapp,
      cep,
      city,
      description: description ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      neighborhood,
      state,
      street,
      created_at: new Date(),
      userId: null,
      petOrganizationId: null,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Organization | null> {
    const org = this.items.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
