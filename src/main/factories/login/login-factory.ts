import env from '../../config/env'
import { Controller } from '../../../presentation/protocols/controller'
import { LoginController } from '../../../presentation/controller/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account-repository/account-save'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  const dbAuthentication = new DbAuthentication(
    accountPostgresRepository, bcryptAdapter,
    jwtAdapter, accountPostgresRepository
  )
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
