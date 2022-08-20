import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
