
import {
  IsNotEmpty,
  Validate,
} from 'class-validator'
import { TestValidationRule } from '../rules/test_validation.rule'

export class DeleteTestDto {
  @IsNotEmpty()
  @Validate(TestValidationRule)
  _id: string
}
