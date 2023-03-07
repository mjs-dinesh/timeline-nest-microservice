import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserEditDto {
  @IsNotEmpty()
  user_id: string;

  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  country: string;

  @IsOptional()
  currency: string;

  @IsOptional()
  profile_picture: string;
}
