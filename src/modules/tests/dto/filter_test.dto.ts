
import { IsOptional } from 'class-validator'
import { Expose } from 'class-transformer'

export class FilterTestDto { 
  @IsOptional()
  _id: string
}
