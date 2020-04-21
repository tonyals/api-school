import { Controller } from '../../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controller/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const addSurveyController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(addSurveyController)
}
