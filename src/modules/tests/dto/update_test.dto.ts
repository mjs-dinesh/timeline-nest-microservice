
import { PartialType } from '@nestjs/mapped-types'
import { CreateTestDto } from './create_test.dto'

export class UpdateTestDto extends PartialType(CreateTestDto) {}
