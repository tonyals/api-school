import { getConnectionOptions, createConnection } from 'typeorm'

export const CreateTypeOrmConn = {
  async connect (): Promise<any> {
    const connectionOptions = await getConnectionOptions('development')
    return await createConnection({ ...connectionOptions, name: 'default' })
  }
}
