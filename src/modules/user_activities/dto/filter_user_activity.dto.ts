import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class FilterUserActivityDto {
  @IsOptional()
  _id: string;
}
