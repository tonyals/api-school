import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: any): any {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }
  }
}
