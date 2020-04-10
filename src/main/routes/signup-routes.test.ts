import request from 'supertest'
import { getConnectionOptions, createConnection, getConnection } from 'typeorm'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    // const connectionOptions = await getConnectionOptions('test')
    // return await createConnection(connectionOptions)
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    return await createConnection({ ...connectionOptions, name: 'default' })
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
