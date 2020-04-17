import request from 'supertest'
import app from '../config/app'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'
import { getConnection } from 'typeorm'

describe('Cors middleware', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
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
