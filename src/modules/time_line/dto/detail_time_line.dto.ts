
import { IsNotEmpty, Validate } from 'class-validator'
import { TimeLineValidationRule } from '../rules/time_line_validation.rule'

export class DetailTimeLineDto {
  @Validate(TimeLineValidationRule)
  @IsNotEmpty()
  _id: string
}
