import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../data/usecases/add-account-model/add-account'
import { AccountModel } from '../../../../data/model/account'
import { User } from '../../../../entity/User'
import { getRepository } from 'typeorm'

export class AccountPostgresRepository implements AddAccountRepository {
  private readonly user = getRepository(User)
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    return await this.user.create(accountData).save()
  }
}
