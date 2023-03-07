import {
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException) {
    let response = {};
    response = exception.getResponse() || { message: exception.message };
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      ...response,
    };
  }
}
