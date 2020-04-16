import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../data/model/add-account'
import { AccountModel } from '../../../../data/model/account'
import { User } from '../../../../entity/User'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

export class AccountPostgresRepository implements AddAccountRepository,
LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await User.create(accountData).save()
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await User.findOne({ email })
    return account
  }
}
