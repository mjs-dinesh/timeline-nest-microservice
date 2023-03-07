import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Expose()
  @Transform(({ obj }) => {
    return obj?.email.split('@')[0] || '';
  })
  first_name: string;
}
