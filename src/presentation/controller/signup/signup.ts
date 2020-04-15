import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, serverError, success } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { AddAccount } from '../../../domain/usecases/add-account'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name, email, password
      })
      return success(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
