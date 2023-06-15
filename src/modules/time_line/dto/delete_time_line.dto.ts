
import {
  IsNotEmpty,
  Validate,
} from 'class-validator'
import { TimeLineValidationRule } from '../rules/time_line_validation.rule'

export class DeleteTimeLineDto {
  @IsNotEmpty()
  @Validate(TimeLineValidationRule)
  _id: string
}
