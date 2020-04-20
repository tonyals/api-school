import env from '../../../../config/env'
import { DbAuthentication } from '../../../../../data/usecases/authentication/db-authentication'
import { AccountPostgresRepository } from '../../../../../infra/db/postgres/account-repository/account-postgres-repository'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../../domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAuthentication(
    accountPostgresRepository, bcryptAdapter,
    jwtAdapter, accountPostgresRepository
  )
}
