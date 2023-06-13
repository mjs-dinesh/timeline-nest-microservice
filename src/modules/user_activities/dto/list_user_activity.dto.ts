import { Type } from 'class-transformer';
import { UserActivityDto } from './user_activity.dto';

export class ListUserActivityDto {
  @Type(() => UserActivityDto)
  data: UserActivityDto[];
}
