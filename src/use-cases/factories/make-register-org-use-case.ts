import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase(): RegisterOrgUseCase {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(prismaOrgsRepository)

  return registerOrgUseCase
}
