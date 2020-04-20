import { Middleware } from '../protocols/middleware'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors/access-denied-error'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => resolve(forbidden(new AccessDeniedError())))
  }
}
