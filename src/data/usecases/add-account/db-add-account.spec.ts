import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

interface SutTYpes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTYpes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
  return {
    encrypterStub, sut
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      isAdmin: false
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
