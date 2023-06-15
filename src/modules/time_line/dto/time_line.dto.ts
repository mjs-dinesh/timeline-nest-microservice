
import { Exclude } from 'class-transformer'

export class TimeLineDto {
  @Exclude()
  __v: number
}
