
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  isMongoId,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { TimeLineService } from '../time_line.service'

@ValidatorConstraint({ name: 'TimeLineValidation', async: true })
@Injectable()
export class TimeLineValidationRule implements ValidatorConstraintInterface {
  message = `TimeLine doesn't exist`

  constructor(private TimelineService: TimeLineService) {}

  async validate(value: string, args: ValidationArguments) {
    const constraints = args.constraints
    const filter = constraints && constraints.length ? constraints[0] : '_id'
    let result = isMongoId(value)
    if (!result) {
      this.message = `This field is invalid`
      return result
    }

    if (result) {
      result = !!(await this.TimelineService.isExist({
        _id: value,
      }))

      if (!result) {
        throw new NotFoundException(this.defaultMessage())
      }
    }
    return result
  }

  defaultMessage() {
    return this.message
  }
}
