import { IsNotEmpty } from 'class-validator';

export class VerifyOTPDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  otp: string;
}
