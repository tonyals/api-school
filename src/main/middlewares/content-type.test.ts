import request from 'supertest'
import app from '../config/app'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'

describe('Content Type Middleware', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
  })
  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
