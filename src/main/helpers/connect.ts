import { CreateConnectionPostgres } from '../../infra/db/postgres/create-connection-postgres'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import env from '../config/env'

export const ConnectionsHelper = {
  async dbConnect (): Promise<void> {
    await CreateConnectionPostgres.connect()
    await MongoHelper.connect(env.mongoUrl)
  }
}
