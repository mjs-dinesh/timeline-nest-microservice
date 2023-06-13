
import { IsNotEmpty, Validate } from 'class-validator'
import { TestValidationRule } from '../rules/test_validation.rule'

export class DetailTestDto {
  @Validate(TestValidationRule)
  @IsNotEmpty()
  _id: string
}
