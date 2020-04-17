import { SignUpController } from '../../../presentation/controller/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/db-add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account-repository/account-save'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { Controller } from '../../../presentation/protocols/controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const logMongoRepository = new LogMongoRepository()
  const encrypter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  const dbAddAccount = new DbAddAccount(encrypter, accountPostgresRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
