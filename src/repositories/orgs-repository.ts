import { type Organization, type Prisma } from '@prisma/client'

export interface FindManyNearby {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  create: (data: Prisma.OrganizationCreateInput) => Promise<Organization>
  findById: (query: string, page: number) => Promise<Organization | null>
  findByEmail: (email: string) => Promise<Organization | null>
  searchMany: (query: string, page: number) => Promise<Organization[]>
  findManyNearBy: (params: FindManyNearby) => Promise<Organization[]>
}
