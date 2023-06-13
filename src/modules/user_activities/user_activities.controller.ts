import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserActivitiesService } from './user_activities.service';
import { DetailUserActivityDto } from './dto/detail_user_activity.dto';
import { QueryUserActivityDto } from './dto/query_user_activity.dto';
import { ListUserActivityDto } from './dto/list_user_activity.dto';
import { plainToInstance } from 'class-transformer';

@Controller()
export class UserActivitiesController {
  constructor(private readonly UseractivitiesService: UserActivitiesService) {}

  @MessagePattern('user_activities_list')
  public async list(query: QueryUserActivityDto) {
    const result = await this.UseractivitiesService.list(query);
    return plainToInstance(ListUserActivityDto, result);
  }

  @MessagePattern('user_activities_view')
  public async view(data: DetailUserActivityDto) {
    return await this.UseractivitiesService.view(data);
  }
}
