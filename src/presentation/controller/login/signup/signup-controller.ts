import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { badRequest, serverError, success, forbidden } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { Validation } from '../../../protocols/validation'
import { Authentication } from '../../../../domain/usecases/authentication'
import { EmailInUseError } from '../../../errors/email-in-use-error'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, role } = httpRequest.body
      const account = await this.addAccount.add({ name, email, password, role })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({ email, password })
      return success({ accessToken })
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
