import 'reflect-metadata'
import app from './config/app'
import { ConnectionsHelper } from './helpers/connect'
import env from './config/env'

ConnectionsHelper.dbConnect().then(() => {
  app.listen(env.port, () => console.log(`server running: ${env.port}`))
}).catch(console.error)
