/* eslint-disable @typescript-eslint/no-base-to-string */
import { Prisma, type Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type FindManyNearby, type OrgsRepository } from '../orgs-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

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
      password_hash,
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
      password_hash,
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

  async searchMany(query: string, page: number): Promise<Organization[]> {
    const orgs = this.items
      .filter((org) =>
        org.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .slice((page - 1) * 20, page * 20)

    return orgs
  }

  async findManyNearBy(params: FindManyNearby): Promise<Organization[]> {
    const { latitude, longitude } = params

    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: Number(item.latitude), longitude: Number(item.longitude) },
      )
      return distance < 10
    })
  }
}
