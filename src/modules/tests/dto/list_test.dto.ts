
import { Type } from 'class-transformer'
import { TestDto } from './test.dto'

export class ListTestDto {
  @Type(() => TestDto)
  data: TestDto[]
}
