import 'reflect-metadata'
import app from './config/app'
import { ConnectionsHelper } from './helpers/connect'

ConnectionsHelper.dbConnect().then(() => {
  app.listen(5050, () => console.log('Server running'))
}).catch(console.error)
