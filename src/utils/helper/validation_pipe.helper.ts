import { ValidationError } from '@nestjs/common';
import { ValidationErrorException } from '../exceptions';

export const ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    return new ValidationErrorException(validationErrors);
  },
};
