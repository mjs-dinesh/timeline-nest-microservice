import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TimeLineService } from './time_line.service';
import { CreateTimeLineDto } from './dto/create_time_line.dto';
import { DetailTimeLineDto } from './dto/detail_time_line.dto';
import { UpdateTimeLineDataDto } from './dto/update_time_line_data.dto';
import { DeleteTimeLineDto } from './dto/delete_time_line.dto';
import { QueryTimeLineDto } from './dto/query_time_line.dto';
import { ListTimeLineDto } from './dto/list_time_line.dto';
import { plainToInstance } from 'class-transformer';

@Controller()
export class TimeLineController {
  constructor(private readonly TimelineService: TimeLineService) {}

  @MessagePattern('time_line_create')
  public async create(body: CreateTimeLineDto) {
    return await this.TimelineService.create(body);
  }

  @MessagePattern('time_line_list')
  public async list(query: QueryTimeLineDto) {
    const result = await this.TimelineService.list(query);
    return plainToInstance(ListTimeLineDto, result);
  }

  @MessagePattern('time_line_exist')
  public async isExist(query) {
    return await this.TimelineService.isExist(query);
  }

  @MessagePattern('time_line_view')
  public async view(data: DetailTimeLineDto) {
    return await this.TimelineService.view(data);
  }

  @MessagePattern('time_line_update')
  public async update(data: UpdateTimeLineDataDto) {
    return await this.TimelineService.update(data._id, data.body);
  }

  @MessagePattern('time_line_delete')
  public async delete(data: DeleteTimeLineDto) {
    await this.TimelineService.delete(data._id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
