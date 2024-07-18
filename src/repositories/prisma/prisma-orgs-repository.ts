import { type Organization, type Prisma } from '@prisma/client'
import { type FindManyNearby, type OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const org = await prisma.organization.create({
      data,
    })

    return org
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({
      where: { email },
    })

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<Organization | null> {
    const org = await prisma.organization.findUnique({ where: { id } })

    if (!org) {
      return null
    }

    return org
  }

  async searchMany(query: string, page: number): Promise<Organization[]> {
    const orgs = await prisma.organization.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return orgs
  }

  async findManyNearBy({
    latitude,
    longitude,
  }: FindManyNearby): Promise<Organization[]> {
    const gyms = await prisma.$queryRaw<Organization[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
