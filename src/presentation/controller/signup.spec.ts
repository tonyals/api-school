import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'

const makeSut = (): any => {
  const sut = new SignUpController()
  return sut
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httpRequest = ({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        userAdmin: false
      }
    })
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = makeSut()
    const httpRequest = ({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        userAdmin: false
      }
    })
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
