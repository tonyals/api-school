import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => {
  //   const route = (await import(`../../../${file}`)).default
  //   route(router)
  // })
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}

// import { Express, Router } from 'express'
// import fg from 'fast-glob'

// export default (app: Express): void => {
//   const router = Router()
//   app.use('/api', router)
//   fg.sync('**/src/main/routes/**routes.ts').map(async file => {
//     const route = (await import(`../../../${file}`)).default
//     route(router)
//   })
// }
