import { Router } from 'express'
import { createConnection, getConnectionOptions } from 'typeorm'
import { makeSignUpController } from '../factories/signup'
import { adaptRoute } from '../adapters/express-routes-adapter'

export default async (router: Router): Promise<void> => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
  await createConnection({ ...connectionOptions, name: 'default' })
  router.post('/signup', adaptRoute(makeSignUpController()))
}

// export default (router: Router): void => {
//   router.post('/signup', (req, res) => {
//     res.json({ ok: 'success' })
//   })
// }
