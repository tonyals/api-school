import 'reflect-metadata'
import { CreateTypeOrmConn } from '../infra/db/postgres/create-typeorm-connection'
import express from 'express'

const app = express()

CreateTypeOrmConn.connect().then(() => {
  app.listen(5050, () => console.log('Server running'))
}).catch(console.error)
