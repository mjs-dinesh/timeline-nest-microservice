
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  Validate,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { TimeLineValidationRule } from '../rules/time_line_validation.rule'
import { UpdateTimeLineDto } from './update_time_line.dto'

export class UpdateTimeLineDataDto {
  @IsNotEmpty()
  @Validate(TimeLineValidationRule)
  _id: string

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTimeLineDto)
  body: UpdateTimeLineDto
}
