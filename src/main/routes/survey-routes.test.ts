import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { CreateConnectionPostgres } from '../../infra/db/postgres/helpers/postgres-connect-helper'
import { User } from '../../infra/db/entities/User'
import { getConnection } from 'typeorm'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
    await MongoHelper.connect('mongodb://localhost:27017/api-school')
  })

  afterAll(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    await User.delete({})
    await MongoHelper.disconnect()
    return getConnection(process.env.NODE_ENV).close
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    await User.delete({})
  })

  describe('POST /surveys', () => {
    test('should return 403 on add survey without access token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1'
          }, {
            answer: 'Answer 1'
          }]
        })
        .expect(403)
    })

    test('should return 204 on add survey with valid access token', async () => {
      const password = await hash('1234', 12)
      const newUser = {
        name: 'Tony Augusto',
        email: 'valid_email@mail.com',
        password,
        role: 'admin'
      }
      const res = await User.create(newUser).save()
      const id = res.id
      const accessToken = sign({ id }, env.jwtSecret)
      const user = await User.findOne({ id })
      user.accessToken = accessToken
      await user.save()
      console.log(user)
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            image: 'http://image-name.com',
            answer: 'Answer 1'
          }, {
            answer: 'Answer 1'
          }]
        })
        .expect(204)
    })
  })
})
