import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../data/model/add-account'
import { AccountModel } from '../../../../data/model/account'
import { User } from '../../entities/User'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
import { Brackets } from 'typeorm'

export class AccountPostgresRepository implements AddAccountRepository,
LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await User.create(accountData).save()
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await User.findOne({ email })
    return account
  }

  async updateAccessToken (id: number, token: string): Promise<void> {
    const user = await User.findOne({ id })
    user.accessToken = token
    await user.save()
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const account = await User.createQueryBuilder('user')
      .where('user.accessToken = :token', { token: token })
      .orWhere(new Brackets(qb => {
        qb.where('user.role = :admin', { admin: 'admin' })
          .orWhere('user.role = :role', { role: role })
      })).getOne()

    if (role === 'admin' && !account.role) {
      return null
    }
    return account
  }
}
