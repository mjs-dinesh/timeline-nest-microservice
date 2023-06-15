
import { IsOptional } from 'class-validator'
import { Expose } from 'class-transformer'

export class FilterTimeLineDto { 
  @IsOptional()
  _id: string
}
