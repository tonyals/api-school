import { AccountPostgresRepository } from './account-save'
import { getConnectionOptions, createConnection, getConnection } from 'typeorm'

describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    const connectionOptions = await getConnectionOptions('test')
    return await createConnection({ ...connectionOptions, name: 'default' })
  })

  afterAll(() => {
    return getConnection('test').close
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
