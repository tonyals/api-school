import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express/express-routes-adapter'

export default async (router: Router): Promise<void> => {
  router.post('/signup', adaptRoute(await makeSignUpController()))
}
