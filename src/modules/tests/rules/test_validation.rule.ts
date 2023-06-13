import { Injectable, NotFoundException } from '@nestjs/common';
import {
  isMongoId,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TestsService } from '../tests.service';

@ValidatorConstraint({ name: 'TestValidation', async: true })
@Injectable()
export class TestValidationRule implements ValidatorConstraintInterface {
  message = `Test doesn't exist`;

  constructor(private TestsService: TestsService) {}

  async validate(value: string, args: ValidationArguments) {
    const constraints = args.constraints;
    const filter = constraints && constraints.length ? constraints[0] : '_id';
    let result = isMongoId(value);
    if (!result) {
      this.message = `This field is invalid`;
      return result;
    }

    if (result) {
      result = !!(await this.TestsService.isExist({
        _id: value,
      }));

      if (!result) {
        throw new NotFoundException(this.defaultMessage());
      }
    }
    return result;
  }

  defaultMessage() {
    return this.message;
  }
}
