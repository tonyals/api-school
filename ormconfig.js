module.exports = [
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'api-school',
    synchronize: true,
    dropSchema: true,
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
