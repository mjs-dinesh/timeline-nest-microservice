import { IsNotEmpty, Validate } from 'class-validator';
import { UserActivityValidationRule } from '../rules/user_activity_validation.rule';

export class DetailUserActivityDto {
  @Validate(UserActivityValidationRule)
  @IsNotEmpty()
  _id: string;
}
