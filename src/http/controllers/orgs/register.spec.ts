import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

const LAT = -23.631743867302344
const LONG = -46.6085877612109

describe('Register Org Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an organization', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Pathas Therapeuticas',
      email: 'cao@caosemdono.com.br',
      password: '1234',
      whatsapp: '+5511999999999',
      city: 'São Paulo',
      street: 'Rua Honório Serpa, 259',
      neighborhood: 'Jardim Vergueiro',
      state: 'SP',
      cep: '04174-090',
      latitude: LAT,
      longitude: LONG,
      description: '',
    })

    expect(response.statusCode).toEqual(201)
  })
})
