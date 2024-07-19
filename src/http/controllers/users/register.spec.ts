import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
describe('Register user Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Rodrigo Buena Vista',
      email: 'rod@gmail.com',
      password: 'rodrigoBena123',
      whatsapp: '11980682343',
    })

    expect(response.statusCode).toEqual(201)
  })
})
