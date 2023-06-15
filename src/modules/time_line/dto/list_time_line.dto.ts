
import { Type } from 'class-transformer'
import { TimeLineDto } from './time_line.dto'

export class ListTimeLineDto {
  @Type(() => TimeLineDto)
  data: TimeLineDto[]
}
