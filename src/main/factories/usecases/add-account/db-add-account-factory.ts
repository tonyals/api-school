import { AccountPostgresRepository } from '../../../../infra/db/postgres/account-repository/account-save'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../data/model/add-account'
import { DbAddAccount } from '../../../../data/usecases/db-add-account/db-add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAddAccount(encrypter, accountPostgresRepository)
}
