import request from 'supertest'
import app from '../config/app'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'
import { getConnection } from 'typeorm'

describe('Body parser middleware', () => {
  beforeAll(async () => {
    // const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    // return await createConnection({ ...connectionOptions, name: 'default' })
    await CreateConnectionPostgres.connect()
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
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
