import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException) {
    let response = {};
    response = exception.getResponse() || { message: exception.message };
    return {
      statusCode: 404,
      ...response,
    };
  }
}
