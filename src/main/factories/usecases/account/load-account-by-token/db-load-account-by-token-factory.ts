import { AccountPostgresRepository } from '../../../../../infra/db/postgres/account-repository/account-postgres-repository'
import { LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPostgresRepository)
}
