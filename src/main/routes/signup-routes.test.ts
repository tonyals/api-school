import request from 'supertest'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../../infra/db/postgres/create-connection-postgres'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Tony',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
        isAdmin: true || false
      })
      .expect(200)
  })
})
