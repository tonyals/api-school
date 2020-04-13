module.exports = [
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'api-school',
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [
      'src/entity/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/entity',
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
      'src/entity/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  }
]
