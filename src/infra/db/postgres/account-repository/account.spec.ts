import { AccountPostgresRepository } from './account-save'
import { CreateTypeOrmConn } from '../create-typeorm-connection'

describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    await CreateTypeOrmConn.connect()
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
