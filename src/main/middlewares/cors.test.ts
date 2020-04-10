import request from 'supertest'
import app from '../config/app'
import { createConnection, getConnectionOptions, getConnection } from 'typeorm'

describe('Cors middleware', () => {
  beforeAll(async () => {
    // const connectionOptions = await getConnectionOptions('test')
    // return await createConnection(connectionOptions)
    const connectionOptions = await getConnectionOptions('test')
    return await createConnection({ ...connectionOptions, name: 'default' })
  })

  afterAll(() => {
    return getConnection('test').close
  })
  test('should enable cors', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-controll-allow-origin', '*')
      .expect('access-controll-allow-methods', '*')
      .expect('access-controll-allow-headers', '*')
  })
})
