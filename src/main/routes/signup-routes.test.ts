import request from 'supertest'
import app from '../config/app'
import { CreateTypeOrmConn } from '../../infra/db/postgres/create-typeorm-connection'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await CreateTypeOrmConn.connect()
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
