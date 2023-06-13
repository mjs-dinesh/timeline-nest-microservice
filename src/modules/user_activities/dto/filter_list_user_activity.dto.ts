import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FilterListUserActivityDto {
  @Exclude()
  page;

  @Exclude()
  limit;

  @Expose()
  @Transform(() => {
    return { $exists: false };
  })
  deleted_at;

  @IsNotEmpty()
  user_id;
}
