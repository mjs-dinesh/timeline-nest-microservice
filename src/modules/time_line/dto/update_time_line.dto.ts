
import { PartialType } from '@nestjs/mapped-types'
import { CreateTimeLineDto } from './create_time_line.dto'

export class UpdateTimeLineDto extends PartialType(CreateTimeLineDto) {}
