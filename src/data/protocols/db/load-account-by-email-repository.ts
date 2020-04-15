import { AccountModel } from '../../model/account'

export interface LoadAccountByEmailRepository {
  load (email: string): Promise<AccountModel>
}
