
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  Validate,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { TestValidationRule } from '../rules/test_validation.rule'
import { UpdateTestDto } from './update_test.dto'

export class UpdateTestDataDto {
  @IsNotEmpty()
  @Validate(TestValidationRule)
  _id: string

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTestDto)
  body: UpdateTestDto
}
