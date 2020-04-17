import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: number): Promise<string> {
    const acessToken = await jwt.sign({ id: value }, this.secret)
    return acessToken
  }
}
