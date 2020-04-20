import { Middleware } from '../protocols/middleware'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { forbidden, success } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors/access-denied-error'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return success({ accountId: account.id })
      }
    }
    return forbidden(new AccessDeniedError())
  }
}
