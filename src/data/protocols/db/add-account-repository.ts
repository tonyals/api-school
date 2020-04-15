import { AddAccountModel } from '../../model/add-account'
import { AccountModel } from '../../model/account'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
