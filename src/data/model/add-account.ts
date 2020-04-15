import { AccountModel } from './account'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  isAdmin?: boolean
}

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
