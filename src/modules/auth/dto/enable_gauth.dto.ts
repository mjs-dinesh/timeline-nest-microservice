import { IsNotEmpty, IsString } from 'class-validator';

export class EnableGauthDto {
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  email_otp: string;

  @IsString()
  @IsNotEmpty()
  gauth_otp: string;
}
