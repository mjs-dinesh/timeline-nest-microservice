import { Injectable, NotFoundException } from '@nestjs/common';
import {
  isMongoId,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserActivitiesService } from '../user_activities.service';

@ValidatorConstraint({ name: 'UserActivityValidation', async: true })
@Injectable()
export class UserActivityValidationRule
  implements ValidatorConstraintInterface
{
  message = `UserActivity doesn't exist`;

  constructor(private UseractivitiesService: UserActivitiesService) {}

  async validate(value: string, args: ValidationArguments) {
    const constraints = args.constraints;
    const filter = constraints && constraints.length ? constraints[0] : '_id';
    let result = isMongoId(value);
    if (!result) {
      this.message = `This field is invalid`;
      return result;
    }

    if (result) {
      result = !!(await this.UseractivitiesService.isExist({
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
