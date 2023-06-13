import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/utils/constant';
import { Expose, Transform } from 'class-transformer';

export class QueryUserActivityDto extends QueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @Expose({ name: 'sorter' })
  @Transform((v) => (v.value = { created_at: -1 }))
  sorter;

  @IsOptional()
  page;

  @IsOptional()
  limit;

  @IsNotEmpty()
  user_id;
}
