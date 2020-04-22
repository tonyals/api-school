module.exports = [
  {
    name: 'development',
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'docker',
    database: process.env.TYPEORM_DATABASE || 'api-school',
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [
      'src/infra/db/entities/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/infra/db/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  },
  {
    name: 'sqlite_tests',
    type: 'sqlite',
    database: './sqlite_tests.sqlite',
    synchronize: true,
    logging: false,
    entities: [
      'src/infra/db/entities/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/infra/db/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  }
]
