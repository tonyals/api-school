import { SignUpController } from '../../presentation/controller/signup/signup'
import { DbAddAccount } from '../../data/usecases/db-add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountPostgresRepository } from '../../infra/db/postgres/account-repository/account-save'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { CreateConnectionPostgres } from '../../infra/db/postgres/create-connection-postgres'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = async (): Promise<Controller> => {
  await CreateConnectionPostgres.connect()
  const salt = 12
  const logMongoRepository = new LogMongoRepository()
  const encrypter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  const dbAddAccount = new DbAddAccount(encrypter, accountPostgresRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
