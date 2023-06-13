
import { Exclude } from 'class-transformer'

export class TestDto {
  @Exclude()
  __v: number
}
