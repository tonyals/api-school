import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadSurveys,
  success
} from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return success(surveys)
  }
}
