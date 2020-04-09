import 'reflect-metadata'
import { CreateTypeOrmConn } from '../infra/db/postgres/create-typeorm-connection'

CreateTypeOrmConn.connect().then(async () => {
  const app = (await import('./config/app')).default
  app.listen(5050, () => console.log('Server running'))
}).catch(console.error)
