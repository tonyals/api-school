import { AccountPostgresRepository } from './account-save'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../create-connection-postgres'
import { User } from '../../../../entity/User'

describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    await CreateConnectionPostgres.connect()
  })

  beforeEach(async () => {
    await User.delete({})
  })

  afterAll(() => {
    return getConnection(process.env.NODE_ENV).close
  })

  test('should return an account on add success', async () => {
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

  test('should return an account on loadByEmail success', async () => {
    const sut = new AccountPostgresRepository()
    await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isAdmin: true || false
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.isAdmin).toBe(false || true)
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('should return null if loadByEmail fails', async () => {
    const sut = new AccountPostgresRepository()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })
})
