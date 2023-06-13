import { IsNotEmpty, Validate } from 'class-validator';
import { UserActivityValidationRule } from '../rules/user_activity_validation.rule';

export class DeleteUserActivityDto {
  @IsNotEmpty()
  @Validate(UserActivityValidationRule)
  _id: string;
}
