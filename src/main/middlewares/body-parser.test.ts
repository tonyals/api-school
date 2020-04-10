import request from 'supertest'
import app from '../config/app'
import { createConnection, getConnectionOptions, getConnection } from 'typeorm'

describe('Body parser middleware', () => {
  beforeAll(async () => {
    // const connectionOptions = await getConnectionOptions('test')
    // return await createConnection(connectionOptions)
    const connectionOptions = await getConnectionOptions('test')
    return await createConnection({ ...connectionOptions, name: 'default' })
  })

  afterAll(() => {
    return getConnection('test').close
  })
  test('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
