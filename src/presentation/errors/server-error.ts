export class ServerError extends Error {
  constructor (stack: string) {
    super('Server error')
    this.name = 'Internal server error'
    this.stack = stack
  }
}
