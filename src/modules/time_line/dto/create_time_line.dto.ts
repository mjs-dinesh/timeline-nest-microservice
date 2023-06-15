import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTimeLineDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  date: string;

  @IsOptional()
  note: string;

  @IsNotEmpty()
  user_id;
}
