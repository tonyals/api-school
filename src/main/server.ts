import 'reflect-metadata'
import app from './config/app'

app.listen(5050, () => console.log('Server running'))

// CreateTypeOrmConn.connect().then(async () => {
//   const app = (await import('./config/app')).default
//   app.listen(5050, () => console.log('Server running'))
// }).catch(console.error)
