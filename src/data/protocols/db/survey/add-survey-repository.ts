import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository {
  add (account: AddSurveyModel): Promise<void>
}
