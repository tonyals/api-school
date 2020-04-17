import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-routes-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default async (router: Router): Promise<void> => {
  router.post('/signup', adaptRoute(await makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
