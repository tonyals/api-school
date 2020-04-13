import 'reflect-metadata'
import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

MongoHelper.connect('mongodb://localhost:27017/api-school').then(() => {
  app.listen(5050, () => console.log('Server running'))
}).catch(console.error)
