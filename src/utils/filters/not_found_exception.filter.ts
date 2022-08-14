import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException) {
    return {
      statusCode: 404,
      message: exception.message,
    }
  }
}
