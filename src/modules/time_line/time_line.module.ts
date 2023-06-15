
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TimeLine, TimeLineSchema } from './time_line.schema'
import { TimeLineController } from './time_line.controller'
import { TimeLineService } from './time_line.service'
import { TimeLineValidationRule } from './rules/time_line_validation.rule'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeLine.name, schema: TimeLineSchema }]),
  ],
  controllers: [TimeLineController],
  providers: [TimeLineService, TimeLineValidationRule],
})
export class TimeLineModule {}
