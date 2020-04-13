export class ServerError extends Error {
  constructor (stack: string) {
    super('Server error')
    this.name = 'Server error'
    this.stack = stack
  }
}
