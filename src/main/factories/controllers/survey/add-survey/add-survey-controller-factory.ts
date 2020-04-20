import { Controller } from '../../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../../presentation/controller/survey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-login-validation-factory'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-account-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}
