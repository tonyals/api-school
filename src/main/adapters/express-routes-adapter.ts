import { Controller } from '../../presentation/protocols/controller'
import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols/http'

export const adaptRoute = (controler: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controler.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
