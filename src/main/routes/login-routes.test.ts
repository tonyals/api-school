import request from 'supertest'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../../infra/db/postgres/create-connection-postgres'
import app from '../config/app'
import { User } from '../../entity/User'

describe('Login Routes', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(async () => {
    await User.delete({})
    return getConnection(process.env.NODE_ENV).close
  })

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
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
})
