import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @Transform((v: any) => {
    return parseInt(v.value);
  })
  page: number = 1;

  @IsOptional()
  @Transform((v: any) => {
    return parseInt(v.value);
  })
  limit: number = 20;
}
