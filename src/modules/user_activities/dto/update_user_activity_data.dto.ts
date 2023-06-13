import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserActivityValidationRule } from '../rules/user_activity_validation.rule';
import { UpdateUserActivityDto } from './update_user_activity.dto';

export class UpdateUserActivityDataDto {
  @IsNotEmpty()
  @Validate(UserActivityValidationRule)
  _id: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserActivityDto)
  body: UpdateUserActivityDto;
}
