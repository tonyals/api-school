import { AccountModel } from '../../../model/account'

export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<AccountModel>
}
