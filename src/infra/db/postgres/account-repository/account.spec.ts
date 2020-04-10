import { AccountPostgresRepository } from './account-save'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../create-connection-postgres'

describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an account on success', async () => {
    const sut = new AccountPostgresRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isAdmin: true || false
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.isAdmin).toBe(false || true)
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
