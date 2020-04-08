module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  globalSetup: '<rootDir>/node_modules/@databases/pg-test/jest/globalSetup.js',
  globalTeardown: '<rootDir>/node_modules/@databases/pg-test/jest/globalTeardown.js',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
