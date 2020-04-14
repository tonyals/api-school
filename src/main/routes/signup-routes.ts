import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup'
import { adaptRoute } from '../adapters/express-routes-adapter'

export default async (router: Router): Promise<void> => {
  router.post('/signup', adaptRoute(await makeSignUpController()))
}
