import 'reflect-metadata'
import { CreateTypeOrmConn } from '../infra/db/postgres/create-typeorm-connection'
import app from './config/app'

CreateTypeOrmConn.connect().then(() => {
  app.listen(5050, () => console.log('Server running'))
}).catch(console.error)
