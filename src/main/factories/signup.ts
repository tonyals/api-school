import { SignUpController } from '../../presentation/controller/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/db-add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountPostgresRepository } from '../../infra/db/postgres/account-repository/account-save'
import { CreateConnectionPostgres } from '../../infra/db/postgres/create-connection-postgres'

export const makeSignUpController = async (): Promise<SignUpController> => {
  await CreateConnectionPostgres.connect()
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  const addAccount = new DbAddAccount(encrypter, accountPostgresRepository)
  return new SignUpController(emailValidator, addAccount)
}
