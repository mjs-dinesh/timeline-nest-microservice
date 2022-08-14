import { Catch, ExceptionFilter } from '@nestjs/common'
import { MongoServerError } from 'mongodb'

@Catch(MongoServerError, Error)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any): any {
    const errors = {}
    if (exception instanceof MongoServerError) {
      switch (exception.code) {
        case 11000:
          errors[Object.keys(exception.keyPattern)[0]] = [
            'Value should be unique',
          ]
      }
      return {
        statusCode: 400,
        message: 'Validation Errors',
        errors: errors,
      }
    } else if (exception.errors && Object.keys(exception.errors).length) {
      const keys = Object.keys(exception.errors)
      keys.forEach((element) => {
        errors[element] = [exception.errors[element].message]
      })
      return {
        statusCode: 400,
        message: exception.message,
        errors: errors,
      }
    }
  }
}
