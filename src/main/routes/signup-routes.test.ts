import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
