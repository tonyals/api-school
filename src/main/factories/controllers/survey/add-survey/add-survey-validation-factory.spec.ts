import {
  ValidationComposite,
  RequiredFieldValidation
} from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddSurveyValidation } from './add-survey-login-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('should call validation composite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
