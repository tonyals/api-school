import { AccountPostgresRepository } from './account-postgres-repository'
import { getConnection } from 'typeorm'
import { CreateConnectionPostgres } from '../helpers/postgres-connect-helper'
import { User } from '../../entities/User'

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

  describe('Add', () => {
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
  })

  describe('LoadByEmail', () => {
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

  describe('UpdateAccessToken', () => {
    test('should update the account accessToken on updateAccessToken success', async () => {
      const sut = new AccountPostgresRepository()
      const user = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isAdmin: true || false
      })
      expect(user.accessToken).toBeFalsy()
      await sut.updateAccessToken(user.id, 'any_token')
      const account = await User.findOne({ id: user.id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('LoadByToken', () => {
    test('should return an account on loadByToken without role', async () => {
      const sut = new AccountPostgresRepository()
      await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return an account on loadByToken with admin role', async () => {
      const sut = new AccountPostgresRepository()
      await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return null on loadByToken with invalid role', async () => {
      const sut = new AccountPostgresRepository()
      await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })

    test('should return an account on loadByToken if user is admin', async () => {
      const sut = new AccountPostgresRepository()
      await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('should return null if loadByToken fails', async () => {
      const sut = new AccountPostgresRepository()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
