import { Catch } from '@nestjs/common'
import { ValidationFilter } from '.'
import { ValidationErrorException } from '../exceptions/validation_error.exception'

@Catch(ValidationErrorException)
export class ValidationNestedFilter extends ValidationFilter {
  catch(exception: ValidationErrorException) {
    const response: any = exception.getResponse()
    const message = response.message
    const errors = this.getErrors(message)
    return {
      statusCode: 422,
      errors: errors['body'] ? errors['body'] : errors,
    }
  }
}
