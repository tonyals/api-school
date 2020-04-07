export class SignUpController {
  handle (HttpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('name')
    }
  }
}
