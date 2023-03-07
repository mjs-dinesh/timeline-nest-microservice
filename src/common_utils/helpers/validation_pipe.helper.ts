import { ValidationError } from '@nestjs/common';
import { ValidationErrorException } from './validation_error.exception';

export const ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    return new ValidationErrorException(validationErrors);
  },
};
