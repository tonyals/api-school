import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../data/usecases/add-account-model/add-account'
import { AccountModel } from '../../../../data/model/account'
import { User } from '../../../../entity/User'

export class AccountPostgresRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await User.create(accountData).save()
    return account
  }
}
