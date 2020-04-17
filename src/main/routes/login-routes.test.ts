import request from 'supertest'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../../infra/db/postgres/create-connection-postgres'
import app from '../config/app'
import { User } from '../../entity/User'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  beforeEach(async () => {
    await User.delete({})
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
  })

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Tony Augusto',
          email: 'valid_email@mail.com',
          password: 'valid_password',
          passwordConfirmation: 'valid_password',
          isAdmin: true || false
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('1234', 12)
      const user = {
        name: 'Tony Augusto',
        email: 'valid_email@mail.com',
        password,
        isAdmin: false
      }
      await User.create(user).save()
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.com',
          password: '1234'
        })
        .expect(200)
    })

    test('should return 401 if login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
